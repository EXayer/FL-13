(function () {
    const WORD_DIVIDER = 2,
        EVEN_DIVIDER = 2;


    const word = prompt('Enter a word');

    if (! word.trim().length) {
        alert('Invalid value');

        return false;
    }

    const middle = Math.floor(word.length / WORD_DIVIDER);

    if (word.length % EVEN_DIVIDER) {
        alert(word[middle]);
    } else {
        alert(word[middle-1] + word[middle]);
    }

}());
