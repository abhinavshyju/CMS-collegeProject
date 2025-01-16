import 'package:flutter/material.dart';
import 'package:forui/forui.dart'; // Make sure this package is in your pubspec.yaml

/// A centralized class for managing text styles in the app.
/// Customize text styles for headlines, subtitles, body text, buttons, etc.
class AppTypography {
  // Headline styles
  static TextStyle headline1(BuildContext context) {
    return TextStyle(
      fontSize: 32.0,
      fontWeight: FontWeight.bold,
      color: Theme.of(context)
          .cardTheme
          .color, // Fetching primary color from theme
    );
  }

  static TextStyle headline2(BuildContext context) {
    return TextStyle(
      fontSize: 28.0,
      fontWeight: FontWeight.bold,
      color: Theme.of(context).cardTheme.color,
    );
  }

  static TextStyle headline3(BuildContext context) {
    return TextStyle(
      fontSize: 24.0,
      fontWeight: FontWeight.w600,
      color: Theme.of(context).cardTheme.color,
    );
  }

  static TextStyle headline4(BuildContext context) {
    return TextStyle(
      fontSize: 20.0,
      fontWeight: FontWeight.w600,
      color: Theme.of(context).cardTheme.color,
    );
  }

  // Subtitle styles
  static TextStyle subtitle1(BuildContext context) {
    return TextStyle(
      fontSize: 18.0,
      fontWeight: FontWeight.w500,
      color: Theme.of(context).cardColor,
    );
  }

  static TextStyle subtitle2(BuildContext context) {
    return TextStyle(
      fontSize: 16.0,
      fontWeight: FontWeight.w500,
      color: Theme.of(context).colorScheme.onBackground.withOpacity(0.7),
    );
  }

  // Body text styles
  static TextStyle bodyText1(BuildContext context) {
    return TextStyle(
      fontSize: 14.0,
      fontWeight: FontWeight.normal,
      color: Theme.of(context).colorScheme.onBackground,
    );
  }

  static TextStyle bodyText2(BuildContext context) {
    return TextStyle(
      fontSize: 12.0,
      fontWeight: FontWeight.normal,
      color: Theme.of(context).colorScheme.onBackground,
    );
  }

  // Caption styles
  static TextStyle caption(BuildContext context) {
    return TextStyle(
      fontSize: 10.0,
      fontWeight: FontWeight.normal,
      color: Theme.of(context).colorScheme.onBackground.withOpacity(0.5),
    );
  }

  // Button styles
  static TextStyle button(BuildContext context) {
    return TextStyle(
      fontSize: 16.0,
      fontWeight: FontWeight.bold,
      color: Theme.of(context).colorScheme.onPrimary,
    );
  }

  // Overline styles
  static TextStyle overline(BuildContext context) {
    return TextStyle(
      fontSize: 10.0,
      fontWeight: FontWeight.w400,
      color: Theme.of(context).colorScheme.onBackground.withOpacity(0.5),
      letterSpacing: 1.5,
    );
  }

  /// Utility method to adjust text styles with custom color or other properties
  static TextStyle customStyle({
    required BuildContext context,
    double? fontSize,
    FontWeight? fontWeight,
    Color? color,
    double? letterSpacing,
  }) {
    return TextStyle(
      fontSize: fontSize ?? 14.0,
      fontWeight: fontWeight ?? FontWeight.normal,
      color: color ?? Theme.of(context).colorScheme.onBackground,
      letterSpacing: letterSpacing ?? 0.0,
    );
  }
}
