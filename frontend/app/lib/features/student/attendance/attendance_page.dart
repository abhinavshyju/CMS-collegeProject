import 'package:app/components/typography.dart';
import 'package:app/features/student/attendance/day_overview.dart';
import 'package:flutter/material.dart';
import 'package:forui/forui.dart';

class AttendancePage extends StatefulWidget {
  const AttendancePage({super.key});

  @override
  State<AttendancePage> createState() => _AttendancePageState();
}

class _AttendancePageState extends State<AttendancePage> {
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: SizedBox(
        width: double.maxFinite,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "Attendance",
              style: AppTypography.headline2(context),
            ),
            SizedBox(height: 20),
            FButton(
                onPress: () async {
                  final now = DateTime.now();
                  final selectedDate = await showDatePicker(
                    context: context,
                    firstDate: DateTime(now.year - 1),
                    lastDate: DateTime(now.year + 1),
                    initialDate: now,
                  );
                  if (selectedDate != null) {
                    print("Selected date: $selectedDate");
                  }
                },
                label: const Text("Select Date")),
            const SizedBox(
              height: 30,
            ),
            ...List.generate(
                5,
                (index) => Column(
                      children: [
                        FCard(
                          title: Text("Monday"),
                          subtitle: Text("15/02/2024"),
                          child: Column(
                            children: [
                              SizedBox(
                                height: 5,
                              ),
                              Row(
                                children: [
                                  Text("Full day"),
                                  Spacer(),
                                  TextButton(
                                      onPressed: () {
                                        Navigator.push(
                                            context,
                                            MaterialPageRoute(
                                                builder: (context) =>
                                                    DayOverViewPage()));
                                      },
                                      child: Text(
                                        "View More",
                                        style: AppTypography.bodyText1(context),
                                      ))
                                ],
                              ),
                              SizedBox(
                                height: 5,
                              ),
                              FProgress(value: .7),
                              Row(children: [Spacer(), Text("3/5")])
                            ],
                          ),
                        ),
                        SizedBox(
                          height: 10,
                        )
                      ],
                    )),
          ],
        ),
      ),
    );
  }
}
