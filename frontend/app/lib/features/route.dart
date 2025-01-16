import 'package:app/features/faculty/class_listing.dart';
import 'package:app/features/faculty/faculty_home.dart';
import 'package:flutter/material.dart';

final pages = [
  const Center(child: FacultyHomeScreen()),
  const Center(
    child: Text("Fav"),
  ),
  const ClassListingScreen(),
  const Center(
    child: Text("Profile"),
  ),
];
