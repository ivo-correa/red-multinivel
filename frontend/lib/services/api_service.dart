import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  // Esta es la variable que cambiaremos cuando migremos a la nube
  static const String baseUrl = 'http://192.168.1.6:3000';

  // --- Lógica de Login ---
  static Future<Map<String, dynamic>> login(String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}),
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Error en el login: ${response.statusCode}');
    }
  }

  // --- Lógica de Registro ---
  static Future<void> registrarUsuario(Map<String, dynamic> datos) async {
    final response = await http.post(
      Uri.parse('$baseUrl/auth/register'),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode(datos),
    );

    if (response.statusCode != 201 && response.statusCode != 200) {
      throw Exception('Error al registrar: ${response.body}');
    }
  }
}