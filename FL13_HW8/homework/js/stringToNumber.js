/**
 * Converts string to number.
 *
 * @param {string} str string to convert.
 * @returns {number} converted to number string.
 * @example
 *
 * func('123')
 * // => 123
 *
 * func('123.33')
 * // => 123.33
 */
function stringToNumber(str) {
    return +str;
}

stringToNumber('123');
stringToNumber('123.33');