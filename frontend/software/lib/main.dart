import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:material3_layout/material3_layout.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        brightness: Brightness.light,
        colorSchemeSeed: Colors.green,
      ),
      darkTheme: ThemeData(
        useMaterial3: true,
        brightness: Brightness.dark,
        colorSchemeSeed: Colors.blue,
      ),
      themeMode: ThemeMode.system,
      home: NavigationScaffold(
        appBar: AppBar(
          elevation: 2,
          title: const Text('Awesome app'),
          centerTitle: true,
        ),
        theme: Theme.of(context),
        navigationType: NavigationTypeEnum.railAndBottomNavBar,
        navigationSettings: RailAndBottomSettings(
          destinations: <DestinationModel>[
            DestinationModel(
              label: 'Home',
              icon: const Icon(Icons.home_outlined),
              selectedIcon: const Icon(Icons.home),
              tooltip: 'Home page',
            ),
            DestinationModel(
              label: 'Profile',
              icon: const Icon(Icons.person_2_outlined),
              selectedIcon: const Icon(Icons.person_2),
              tooltip: 'Profile page',
            ),
            DestinationModel(
              label: 'Settings',
              badge: Badge.count(
                count: 3,
                child: const Icon(Icons.settings_outlined),
              ),
              selectedIcon: const Icon(Icons.settings),
              tooltip: 'Settings',
            ),
          ],
          pages: <Widget>[
            // HomePage(),
            // ProfilePage(),
            // SettingsPage(),
          ],
          addThemeSwitcherTrailingIcon: true,
          groupAlignment: 0.0,
        ),
        onDestinationSelected: (int index) => log(
          'Page changed: Current page: $index',
        ),
      ),
    );
  }
}

class ScreenWidget extends StatelessWidget {
  const ScreenWidget({super.key});

  @override
  Widget build(BuildContext context) {
    final destinations = <DestinationModel>[
      DestinationModel(
        label: 'Products',
        selectedIcon: const Icon(Icons.storefront),
        icon: const Icon(Icons.storefront),
        tooltip: 'Products page',
      ),
      DestinationModel(
          label: 'Clients',
          selectedIcon: const Icon(Icons.group),
          badge: const Badge(
            child: Icon(Icons.group_outlined),
          ),
          tooltip: 'Clients page'),
    ];

    final pages = <PageLayout>[
      PageLayout(
        compactLayout: SinglePaneLayout(
          child: PaneContainerWidget(
            child: Text("test"),
          ),
        ),
        mediumLayout: SinglePaneLayout(
          verticalPadding: 24,
          child: PaneContainerWidget(
            child: Text("test"),
          ),
        ),
        expandedLayout: TwoPaneLayout(
          verticalPadding: 24,
          fixedPaneChild: PaneContainerWidget(
            child: Text("test"),
          ),
          flexiblePaneChild: PaneContainerWidget(
            child: Text("test"),
          ),
        ),
      ),
      PageLayout(
        compactLayout: SinglePaneLayout(
          child: PaneContainerWidget(
            child: Center(
              child: Text(
                'Compact layout',
                style: Get.textTheme.headlineMedium,
              ),
            ),
          ),
        ),
        mediumLayout: SplitPaneLayout(
          verticalPadding: 24,
          leftChild: PaneContainerWidget(
            surfaceColor: SurfaceColorEnum.surfaceContainerLow,
            child: Center(
              child: Text(
                'medium layout left child',
                style: Get.textTheme.headlineMedium,
              ),
            ),
          ),
          rightChild: PaneContainerWidget(
            surfaceColor: SurfaceColorEnum.surface,
            child: Center(
              child: Text(
                'medium layout right child',
                style: Get.textTheme.headlineMedium,
              ),
            ),
          ),
        ),
        expandedLayout: TwoPaneLayout(
          verticalPadding: 24,
          fixedPaneChild: PaneContainerWidget(
            surfaceColor: SurfaceColorEnum.surfaceContainerLow,
            child: Center(
              child: Text(
                'expanded layout fixed pane',
                style: Get.textTheme.headlineMedium,
              ),
            ),
          ),
          flexiblePaneChild: PaneContainerWidget(
            child: Center(
              child: Text(
                'expanded layout flexible pane',
                style: Get.textTheme.headlineMedium,
              ),
            ),
          ),
        ),
      ),
    ];

    return NavigationScaffold(
      appBar: AppBar(
        elevation: 2,
        title: const Text('Awesome app'),
        centerTitle: true,
      ),
      theme: Theme.of(context),
      navigationType: NavigationTypeEnum.railAndBottomNavBar,
      navigationSettings: RailAndBottomSettings(
        addThemeSwitcherTrailingIcon: true,
        destinations: destinations,
        pages: pages,
      ),
      onDestinationSelected: (int index) => log(
        'Page changed: Current page: $index',
      ),
    );
  }
}
