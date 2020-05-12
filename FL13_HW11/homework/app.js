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
          child_container = '<div class="folder-empty d-none">Folder is Empty</div>'
        }

        return `<div class="nav-item ${display_class}" id="${this._id}">
           <div class="nav-item-content">${icon}<span class="nav-item-name">${this._title}</span></div>
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
    for (let [key, value] of Object.entries(data)) {
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
    nav_elements.forEach((value, key, map) => {
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

Array.prototype.forEach.call(document.getElementsByClassName('nav-item'), function (el) {
    el.addEventListener('click', function (event) {
        event.stopPropagation();

        if (!nav_elements.get(this.id).isFolder()) {
            return;
        }
        nav_elements.get(this.id).open(this);

        nav_elements.forEach((value, key, map) => {
            if (value._parent && value._parent._id === this.id) {
                value.show(key);
            }
        });

    }, false);
});