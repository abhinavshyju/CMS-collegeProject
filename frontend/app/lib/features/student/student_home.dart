import 'package:app/components/typography.dart';
import 'package:app/features/student/todays/attendance.dart';
import 'package:flutter/material.dart';
import 'package:forui/forui.dart';
import 'package:shared_preferences/shared_preferences.dart';

class StudentHomeScreen extends StatefulWidget {
  const StudentHomeScreen({super.key});

  @override
  State<StudentHomeScreen> createState() => _StudentHomeScreenState();
}

class _StudentHomeScreenState extends State<StudentHomeScreen> {
  String name = "";
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getData();
  }

  void getData() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      name = prefs.getString("name")!;
    });
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.maxFinite,
      child: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            DynamicGreeting(),
            Text(
              name,
              style: AppTypography.headline2(context),
            ),
            const SizedBox(
              height: 20,
            ),
            FCard(
              title: const Text("Today's Overview"),
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
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      FButton(
                          onPress: () {
                            Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) =>
                                        const TodaysAttendance()));
                          },
                          label: const Text("View all"))
                    ],
                  )
                ],
              ),
            ),
            const SizedBox(
              height: 20,
            ),
            Text(
              "Overview",
              style: AppTypography.headline4(context),
            ),
            SizedBox(
              height: 10,
            ),
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                    child: FCard(
                  title: const Text("Attendance"),
                  subtitle: const Text("First semester "),
                  child: FButton(onPress: () {}, label: const Text("View")),
                )),
                const SizedBox(
                  width: 10,
                ),
                Expanded(
                    child: FCard(
                  title: const Text("Grade"),
                  subtitle: const Text("Your first semester grade"),
                  child: FButton(onPress: () {}, label: const Text("View")),
                ))
              ],
            ),
            Text("Notification", style: AppTypography.headline4(context)),
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                Text(
                  "see all  ",
                ),
              ],
            ),
            SizedBox(
              height: 10,
            ),
            Column(
              children: [
                FCard(
                  title: const Text("Your first semester grade"),
                  subtitle: const Text("Your first semester grade"),
                ),
                SizedBox(
                  height: 10,
                ),
                FCard(
                  title: const Text("Your first semester grade"),
                  subtitle: const Text("Your first semester grade"),
                )
              ],
            )
          ],
        ),
      ),
    );
  }
}

class DynamicGreeting extends StatelessWidget {
  const DynamicGreeting({super.key});

  String getGreeting() {
    final hour = DateTime.now().hour;

    if (hour >= 5 && hour < 12) {
      return "Good morning!";
    } else if (hour >= 12 && hour < 17) {
      return "Good afternoon!";
    } else if (hour >= 17 && hour < 21) {
      return "Good evening!";
    } else {
      return "Good night!";
    }
  }

  @override
  Widget build(BuildContext context) {
    return Text(
      getGreeting(),
      style: AppTypography.headline3(context),
    );
  }
}
