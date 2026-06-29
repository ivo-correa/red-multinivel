import 'package:flutter/material.dart';
import 'network_service.dart';
import 'dart:convert'; // Importado para debug

class AddUserScreen extends StatefulWidget {
  final int? sponsorId;
  const AddUserScreen({super.key, this.sponsorId});

  @override
  State<AddUserScreen> createState() => _AddUserScreenState();
}

class _AddUserScreenState extends State<AddUserScreen> {
  final _nombreController = TextEditingController();
  final _emailController = TextEditingController();
  final _idController = TextEditingController();
  final _dirController = TextEditingController();
  final _paisController = TextEditingController();
  final _telController = TextEditingController();
  final _ciudadController = TextEditingController();
  final _relacionController = TextEditingController();
  final _valorCompraController = TextEditingController();
  final _notasController = TextEditingController();

  String? _trabaja, _tipoOcupacion, _situacionVivienda, _conoceRoyal, _agendado, _visitado, _realizoCompra;
  DateTime? _fechaAgenda, _fechaVisita;

  void _guardar() async {
    // Construcción del objeto de datos centralizado
    // Unificamos los campos para que todos viajen al backend siempre
    final userData = {
      "nombre": _nombreController.text,
      "email": _emailController.text,
      "direccionResidencia": _dirController.text,
      // Campos opcionales / condicionales
      "numeroIdentificacion": _idController.text,
      "paisResidencia": _paisController.text,
      "telefono": _telController.text,
      "ciudad": _ciudadController.text,
      "relacionCliente": _relacionController.text,
      "trabaja": _trabaja,
      "tipoOcupacion": _tipoOcupacion ?? _situacionVivienda,
      "conoceRoyalPrestige": _conoceRoyal,
      "agendado": _agendado,
      "fechaAgenda": _fechaAgenda?.toIso8601String(),
      "visitado": _visitado,
      "fechaVisita": _fechaVisita?.toIso8601String(),
      "realizoCompra": _realizoCompra,
      "valorCompra": double.tryParse(_valorCompraController.text) ?? 0.0,
      "notasAdicionales": _notasController.text,
      if (widget.sponsorId != null) "sponsorId": widget.sponsorId,
    };

    // DEBUG: Ver qué se está enviando a la consola antes de enviar al backend
    print("Enviando datos al backend: ${jsonEncode(userData)}");

    try {
      if (widget.sponsorId == null) {
        await NetworkService().createRootUser(userData);
      } else {
        await NetworkService().createUser(userData);
      }
      if (mounted) Navigator.pop(context, true);
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Error al guardar: $e")));
      }
    }
  }

  // ... (El resto de métodos _selectDate y _buildDateSection se mantienen igual)
  Future<void> _selectDate(bool isAgenda) async {
    DateTime? picked = await showDatePicker(
      context: context, 
      initialDate: DateTime.now(), 
      firstDate: DateTime(2020), 
      lastDate: DateTime(2100)
    );
    if (picked != null) {
      setState(() {
        if (isAgenda) _fechaAgenda = picked; else _fechaVisita = picked;
      });
    }
  }

  Widget _buildDateSection(String label, String? status, Function(String) onStatus, VoidCallback onPick, DateTime? date) {
    return Column(children: [
      DropdownButtonFormField<String>(
        decoration: InputDecoration(labelText: "$label?"),
        items: ['Si', 'No'].map((e) => DropdownMenuItem(value: e, child: Text(e))).toList(),
        onChanged: (v) => onStatus(v!),
        value: status,
      ),
      if (status == 'Si') ListTile(
        title: Text(date == null ? "Seleccionar fecha" : date.toString().split(' ')[0]), 
        trailing: const Icon(Icons.calendar_today), 
        onTap: onPick
      ),
    ]);
  }

  @override
  Widget build(BuildContext context) {
    final isRoot = widget.sponsorId == null;
    return Scaffold(
      appBar: AppBar(title: Text(isRoot ? "Nuevo Líder Raíz" : "Nuevo Referido")),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(controller: _nombreController, decoration: const InputDecoration(labelText: "Nombre completo")),
            TextField(controller: _emailController, decoration: const InputDecoration(labelText: "Correo electrónico")),
            TextField(controller: _dirController, decoration: const InputDecoration(labelText: "Dirección de residencia")),
            
            if (isRoot) ...[
              TextField(controller: _idController, decoration: const InputDecoration(labelText: "N° Identificación")),
              TextField(controller: _paisController, decoration: const InputDecoration(labelText: "País de residencia")),
            ] else ...[
              TextField(controller: _telController, decoration: const InputDecoration(labelText: "Teléfono")),
              TextField(controller: _ciudadController, decoration: const InputDecoration(labelText: "Ciudad")),
              TextField(controller: _relacionController, decoration: const InputDecoration(labelText: "Relación con el cliente")),
              
              DropdownButtonFormField<String>(
                decoration: const InputDecoration(labelText: "¿Trabaja?"),
                value: _trabaja,
                items: ['Si', 'No'].map((e) => DropdownMenuItem(value: e, child: Text(e))).toList(),
                onChanged: (v) { setState(() => _trabaja = v); },
              ),
              if (_trabaja == 'Si') DropdownButtonFormField<String>(
                decoration: const InputDecoration(labelText: "Tipo de ocupación"),
                value: _tipoOcupacion,
                items: ['Trabaja para una empresa', 'Es independiente', 'Es pensionado'].map((e) => DropdownMenuItem(value: e, child: Text(e))).toList(),
                onChanged: (v) => setState(() => _tipoOcupacion = v),
              ),
              if (_trabaja == 'No') DropdownButtonFormField<String>(
                decoration: const InputDecoration(labelText: "Situación de vivienda"),
                value: _situacionVivienda,
                items: ['Vive en arriendo', 'Vive en casa familiar', 'Dueño de casa'].map((e) => DropdownMenuItem(value: e, child: Text(e))).toList(),
                onChanged: (v) => setState(() => _situacionVivienda = v),
              ),
              DropdownButtonFormField<String>(
                decoration: const InputDecoration(labelText: "Conoce a Royal Prestige"),
                value: _conoceRoyal,
                items: ['Si', 'No', 'Ellos tienen'].map((e) => DropdownMenuItem(value: e, child: Text(e))).toList(),
                onChanged: (v) => setState(() => _conoceRoyal = v),
              ),
              _buildDateSection("Agendado", _agendado, (v) => setState(() => _agendado = v), () => _selectDate(true), _fechaAgenda),
              _buildDateSection("Visitado", _visitado, (v) => setState(() => _visitado = v), () => _selectDate(false), _fechaVisita),
              DropdownButtonFormField<String>(
                decoration: const InputDecoration(labelText: "¿Realizó compra?"),
                value: _realizoCompra,
                items: ['Si', 'No'].map((e) => DropdownMenuItem(value: e, child: Text(e))).toList(),
                onChanged: (v) => setState(() => _realizoCompra = v),
              ),
              if (_realizoCompra == 'Si') TextField(controller: _valorCompraController, keyboardType: TextInputType.number, decoration: const InputDecoration(labelText: "Valor de la compra")),
              TextField(controller: _notasController, decoration: const InputDecoration(labelText: "Notas adicionales"), maxLines: 3),
            ],
            const SizedBox(height: 20),
            ElevatedButton(onPressed: _guardar, child: const Text("Registrar Usuario")),
          ],
        ),
      ),
    );
  }
}