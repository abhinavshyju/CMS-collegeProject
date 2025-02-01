import 'package:app/components/base_layout.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:forui/forui.dart';

const Color inActiveIconColor = Color(0xFFB6B6B6);

class StudentAppBaseLayout extends StatefulWidget {
  final Widget children; // Fixed typo here
  const StudentAppBaseLayout({super.key, required this.children});

  @override
  State<StudentAppBaseLayout> createState() => _StudentAppBaseLayoutState();
}

class _StudentAppBaseLayoutState extends State<StudentAppBaseLayout> {
  int currentSelectedIndex = 0;

  void updateCurrentIndex(int index) {
    setState(() {
      currentSelectedIndex = index;
    });
  }

  // Define your icons and labels here
  List<Map<String, dynamic>> navList = [
    {
      "icon": Icons.home,
      "label": "Home",
    },
    {
      "icon": Icons.table_chart_outlined,
      "label": "attendace",
    },
    {
      "icon": Icons.notifications,
      "label": "Home",
    },
    {
      "icon": Icons.person,
      "label": "Profile",
    },
  ];

  @override
  Widget build(BuildContext context) {
    return FScaffold(
      content: Container(
        padding: const EdgeInsets.fromLTRB(10, 40, 10, 10),
        child: widget.children,
      ),
      footer: Container(
        decoration: const BoxDecoration(
          boxShadow: [
            BoxShadow(
              color: Color.fromRGBO(0, 0, 0, 0.16),
              blurRadius: 4,
              spreadRadius: 0,
              offset: Offset(0, 1),
            ),
          ],
          border: Border(
            top: BorderSide(
              color: Color.fromARGB(150, 162, 162, 162),
            ),
          ),
        ),
        child: BottomNavigationBar(
          elevation: 12,
          backgroundColor: Colors.black,
          onTap: updateCurrentIndex,
          currentIndex: currentSelectedIndex,
          showSelectedLabels: false,
          showUnselectedLabels: false,
          type: BottomNavigationBarType.fixed,
          items: navList.map((e) {
            return BottomNavigationBarItem(
              icon: Icon(
                e['icon'],
                color: Colors.white54,
              ),
              activeIcon: Icon(
                e['icon'],
                color: Colors.white,
              ),
              label: e['label'], // Use label from navList
            );
          }).toList(),
        ),
      ),
    );
  }
}
