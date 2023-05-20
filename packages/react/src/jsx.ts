import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import type { Type, Key, Ref, Props, ReactElement, ReactElementType } from 'shared/ReactTypes';

// ReactElement
const ReactElement = (type: Type, key: Key, ref: Ref, props: Props): ReactElementType => {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
    __mark: 'li-jia-nan',
  };
  return element;
};

export const jsx = (type: ReactElementType, config: any, ...maybeChildren: any[]) => {
  let key: Key = null;
  let ref: Ref = null;
  const props: Props = {};
  for (const prop in config) {
    const value = config[prop];
    if (prop === 'key') {
      if (value !== undefined) {
        key = '' + value;
      }
      continue;
    }
    if (prop === 'ref') {
      if (value !== undefined) {
        ref = value;
      }
      continue;
    }
    if (Object.hasOwnProperty.call(config, prop)) {
      props[prop] = value;
    }
  }
  const childrenLength = maybeChildren.length;
  if (childrenLength) {
    if (childrenLength === 1) {
      props.children = maybeChildren[0];
    } else {
      props.children = maybeChildren;
    }
  }
  return ReactElement(type, key, ref, props);
};

export const jsxDEV = jsx;
