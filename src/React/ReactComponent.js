const { upperCaseToTire } = require("../utils/parseTire");

export class ReactComponent {
    constructor(tag, options, content) {
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

        if(this.options.style) {
            attrs += this._renderStyle();
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
}