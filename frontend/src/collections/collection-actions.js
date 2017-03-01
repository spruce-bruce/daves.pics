import client from '../client';

export const FETCH_COLLECTION_LIST = 'FETCH_COLLECTION_LIST';
export function fetchCollectionList(sourceId) {
  return {
    type: FETCH_COLLECTION_LIST,
    promise: client.get(`source/${sourceId}/collection/list`),
    sourceId,
  }
};
