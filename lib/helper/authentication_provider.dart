import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:writeflow/helper/authentication_controller.dart';

final authenticationProvider =
    ChangeNotifierProvider((ref) => AuthenticationController());
