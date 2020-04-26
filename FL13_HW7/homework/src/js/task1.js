(function () {
    const users = {
      'User': 'UserPass',
      'Admin': 'RootPass',
    };

    const MAX_USERNAME_LENGTH = 4;

    const user_name = prompt('Username');

    if (!user_name || !user_name.trim().length) {
        alert('Canceled');

        return false;
    }

    if (user_name.length < MAX_USERNAME_LENGTH) {
        alert('I don\'t know any users having name length less than 4 symbols');

        return false;
    }

    if (!user_name in users) {
        alert('I don’t know you');

        return false;
    }

}());
