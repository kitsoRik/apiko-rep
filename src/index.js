import React from './React';

class App extends React.Component {
    constructor() {
        super();
    }

    state = {
        items: [
            { name: "Aaaa", status: "doing" }
        ]
    }

    render() {
        const addItem = (name) => {
            this.setState({
                ...this.state,
                items: this.state.items.concat({ name, status: "doing"})
            })
        }

        return React.createElement(
            'div',
            {  },
            [
                new Title(),
                new List({ items: this.state.items }),
                new AddControls({ addItem })
            ]
        );
    }
}

class Title extends React.Component {
    render() {
        return React.createElement(
            "h1",
            {},
            `Todo list`
        );
    }
}

class List extends React.Component {
    render() {
        const { items } = this.props;
        return React.createElement(
            "div",
            {},
            items.map(item => new ListItem({ item }))
        );
    }
}

class ListItem extends React.Component {
    render() {
        const { item: { name, status }} = this.props;
        return React.createElement(
            "div",
            {},
            `${name} - ${status}`
        )
    }
}

class AddControls extends React.Component {

    name = "";
    
    render() {
        const { addItem } = this.props;
        return React.createElement(
            "div",
            {},
            [
                React.createElement("button", { onClick: () => addItem(this.name) }, "Add"),
                React.createElement("input",  { value: this.name, onChange: (e) => this.name = e.target.value })
            ]
        )
    }
}

const app = new App();

React.render(app, document.getElementById('app'));