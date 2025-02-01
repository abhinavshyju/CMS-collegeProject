import 'package:app/components/typography.dart';
import 'package:flutter/material.dart';
import 'package:forui/forui.dart';

class NotificationPage extends StatefulWidget {
  const NotificationPage({super.key});

  @override
  State<NotificationPage> createState() => _NotificationPageState();
}

class _NotificationPageState extends State<NotificationPage> {
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Container(
        width: double.maxFinite,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text("Notification", style: AppTypography.headline2(context)),
            SizedBox(
              height: 20,
            ),
            ...List.generate(30, (index) {
              return Column(
                children: [
                  FCard(
                    title: const Text("Notification "),
                    child: Row(
                      children: [
                        Spacer(),
                        FButton(onPress: () {}, label: Text("View"))
                      ],
                    ),
                  ),
                  SizedBox(
                    height: 10,
                  )
                ],
              );
            })
          ],
        ),
      ),
    );
  }
}
