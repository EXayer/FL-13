/**
 * Checks a is bigger then b.
 *
 * @param {number} a first number.
 * @param {number} b second number.
 * @returns {boolean} Returns the result of comparison a to b.
 * @example
 *
 * func(3, 2)
 * // => true
 *
 * func(2, 3)
 * // => false
 *
 * func(2, 2)
 * // => false
 */
function isBigger(a, b) {
    return a > b;
}

isBigger(3, 2);
isBigger(2, 3);
isBigger(2, 2);
