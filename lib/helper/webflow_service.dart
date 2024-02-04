import 'dart:convert';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:http/http.dart';
import 'package:writeflow/constant.dart';
import 'package:writeflow/model/token.dart';

class WebFlowServices {
  Future<token> getToken() async {
    var box = Hive.box('tokenStorage');
    var code = box.get('code');
    Response response = await post(
        Uri.parse(
            '${webflowAuthUrl}oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}&redirect_uri=${redirect_uri}&grant_type=authorization_code'),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // 'Authorization': 'Bearer $token',
        });
    if (response.statusCode == 200) {
      print(response.body);
      final result = jsonDecode(response.body)['data'];
      return result.map(((e) => token.fromJson(e))).toList();
    } else {
      throw Exception(response.reasonPhrase);
    }
  }
}

final webflowProvider = Provider<WebFlowServices>((ref) => WebFlowServices());
