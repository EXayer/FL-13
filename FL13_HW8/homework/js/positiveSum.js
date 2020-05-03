function isBigger(a, b) {
    return a > b;
}

/**
 * Calculates the sum of positive numbers of array.
 *
 * @param {array} numbers.
 * @returns {number} sum of positive numbers.
 * @example
 *
 * func([2,4,6,8])
 * // => 20
 *
 * func([0,-3,5,7])
 * // => 12
 */
function positiveSum(numbers) {
    let sum = 0;

    for(let i = 0; i < numbers.length; i++) {
        if (isBigger(numbers[i],0)) {
            sum += numbers[i];
        }
    }

    return sum;
}

positiveSum([2,4,6,8]);
positiveSum([0,-3,5,7]);
