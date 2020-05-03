/**
 * Counts occurrences second string in first.
 *
 * @param {string} text search in.
 * @param {string} query.
 * @returns {number} count of occurrences.
 * @example
 *
 * func('Maggy','g')
 * // => 2
 *
 * func('Barry','b')
 * // => 1
 *
 * func('','z')
 * // => 0
 */
function letterCount(text, query) {
    return text.toLowerCase().split(query.toLowerCase()).length - 1;
}

letterCount('Maggy','g');
letterCount('Barry','b');
letterCount('','z');
