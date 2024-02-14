import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:writeflow/helper/webflow_service.dart';

final webflowProvider = Provider<WebFlowServices>((ref) => WebFlowServices());
