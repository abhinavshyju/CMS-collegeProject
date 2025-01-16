import 'package:app/components/faculty_layout.dart';
import 'package:app/sequlizer/Auth.dart';
import 'package:app/service/request.dart';
import 'package:flutter/material.dart';
import 'package:forui/forui.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SignInScreen extends StatefulWidget {
  const SignInScreen({super.key});

  @override
  // ignore: library_private_types_in_public_api
  _SignInScreenState createState() => _SignInScreenState();
}

class _SignInScreenState extends State<SignInScreen> {
  final _formKey = GlobalKey<FormState>();
  final _usernameController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _obscureText = true;
  void getRole() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    final role = pref.getString("role");
    print(role);
    if (role == "faculty") {
      Navigator.pop(context);
      Navigator.push(
          // ignore: use_build_context_synchronously
          context,
          MaterialPageRoute(builder: (context) => const FacultyAppLayout()));
    }
  }

  @override
  void initState() {
    getRole();
    super.initState();
  }

  @override
  void dispose() {
    _usernameController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  String? _validateUsername(String? value) {
    if (value == null || value.isEmpty) {
      return 'Please enter your username';
    }
    return null;
  }

  String? _validatePassword(String? value) {
    if (value == null || value.isEmpty) {
      return 'Please enter your password';
    }
    return null;
  }

  void _togglePasswordVisibility() {
    setState(() {
      _obscureText = !_obscureText;
    });
  }

  void _submitForm() async {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();
      try {
        final response = await makePostRequest("/auth/app-login", body: {
          "username": _usernameController.text,
          "password": _passwordController.text
        });
        SharedPreferences pref = await SharedPreferences.getInstance();
        Auth authData = Auth.fromRawJson(response);
        await pref.setString("name", authData.data.name);
        await pref.setString("role", authData.data.role);
        await pref.setInt("id", authData.data.id);
        await pref.setString("token", authData.data.token);
        if (authData.data.role == "faculty") {
          Navigator.push(
              // ignore: use_build_context_synchronously
              context,
              MaterialPageRoute(
                  builder: (context) => const FacultyAppLayout()));
        }
      } catch (e) {
        print(e);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: LayoutBuilder(
          builder: (context, constraints) {
            return SingleChildScrollView(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: Column(
                children: [
                  SizedBox(height: constraints.maxHeight * 0.1),
                  // Image.network(
                  //   "https://i.postimg.cc/nz0YBQcH/Logo-light.png",
                  //   height: 100,
                  // ),
                  SizedBox(height: constraints.maxHeight * 0.1),
                  Text(
                    "Sign In",
                    style: Theme.of(context)
                        .textTheme
                        .headlineSmall!
                        .copyWith(fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: constraints.maxHeight * 0.05),
                  Form(
                    key: _formKey,
                    child: Column(
                      children: [
                        TextFormField(
                          controller: _usernameController,
                          decoration: const InputDecoration(
                            hintText: 'Username',
                            filled: true,
                            fillColor: Color(0xFFF5FCF9),
                            contentPadding: EdgeInsets.symmetric(
                                horizontal: 16.0 * 1.5, vertical: 16.0),
                            border: OutlineInputBorder(
                              borderSide: BorderSide.none,
                              borderRadius:
                                  BorderRadius.all(Radius.circular(20)),
                            ),
                          ),
                          keyboardType: TextInputType.text,
                          validator: _validateUsername,
                        ),
                        Padding(
                          padding: const EdgeInsets.symmetric(vertical: 16.0),
                          child: TextFormField(
                            controller: _passwordController,
                            obscureText: _obscureText,
                            validator: _validatePassword,
                            decoration: InputDecoration(
                              hintText: 'Password',
                              filled: true,
                              fillColor: const Color(0xFFF5FCF9),
                              contentPadding: const EdgeInsets.symmetric(
                                  horizontal: 16.0 * 1.5, vertical: 16.0),
                              border: const OutlineInputBorder(
                                borderSide: BorderSide.none,
                                borderRadius:
                                    BorderRadius.all(Radius.circular(20)),
                              ),
                              suffixIcon: IconButton(
                                icon: Icon(
                                  _obscureText
                                      ? Icons.visibility_off
                                      : Icons.visibility,
                                  color: Colors.grey,
                                ),
                                onPressed: _togglePasswordVisibility,
                              ),
                            ),
                          ),
                        ),
                        FButton(
                            onPress: _submitForm, label: const Text("Sign in")),
                        const SizedBox(height: 16.0),
                      ],
                    ),
                  ),
                ],
              ),
            );
          },
        ),
      ),
    );
  }
}
