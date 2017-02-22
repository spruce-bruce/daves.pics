import client from '../client';
import querystring from 'querystring';

export const FETCH_IMAGE_LIST = 'FETCH_IMAGE_LIST';
export function fetchImageList(page, filter) {
  const query = !page ? null : `?${querystring.encode(Object.assign({}, {page}, filter))}`;
  return {
    type: FETCH_IMAGE_LIST,
    promise: client.get(`images/list${query}`),
  }
};
