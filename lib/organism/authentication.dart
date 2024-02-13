// ignore_for_file: must_be_immutable

import 'package:flutter/material.dart';
import 'package:writeflow/constant.dart';
import 'package:go_router/go_router.dart';
import 'package:writeflow/helper/router.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:flutter_custom_tabs/flutter_custom_tabs.dart';

const String assetName = 'assets/images/writeflow-logo.svg';

class LoginPage extends HookConsumerWidget {
  var box = Hive.box('tokenStorage');
  LoginPage({super.key});
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: null,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Padding(
              padding: const EdgeInsets.only(left: 8.0, right: 8.0),
              child: SvgPicture.asset(
                assetName,
                semanticsLabel: 'writeflow',
                height: 65,
                fit: BoxFit.contain,
              ),
            ),
            const Padding(
              padding: EdgeInsets.only(top: 30.0, left: 8.0, right: 8.0),
              child: Text("Ready to start your writing adventure?"),
            ),
            Padding(
              padding: const EdgeInsets.only(top: 30.0, left: 8.0, right: 8.0),
              child: ElevatedButton(
                style: const ButtonStyle(
                  backgroundColor:
                      MaterialStatePropertyAll<Color>(primaryColor),
                ),
                onPressed: () async {
                  box.put('token',
                      '417331b54ab1472a7e04146675b77df0f2fda0ec6b21a912be112a989ce8cb4a');
                  // _launchURL(context);
                },
                child: const Text(
                  "login with webflow",
                  style: TextStyle(color: Colors.white),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class SplashPage extends StatelessWidget {
  const SplashPage({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Center(child: Text("Splash Page")),
          ElevatedButton(
              onPressed: () {
                context.goNamed(AppRoute.authentication.name);
              },
              child: const Text("Lets Login"))
        ],
      ),
    );
  }
}

void _launchURL(BuildContext context) async {
  final theme = Theme.of(context);
  try {
    await launchUrl(
      Uri.parse(
          'https://webflow.com/oauth/authorize?client_id=$clientId&response_type=code&scope=authorized_user%3Aread%20cms%3Aread%20cms%3Awrite%20forms%3Aread%20sites%3Aread%20users%3Aread%20users%3Awrite&redirect_uri=https%3A%2F%2Fwriteflow.acreative.co.za%2Fredirect&state=init'),
      customTabsOptions: CustomTabsOptions(
        colorSchemes: CustomTabsColorSchemes.defaults(
          toolbarColor: theme.colorScheme.surface,
        ),
        shareState: CustomTabsShareState.on,
        urlBarHidingEnabled: true,
        showTitle: true,
        closeButton: CustomTabsCloseButton(
          icon: CustomTabsCloseButtonIcons.back,
        ),
      ),
      safariVCOptions: SafariViewControllerOptions(
        preferredBarTintColor: theme.colorScheme.surface,
        preferredControlTintColor: theme.colorScheme.onSurface,
        barCollapsingEnabled: true,
        dismissButtonStyle: SafariViewControllerDismissButtonStyle.close,
      ),
    );
  } catch (e) {
    debugPrint(e.toString());
  }
}
