// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {config} from 'rxjs';

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAFCnP1gUpFJ9_3Zgx_jCWlbuF22NEFeSg',
    authDomain: 'gameshop-1622d.firebaseapp.com',
    databaseURL: 'https://gameshop-1622d.firebaseio.com',
    projectId: 'gameshop-1622d',
    storageBucket: 'gameshop-1622d.appspot.com',
    messagingSenderId: '995544287178'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
