import 'package:flutter/material.dart';
import '../user_model.dart';
import 'add_user_screen.dart';

class UserTreeTile extends StatelessWidget {
  final User user;

  const UserTreeTile({super.key, required this.user});

  @override
  Widget build(BuildContext context) {
    // Definimos el botón con un Material envolvente para asegurar el toque
    final addIcon = Material(
      color: Colors.transparent,
      child: IconButton(
        icon: const Icon(Icons.person_add, color: Colors.green),
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => AddUserScreen(sponsorId: user.id),
            ),
          );
        },
      ),
    );

    // Título con Row, asegurando que no se expanda innecesariamente
    final titleWidget = Row(
      children: [
        Expanded(
          child: Text(
            user.nombre,
            overflow: TextOverflow.ellipsis,
          ),
        ),
        addIcon,
      ],
    );

    if (user.children.isEmpty) {
      return ListTile(
        leading: const Icon(Icons.person),
        title: titleWidget,
        subtitle: Text(user.email),
      );
    }

    return ExpansionTile(
      leading: const Icon(Icons.group, color: Colors.blue),
      title: titleWidget,
      subtitle: Text("${user.children.length} referidos"),
      children: user.children.map((child) => UserTreeTile(user: child)).toList(),
    );
  }
}