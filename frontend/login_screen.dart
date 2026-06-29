import 'package:flutter/material.dart';
import 'login_screen.dart'; // Asegúrate de que login_screen.dart esté en la misma carpeta

void main() {
  runApp(const RedMultinivelProApp());
}

class RedMultinivelProApp extends StatelessWidget {
  const RedMultinivelProApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'RedMultinivel Pro',
      theme: ThemeData(
        brightness: Brightness.dark,
        primarySwatch: Colors.teal,
        scaffoldBackgroundColor: const Color(0xFF020617),
      ),
      // Aquí establecemos el LoginScreen como la pantalla de inicio
      home: const LoginScreen(),
    );
  }
}