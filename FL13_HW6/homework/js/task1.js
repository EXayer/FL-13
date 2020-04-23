(function () {
    const check_number = Number.parseFloat(prompt('Check number'));

    if (isNaN(check_number) || check_number < 0) {
        alert('Invalid input data');

        return false;
    }

    const tip_percent = Number.parseFloat(prompt('Tip'));

    if (isNaN(tip_percent) || tip_percent < 0 || tip_percent > 100) {
        alert('Invalid input data');

        return false;
    }

    const tip_amount = check_number * tip_percent / 100;
    const total = tip_amount + check_number;

    alert(
`Check number: ${check_number}
Tip: ${tip_percent}%
Tip amount: ${outputNumber(tip_amount)}
Total sum to pay: ${outputNumber(total)}`
    );

    function outputNumber(number) {
        if (number % 1 === 0) {
            return number;
        }

        return number.toFixed(2);
    }

}());
