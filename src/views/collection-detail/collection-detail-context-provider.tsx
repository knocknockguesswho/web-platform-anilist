import React from 'react';
import { IContextProps, TContextState } from 'Helpers/common-interface';
import { IAnimeCollectionData } from 'Assets/constant/anime-collection-db';

export interface ICollectionDetailCtxValue {
  collectionDetail?: IAnimeCollectionData;
  isEditCollectionModalActive: boolean;
  selectedItemIdToRemove: number | null;
}

export const InitialCollectionDetailCtx: ICollectionDetailCtxValue = {
  isEditCollectionModalActive: false,
  selectedItemIdToRemove: null,
};
export const CollectionDetailCtx = React.createContext<TContextState<ICollectionDetailCtxValue>>([
  InitialCollectionDetailCtx,
  (prevState) => prevState,
]);

const CollectionDetailCtxProvider = (props: IContextProps) => {
  const [state, setState] = React.useState<ICollectionDetailCtxValue>(InitialCollectionDetailCtx);
  return (
    <CollectionDetailCtx.Provider value={[state, setState]}>
      {props.children}
    </CollectionDetailCtx.Provider>
  );
};

export default CollectionDetailCtxProvider;
