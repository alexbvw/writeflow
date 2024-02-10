import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:writeflow/organism/layout.dart';
import 'package:writeflow/element/redirect.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:writeflow/organism/authentication.dart';
import 'package:writeflow/helper/authentication_provider.dart';

final _key = GlobalKey<NavigatorState>();

enum AppRoute { splash, authentication, layout, redirect }

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
        path: '/${AppRoute.redirect.name}',
        name: AppRoute.redirect.name,
        builder: (context, state) {
          return Redirect();
        },
      ),
      GoRoute(
        path: '/',
        name: AppRoute.layout.name,
        builder: (context, state) {
          return Layout();
        },
      ),
      GoRoute(
        path: '/${AppRoute.splash.name}',
        name: AppRoute.splash.name,
        builder: (context, state) {
          return const SplashPage();
        },
      ),
      GoRoute(
        path: '/${AppRoute.authentication.name}',
        name: AppRoute.authentication.name,
        builder: (context, state) {
          return LoginPage();
        },
      ),
    ],
    redirect: (context, state) async {
      var isAuthenticated = authState.isLoggedIn;
      var box = Hive.box('tokenStorage');
      if (box.get('token') != null ||
          box.get('token') != null && box.get('token') != "") {
        isAuthenticated = true;
      } else {
        isAuthenticated = false;
      }
      String myurl = Uri.base.toString();
      if (box.get('token') == null && myurl.contains('redirect') ||
          box.get('token') == "" && myurl.contains('redirect')) {
        return '/${AppRoute.redirect.name}';
      }

      /// null redirects to Initial Location
      return isAuthenticated ? null : '/${AppRoute.authentication.name}';
    },
  );
});
