export default {
  expo: {
    name: "Workout Tracker",
    slug: "workout-tracker",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/splash.png",
      backgroundColor: "#534AB7",
    },
    ios: {
      supportsTablet: false,
      bundleIdentifier: "com.yourname.workouttracker",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#534AB7",
      },
      package: "com.yourname.workouttracker",
    },
    web: {
      favicon: "./assets/favicon.png",
      output: "static",
      // BASE_URL is set by GitHub Actions to /repo-name/
      // For a custom domain or user/org site, leave it as "/"
      baseUrl: process.env.BASE_URL || "/",
      bundler: "metro",
    },
  },
};
