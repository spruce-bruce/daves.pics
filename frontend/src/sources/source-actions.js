import client from '../client';

export const FETCH_SOURCE_LIST = 'FETCH_SOURCE_LIST';
export function fetchSourceList() {
  return {
    type: FETCH_SOURCE_LIST,
    promise: client.get('sources/list'),
  }
};
