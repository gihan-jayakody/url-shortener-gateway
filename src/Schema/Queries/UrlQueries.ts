import { UrlType, UrlTypeArray, UrlTypeArrayData } from '../TypeDefs/Urls';
import { GraphQLList, GraphQLID, GraphQLString } from 'graphql';
import {
  apiGetRequest,
  apiPostRequest
} from '../../Middleware/connection.handler';
import logger from '../../Middleware/logger';

interface GetUrlsListResolveArgs {
  parent: any;
  args: any;
}

const GET_URLS_LIST = {
  type: UrlType,
  async resolve(parent: GetUrlsListResolveArgs, args: any): Promise<any> {
    const urlData = await apiGetRequest('urls', '');
    logger.info('====urlData====', urlData.data[0]);
    return urlData.data[0];
  }
};

interface GetDataByShortenedUrlArgs {
  parent: any;
  args: {
    shortenedUrl: string;
  };
}

const GET_DATA_BY_SHORTENED_URL = {
  type: UrlType,
  args: {
    shortenedUrl: { type: GraphQLString }
  },
  async resolve(
    parent: GetDataByShortenedUrlArgs,
    args: { shortenedUrl: string }
  ): Promise<any> {
    const { shortenedUrl } = args;
    logger.info('====received shortenedUrl====', shortenedUrl);
    const urlData = await apiGetRequest(
      'retrieve',
      `?shortenedUrl=${shortenedUrl}`
    );
    logger.info('====urlData====', urlData.data);
    return urlData.data;
  }
};

interface CreateRecordByLongUrlArgs {
  parent: any;
  args: any;
}

const CREATE_RECORD_BY_LONG_URL = {
  type: UrlType,
  args: {
    longUrl: { type: GraphQLString }
  },
  async resolve(
    parent: CreateRecordByLongUrlArgs,
    args: { longUrl: string }
  ): Promise<any> {
    const { longUrl } = args;
    logger.info('====received longUrl====', longUrl);
    const urlData = await apiPostRequest('create', { longUrl });
    logger.info('====urlData====', urlData);
    return urlData;
  }
};

interface RedirectByShortenedUrlArgs {
  parent: any;
  args: {
    shortenedUrl: string;
  };
}

const REDIRECT_BY_SHORTENED_URL = {
  type: UrlType,
  args: {
    shortenedUrl: { type: GraphQLString }
  },
  async resolve(
    parent: RedirectByShortenedUrlArgs,
    args: { shortenedUrl: string }
  ): Promise<any> {
    const { shortenedUrl } = args;
    logger.info('====received shortenedUrl====', shortenedUrl);
    const urlData = await apiGetRequest(
      'redirect',
      `?shortenedUrl=${shortenedUrl}`
    );
    logger.info('====urlData====', urlData.data);
    return urlData.data;
  }
};

export {
  GET_URLS_LIST,
  GET_DATA_BY_SHORTENED_URL,
  CREATE_RECORD_BY_LONG_URL,
  REDIRECT_BY_SHORTENED_URL
};
