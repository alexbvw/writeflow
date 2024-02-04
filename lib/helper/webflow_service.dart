import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:http/http.dart';
import 'package:writeflow/constant.dart';
import 'package:writeflow/model/token.dart';

class WebFlowServices with ChangeNotifier {
  Future<token> getToken() async {
    var box = Hive.box('tokenStorage');
    var code = box.get('code');
    Response response = await post(
        Uri.parse('${webflowAuthServiceUrl}token?code=$code'),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // 'Authorization': 'Bearer $token',
        });
    if (response.statusCode == 200) {
      final result = jsonDecode(response.body)['response'];
      box.put('token', result['access_token']);
      notifyListeners();
      return result.map(((e) => token.fromJson(e)));
    } else {
      throw Exception(response.reasonPhrase);
    }
  }
}

final webflowProvider = Provider<WebFlowServices>((ref) => WebFlowServices());
