const baseUrl = 'http://localhost:3000';
const appContainer = document.getElementById('app-container');
const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NO_CONTENT = 204;

function renderCreateForm() {
    return `<form action="${baseUrl}/users" method="POST" name="form-create">
        <input type="text" name="name" required>
        <input type="text" name="username" required>
        <button type="submit">Save</button>
    </form><hr>`;
}


function renderLayout() {
    return `<section>
        <h3>App Users</h3>
        ${renderCreateForm()}
    
        <section class="user-list">
        <p>Loading...</p>
        </section>
    </section>`;
}

function renderUserList(users) {
    let html = '';

    for (const user of JSON.parse(users)) {
        html += `<div>
    <span class="user-id">${user.id}</span>
    <form class="form-update" action="${baseUrl}/users/${user.id}">
        <input type="text" name="name" value="${user.name}" required>
        <input type="text" name="username" value="${user.username}" required>
        <button type="submit">Update</button>
    </form>
    <form action="${baseUrl}/users/${user.id}">
        <button type="submit">Delete</button>
    </form>
    </div>`;
    }

    return html;
}

function formDataToObject(formData) {
    const data = {};
    const values = formData.entries();

    for (const element of values) {
        data[element[0]] = element[1];
    }

    return data;
}

appContainer.innerHTML = renderLayout();
const user_list = document.getElementsByClassName('user-list')[0];

function fetchUsers() {
    const httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === HTTP_OK) {
                user_list.innerHTML = renderUserList(httpRequest.responseText);
            } else {
                console.error('Fetch users request failed!');
            }
        }
    };

    httpRequest.open('GET', `${baseUrl}/users`);
    httpRequest.send();
}

window.onload = fetchUsers;

document.forms['form-create'].onsubmit = function (e) {
    e.preventDefault();

    const data = formDataToObject(new FormData(this));
    const httpRequest = new XMLHttpRequest();

    const submit_btn = this.querySelector('button');
    submit_btn.disabled = true;

    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === HTTP_CREATED) {
                fetchUsers();
                this.reset();
            } else {
                console.error('Create users request failed!');
            }
            submit_btn.disabled = false;
        }
    };

    httpRequest.open('POST', `${baseUrl}/users`);
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.send(JSON.stringify(data));
};

user_list.onsubmit = function (e) {
    e.preventDefault();

    const submit_btn = e.target.querySelector('button');
    submit_btn.disabled = true;

    if (e.target.classList.contains('form-update')) {

        const httpRequest = new XMLHttpRequest();
        const data = formDataToObject(new FormData(e.target));
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === HTTP_NO_CONTENT) {
                    fetchUsers();
                } else {
                    console.error('Update user request failed!');
                }
            }
        };

        httpRequest.open('PUT', e.target.getAttribute('action'));
        httpRequest.setRequestHeader('Content-Type', 'application/json');
        httpRequest.send(JSON.stringify(data));
    } else {
        const httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === HTTP_NO_CONTENT) {
                    fetchUsers();
                } else {
                    console.error('Delete user request failed!');
                }
            }
        };

        httpRequest.open('DELETE', e.target.getAttribute('action'));
        httpRequest.setRequestHeader('Authorization', 'admin');
        httpRequest.send();
    }
};