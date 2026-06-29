import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class AddUserScreen extends StatefulWidget {
  const AddUserScreen({super.key});

  @override
  State<AddUserScreen> createState() => _AddUserScreenState();
}

class _AddUserScreenState extends State<AddUserScreen> {
  // Controladores para cada campo
  final TextEditingController _nombreController = TextEditingController();
  final TextEditingController _identificacionController = TextEditingController();
  final TextEditingController _direccionController = TextEditingController();
  final TextEditingController _paisController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  Future<void> _guardarUsuario() async {
    // Aquí defines la URL de tu API de registro
    final url = Uri.parse('http://192.168.1.6:3000/auth/register'); 

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
  'nombre': _nombreController.text.trim(),
  'numeroIdentificacion': _identificacionController.text.trim(), // ¿Es 'numeroIdentificacion'?
  'direccionResidencia': _direccionController.text.trim(),    // ¿Es 'direccionResidencia'?
  'paisResidencia': _paisController.text.trim(),              // ¿Es 'paisResidencia'?
  'email': _emailController.text.trim(),
  'password': _passwordController.text,
}),
      );

      if (response.statusCode == 201 || response.statusCode == 200) {
        if (!mounted) return;
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text("Usuario guardado con éxito")),
        );
        // Regresa al Login
        Navigator.pop(context);
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text("Error al guardar: ${response.body}")),
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Error de conexión: $e")),
      );
    }
  }

  Widget _buildTextField(TextEditingController controller, String label, {bool obscure = false}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 15.0),
      child: TextField(
        controller: controller,
        obscureText: obscure,
        decoration: InputDecoration(labelText: label, border: const OutlineInputBorder()),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Registro de Usuario")),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: SingleChildScrollView(
          child: Column(
            children: [
              _buildTextField(_nombreController, "Nombre completo"),
              _buildTextField(_identificacionController, "Número de identificación"),
              _buildTextField(_direccionController, "Dirección de residencia"),
              _buildTextField(_paisController, "País de residencia"),
              _buildTextField(_emailController, "Correo electrónico"),
              _buildTextField(_passwordController, "Contraseña", obscure: true),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: _guardarUsuario,
                style: ElevatedButton.styleFrom(
                  minimumSize: const Size(double.infinity, 50),
                  backgroundColor: const Color(0xFF0D47A1),
                ),
                child: const Text("Guardar", style: TextStyle(color: Colors.white, fontSize: 18)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}