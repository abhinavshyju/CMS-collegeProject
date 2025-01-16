import 'package:app/components/base_layout.dart';
import 'package:app/components/table.dart';
import 'package:app/components/typography.dart';
import 'package:app/sequlizer/attendance_students.dart';
import 'package:app/service/request.dart';
import 'package:flutter/material.dart';
import 'package:forui/forui.dart';
import 'package:toastification/toastification.dart';

class AddAttendanceScreen extends StatefulWidget {
  final String classId;
  final String className;
  const AddAttendanceScreen(
      {super.key, required this.classId, required this.className});

  @override
  State<AddAttendanceScreen> createState() => AddAttendanceScreenState();
}

class AddAttendanceScreenState extends State<AddAttendanceScreen> {
  final controller = FRadioSelectGroupController(value: {1});
  List<Datum> studentData = [];
  bool alreadyExist = false;
  @override
  void initState() {
    // TODO: implement initState
    getStudentsData();
    controller.addListener(() {
      getStudentsData();
    });
    super.initState();
  }

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  void getStudentsData() async {
    try {
      final response = await makePostRequest(
          "/attendance/get-students/${widget.classId}",
          body: {"hour": controller.values.toString()});
      AttendanceStudents attendanceStudents =
          AttendanceStudents.fromRawJson(response);
      final data = attendanceStudents.data;
      setState(() {
        alreadyExist = attendanceStudents.alredyPresent;
        studentData = data;
      });
    } catch (e) {
      toastification.show(
        // ignore: use_build_context_synchronously
        context: context,
        type: ToastificationType.error,
        style: ToastificationStyle.minimal,
        alignment: Alignment.bottomRight,
        title: const Text('Error to fetch data !'),
        description: const Text("Check your internet connection"),
        autoCloseDuration: const Duration(seconds: 5),
      );
    }
  }

  void addAttendance() async {
    try {
      final response = await makePostRequest("/attendance", body: {
        "class_id": widget.classId,
        "hour": controller.values.firstOrNull.toString(),
        "student_ids": attendance
      });
      toastification.show(
        // ignore: use_build_context_synchronously
        context: context,
        type: ToastificationType.success,
        style: ToastificationStyle.minimal,
        alignment: Alignment.bottomRight,
        title: const Text('Attendance added successfully !'),
        autoCloseDuration: const Duration(seconds: 5),
      );
    } catch (e) {
      toastification.show(
        // ignore: use_build_context_synchronously
        context: context,
        type: ToastificationType.error,
        style: ToastificationStyle.minimal,
        alignment: Alignment.bottomRight,
        title: const Text('Attendance added successfully !'),
        autoCloseDuration: const Duration(seconds: 5),
      );
    }
  }

  List<String> attendance = [];
  @override
  Widget build(BuildContext context) {
    return AppBaseLayout(
      childern: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              widget.className,
              style: AppTypography.headline3(context),
            ),
            const SizedBox(height: 16), // Spacing between components
            Card(
              margin: const EdgeInsets.symmetric(vertical: 2),
              child: FSelectMenuTile(
                groupController: controller,
                autoHide: true,
                validator: (value) =>
                    (value == null || value.isEmpty) ? 'Select an hour' : null,
                prefixIcon: FIcon(FAssets.icons.hourglass),
                title: const Text('Select Hour'),
                details: ListenableBuilder(
                  listenable: controller,
                  builder: (context, _) {
                    final selectedValue = controller.values.firstOrNull;
                    if (selectedValue == null) {
                      return const Text('No hour selected');
                    }
                    return Text('Selected: ${selectedValue.first}th Hour');
                  },
                ),
                menu: List.generate(
                  5,
                  (index) => FSelectTile(
                    title: Text('${index + 1}'),
                    value: {index + 1},
                  ),
                ),
              ),
            ),
            const SizedBox(height: 8),
            !alreadyExist
                ? Card(
                    elevation: 2,
                    child: FTable(
                      tableColumnWidth: const {
                        0: FixedColumnWidth(60),
                        2: FixedColumnWidth(100),
                      },
                      headingList: const [
                        tableHeading(text: "Roll No."),
                        tableHeading(text: "Name"),
                        tableHeading(text: "Action"),
                      ],
                      rowList: studentData.map((student) {
                        return studentTableDataRow(
                          rollno: "${student.id}",
                          name: student.name,
                          onClick: () {
                            if (attendance.contains("${student.id}")) {
                              attendance.remove("${student.id}");
                            } else {
                              attendance.add("${student.id}");
                            }
                          },
                        );
                      }).toList(),
                    ),
                  )
                : Card(
                    elevation: 2,
                    child: FTable(
                      tableColumnWidth: const {
                        0: FixedColumnWidth(60),
                        2: FixedColumnWidth(100),
                        3: FixedColumnWidth(90),
                      },
                      headingList: const [
                        tableHeading(text: "Roll No."),
                        tableHeading(text: "Name"),
                        tableHeading(text: "Action"),
                        tableHeading(text: "")
                      ],
                      rowList: studentData.map((student) {
                        return tableDataRow(list: [
                          tableData(text: "${student.id}"),
                          tableData(text: student.name),
                          tableData(text: student.status ? "P" : "A"),
                          Container(
                            padding: EdgeInsets.all(10),
                            child: FButton(
                              onPress: () {},
                              label: const Text("Edit"),
                              style: FButtonStyle.destructive,
                            ),
                          )
                        ]);
                      }).toList(),
                    ),
                  ),
            const SizedBox(height: 8),
            Center(
              child: FButton(
                  onPress: alreadyExist
                      ? null
                      : () {
                          showAdaptiveDialog(
                            context: context,
                            builder: (context) => FDialog(
                              direction: Axis.horizontal,
                              title: const Text('Are you absolutely sure?'),
                              body: Text(
                                  '${attendance.length} students are absent: ${attendance.join(', ')}'),
                              actions: [
                                FButton(
                                    style: FButtonStyle.outline,
                                    label: const Text('Cancel'),
                                    onPress: () => Navigator.of(context).pop()),
                                FButton(
                                    label: const Text('Continue'),
                                    onPress: () {
                                      addAttendance();
                                    }),
                              ],
                            ),
                          );
                        },
                  label: const Text(
                    "Submit",
                  ),
                  style: FButtonStyle.primary),
            ),
          ],
        ),
      ),
    );
  }
}

TableRow studentTableDataRow(
    {required String rollno,
    required String name,
    required VoidCallback onClick}) {
  return TableRow(
    decoration: const BoxDecoration(
      border: Border(
        bottom: BorderSide(color: Colors.grey),
      ),
    ),
    children: [
      tableData(text: rollno),
      tableData(text: name),
      AttendanceButton(
        onClick: onClick,
      ),
    ],
  );
}

class AttendanceButton extends StatefulWidget {
  final VoidCallback onClick;
  const AttendanceButton({super.key, required this.onClick});

  @override
  State<AttendanceButton> createState() => _AttendanceButtonState();
}

class _AttendanceButtonState extends State<AttendanceButton> {
  bool _status = true;
  @override
  Widget build(BuildContext context) {
    return Tooltip(
        message: _status ? "Present" : "Absent",
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 5),
          child: OutlinedButton.icon(
            onPressed: () {
              setState(() {
                _status = !_status;
              });
              widget.onClick();
            },
            icon: Icon(
              _status ? Icons.check : Icons.close,
              color: _status ? Colors.green : Colors.red,
            ),
            label: Text(
              _status ? "P" : "A",
              style: TextStyle(
                color: _status ? Colors.green : Colors.red,
              ),
            ),
            style: OutlinedButton.styleFrom(
              shape: RoundedRectangleBorder(
                side: BorderSide(
                  color: _status ? Colors.green : Colors.red,
                ),
                borderRadius: BorderRadius.circular(8),
              ),
            ),
          ),
        ));
  }
}
