import axios, { AxiosResponse } from 'axios';
import logger from './logger';

/**
 * Api service for GET requests
 * @param url 
 * @param uplParam 
 * @returns Promise<any>
 */
const apiGetRequest = async (url: string, uplParam?: string): Promise<any> => {
  try {
    const apiUrl: string = `http://localhost:3001/${url}/${uplParam}`;
    logger.info('====apiUrl====', apiUrl);
    // const urlData: AxiosResponse<any> = await axios.get(apiUrl);
    const urlData: AxiosResponse<any> = await axios({
      method: 'get',
      url: apiUrl,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // console.log('====urlData====', urlData);
    return urlData;
  } catch (error) {
    logger.error('error occurred in apiGetRequest> ', error.message);
  }
};


/**
 * Api service for POST requests
 * @param url 
 * @param uplParam 
 * @returns Promise<any>
 */
const apiPostRequest = async (url: string, data: any): Promise<any> => {
  try {
    const apiUrl: string = `http://localhost:3001/${url}`;
    logger.log('====apiUrl====', apiUrl);
    logger.log('====api data====', data);

    const urlData: AxiosResponse<any> = await axios({
      method: 'post',
      url: apiUrl,
      data,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    logger.log('====urlData====', urlData.data);
    return urlData.data;
  } catch (e) {
    logger.error('error occurred in apiPostRequest> ', e.message);
  }
};

export { apiGetRequest, apiPostRequest };
