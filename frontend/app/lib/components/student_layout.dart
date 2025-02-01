import 'package:app/features/student/route.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:forui/forui.dart';

const Color inActiveIconColor = Color(0xFFB6B6B6);

class StudentAppLayout extends StatefulWidget {
  const StudentAppLayout({super.key});

  @override
  State<StudentAppLayout> createState() => _StudentAppLayoutState();
}

class _StudentAppLayoutState extends State<StudentAppLayout> {
  int currentSelectedIndex = 0;

  void updateCurrentIndex(int index) {
    setState(() {
      currentSelectedIndex = index;
    });
  }

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
        child: studentPages[currentSelectedIndex],
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
