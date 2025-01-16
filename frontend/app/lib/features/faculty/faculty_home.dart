import 'package:app/components/typography.dart';
import 'package:flutter/material.dart';
import 'package:forui/forui.dart';
import 'package:shared_preferences/shared_preferences.dart';

class FacultyHomeScreen extends StatefulWidget {
  const FacultyHomeScreen({super.key});

  @override
  State<FacultyHomeScreen> createState() => _FacultyHomeScreenState();
}

class _FacultyHomeScreenState extends State<FacultyHomeScreen> {
  String name = "";
  void getName() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    setState(() {
      name = pref.getString("name")!;
    });
    print(name);
  }

  @override
  void initState() {
    getName();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          "Welcome, $name",
          style: AppTypography.headline2(context),
        ),
        const SizedBox(
          height: 30,
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
                children: [Text("Classes"), Text("3/5")],
              ),
              const SizedBox(
                height: 10,
              ),
              FProgress(value: .5)
            ],
          ),
        ),
        const SizedBox(
          height: 10,
        ),
        Text(
          "Upcoming Classes",
          style: AppTypography.headline3(context),
        ),
        const SizedBox(
          height: 10,
        ),
        FCard(
          // title: Text("Data structure"),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "Data structure",
                    style: AppTypography.headline4(context),
                  ),
                  Text(
                    "10 AM",
                    style: AppTypography.subtitle1(context),
                  ),
                ],
              ),
              FButton(onPress: () {}, label: const Text("Upcoming"))
            ],
          ),
        )
      ],
    );
  }
}
