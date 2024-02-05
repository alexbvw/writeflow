import 'package:flutter/material.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:writeflow/constant.dart';
import 'package:go_router/go_router.dart';
import 'package:writeflow/helper/router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:flutter_custom_tabs/flutter_custom_tabs.dart';

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
            const Text("Login Page"),
            ElevatedButton(
              onPressed: () async {
                // box.put('token',
                //     '8dda4d4859f4a191b4704b0bb5f650da066ff6e7129e63d7ba6c393b1a096be9');
                _launchURL(context);
              },
              child: const Text("Login"),
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
