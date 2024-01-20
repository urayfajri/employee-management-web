// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { EnvironmentInterface } from './environment.interface';

export const environment: EnvironmentInterface = {
  production: true,
  version: '1.1.0',
  apiUrl: '',
  baseUrl: 'http://localhost:4200',
  localKey: '',
};
