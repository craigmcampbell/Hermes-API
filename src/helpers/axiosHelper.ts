import axios from 'axios';
import JsonApiResponse from '../models/jsonApi/JsonApiResponse';
import { buildErrorResponse } from '../helpers/jsonApiResponseHelper';
import Debug from 'debug';

const debug = Debug('app:axiosHelper');

const apiUrl = process.env.API_URL;
const token = process.env.API_URL_TOKEN;

export const get = async (
  apiPath: string,
  apiVersion: string = '1.0'
): Promise<JsonApiResponse> => {
  const url = getFullApiPath(apiPath);

  try {
    const config = getConfig(apiVersion);
    return await axios.get<JsonApiResponse>(url, config);
  } catch (error) {
    return buildErrorResponse(
      error.response.status,
      'API Error',
      error,
      url,
      ''
    );
  }
};

export const post = async (
  apiPath: string,
  dto: any,
  apiVersion: string = '1.0'
): Promise<JsonApiResponse> => {
  const url = getFullApiPath(apiPath);

  try {
    const config = getConfig(apiVersion);
    return await axios.post(url, dto, config);
  } catch (error) {
    if (error.response != undefined) {
      return buildErrorResponse(
        error.response.status,
        'API Error',
        error,
        url,
        ''
      );
    }

    throw error;
  }
};

export const put = async (
  apiPath: string,
  dto: any,
  apiVersion: string = '1.0'
): Promise<JsonApiResponse> => {
  const url = getFullApiPath(apiPath);

  try {
    const config = getConfig(apiVersion);
    return await axios.put(url, dto, config);
  } catch (error) {
    return buildErrorResponse(
      error.response.status,
      'API Error',
      error,
      url,
      ''
    );
  }
};

export const deleteByNumericId = async (
  apiPath: string,
  id: number,
  apiVersion: string = '1.0'
) => {
  const url = getFullApiPath(apiPath);

  try {
    const config = {
      headers: {
        'api-version': apiVersion,
        Authorization: token,
        token: token,
      },
      params: { id: id },
    };

    return await axios.delete(url, config);
  } catch (error) {
    return buildErrorResponse(
      error.response.status,
      'API Error',
      error,
      url,
      ''
    );
  }
};

export const deleteByStringId = async (
  apiPath: string,
  id: string,
  apiVersion: string = '1.0'
) => {
  const url = getFullApiPath(apiPath);

  try {
    const config = {
      headers: {
        'api-version': apiVersion,
        Authorization: token,
      },
      params: { id: id },
    };

    return await axios.delete(url, config);
  } catch (error) {
    return buildErrorResponse(
      error.response.status,
      'API Error',
      error,
      url,
      ''
    );
  }
};

function getFullApiPath(apiPath: string): string {
  return `${apiUrl}/${apiPath}`;
}

function getConfig(apiVersion: string) {
  return {
    headers: {
      'api-version': apiVersion,
      Authorization: token,
    },
    params: [],
  };
}
