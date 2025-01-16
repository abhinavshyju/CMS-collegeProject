import 'dart:convert';

class AttendanceStudents {
  String message;
  List<Datum> data;
  bool alredyPresent;

  AttendanceStudents({
    required this.message,
    required this.data,
    required this.alredyPresent,
  });

  factory AttendanceStudents.fromRawJson(String str) =>
      AttendanceStudents.fromJson(json.decode(str));

  String toRawJson() => json.encode(toJson());

  factory AttendanceStudents.fromJson(Map<String, dynamic> json) =>
      AttendanceStudents(
        message: json["message"],
        data: List<Datum>.from(json["data"].map((x) => Datum.fromJson(x))),
        alredyPresent: json["alredyPresent"],
      );

  Map<String, dynamic> toJson() => {
        "message": message,
        "data": List<dynamic>.from(data.map((x) => x.toJson())),
        "alredyPresent": alredyPresent,
      };
}

class Datum {
  int id;
  String name;
  bool status;

  Datum({
    required this.id,
    required this.name,
    required this.status,
  });

  factory Datum.fromRawJson(String str) => Datum.fromJson(json.decode(str));

  String toRawJson() => json.encode(toJson());

  factory Datum.fromJson(Map<String, dynamic> json) => Datum(
        id: json["id"],
        name: json["name"],
        status: json["status"],
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "name": name,
        "status": status,
      };
}
