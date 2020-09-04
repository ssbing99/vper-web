// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiUrl: 'http://192.168.0.105:8000/api/',
  // serverUrl: 'http://192.168.0.105:8000',
  apiUrl: 'https://yperkokk.com/yper-app/api/',
  serverUrl: 'https://yperkokk.com/yper-app',
  firebaseConfig: {
    apiKey: 'AIzaSyARwT4XQtGwMhQ3kky0xu_-VM3zvz5FiwM',
    authDomain: 'adproject-1098.firebaseapp.com',
    databaseURL: 'https://adproject-1098.firebaseio.com',
    projectId: 'adproject-1098',
    storageBucket: 'gs://adproject-1098.appspot.com',
    messagingSenderId: '243587450079'
  },
  stripeClientId: 'pk_test_nwGlM9Xw8v2s5ZpgmIWXu0Z1'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
