import 'package:flutter/material.dart';
import '../user_model.dart';
import 'add_user_screen.dart';

class UserTreeTile extends StatelessWidget {
  final User user;
  final VoidCallback onRefresh;

  const UserTreeTile({super.key, required this.user, required this.onRefresh});

  Future<void> _irAAddUser(BuildContext context) async {
    final result = await Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => AddUserScreen(sponsorId: user.id)),
    );
    if (result == true) onRefresh();
  }

  @override
  Widget build(BuildContext context) {
    if (user.children.isNotEmpty) {
      return ExpansionTile(
        leading: const Icon(Icons.group, color: Colors.blue),
        title: Row(
          children: [
            Expanded(
              child: Text(
                "${user.nombre} (${user.children.length})", 
                style: const TextStyle(fontWeight: FontWeight.bold)
              ),
            ),
            // El botón de agregar envuelto para que no bloquee el ExpansionTile
            IconButton(
              icon: const Icon(Icons.person_add, color: Colors.green),
              onPressed: () => _irAAddUser(context),
            ),
          ],
        ),
        subtitle: Text(user.email, style: const TextStyle(fontSize: 12)),
        childrenPadding: const EdgeInsets.only(left: 30),
        children: user.children.map((child) => UserTreeTile(
          user: child,
          onRefresh: onRefresh,
        )).toList(),
      );
    }

    return ListTile(
      leading: const Icon(Icons.person_outline, color: Colors.grey),
      title: Text(user.nombre),
      subtitle: Text(user.email),
      trailing: IconButton(
        icon: const Icon(Icons.person_add, color: Colors.green),
        onPressed: () => _irAAddUser(context),
      ),
    );
  }
}