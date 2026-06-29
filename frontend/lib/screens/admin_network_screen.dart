import 'package:flutter/material.dart';
import '../user_model.dart';
import '../user_tree_tile.dart';
import '../network_service.dart';

class AdminNetworkScreen extends StatefulWidget {
  const AdminNetworkScreen({Key? key}) : super(key: key);

  @override
  _AdminNetworkScreenState createState() => _AdminNetworkScreenState();
}

class _AdminNetworkScreenState extends State<AdminNetworkScreen> {
  late Future<List<User>> _allRootsFuture;

  @override
  void initState() {
    super.initState();
    _loadAllRoots();
  }

  void _loadAllRoots() {
    setState(() {
      _allRootsFuture = NetworkService().getAllRoots();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Panel Administrativo Maxter")),
      body: FutureBuilder<List<User>>(
        future: _allRootsFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text("Error: ${snapshot.error}"));
          } else if (snapshot.hasData) {
            final roots = snapshot.data!;
            return ListView.builder(
              itemCount: roots.length,
              itemBuilder: (context, index) {
                return UserTreeTile(user: roots[index], onRefresh: _loadAllRoots);
              },
            );
          }
          return const Center(child: Text("No hay datos."));
        },
      ),
    );
  }
}