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
        result = result || el === value;
    });

    return result;
}

/**
 * 6.
 * Reverses word.
 *
 * @param {string} word to reverse.
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

/**
 * 7.
 * Creates array from provided range.
 *
 * @param {array} range.
 * @returns {array}.
 * @example
 *
 * func([2, 7])
 * // => [2, 3, 4, 5, 6, 7]
 */
function makeListFromRange(range) {
    const arr = [];
    const MAX_RANGE = 2;

    if (range.length > MAX_RANGE) {
        return arr;
    }

    for (let i = range[0]; i < range[range.length - 1] + 1; i++) {
        arr.push(i);
    }

    return arr;
}

/**
 * 8.
 * Generates array of values by passed key name.
 *
 * @param {array} array of objects.
 * @param {string} key to find in object.
 * @returns {array}.
 * @example
 *
 * func([
 *  {name: 'apple', weight: 0.5},
 *  {name: 'pineapple', weight: 2}
 * ], 'name'))
 * // => ["apple", "pineapple"]
 */
function getArrayOfKeys(array, key) {
    const out_arr = [];

    const callback = (el) => {
        if (el.hasOwnProperty(key)) {
            out_arr.push(el[key]);
        }
    };

    executeforEach(array, callback);

    return out_arr;
}

/**
 * 9.
 * Replaces numbers less then 20 and greater then 10 by '*'.
 *
 * @param {array} array of numbers.
 * @returns {array}.
 * @example
 *
 * func([58, 14, 48, 12, 31, 19, 10])
 * // => [58, "*", 48, "*", 31, "*", 10]
 */
function substitute(array) {
    const TOP_CAP = 20, BOTTOM_CAP = 10;

    return mapArray(array, (el) => {
        if (el < TOP_CAP && el > BOTTOM_CAP) {
            return '*';
        }

        return el;
    });
}

/**
 * 10.
 * Subtracts days from date.
 *
 * @param {Date} date.
 * @param {number} days.
 * @returns {number} day number in month.
 * @example
 *
 * func(new Date(2020, 0, 2), 1)
 * // => 1
 *
 * func(new Date(2020, 0, 2), 2)
 * // => 31
 *
 * func(new Date(2020, 0, 2), 365)
 * // => 2
 */
function getPastDay(date, days) {
    const HOUR = 24, SECONDS = 60, MINUTES = 60, MILLISECONDS = 1000;
    const milliseconds_back = HOUR * MINUTES * SECONDS * MILLISECONDS * days;
    const pastDate = new Date();
    pastDate.setTime(date.getTime() - milliseconds_back);

    return pastDate.getDate();
}

/**
 * 11.
 * Converts date in "YYYY/MM/DD HH:mm" format.
 *
 * @param {Date} date.
 * @returns {string} date in specific format.
 * @example
 *
 * func(new Date('6/15/2019 09:15:00'))
 * // => 2019/06/15 09:15
 *
 * func(new Date())
 * // => 2020/05/04 14:41
 */
function formatDate(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minutes = date.getMinutes();

    const MIN_TWO_SIGN = 10;
    month = month < MIN_TWO_SIGN ? '0' + month : month;
    day = day < MIN_TWO_SIGN ? '0' + day : day;
    hour = hour < MIN_TWO_SIGN ? '0' + hour : hour;
    minutes = minutes < MIN_TWO_SIGN ? '0' + minutes : minutes;

    return year + '/' + month + '/' + day + ' ' + hour + ':' + minutes;
}
