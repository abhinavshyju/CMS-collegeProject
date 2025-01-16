import 'package:app/components/typography.dart';
import 'package:app/features/faculty/class/attendance_add.dart';
import 'package:app/sequlizer/classes.dart';
import 'package:app/service/request.dart';
import 'package:flutter/material.dart';
import 'package:forui/forui.dart';
import 'package:toastification/toastification.dart';

class ClassListingScreen extends StatefulWidget {
  const ClassListingScreen({super.key});

  @override
  State<ClassListingScreen> createState() => _ClassListingScreenState();
}

class _ClassListingScreenState extends State<ClassListingScreen> {
  List<Datum> _classesData = [];
  void getClass() async {
    try {
      final response = await makeGetRequest("/class");

      Classes classesData = Classes.fromRawJson(response);
      setState(() {
        _classesData = classesData.data;
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

  @override
  void initState() {
    getClass();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              "Classes",
              style: AppTypography.headline2(context),
            ),
          ],
        ),
        const SizedBox(height: 20), // Add some spacing
        Expanded(
          child: _classesData.isEmpty
              ? const Center(child: CircularProgressIndicator())
              : ListView(
                  children: _classesData.map((item) {
                    return Column(
                      children: [
                        FCard(
                          title: Text(item.datumClass),
                          subtitle: Text(item.classTitle),
                          child: Row(
                            children: [
                              FButton(
                                  onPress: () {}, label: const Text("View")),
                              const SizedBox(width: 10),
                              FButton(
                                  onPress: () {
                                    Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                            builder: (context) =>
                                                AddAttendanceScreen(
                                                    classId: "${item.id}",
                                                    className:
                                                        item.classTitle)));
                                  },
                                  label: const Text("Add Attendance")),
                            ],
                          ),
                        ),
                        const SizedBox(
                          height: 10,
                        )
                      ],
                    );
                  }).toList(),
                ),
        ),
      ],
    );
  }
}
