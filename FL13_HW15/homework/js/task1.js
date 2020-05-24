/**
 * Object.assign analog.
 *
 * @param {object} to destination.
 * @param {array} from objects to clay.
 * @returns {object} Returns the object that contains all properties of arguments.
 * @example
 *
 * func({}, {a:1, b:4}, {b:6, c:8})
 * // => {a:1, b:6, c:8}
 *
 */
function assign(to, ...from) {

    from.forEach((item) => {
        for (const property in item) {
            if (item.hasOwnProperty(property)) {
                to[property] = item[property];
            }
        }
    });

    return to;
}