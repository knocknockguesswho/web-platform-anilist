import React from 'react';
import { IContextProps, TContextState } from 'Helpers/common-interface';
import { IAnilistMedia } from 'Helpers/interfaces/anilist-media';

export interface IMediaListStateItem {
  currentPage: number;
  items?: Array<IAnilistMedia>
  hasNextPage?: boolean;
}

export interface IMediaListState {
  trending: IMediaListStateItem;
  popular: IMediaListStateItem;
}

export const InitialMediaListCtx: IMediaListState = {
  trending: { currentPage: 1, items: [], hasNextPage: false },
  popular: { currentPage: 1, items: [], hasNextPage: false },
};
export const MediaListCtx = React.createContext<TContextState<IMediaListState>>([
  InitialMediaListCtx,
  (prevState) => prevState,
]);

const MediaListCtxProvider = (props: IContextProps) => {
  const [state, setState] = React.useState<IMediaListState>(InitialMediaListCtx);
  return (
    <MediaListCtx.Provider value={[state, setState]}>
      {props.children}
    </MediaListCtx.Provider>
  );
};

export default MediaListCtxProvider;
