// lib/user_model.dart

class User {
  final int id;
  final String nombre;
  final String email;
  final List<User> children;

  User({
    required this.id, 
    required this.nombre, 
    required this.email, 
    required this.children
  });

  // Factoría para convertir el JSON del servidor en un objeto User
  factory User.fromJson(Map<String, dynamic> json) {
    // Si 'children' es null, asignamos una lista vacía
    var list = json['children'] as List? ?? [];
    
    // Mapeamos recursivamente cada hijo
    List<User> childrenList = list.map((i) => User.fromJson(i)).toList();
    
    return User(
      id: json['id'],
      nombre: json['nombre'],
      email: json['email'],
      children: childrenList,
    );
  }
}