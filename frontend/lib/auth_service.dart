import 'dart:convert';
import 'package:http/http.dart' as http;

class AuthService {
  // CORRECCIÓN: Si corres en Windows, usa 'localhost'. 
  // Si tu backend falla con localhost, usa la IP local de tu PC (ej: 192.168.1.XX)
  final String _baseUrl = "http://192.168.1.6:3000"; // Solo la raíz del servidor

  Future<bool> login(String email, String password) async {
    try {
      print("Intentando conectar a: $_baseUrl/auth/login");
      
      final response = await http.post(
        Uri.parse('$_baseUrl/auth/login'),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: jsonEncode({
          'email': email.trim(),
          'password': password,
        }),
      ).timeout(const Duration(seconds: 10)); // Timeout para evitar bloqueos

      print("Respuesta recibida: ${response.statusCode} - ${response.body}");

      if (response.statusCode == 200 || response.statusCode == 201) {
        return true;
      } else {
        print("Error de servidor: ${response.statusCode}");
        return false;
      }
    } catch (e) {
      print("Error crítico de conexión: $e");
      return false;
    }
  }

  Future<void> logout() async {
    // Lógica futura de cierre de sesión
  }
}