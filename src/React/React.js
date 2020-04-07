import { getRandomRunctionName } from "../utils/randomFunctionName";

let el, domel;

export const createElement = (tag, options, content, props) => new ReactElement(tag, options, content, props).render();

export const render = (element, domelement) => {
    el = element; domel = domelement;
    domelement.innerHTML = element.render();
}

export const rerender = () => {
    render(el, domel);
}

global.__react = {};
const { upperCaseToTire } = require("../utils/parseTire");

export class Component {
    constructor(props) {
        this.state = {};
        this.props = props;
    }

    setState(state) {
        if(typeof state === 'object') this.state = state;
        else this.state = state(this.state);
        rerender();
    }

    render() {
        
    }
}

export class ReactElement {
    constructor(tag, options, content, props) {
        this.tag = tag;
        this.options = options;
        this.content = content;
    }

    render() {
        if (!this.content && !this.options?.textContent) return this._renderSingleTag();
        return this._renderTag();
    }

    _renderSingleTag() {
        return `<${this.tag} ${this._renderFullAttributes()}/>`
    }

    _renderTag() {
        let readyContent;
        if (Array.isArray(this.content)) {
            readyContent = this.content.reduce((p, c) => {
                if (typeof c === 'string') return p + c;
                return p + c.render();
            }, '');
        } else {
            readyContent = this.content ?? this.options?.textContent;
        }
        return `<${this.tag} ${this._renderFullAttributes()}>${readyContent}</${this.tag}>`;
    }

    _renderText() {
        return this.content;
    }

    _renderFullAttributes() {
        if(!this.options) return "";

        let attrs = "";

        if(this.options.style) attrs += this._renderStyle();
        if(this.options.class) attrs += this._renderClass();
        
        if(this.options.onClick) {
            const name = getRandomRunctionName();
            global.__react[name] = this.options.onClick;
            attrs += `onclick="__react.${name}(event)"`
        }

        if(this.options.onChange) {
            const name = getRandomRunctionName();
            global.__react[name] = this.options.onChange;
            attrs += `onchange="__react.${name}(event)"`
        }

        const keys = Object.keys({ ...this.options });
        for(let i = 0; i < keys.length; i++) {
            attrs += ` ${keys[i]}="${ this.options[keys[i]] }" `;
        }

        return attrs;
    }

    _renderStyle() {
        let styles = "";
        const keys = Object.keys(this.options.style);
        for(let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const value = this.options.style[key];
            styles += `${upperCaseToTire(key)}:${upperCaseToTire(value)}`;
        }
        return `style="${styles}"`;
    }

    _renderClass() {
        let classes = "";
        
        if(Array.isArray(this.options.class)) {
            classes = this.options.class.reduce((p, c) => p + c + ' ', '');
        } else if(typeof this.options.class === 'string') {
            classes = this.options.class;
        } else {
            const keys = Object.keys(this.options.class);
            for(let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const value = this.options.style[key];
                if(value) styles += key;
            }
        }
        return `class="${classes}"`;
    }
}