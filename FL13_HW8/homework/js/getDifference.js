function isBigger(a, b) {
    return a > b;
}

/**
 * Calculates absolute difference of two numbers.
 *
 * @param {number} a first number.
 * @param {number} b second number.
 * @returns {number} Returns the absolute difference.
 * @example
 *
 * func(5, 3)
 * // => 2
 *
 * func(5, 8)
 * // => 3
 *
 * func(13, -27)
 * // => 40
 */
function getDifference(a, b) {
    if (!isBigger(a, b)) {
        return b - a;
    }

    return a - b;
}

getDifference(5,3);
getDifference(5,8);
getDifference(13,-27);
