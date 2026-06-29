import 'package:flutter/material.dart';
import 'screens/login_screen.dart'; // Asegúrate de que este archivo exista en tu carpeta screens
import 'user_model.dart';
import 'user_tree_tile.dart';
import 'network_service.dart';
import 'add_user_screen.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'CRM Royal Prestige',
      theme: ThemeData(
        primarySwatch: Colors.deepPurple,
        useMaterial3: true,
      ),
      // Punto de entrada seguro
      home: const LoginScreen(),
    );
  }
}

// --- NETWORK SCREEN (Tu lógica de red intacta) ---
class NetworkScreen extends StatefulWidget {
  const NetworkScreen({super.key});

  @override
  State<NetworkScreen> createState() => _NetworkScreenState();
}

class _NetworkScreenState extends State<NetworkScreen> {
  late Future<List<User>> _networkFuture;

  @override
  void initState() {
    super.initState();
    _loadNetwork();
  }

  void _loadNetwork() {
    setState(() {
      _networkFuture = NetworkService().getAllRoots();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Red Multinivel"),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _loadNetwork,
          )
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () async {
          final result = await Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => const AddUserScreen(sponsorId: null)),
          );
          if (result == true) _loadNetwork();
        },
        label: const Text("Nuevo Líder Raíz"),
        icon: const Icon(Icons.person_add_alt_1),
      ),
      body: FutureBuilder<List<User>>(
        future: _networkFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text("Error: ${snapshot.error}"));
          } else if (snapshot.hasData) {
            final List<User> roots = snapshot.data!;
            if (roots.isEmpty) {
              return const Center(child: Text("No hay líderes raíz. ¡Crea uno!"));
            }
            return ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: roots.length,
              itemBuilder: (context, index) {
                return UserTreeTile(
                  user: roots[index],
                  onRefresh: _loadNetwork,
                );
              },
            );
          }
          return const Center(child: Text("No se encontraron datos."));
        },
      ),
    );
  }
}