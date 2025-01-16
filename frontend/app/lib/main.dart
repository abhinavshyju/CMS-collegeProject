import 'package:app/features/auth/login_screen.dart';
import 'package:app/features/layout.dart';
import 'package:flutter/material.dart';
import 'package:forui/forui.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) => MaterialApp(
      builder: (context, child) => FTheme(
            data: FThemes.zinc.light,
            child: child!,
          ),
      // home: const AppLayout());
      home: const SignInScreen());
}
