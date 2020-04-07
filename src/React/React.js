import { ReactComponent } from './ReactComponent';

export const createElement = (tag, options, content) => new ReactComponent(tag, options, content);

export const render = (element, domelement) => {
    domelement.innerHTML = element.render();
}