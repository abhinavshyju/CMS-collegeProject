import 'dart:convert';

class Auth {
  String message;
  Data data;

  Auth({
    required this.message,
    required this.data,
  });

  factory Auth.fromRawJson(String str) => Auth.fromJson(json.decode(str));

  String toRawJson() => json.encode(toJson());

  factory Auth.fromJson(Map<String, dynamic> json) => Auth(
        message: json["message"],
        data: Data.fromJson(json["data"]),
      );

  Map<String, dynamic> toJson() => {
        "message": message,
        "data": data.toJson(),
      };
}

class Data {
  String name;
  int id;
  String role;
  String token;

  Data({
    required this.name,
    required this.id,
    required this.role,
    required this.token,
  });

  factory Data.fromRawJson(String str) => Data.fromJson(json.decode(str));

  String toRawJson() => json.encode(toJson());

  factory Data.fromJson(Map<String, dynamic> json) => Data(
        name: json["name"],
        id: json["id"],
        role: json["role"],
        token: json["token"],
      );

  Map<String, dynamic> toJson() => {
        "name": name,
        "id": id,
        "role": role,
        "token": token,
      };
}
