// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  authenticationServiceUrl: "http://localhost:8888",
  backendUrl: "http://localhost:8081",
  firebase: {
    apiKey: "AIzaSyADb9B6Z38oTD2nCKpsUYcdHUVu4veQ_1Y",
    authDomain: "travelgenius-b4eb7.firebaseapp.com",
    databaseURL:
      "https://travelgenius-b4eb7-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "travelgenius-b4eb7",
    storageBucket: "travelgenius-b4eb7.firebasestorage.app",
    messagingSenderId: "903496072959",
    appId: "1:903496072959:web:7efcc95d4ccb8bbd4f96ca",
    measurementId: "G-HS11WEJ8HF",
  },
  POSTHOG_KEY: 'phc_lqsZ43Tgho5FnOwDui7VyMzG7trkCHzNRJX9p5KOYQk',
  POSTHOG_HOST: 'https://us.i.posthog.com'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
