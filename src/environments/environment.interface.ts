export interface EnvironmentInterface {
  /**
   * Define API Call for take data
   * @example https://api.hostname.com/api
   */
  apiUrl: string;

  /**
   * Define base url including protocol, hostname, port
   * @example http://localhost:4200
   */
  baseUrl: string;

  /**
   * Define application mode. set true for production mode
   *
   */
  production: boolean;

  /**
   * Define local key for encryption
   * @example 'your_s4lt_h3r3'
   */
  localKey: string;

  /**
   * Define Version of The Apps
   * @example 0.0.1
   */
  version: string;
}
