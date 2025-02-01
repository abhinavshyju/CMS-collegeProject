import 'package:app/features/auth/login_screen.dart';
import 'package:flutter/material.dart';
import 'package:forui/forui.dart';
import 'package:shared_preferences/shared_preferences.dart';

class StundetProfile extends StatefulWidget {
  const StundetProfile({super.key});

  @override
  State<StundetProfile> createState() => _StundetProfileState();
}

class _StundetProfileState extends State<StundetProfile> {
  @override
  Widget build(BuildContext context) {
    return FScaffold(
        header: FHeader(
          title: Text("Profile"),
          actions: [
            FButton.icon(
              onPress: () async {
                Navigator.pop(context);
                SharedPreferences pref = await SharedPreferences.getInstance();
                await pref.clear();
                Navigator.push(context,
                    MaterialPageRoute(builder: (context) => SignInScreen()));
              },
              child: const Icon(
                Icons.logout,
                color: Colors.white,
              ),
            )
          ],
        ),
        content: Container(
          child: Text("Profile"),
        ));
  }
}
