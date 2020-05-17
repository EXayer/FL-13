window.books = new Map();
window.uid = 1;

window.books.set(window.uid++, {
    name: 'Cracking the coding interview',
    author: 'Gayle Laakmann McDowell 6th',
    image: 'https://images-na.ssl-images-amazon.com/images/I/71jRvBEDNmL.jpg',
    plot: 'educational'
});

window.books.set(window.uid++, {
    name: 'Symphony 5. Быстрый старт',
    author: 'Fabian Potencier',
    image: 'https://cv02.twirpx.net/3119/3119565.jpg?t=20200506163940',
    plot: 'educational'
});

window.books.set(window.uid++, {
    name: 'The Glass Hotel',
    author: 'Emily St. John Mandel',
    image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQgxmv3DoWGvFX22GTpxsmby-dsmVaqyQFy87e8eX-LZq4lToT6',
    plot: 'novel'
});