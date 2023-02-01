// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const apiUrl = 'https://dev.vrnaplex.com';
const domainUrl = 'https://dev.vrnaplex.com';
export const environment = {
  production: false,
  baseUrl: apiUrl,
  capaciorUrl: domainUrl,
  awsUrl: '/aws-service/',
  authUrl: '/auth-service/',
  vrnaFlowUrl: '/orch-service/vrnaflow/',
  intelligenceUrl: '/intelligence-service/',
  contentUrl: '/content-service/',
  watchlistUrl: '/watchlist-service/',
  supportUrl: '/support-service/',
  paymentUrl: '/payment-service/',
  commonUrl: '/common-service/',
  subscriptionUrl: '/subscription-service/',
  googleProvider: '722082731712-4ljartf7q2b9dmijui5h62ggimldasjg.apps.googleusercontent.com',
  fbProvider: '887882988657968',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
