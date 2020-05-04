/**
 * 1.
 * Converts given strings to numbers and otherwise.
 *
 * @param values.
 * @returns {array} converted numbers.
 * @example
 *
 * func('1', 2, 3, '4')
 * // => [1, "2", "3", 4]
 */
function convert(...values) {
    for (let i = 0; i < values.length; i++) {
        const type = typeof values[i];
        if (type === 'string') {
            values[i] = +values[i];
        } else if (type === 'number') {
            values[i] = values[i].toString();
        }
    }

    return values;
}

convert('1', 2, 3, '4');

/**
 * 2.
 * Iterates over array and executes function on each element.
 *
 * @param {array} array to iterate.
 * @param {function} callback function to execute.
 * @returns {void}.
 * @example
 *
 * func([1,2,3], (el) => console.log(el * 2))
 * // => 2
 * // => 4
 * // => 6
 */
function executeforEach(array, callback) {
    for (let i = 0; i < array.length; i++) {
        callback(array[i]);
    }
}

//executeforEach([1,2,3], function(el) {console.log(el * 2)});

/**
 * 3.
 * Transforms array based on callback.
 * Converts string array item to number type.
 *
 * @param {array} array to transform.
 * @param {function} callback function to execute.
 * @returns {array}.
 * @example
 *
 * func([2,'5',8], (el) => return el + 3)
 * // => [5, 8, 11]
 */
function mapArray(array, callback) {
    const out_arr = [];

    const mod_callback = (el) => {
        out_arr.push(callback(+el));
    };

    executeforEach(array, mod_callback);

    return out_arr;
}

mapArray([2, '5', 8], function (el) {
    return el + 3
});

/**
 * 4.
 * Filters array based on callback.
 *
 * @param {array} array to filter.
 * @param {function} callback function to execute.
 * @returns {array}.
 * @example
 *
 * func([2,5,8], (el) => return el % 2 === 0)
 * // => [2, 8]
 */
function filterArray(array, callback) {
    const out_arr = [];

    const mod_callback = (el) => {
        if (callback(el)) {
            out_arr.push(el);
        }
    };

    executeforEach(array, mod_callback);

    return out_arr;
}

filterArray([2, 5, 8], function(el) {
    return el % 2 === 0
});

/**
 * 5.
 * Checks is array contains a passed value.
 *
 * @param {array} array to find in.
 * @param {number} value to find.
 * @returns {boolean}.
 * @example
 *
 * func([2, 5, 8], 2)
 * // => true
 *
 * func([12, 4, 6], 5)
 * // => false
 */
function containsValue(array, value) {
    let result = false;

    executeforEach(array, (el) => {
        result = result || (el === value);
    });

    return result;
}

containsValue([2, 5, 8], 2);
containsValue([12, 4, 6], 5);

/**
 * 6.
 * Reverses word.
 *
 * @param {string} word to find in.
 * @returns {string}.
 * @example
 *
 * func('hey world')
 * // => "dlrow yeh"
 */
function flipOver(word) {
    let result = '';

    for (let i = word.length - 1; i >= 0; i--) {
        result += word[i];
    }

    return result;
}

flipOver('hey world');
