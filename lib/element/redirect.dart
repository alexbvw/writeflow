// ignore_for_file: prefer_const_constructors_in_immutables
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:writeflow/helper/router.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:writeflow/helper/token_provider.dart';

class Redirect extends HookConsumerWidget {
  Redirect({super.key});
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    var box = Hive.box('tokenStorage');

    String? code =
        Uri.base.queryParameters["code"]; //get parameter with attribute "para1"
    String? state = Uri
        .base.queryParameters["state"]; //get parameter with attribute "para2"
    box.put('code', code);
    box.put('state', state);
    final authenticateData = ref.watch(tokenProvider);
    return Scaffold(
      appBar: AppBar(
        title: Text("Authorization"),
      ),
      body: authenticateData.when(
          data: (authenticateData) {
            SizedBox();
            context.goNamed(AppRoute.layout.name);
            return null;
          },
          error: (err, s) => Text(err.toString()),
          loading: () => const Center(
                child: CircularProgressIndicator(),
              )),
    );
  }
}
