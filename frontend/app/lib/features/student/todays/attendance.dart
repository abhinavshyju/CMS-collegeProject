import 'package:app/components/student_base_layout.dart';
import 'package:app/components/typography.dart';
import 'package:flutter/material.dart';
import 'package:forui/forui.dart';

class TodaysAttendance extends StatefulWidget {
  const TodaysAttendance({super.key});

  @override
  State<TodaysAttendance> createState() => _TodaysAttendanceState();
}

class _TodaysAttendanceState extends State<TodaysAttendance> {
  @override
  Widget build(BuildContext context) {
    return StudentAppBaseLayout(
        children: Container(
      width: double.maxFinite,
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(
          "Today'Overview",
          style: AppTypography.headline2(context),
        ),
        const SizedBox(
          height: 20,
        ),
        FCard(
          title: const Text("Overview"),
          child: Column(
            children: [
              const SizedBox(
                height: 20,
              ),
              const Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [Text("Attendance"), Text("3/5")],
              ),
              const SizedBox(
                height: 10,
              ),
              FProgress(value: .5),
              const SizedBox(
                height: 10,
              ),
            ],
          ),
        ),
        SizedBox(
          height: 20,
        ),
        Text("Today's Attendance", style: AppTypography.headline3(context)),
        SizedBox(
          height: 20,
        ),
        FCard(
          title: const Text("First hour"),
          child: Row(
            children: [
              Text("Hridhya"),
              const Spacer(),
              Container(
                padding: EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(5),
                  color: Colors.green,
                ),
                child: Text("Present"),
              )
            ],
          ),
        ),
        SizedBox(
          height: 10,
        ),
        FCard(
          title: const Text("Second hour"),
          child: Row(
            children: [
              Text("Mishna"),
              const Spacer(),
              Container(
                padding: EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(5),
                  color: Colors.red,
                ),
                child: Text("Absent"),
              )
            ],
          ),
        )
      ]),
    ));
  }
}
