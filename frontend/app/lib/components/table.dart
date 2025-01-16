// ignore_for_file: camel_case_types

import 'package:flutter/material.dart';

const Color gary = Color.fromARGB(121, 75, 75, 75);

// ignore: duplicate_ignore
// ignore: camel_case_types
class FTable extends StatelessWidget {
  final List<Widget> headingList;
  final List<TableRow> rowList;
  final Map<int, TableColumnWidth>? tableColumnWidth;
  const FTable(
      {super.key,
      required this.headingList,
      required this.rowList,
      this.tableColumnWidth});

  @override
  Widget build(BuildContext context) {
    return Container(
      // decoration: BoxDecoration(color: Theme.of(context)., ),
      decoration: const BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.all(Radius.circular(5)),
          boxShadow: [
            BoxShadow(
              color: Color.fromRGBO(0, 0, 0, 0.16),
              blurRadius: 4,
              spreadRadius: 0,
              offset: Offset(
                0,
                1,
              ),
            ),
          ]),
      child: Table(
        columnWidths: tableColumnWidth,
        // border: TableBorder.all(),
        children: [
          tableHeadingRow(list: headingList),
          ...rowList,
          TableRow(
              decoration: const BoxDecoration(
                  color: Color.fromARGB(21, 0, 0, 0),
                  borderRadius: BorderRadius.only(
                      bottomLeft: Radius.circular(5),
                      bottomRight: Radius.circular(5))),
              children: List.generate(
                headingList.length,
                (index) {
                  return const SizedBox(
                    height: 30,
                  );
                },
              ))
        ],
      ),
    );
  }
}

TableRow tableHeadingRow({required List<Widget> list}) {
  return TableRow(
      decoration: const BoxDecoration(
        border: Border(bottom: BorderSide(color: gary)),
      ),
      children: list);
}

TableRow tableDataRow({required List<Widget> list}) {
  return TableRow(
      decoration:
          const BoxDecoration(border: Border(bottom: BorderSide(color: gary))
              // color: Color.fromRGBO(126, 74, 74, 1),
              ),
      children: list);
}

class tableHeading extends StatelessWidget {
  final bool? center;
  final String text;
  const tableHeading({super.key, this.center = false, required this.text});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 10),
      width: double.maxFinite,
      alignment: (center ?? false) ? Alignment.center : Alignment.centerLeft,
      decoration: const BoxDecoration(),
      child: Text(
        text,
        style: const TextStyle(fontWeight: FontWeight.bold),
      ),
    );
  }
}

class tableData extends StatelessWidget {
  final bool? center;
  final String text;
  const tableData({super.key, this.center = false, required this.text});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 10),
      width: double.maxFinite,
      alignment: (center ?? false) ? Alignment.center : Alignment.centerLeft,
      decoration: const BoxDecoration(),
      child: Text(text),
    );
  }
}
