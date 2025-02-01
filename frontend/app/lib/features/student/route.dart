import 'package:app/features/faculty/class_listing.dart';
import 'package:app/features/faculty/faculty_home.dart';
import 'package:app/features/student/attendance/attendance_page.dart';
import 'package:app/features/student/notification/notifiaction.dart';
import 'package:app/features/student/profile/student_profile.dart';
import 'package:app/features/student/student_home.dart';
import 'package:flutter/material.dart';

final studentPages = [
  const Center(child: StudentHomeScreen()),
  const AttendancePage(),
  const NotificationPage(),
  const StundetProfile(),
];
