const data = [
    {
        'folder': true,
        'title': 'Pictures',
        'children': [
            {
                'title': 'logo.png'
            },
            {
                'folder': true,
                'title': 'Vacations',
                'children': [
                    {
                        'title': 'spain.jpeg'
                    }
                ]
            }
        ]
    },
    {
        'folder': true,
        'title': 'Desktop',
        'children': [
            {
                'folder': true,
                'title': 'screenshots',
                'children': null
            }
        ]
    },
    {
        'folder': true,
        'title': 'Downloads',
        'children': [
            {
                'folder': true,
                'title': 'JS',
                'children': null
            },
            {
                'title': 'nvm-setup.exe'
            },
            {
                'title': 'node.exe'
            }
        ]
    },
    {
        'title': 'credentials.txt'
    }
];

const rootNode = document.getElementById('root');

class ExplorerItem {

    constructor(id, title, is_folder = true, parent = null, has_children = false) {
        this._id = id;
        this._title = title;
        this._is_folder = is_folder;
        this._has_children = has_children;
        this._parent = parent;
        this._is_opened = false;
        this._dispayed = !parent;
    }

    render() {
        let icon = '<i class="material-icons file-icon">insert_drive_file</i>';
        const display_class = this._dispayed ? 'd-block' : 'd-none';

        if (this._is_folder) {
            if (this._is_opened) {
                icon = '<i class="material-icons folder-icon">folder_open</i>';
            } else {
                icon = '<i class="material-icons folder-icon">folder</i>';
            }
        }

        let child_container = '<div class="nav-item-children"></div>';
        if (this.isFolder() && !this._has_children) {
            child_container = '<div class="folder-empty d-none">Folder is Empty</div>';
        }

        const dot_at = this._title.indexOf('.');
        let name_html = '';
        if (dot_at > 0) {
            name_html = `<span class="nav-item-name">${this._title.substr(0, dot_at)}</span><span
                          class="nav-item-ext">${this._title.substr(dot_at, this._title.length - dot_at)}</span>`;
        } else {
            name_html = `<span class="nav-item-name">${this._title}</span>`;
        }

        return `<div class="nav-item ${display_class}" id="${this._id}">
           <div class="nav-item-content">${icon} ${name_html}</div>
           ${child_container}
           </div>`;
    }

    isFolder() {
        return this._is_folder;
    }

    open(el) {
        this._is_opened = !this._is_opened;
        el.getElementsByTagName('i')[0].innerText = this._is_opened ? 'folder_open' : 'folder';

        if (this.isFolder() && !this._has_children) {
            const empty_folder = el.getElementsByClassName('folder-empty')[0];
            if (this._is_opened) {
                empty_folder.classList.remove('d-none');
            } else {
                empty_folder.classList.add('d-none');
            }
        }
    }

    show(id) {
        this._dispayed = !this._dispayed;
        const elem = document.getElementById(id);
        if (this._dispayed) {
            elem.classList.remove('d-none');
            elem.classList.add('d-block');
        } else {
            elem.classList.remove('d-block');
            elem.classList.add('d-none');
        }
    }
}

let id = 1;
const nav_elements = new Map();

function makeTree(data, parent = null) {
    for (let [, value] of Object.entries(data)) {
        const has_folder = value.hasOwnProperty('folder');
        const explorerItem = new ExplorerItem(
            id.toString(),
            value['title'],
            has_folder,
            parent,
            has_folder && !!value['children']
        );
        nav_elements.set((id++).toString(), explorerItem);

        if (has_folder && value['children']) {
            makeTree(value['children'], explorerItem);
        }
    }
}

function renderTree() {
    nav_elements.forEach((value) => {
        const elem = document.createRange().createContextualFragment(value.render());

        if (value._parent) {
            document.getElementById(value._parent._id)
                .getElementsByClassName('nav-item-children')[0]
                .appendChild(elem);
        } else {
            rootNode.appendChild(elem);
        }
    });
}

makeTree(data);
renderTree();

let action_target = null;
const menu = `<div id="context-menu" class="d-none">
                  <ul>
                    <li data-action="rename">Rename</li>
                    <li data-action="remove">Delete item</li>
                  </ul>
               </div>`;

rootNode.appendChild(document.createRange().createContextualFragment(menu));

const menu_el = document.getElementById('context-menu');
document.addEventListener('click', () => {
    menu_el.classList.add('d-none');
    if (action_target) {
        action_target.children[0].classList.remove('focused');
    }
}, false);

Array.prototype.forEach.call(document.getElementsByClassName('nav-item'), function (el) {
    el.addEventListener('click', function (event) {
        event.stopPropagation();

        menu_el.classList.add('d-none');

        if (action_target) {
            action_target.children[0].classList.remove('focused');
        }

        if (!nav_elements.get(this.id).isFolder()) {
            return;
        }
        nav_elements.get(this.id).open(this);

        nav_elements.forEach((value, key) => {
            if (value._parent && value._parent._id === this.id) {
                value.show(key);
            }
        });

    }, false);

    el.addEventListener('focusout', function () {
        this.getElementsByClassName('nav-item-name')[0].removeAttribute('contenteditable');
    });
});

rootNode.addEventListener('contextmenu', e => {
    e.preventDefault();

    if (e.target.nodeType !== Node.ELEMENT_NODE) {
        return;
    }

    if (action_target) {
        action_target.children[0].classList.remove('focused');
        action_target = null;
    }

    action_target = findAncestor(e.target, '.nav-item');

    if (action_target) {
        action_target.children[0].classList.add('focused');
        menu_el.getElementsByTagName('ul')[0].classList.remove('disabled');
    } else {
        menu_el.getElementsByTagName('ul')[0].classList.add('disabled');
    }

    menu_el.classList.remove('d-none');

    menu_el.style.left = e.pageX + 'px';
    menu_el.style.top = e.pageY + 'px';
});

menu_el.getElementsByTagName('ul')[0].addEventListener('click', (e) => {
    if (e.target.tagName !== 'LI' || !action_target) {
        return;
    }

    switch (e.target.dataset.action) {
        case 'remove':
            remove(action_target.id);
            nav_elements.delete(action_target.id.toString());
            document.getElementById(action_target.id).remove();
            break;

        case 'rename':
            rename();
            break;

        default:
            alert('Unknown operation!');
    }

}, false);

function remove(id) {
    nav_elements.forEach((value, key) => {
        if (value._parent && value._parent._id === id) {
            nav_elements.delete(key);

            return remove(key);
        }
    });
}

function rename() {
    const editable_el = action_target.getElementsByClassName('nav-item-name')[0];
    let ext = '';
    if (!nav_elements.get(action_target.id.toString()).isFolder()) {
        ext = action_target.getElementsByClassName('nav-item-ext')[0].textContent;
    }

    editable_el.setAttribute('contenteditable', true);
    editable_el.focus();
    menu_el.classList.add('d-none');

    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === 'characterData') {
                nav_elements.get(action_target.id.toString())._title = mutation.target.textContent + ext;
            }
        });
    });
    observer.observe(editable_el, {attributes: true, characterData: true, subtree: true});
}

function findAncestor(el, sel) {
    while (el && !(el.matches || el.matchesSelector).call(el, sel)) {
        el = el.parentElement;
    }

    return el;
}
