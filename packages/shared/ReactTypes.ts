export type Type = any;
export type Key = any;
export type Ref = any;
export type Props = any;

export interface ReactElementType {
  $$typeof: symbol | number;
  type: any;
  key: Key;
  props: Props;
  ref: Ref;
  __mark: string;
}

export type Action<State> = State | ((prevState?: State) => State);
