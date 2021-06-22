const toCamel = constName => Array.from(constName).map((char, index) => index === 0 ? char : char.toLowerCase()).join('');
const assertsGenerator = dataType => target => typeOf(target) === dataType;

/**
 * @typedef {object} Asserts
 * @property {Function} isArray
 * @property {Function} isString
 * @property {Function} isBoolean
 * @property {Function} isNumber
 * @property {Function} isSymbol
 * @property {Function} isObject
 * @property {Function} isFunction
 * @property {Function} isPromise
 * @type {Asserts}
 */
const asserts = {};

/**
 * 返回一个类型字符串
 * @param target 目标对象
 * @returns {string}
 */
export function typeOf(target) {
  return Object.prototype.toString.call(target);
}

/**
 * @type {[index: string]: string}
 */
export const DATA_TYPE = {
  STRING: '[object String]',
  OBJECT: '[object Object]',
  ARRAY: '[object Array]',
  BOOLEAN: '[object Boolean]',
  NUMBER: '[object Number]',
  SYMBOL: '[object Symbol]',
  FUNCTION: '[object Function]',
  PROMISE: '[object Promise]',
  ASYNC_FUNCTION: '[object AsyncFunction]',
};

for (const name of Reflect.ownKeys(DATA_TYPE)) {
  asserts[`is${toCamel(name)}`] = assertsGenerator(DATA_TYPE[name]);
}

export default asserts;
