import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:writeflow/element/pulse.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:writeflow/helper/authentication_controller.dart';
import 'package:writeflow/organism/authentication.dart';

final _key = GlobalKey<NavigatorState>();
var box = Hive.openBox('testBox');

enum AppRoute { splash, authentication, pulse, collections }

final routerProvider = Provider<GoRouter>((ref) {
  final authState = ref.watch(authenticationProvider);

  return GoRouter(
    navigatorKey: _key,

    /// Forwards diagnostic messages to the dart:developer log() API.
    debugLogDiagnostics: true,

    /// Initial Routing Location
    initialLocation: '/',

    /// The listeners are typically used to notify clients that the object has been updated.
    refreshListenable: authState,
    routes: [
      GoRoute(
        path: '/${AppRoute.splash.name}',
        name: AppRoute.splash.name,
        builder: (context, state) {
          return const SplashPage();
        },
      ),
      GoRoute(
        path: '/',
        name: AppRoute.pulse.name,
        builder: (context, state) {
          return const Pulse();
        },
      ),
      GoRoute(
        path: '/${AppRoute.authentication.name}',
        name: AppRoute.authentication.name,
        builder: (context, state) {
          return const LoginPage();
        },
      ),
    ],
    redirect: (context, state) async {
      // final isAuthenticated = authState.isLoggedIn;
      var box = Hive.box('tokenStorage');
      // print(box.get('token'));

      /// [state.fullPath] will give current route Path
      if (box.get('token') != null) {
        authState.isLoggedIn = true;
      } else {
        authState.isLoggedIn = false;
      }

      /// null redirects to Initial Location
      return authState.isLoggedIn ? '/' : '/${AppRoute.authentication.name}';
    },
  );
});
