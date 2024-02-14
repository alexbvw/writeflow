import 'package:writeflow/model/site.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:writeflow/helper/webflow_provider.dart';

final sitesProvider = FutureProvider<List<Site>>((ref) async {
  return ref.watch(webflowProvider).getSites();
});

final selectedSiteProvider = StateProvider<Site?>((ref) {
  // Initialize with null or a default site as appropriate
  return null;
});
