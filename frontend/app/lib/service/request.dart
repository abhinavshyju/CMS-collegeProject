import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

// ignore: constant_identifier_names
const String URL = "http://192.168.1.4:3000";

/// A reusable function for making GET requests
Future<dynamic> makeGetRequest(String url,
    {Map<String, String>? headers}) async {
  try {
    SharedPreferences pref = await SharedPreferences.getInstance();
    final token = pref.getString("token");
    final id = pref.getInt("id");
    final response = await http.get(
      Uri.parse(URL + url),
      headers: headers ??
          {
            'Content-Type': 'application/json',
            "token": token!,
            "id": id.toString()
          },
    );
    if (response.statusCode == 200) {
      return response.body;
    } else {
      throw Exception('Failed to fetch data: ${response.statusCode}');
    }
  } catch (e) {
    throw Exception('Error occurred during GET request: $e');
  }
}

/// A reusable function for making POST requests
Future<dynamic> makePostRequest(
  String url, {
  Map<String, String>? headers,
  Map<String, dynamic>? body,
}) async {
  try {
    SharedPreferences pref = await SharedPreferences.getInstance();
    final token = pref.getString("token");
    final id = pref.getInt("id");
    final response = await http.post(
      Uri.parse(URL + url),
      headers: headers ??
          {
            'Content-Type': 'application/json',
            "token": token!,
            "id": id.toString()
          },
      body: body != null ? jsonEncode(body) : null,
    );
    if (response.statusCode == 200 || response.statusCode == 201) {
      return response.body;
    } else {
      throw Exception('Failed to post data: ${response.statusCode}');
    }
  } catch (e) {
    throw Exception('Error occurred during POST request: $e');
  }
}
