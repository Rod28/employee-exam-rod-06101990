import Axios, { AxiosRequestConfig } from 'axios';
import isEmpty from 'lodash/isEmpty';

type MethodTypes = 'GET' | 'POST';

/**
 * Cliente configurado con axios para hacer todas las peticiones al API.
 * @see https://github.com/axios/axios
 */
class AxiosClient {
  private static client: AxiosClient;
  private readonly baseUrl: string;
  private readonly defaultConfig: AxiosRequestConfig;

  /**
   * Funcion que se encarga de iniciarlizar los valores para el cliente de axios.
   * @param baseUrl Url de donde saldran todas las peticiones
   * @param defaultConfig Objeto con la configuracion de axios
   */
  static init(baseUrl: string, defaultConfig = {}): void {
    AxiosClient.client = new AxiosClient(baseUrl, defaultConfig);
  }

  /**
   * Funcion que obtiene la instancia del cliente.
   * @returns Instancia del cliente
   */
  static getClient(): AxiosClient {
    return AxiosClient.client;
  }

  constructor(baseUrl: string, defaultConfig: AxiosRequestConfig) {
    this.baseUrl = baseUrl;
    this.defaultConfig = defaultConfig;
  }

  /**
   * Funcion que hace una peticion get a axios.
   * @param url Url a la que se va hacer la peticion
   * @param config Objeto con la configuracion de axios
   * @returns Respuesta de la peticion a axios
   */
  get(url: string, config?: AxiosRequestConfig): Promise<any> {
    return this.request('GET', url, {}, config);
  }

  /**
   * Funcion que hace una peticion get a axios.
   * @param url Url a la que se va hacer la peticion
   * @param body Objeto con los parametros a enviar en la peticion
   * @param config Objeto con la configuracion de axios
   * @returns Respuesta de la peticion a axios
   */
  post(url: string, body = {}, config?: AxiosRequestConfig): Promise<any> {
    return this.request('POST', url, body, config);
  }

  /**
   * Funcion que arma la configuracion para que salgan todas las peticiones a axios.
   * @param method Metodo con el que va a hacerse la peticion a axios
   * @param url url a la que se va hacer la peticion
   * @param data Objeto con los parametros a enviar en la peticion
   * @param config Objeto con la configuracion de axios
   * @returns Respuesta de la peticion a axios
   */
  private request(
    method: MethodTypes,
    url: string,
    data = {},
    config?: AxiosRequestConfig
  ): Promise<any> {
    const { timeout, ...resConfig } = this.defaultConfig;
    const instanceAxios = Axios.create({
      baseURL: this.baseUrl,
      timeout,
      ...resConfig
    });

    let requestConfig = {
      method,
      url,
      ...config
    };

    if (!isEmpty(data)) {
      requestConfig.data = data;
    }

    return new Promise((resolve, reject) => {
      instanceAxios(requestConfig)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error.response?.data || {}));
    });
  }
}

export default AxiosClient;
