import 'package:flutter/material.dart';
import '../user_model.dart';
import '../user_tree_tile.dart';
import '../network_service.dart';

class NetworkScreen extends StatefulWidget {
  final int userId; 

  const NetworkScreen({Key? key, required this.userId}) : super(key: key);

  @override
  _NetworkScreenState createState() => _NetworkScreenState();
}

class _NetworkScreenState extends State<NetworkScreen> {
  late Future<User> _networkFuture; 

  @override
  void initState() {
    super.initState();
    _loadNetwork();
  }

  void _loadNetwork() {
    setState(() {
      _networkFuture = NetworkService().getChildren(widget.userId);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Mi Red Multinivel"),
        // Botón de retroceso simple que cierra esta pantalla
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _loadNetwork,
          )
        ],
      ),
      body: FutureBuilder<User>(
        future: _networkFuture,
        builder: (context, snapshot) {
          // 1. Estado de carga
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } 
          
          // 2. Estado de error
          else if (snapshot.hasError) {
            return Center(
              child: Padding(
                padding: const EdgeInsets.all(20.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(Icons.error_outline, color: Colors.red, size: 50),
                    const SizedBox(height: 10),
                    Text("Error de conexión: ${snapshot.error}", textAlign: TextAlign.center),
                    const SizedBox(height: 20),
                    ElevatedButton(onPressed: _loadNetwork, child: const Text("Reintentar"))
                  ],
                ),
              ),
            );
          } 
          
          // 3. Estado con datos
          else if (snapshot.hasData) {
            final user = snapshot.data!;
            return ListView(
              padding: const EdgeInsets.all(16),
              children: [
                UserTreeTile(
                  user: user,
                  onRefresh: _loadNetwork,
                ),
              ],
            );
          }

          // 4. Estado por defecto
          return const Center(child: Text("No se encontraron datos."));
        },
      ),
    );
  }
}