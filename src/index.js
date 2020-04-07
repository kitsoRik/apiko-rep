import React from './React';

const app = React.createElement(
    'div',
    { style: { backgroundColor: 'red' } },
    [
        React.createElement('span', undefined, 'Hello world'),
        React.createElement('br'),
        'This is just a text node',
        React.createElement('div', { textContent: 'Text content', style: { color: "green" } }),
    ],
);

React.render(app, document.getElementById('app'));
