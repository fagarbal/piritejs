import DiffDOM from 'diff-dom';

class DomUtils {
	constructor() {
		this.diffDom = new DiffDOM();
	}

	loadDom(componentNames, component, template) {
		component.innerHTML = template();

		this.setChilds(component, componentNames);

		return component;
	}

	setChilds(element, componentNames) {
		Array.from(element.querySelectorAll(componentNames.join(','))).forEach((child) => {
			child.setAttribute('py-parent', element.getAttribute('py-id'));
		});
	}

	changeDom(componentNames, initialNodes, component, template) {
		const newTemplate = template();
		const virtualTemplate = document.createElement(component.nodeName);

		virtualTemplate.innerHTML = newTemplate;
		virtualTemplate.setAttribute('py-id', component.getAttribute('py-id'));

		this.setChilds(virtualTemplate, componentNames);

		const patches = this.diffDom.diff(component, virtualTemplate);

		this.diffDom.apply(component, patches)
	}
}

export default new DomUtils();