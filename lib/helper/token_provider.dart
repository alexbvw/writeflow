import 'package:writeflow/model/token.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:writeflow/helper/webflow_provider.dart';

final tokenProvider = FutureProvider<token>((ref) async {
  return ref.watch(webflowProvider).getToken();
});
