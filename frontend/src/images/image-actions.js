import client from '../client';
import querystring from 'querystring';

export const FETCH_IMAGE_LIST = 'FETCH_IMAGE_LIST';
export function fetchImageList(page) {
  const query = !page ? null : `?${querystring.encode({page})}`;

  return {
    type: FETCH_IMAGE_LIST,
    promise: client.get(`images/list${query}`),
  }
};
