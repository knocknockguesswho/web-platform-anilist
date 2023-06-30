import React from 'react';
import { TColor, TIconName, TIconSize } from 'Helpers/common-type';

export interface IIconContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  name: TIconName;
  size: TIconSize;
  color: TColor;
}

export interface ISigninData {
  tokenType?: string;
  expiresIn?: number;
  accessToken?: string;
  refreshToken?: string;
}

export interface IContextState<T> { state: T; setState: React.Dispatch<React.SetStateAction<T>>; }
export type TContextState<T> = [T, React.Dispatch<React.SetStateAction<T>>]
export interface IContextProps { children?: React.ReactNode; }

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface IInputForm<V, E> { values: V; errorMessages: E; }
