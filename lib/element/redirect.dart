// ignore_for_file: prefer_const_constructors_in_immutables
import 'package:flutter/material.dart';
import 'package:writeflow/model/token.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:writeflow/helper/token_provider.dart';

class Redirect extends HookConsumerWidget {
  Redirect({super.key});
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    var box = Hive.box('tokenStorage');
    String myurl = Uri.base.toString(); //get complete url
    String? code =
        Uri.base.queryParameters["code"]; //get parameter with attribute "para1"
    String? state = Uri
        .base.queryParameters["state"]; //get parameter with attribute "para2"
    box.put('code', code);
    box.put('state', state);
    final authenticateData = ref.watch(tokenProvider);
    return Scaffold(
      appBar: AppBar(
        title: Text("Get URL Parameter"),
        backgroundColor: Colors.redAccent,
      ),
      body: authenticateData.when(
          data: (authenticateData) {
            token tokenData = token.fromJson(authenticateData.toJson());
            return Padding(
                padding: const EdgeInsets.symmetric(horizontal: 10),
                child: Column(
                  children: [
                    Card(
                      color: Colors.blue,
                      elevation: 4,
                      margin: const EdgeInsets.symmetric(vertical: 10),
                      child: ListTile(
                        title: Text(
                          tokenData.accessToken ?? "",
                          style: const TextStyle(color: Colors.white),
                        ),
                        subtitle: Text(myurl,
                            style: const TextStyle(color: Colors.white)),
                        // trailing: CircleAvatar(
                        //   backgroundImage: NetworkImage(userList[index].avatar),
                        // ),
                      ),
                    ),
                  ],
                ));
          },
          error: (err, s) => Text(err.toString()),
          loading: () => const Center(
                child: CircularProgressIndicator(),
              )),
    );
  }
}
