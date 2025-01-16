import 'dart:convert';

class Classes {
  String message;
  List<Datum> data;

  Classes({
    required this.message,
    required this.data,
  });

  factory Classes.fromRawJson(String str) => Classes.fromJson(json.decode(str));

  String toRawJson() => json.encode(toJson());

  factory Classes.fromJson(Map<String, dynamic> json) => Classes(
        message: json["message"],
        data: List<Datum>.from(json["data"].map((x) => Datum.fromJson(x))),
      );

  Map<String, dynamic> toJson() => {
        "message": message,
        "data": List<dynamic>.from(data.map((x) => x.toJson())),
      };
}

class Datum {
  String classTitle;
  String datumClass;
  int id;
  String department;
  DateTime admissionYear;
  bool active;

  Datum({
    required this.classTitle,
    required this.datumClass,
    required this.id,
    required this.department,
    required this.admissionYear,
    required this.active,
  });

  factory Datum.fromRawJson(String str) => Datum.fromJson(json.decode(str));

  String toRawJson() => json.encode(toJson());

  factory Datum.fromJson(Map<String, dynamic> json) => Datum(
        classTitle: json["classTitle"],
        datumClass: json["class"],
        id: json["id"],
        department: json["department"],
        admissionYear: DateTime.parse(json["admissionYear"]),
        active: json["active"],
      );

  Map<String, dynamic> toJson() => {
        "classTitle": classTitle,
        "class": datumClass,
        "id": id,
        "department": department,
        "admissionYear":
            "${admissionYear.year.toString().padLeft(4, '0')}-${admissionYear.month.toString().padLeft(2, '0')}-${admissionYear.day.toString().padLeft(2, '0')}",
        "active": active,
      };
}
