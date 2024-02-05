import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
//Pages
import 'package:writeflow/element/pulse.dart';
import 'package:writeflow/element/account.dart';
import 'package:writeflow/element/collections.dart';
import 'package:writeflow/helper/authentication_provider.dart';

final indexProvider = StateProvider<int>((ref) => 0);
final String assetName = 'assets/images/writeflow-logo.svg';

enum PageType { pulse, incomming, inventory, outgoing }

class Layout extends ConsumerWidget {
  final List<Widget> _pageList = <Widget>[
    const Pulse(),
    const Collections(),
    const Account(),
  ];

  Layout({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    const tabItems = [
      BottomNavigationBarItem(
        icon: Icon(Icons.monitor_heart_outlined),
        label: 'pulse',
      ),
      BottomNavigationBarItem(
        icon: Icon(Icons.list_alt_outlined),
        label: 'collections',
      ),
      BottomNavigationBarItem(
        icon: Icon(Icons.account_box_outlined),
        label: 'account',
      ),
    ];
    return Scaffold(
      endDrawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            const DrawerHeader(
              decoration: BoxDecoration(
                color: Colors.blue,
              ),
              child: Text('Drawer Header'),
            ),
            ListTile(
              title: const Text('Item 1'),
              onTap: () {},
            ),
            ListTile(
              title: const Text('Item 2'),
              onTap: () {
                Navigator.pop(context);
              },
            ),
            ElevatedButton(
              onPressed: () async {
                ref.read(authenticationProvider.notifier).signOut();
              },
              child: const Text("Logout"),
            ),
          ],
        ),
      ),
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(150.0),
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.only(left: 15.0, right: 15.0),
              child: AppBar(
                toolbarHeight: 55,
                leadingWidth: 150,
                leading: Padding(
                  padding: const EdgeInsets.only(left: 8.0, right: 8.0),
                  child: SvgPicture.asset(
                    assetName,
                    semanticsLabel: 'writeflow',
                    height: 65,
                    fit: BoxFit.contain,
                  ),
                ),
              ),
            ),
            BottomNavigationBar(
              fixedColor: Colors.blueAccent[400],
              currentIndex: ref.watch(indexProvider),
              onTap: (index) {
                ref.read(indexProvider.notifier).state = index;
              },
              items: tabItems,
            ),
          ],
        ),
      ),
      body: IndexedStack(index: ref.watch(indexProvider), children: _pageList),
    );
  }
}

class AppBarContent extends StatelessWidget {
  const AppBarContent({super.key});
  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.end,
      children: <Widget>[
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 10),
          child: Row(
            children: <Widget>[
              const Text(
                'PreferredSize Sample',
                style: TextStyle(color: Colors.white),
              ),
              const Spacer(),
              IconButton(
                icon: const Icon(
                  Icons.search,
                  size: 20,
                ),
                color: Colors.white,
                onPressed: () {},
              ),
              IconButton(
                icon: const Icon(
                  Icons.more_vert,
                  size: 20,
                ),
                color: Colors.white,
                onPressed: () {},
              ),
            ],
          ),
        ),
      ],
    );
  }
}
