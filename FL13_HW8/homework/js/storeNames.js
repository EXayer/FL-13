/**
 * Glues strings into array.
 *
 * @param {string} names.
 * @returns {array} of names.
 * @example
 *
 * func('John', 'Joe', 'Jack')
 * // => ["John", "Joe", "Jack"]
 */
function storeNames(...names) {
    return names;
}

storeNames('John', 'Joe', 'Jack');