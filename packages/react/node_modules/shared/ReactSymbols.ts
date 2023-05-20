const supportSymbols = typeof Symbol === 'function' && Symbol.for;

export const REACT_ELEMENT_TYPE = supportSymbols ? Symbol.for('react.element') : 0xeac7;
