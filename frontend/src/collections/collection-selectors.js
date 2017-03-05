import { createSelector } from 'reselect';
import Immutable from 'immutable';

const collectionFind = name => collection => collection.get('name') === name;

export const currentCollectionSelector = createSelector(
  (collectionList, path) => collectionList,
  (collectionList, path) => path ? path.split('/') : [],
  (collectionList, splitPath) => {
    let currentCollection = null, parentCollection = null, searchableList = collectionList;

    for (var i = 0; collectionList && i < splitPath.length; i++) {
      parentCollection = currentCollection;
      currentCollection = searchableList.find(collectionFind(splitPath[i]));
      searchableList = currentCollection.get('children');
    }

    return Immutable.Map({currentCollection, parentCollection});
  }
);


    // const collectionPath = splat ? splat.split('/') : [];
    // const collectionFind = i => collection => collection.get('name') === collectionPath[i];

    // let renderableCollectionList = collectionList;
    // let currentCollection;

    // for (var i = 0; collectionList && i < collectionPath.length; i++) {
    //   currentCollection = renderableCollectionList.find(collectionFind(collectionPath[i]));
    //   renderableCollectionList = currentCollection.get('children')
    //     ? currentCollection.get('children')
    //     : renderableCollectionList;
    // }

    // let splatStr = '';
    // if (currentCollection && currentCollection.get('children')) {
    //   splatStr = splat ? `${splat}/` : '';
    // } else {
    //   splatStr = splat ? splat.replace(/[^/]+(?=\/$|$)/, '') : splatStr;
    // }


