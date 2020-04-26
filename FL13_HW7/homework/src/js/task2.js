(function () {

    if (!confirm('Do you want to play a game?')) {
        alert('You did not become a billionaire, but can');

        return false;
    }

    const MAX_ATTEMPTS = 3;
    const POCKET_INCREASE = 5;
    const INIT_POCKETS = 5;
    let prize = 0;

    // game loop
    do {
        prize = 0;
        game(INIT_POCKETS, {
            1: 100,
            2: 50,
            3: 25
        });
    } while (confirm('Play again?'));

    function game(pocket_number, prizes) {
        let active_pocket = randomPocket(pocket_number);

        let attempt = 1;
        while (attempt <= MAX_ATTEMPTS) {
            const guess_pocket = Number.parseInt(prompt(
                'Choose a roulette pocket number from 0 to ' + pocket_number +
                '\nAttempts left: ' + (MAX_ATTEMPTS - attempt + 1) +
                '\nTotal prize: ' + prize + '$\n' +
                'Possible prize on current attempt: ' + prizes[attempt] + '$'
            ));

            // win
            if (guess_pocket === active_pocket) {
                prize += prizes[attempt];
                const next = confirm(
                    'Congratulation, you won!\nYour prize is: ' + prize + '$.\nDo you want to continue?'
                );

                if (next) {
                    // new level
                    game(pocket_number + POCKET_INCREASE, x2Prizes(prizes));

                    return;
                } else {
                    alert('Thank you for your participation.\nYour prize is: ' + prize + '$.');

                    return;
                }
                // lose
            } else if (!(MAX_ATTEMPTS - attempt)) {
                alert('Thank you for your participation.\nYour prize is: ' + prize + '$.');

                return;
            }

            attempt++;
        }
    }

    /*
     * Generates random integer from 0 to max(included).
     */
    function randomPocket(max) {
        return Math.floor(Math.random() * (max + 1))
    }

    /*
     * Increases prizes caps in 2.
     */
    function x2Prizes(prizes) {
        for (let key in prizes) {
            if(prizes.hasOwnProperty(key)) {
                prizes[key] *= 2;
            }
        }

        return prizes;
    }

}());
