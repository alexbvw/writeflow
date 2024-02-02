// import 'package:flutter/material.dart';
// import 'package:flutter_riverpod/flutter_riverpod.dart';

// //Pages
// import 'package:writeflow/element/pulse.dart';
// import 'package:writeflow/element/collections.dart';

// final indexProvider = StateProvider<int>((ref) => 0);

// enum PageType { pulse, incomming, inventory, outgoing }

// class Layout extends ConsumerWidget {
//   final List<Widget> _pageList = <Widget>[const Pulse(), const Collections()];

//   Layout({super.key});

//   @override
//   Widget build(BuildContext context, WidgetRef ref) {
//     const tabItems = [
//       BottomNavigationBarItem(
//         icon: Icon(Icons.monitor_heart_outlined),
//         label: 'pulse',
//       ),
//       BottomNavigationBarItem(
//         icon: Icon(Icons.list_alt),
//         label: 'collections',
//       ),
//       // BottomNavigationBarItem(
//       //   icon: Icon(Icons.fastfood),
//       //   label: '',
//       // ),
//       // BottomNavigationBarItem(
//       //   icon: Icon(Icons.fastfood),
//       //   label: '',
//       // ),
//     ];
//     return Scaffold(
//       appBar: PreferredSize(
//         preferredSize: const Size.fromHeight(80.0),
//         child: BottomNavigationBar(
//           // currentIndex: ,
//           fixedColor: Colors.amber,
//           currentIndex: ref.watch(indexProvider),
//           onTap: (index) {
//             ref.read(indexProvider.notifier).state = index;
//           },
//           items: tabItems,
//         ),
//       ),
//       body: IndexedStack(index: ref.watch(indexProvider), children: _pageList),
//     );
//   }
// }

// class AppBarContent extends StatelessWidget {
//   const AppBarContent({super.key});

//   @override
//   Widget build(BuildContext context) {
//     return Column(
//       mainAxisAlignment: MainAxisAlignment.end,
//       children: <Widget>[
//         Padding(
//           padding: const EdgeInsets.symmetric(horizontal: 10),
//           child: Row(
//             children: <Widget>[
//               const Text(
//                 'PreferredSize Sample',
//                 style: TextStyle(color: Colors.white),
//               ),
//               const Spacer(),
//               IconButton(
//                 icon: const Icon(
//                   Icons.search,
//                   size: 20,
//                 ),
//                 color: Colors.white,
//                 onPressed: () {},
//               ),
//               IconButton(
//                 icon: const Icon(
//                   Icons.more_vert,
//                   size: 20,
//                 ),
//                 color: Colors.white,
//                 onPressed: () {},
//               ),
//             ],
//           ),
//         ),
//       ],
//     );
//   }
// }
