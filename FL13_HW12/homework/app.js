const root = document.getElementById('root');

const layout = `<h1>Book Archive</h1>
    <div class="container">
        <div class="nav-container">
        <hr>
        <a href="/#add" class="add-link">Add book</a>
        </div>
        <div class="action-container">
        </div>
</div>`;

root.appendChild(document.createRange().createContextualFragment(layout));
const nav_container_elem = document.getElementsByClassName('nav-container')[0];
const action_container_elem = document.getElementsByClassName('action-container')[0];

function serialize() {
    localStorage.books = JSON.stringify(Array.from(window.books.entries()));
}

function deserialize() {
    window.books = new Map(JSON.parse(localStorage.books));
    window.uid = [...window.books.keys()].pop() + 1;
}

function renderBookList() {
    let list = '<ul>';

    window.books.forEach((value, key) => {
        list += renderBookListItem(key, value.name);
    });

    list += '</ul>';

    return list;
}

function renderBookListItem(key, name) {
    return `<li><a href="/?id=${key}#preview" class="preview-link" id="book-${key}">${name}</a> 
                 <a href="/?id=${key}#edit" class="edit-link">edit</a></li>`;
}

function viewMode(type, id = null) {
    switch (type) {
        case '#preview':
            action_container_elem.innerHTML = renderPreview(id);
            break;
        case '#add':
            action_container_elem.innerHTML = renderCreate();
            listenCreate();
            break;
        case '#edit':
            action_container_elem.innerHTML = renderEdit(id);
            listenEdit(id);
            listenReset(id);
            break;
        default:
            action_container_elem.innerHTML = ''
    }
}

function renderPreview(id) {
    const book = window.books.get(Number.parseInt(id));

    if (!book) {
        return '<h3>Book not found</h3>';
    }

    return `<div class="view-mode preview-mode">
        <h3>${book.name}</h3>
        <div class="preview-mode-container">
        <img src="${book.image}" alt="${book.name} photo" width="200px">
        <div class="view-mode-details">
            <p><strong>Author</strong>: ${book.author}</p>
            <p><strong>Plot</strong>: <i>${book.plot}</i></p>
        </div>
        </div>
    </div>`;
}

function renderEdit(id) {
    const book = window.books.get(Number.parseInt(id));

    if (!book) {
        return '<h3>Book not found</h3>';
    }

    return `<div class="view-mode edit-mode">
        <h3>Editing Book #${id}</h3>
       
        <form id="formEdit${id}">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text"
                       placeholder="Title"
                       id="title"
                       name="name"
                       value="${book.name}"
                       required
                       maxlength="255">
             </div>
            
            <div class="form-group">       
                <label for="image">Preview Image</label>
                <input type="text"
                       placeholder="Preview Image"
                       id="image"
                       name="image"
                       value="${book.image}"
                       required
                       maxlength="1024">
            </div>
            
            <div class="form-group">              
                <label for="author">Author</label>
                <input type="text"
                       placeholder="Author"
                       id="author"
                       name="author"
                       value="${book.author}"
                       required
                       maxlength="255">
            </div>
            
            <div class="form-group">          
                <label for="plot">Plot</label>
                <input type="text"
                       placeholder="Plot"
                       id="plot"
                       name="plot"
                       value="${book.plot}"
                       required
                       maxlength="127">
             </div>
             
             <button type="submit">Save</button>
             <button type="reset">Reset</button>
       </form>
    </div>`;
}

function listenEdit(id) {
    const form = document.getElementById('formEdit' + id);

    if (!form) {
        return;
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const ALERT_DELAY = 300;
        const formData = new FormData(this);
        const edited_book = {};
        formData.forEach((value, key) => {
            edited_book[key] = value;
        });

        window.books.set(Number.parseInt(id), edited_book);
        serialize();

        const link = document.getElementById('book-' + id);

        link.innerText = edited_book.name;
        link.click();

        setTimeout(() => {
            alert('Book successfully updated');
        }, ALERT_DELAY);
    });
}

function listenReset(id) {
    const form = document.getElementById('formEdit' + id);

    if (!form) {
        return;
    }

    form.addEventListener('reset', function (event) {
        event.preventDefault();

        if (!confirm('Discard changes?')) {
            return;
        }

        history.back();
    });
}

function renderCreate() {
    return `<div class="view-mode edit-mode">
        <h3>Add Book</h3>
       
        <form id="formCreate">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text"
                       placeholder="Title"
                       id="title"
                       name="name"
                       required
                       maxlength="255">
             </div>
            
            <div class="form-group">       
                <label for="image">Preview Image</label>
                <input type="text"
                       placeholder="Preview Image"
                       id="image"
                       name="image"
                       required
                       maxlength="1024">
            </div>
            
            <div class="form-group">              
                <label for="author">Author</label>
                <input type="text"
                       placeholder="Author"
                       id="author"
                       name="author"
                       required
                       maxlength="255">
            </div>
            
            <div class="form-group">          
                <label for="plot">Plot</label>
                <input type="text"
                       placeholder="Plot"
                       id="plot"
                       name="plot"
                       required
                       maxlength="127">
             </div>
             
             <button type="submit">Save</button>
       </form>
    </div>`;
}

function listenCreate() {
    const form = document.getElementById('formCreate');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(this);
        const new_book = {};
        formData.forEach((value, key) => {
            new_book[key] = value;
        });

        window.books.set(window.uid++, new_book);
        serialize();

        const book_list_item = document.createRange()
            .createContextualFragment(renderBookListItem(window.uid - 1, new_book.name));

        nav_container_elem.getElementsByTagName('ul')[0].appendChild(book_list_item);
    });
}

if (!localStorage.getItem('books')) {
    serialize();
} else {
    deserialize();
}

nav_container_elem.prepend(document.createRange().createContextualFragment(renderBookList()));

root.addEventListener('click', event => {
    if (event.target.tagName !== 'A') {
        return;
    }

    event.preventDefault();

    const state = {};
    let url = document.location.origin + document.location.pathname;
    let id = null;

    if (event.target.search) {
        const urlParams = new URLSearchParams(event.target.search);

        for (const [key, value] of urlParams) {
            state[key] = value;
        }

        url += event.target.search;
        id = urlParams.get('id');
    }

    viewMode(event.target.hash, id);

    history.pushState(state, '', url + event.target.hash);
});

function setViewState() {
    let id = null;

    if (document.location.search) {
        const urlParams = new URLSearchParams(document.location.search);

        id = urlParams.get('id');
    }

    viewMode(document.location.hash, id);
}

window.addEventListener('load', setViewState);
window.onpopstate = setViewState;
