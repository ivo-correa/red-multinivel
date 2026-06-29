import 'dart:convert';
import 'package:flutter/foundation.dart'; // Para debugPrint
import 'package:http/http.dart' as http;
import 'user_model.dart';

class NetworkService {
  // Asegúrate de que esta IP sea accesible desde tu dispositivo
  final String baseUrl = "http://192.168.1.6:3000";

  Future<void> createUser(Map<String, dynamic> userData) async {
    try {
      final response = await http.post(
        Uri.parse("$baseUrl/users"),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode(userData),
      );

      if (response.statusCode >= 200 && response.statusCode < 300) {
        return;
      } else {
        throw Exception("Error ${response.statusCode}: ${response.body}");
      }
    } catch (e) {
      throw Exception("Error de conexión: $e");
    }
  }

  Future<void> createRootUser(Map<String, dynamic> rootData) async {
    try {
      final response = await http.post(
        Uri.parse("$baseUrl/users/register-root"),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode(rootData),
      );

      if (response.statusCode >= 200 && response.statusCode < 300) {
        return;
      } else {
        throw Exception("Error ${response.statusCode}: ${response.body}");
      }
    } catch (e) {
      throw Exception("Error de conexión: $e");
    }
  }

  /// NUEVO: Método para obtener la red de un usuario específico usando su ID
  /// Este método conecta con la ruta @Get('network/:id') del backend
  Future<User> getChildren(int userId) async {
    final response = await http.get(Uri.parse("$baseUrl/users/network/$userId"));
    if (response.statusCode == 200) {
      return User.fromJson(jsonDecode(response.body));
    } else {
      throw Exception("No se pudo cargar la red del usuario: ${response.statusCode}");
    }
  }

  /// Obtiene un usuario específico con toda su jerarquía cargada
  Future<User> getNetwork(int id) async {
    final response = await http.get(Uri.parse("$baseUrl/users/$id/network"));
    if (response.statusCode == 200) {
      return User.fromJson(jsonDecode(response.body));
    } else {
      throw Exception("No se pudo cargar la red del usuario: ${response.statusCode}");
    }
  }

  /// Obtiene los usuarios raíz. 
  Future<List<User>> getAllRoots() async {
    try {
      final response = await http.get(Uri.parse("$baseUrl/users/roots"));
      
      if (response.statusCode == 200) {
        final List<dynamic> body = jsonDecode(response.body);
        return body.map((item) => User.fromJson(item)).toList();
      } else {
        throw Exception("Error del servidor: ${response.statusCode}");
      }
    } catch (e) {
      debugPrint("Error crítico en getAllRoots: $e");
      rethrow;
    }
  }
}