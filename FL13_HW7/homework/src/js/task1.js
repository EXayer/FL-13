(function () {
    const users = {
      'User': 'UserPass',
      'Admin': 'RootPass'
    };

    const MAX_USERNAME_LENGTH = 4;
    const EVENING = 20;

    // username input
     const user_name = prompt('Username:');

    if (!user_name || !user_name.trim().length) {
        alert('Canceled');

        return false;
    }

    if (user_name.length < MAX_USERNAME_LENGTH) {
        alert('I don\'t know any users having name length less than 4 symbols');

        return false;
    }

    if (!users.hasOwnProperty(user_name)) {
        alert('I don’t know you');

        return false;
    }

    // password input
    const password = prompt('Password:');
    if (!password || !password.trim().length) {
        alert('Canceled');

        return false;
    }

    if (users[user_name] !== password) {
        alert('Wrong password');

        return false;
    }

    if (new Date().getHours() < EVENING) {
        alert(`Good day, dear ${user_name}!`)
    } else {
        alert(`Good evening, dear ${user_name}!`)
    }

    return true;

}());
