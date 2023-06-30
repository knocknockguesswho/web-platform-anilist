import React from 'react';
import { IContextProps, TContextState } from 'Helpers/common-interface';
import { IAnimeCollectionData } from 'Assets/constant/anime-collection-db';

export interface ICollectionListCtxValue {
  collectionList: Array<IAnimeCollectionData>;
  isCollectionModifierModalActive: boolean;
  selectedItemToEdit: IAnimeCollectionData | null;
  selectedItemToRemove: IAnimeCollectionData | null;
}

export const InitialCollectionListCtx: ICollectionListCtxValue = {
  collectionList: [],
  isCollectionModifierModalActive: false,
  selectedItemToEdit: null,
  selectedItemToRemove: null,
};
export const CollectionListCtx = React.createContext<TContextState<ICollectionListCtxValue>>([
  InitialCollectionListCtx,
  (prevState) => prevState,
]);

const CollectionListCtxProvider = (props: IContextProps) => {
  const [state, setState] = React.useState<ICollectionListCtxValue>(InitialCollectionListCtx);
  return (
    <CollectionListCtx.Provider value={[state, setState]}>
      {props.children}
    </CollectionListCtx.Provider>
  );
};

export default CollectionListCtxProvider;
