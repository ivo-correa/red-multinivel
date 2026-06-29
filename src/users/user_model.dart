import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/foundation.dart';

class User {
  final int id;
  final String nombre;
  final String email;
  
  // Nuevos campos opcionales
  final String? numeroIdentificacion;
  final String? direccionResidencia;
  final String? paisResidencia;
  final String? telefono;
  final String? ciudad;
  final String? relacionCliente;
  final String? trabaja;
  final String? tipoOcupacion;
  final String? conoceRoyalPrestige;
  final String? agendado;
  final String? fechaAgenda;
  final String? visitado;
  final String? fechaVisita;
  final String? realizoCompra;
  final double? valorCompra;
  final String? notasAdicionales;
  
  final List<User> children;

  User({
    required this.id,
    required this.nombre,
    required this.email,
    this.numeroIdentificacion,
    this.direccionResidencia,
    this.paisResidencia,
    this.telefono,
    this.ciudad,
    this.relacionCliente,
    this.trabaja,
    this.tipoOcupacion,
    this.conoceRoyalPrestige,
    this.agendado,
    this.fechaAgenda,
    this.visitado,
    this.fechaVisita,
    this.realizoCompra,
    this.valorCompra,
    this.notasAdicionales,
    required this.children,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    var list = json['children'] as List? ?? [];
    List<User> childrenList = list.map((i) => User.fromJson(i)).toList();
    
    // Función auxiliar para convertir a double de forma segura
    double? parseDouble(dynamic value) {
      if (value == null) return null;
      if (value is double) return value;
      if (value is int) return value.toDouble();
      return double.tryParse(value.toString());
    }
    
    return User(
      id: json['id'] ?? 0,
      nombre: json['nombre'] ?? 'Sin nombre',
      email: json['email'] ?? '',
      numeroIdentificacion: json['numeroIdentificacion'],
      direccionResidencia: json['direccionResidencia'],
      paisResidencia: json['paisResidencia'],
      telefono: json['telefono'],
      ciudad: json['ciudad'],
      relacionCliente: json['relacionCliente'],
      trabaja: json['trabaja'],
      tipoOcupacion: json['tipoOcupacion'],
      conoceRoyalPrestige: json['conoceRoyalPrestige'],
      agendado: json['agendado'],
      fechaAgenda: json['fechaAgenda'],
      visitado: json['visitado'],
      fechaVisita: json['fechaVisita'],
      realizoCompra: json['realizoCompra'],
      valorCompra: parseDouble(json['valorCompra']),
      notasAdicionales: json['notasAdicionales'],
      children: childrenList,
    );
  }
}