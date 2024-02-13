import 'package:flutter/material.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:writeflow/helper/sites_provider.dart';
import 'package:writeflow/helper/webflow_service.dart';
import 'package:writeflow/model/site.dart';
import 'package:dropdown_button2/dropdown_button2.dart';

class Pulse extends HookConsumerWidget {
  const Pulse({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final sites = ref.watch(sitesProvider);
    final selectedSiteState = ref.watch(selectedSiteProvider);
    var box = Hive.box('storage');

    return Scaffold(
      body: sites.when(
        data: (List<Site> sites) {
          // Initialize the selected site with the first site if it hasn't been set and sites are not empty
          if (selectedSiteState == null && sites.isNotEmpty) {
            WidgetsBinding.instance.addPostFrameCallback((_) {
              ref.read(selectedSiteProvider.notifier).state = sites[0];
              box.put("siteName", sites[0].displayName);
              box.put("siteId", sites[0].id);
            });
          }

          return Column(
            children: [
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 10),
                child: Column(
                  children: [
                    // Padding(
                    //   padding: EdgeInsets.only(left: 20, right: 20),
                    //   child: Text('Selec'),
                    // ),
                    DropdownButton<Site>(
                      value: selectedSiteState,
                      isExpanded: true,
                      hint: Text('select site'),
                      items: sites.map((Site site) {
                        return DropdownMenuItem<Site>(
                          value: site,
                          child: Text(site.shortName ?? "Unnamed Site"),
                        );
                      }).toList(),
                      onChanged: (Site? newValue) {
                        // Update the state with the new selected site
                        ref.read(selectedSiteProvider.notifier).state =
                            newValue;
                        box.put("siteName", newValue?.displayName);
                        box.put("siteId", newValue?.id);
                        // print(selectedSiteState);
                      },
                    ),
                    // Additional widgets go here
                  ],
                ),
              ),
            ],
          );
        },
        error: (error, stack) => Text('Error: $error'),
        loading: () => Center(child: CircularProgressIndicator()),
      ),
    );
  }
}

class InfoTile extends StatelessWidget {
  const InfoTile({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Card(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            const ListTile(
              leading: Icon(Icons.album),
              title: Text('The Enchanted Nightingale'),
              subtitle: Text('Music by Julie Gable. Lyrics by Sidney Stein.'),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: <Widget>[
                TextButton(
                  child: const Text('BUY TICKETS'),
                  onPressed: () {/* ... */},
                ),
                const SizedBox(width: 8),
                TextButton(
                  child: const Text('LISTEN'),
                  onPressed: () {/* ... */},
                ),
                const SizedBox(width: 8),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
