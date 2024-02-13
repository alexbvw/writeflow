import 'dart:convert';
import 'package:http/http.dart';
import 'package:flutter/material.dart';
import 'package:writeflow/constant.dart';
import 'package:writeflow/model/site.dart';
import 'package:writeflow/model/token.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

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
      return result;
    } else {
      throw Exception(response.reasonPhrase);
    }
  }

  Future<List<Site>> getSites() async {
    var box = Hive.box('tokenStorage');
    var token = box.get('token');
    Response response =
        await get(Uri.parse('${webflowAuthServiceUrl}sites'), headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer $token',
    });
    if (response.statusCode == 200) {
      final List result = jsonDecode(response.body)['sites'];
      return result.map(((e) => Site.fromJson(e))).toList();
    } else {
      throw Exception(response.reasonPhrase);
    }
  }
}

final webflowProvider = Provider<WebFlowServices>((ref) => WebFlowServices());
