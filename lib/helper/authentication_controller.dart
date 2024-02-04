import 'package:flutter/material.dart';
import 'package:hive_flutter/hive_flutter.dart';

class AuthenticationController with ChangeNotifier {
//Within this section, you can integrate authentication methods
//such as Firebase, SharedPreferences, and more.
  bool isLoggedIn = false;
  var box = Hive.box('tokenStorage');
  Future<void> signIn() async {
    box.put('token',
        '299e5a2d21095d0c1bd4c2667076e12c68b20848ecb8b43c52e97df35b468e94');
    isLoggedIn = true;
    notifyListeners();
  }

  Future<void> signOut() async {
    box.delete('token');
    isLoggedIn = false;
    notifyListeners();
  }
}
