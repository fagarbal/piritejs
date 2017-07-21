const domDiff = require('dom-diff/diff');
const domApply = require('dom-diff/patch');

class DomUtils {
	getNodes(componentNames, node, tags = [], texts = [], components = []) {
		const childNodes = Array.from(node.childNodes);

		childNodes.forEach((childNode) => {
			if (childNode.childNodes.length) this.getNodes(componentNames, childNode, tags, texts, components);
			else if (componentNames.includes(childNode.nodeName)) components.push(childNode);
			else if (childNode.nodeType === 3) texts.push(childNode);
			else if (childNode.nodeType === 1) tags.push(childNode);
		});

		const isComponent = componentNames.includes(node.nodeName);

		if (node.nodeType !== 3) (isComponent ? components : tags).push(node);

		return {
			tags,
			texts,
			components
		};
	}

	setHidden(node) {
		const isHide = node.getAttribute('py-hide');
		const hidden = isHide === "false" ? false : Boolean(isHide);

		node.hidden = hidden;
	}

	loadDom(componentNames, component, template) {
		component.innerHTML = template();

		const nodes = component;

		return nodes;
	}

	getInnerElements(componentNames, node, virtual) {
		let childs = this.getNodes(componentNames, node);

		if (virtual) childs.tags.pop();
		childs.components.pop();

		return childs;
	}

	changeTextNodes(initialNodes, textNodes) {
		textNodes.forEach((changedElement, index) => {
			let nodeText = initialNodes[index];

			if (changedElement.nodeValue !== nodeText.nodeValue) {
				nodeText.nodeValue = changedElement.nodeValue;
			}
		});
	}

	changeTagNodes(initialNodes, tagNodes) {
		tagNodes.forEach((changedElement, index) => {
			let initialElement = initialNodes[index];

			if (changedElement.outerHTML !== initialElement.outerHTML) {
				let attributes = changedElement.attributes;

				Array.from(attributes).forEach((attribute, index) => {
					let originalAttribute = initialElement.attributes[index];

					if (attribute.value !== originalAttribute.value) {
						originalAttribute.value = attribute.value;
						if (initialElement.value) initialElement.value = attribute.value;
					}
				});
			}

			this.setHidden(initialElement);
		});
	}

	changeDom(componentNames, initialNodes, component, template) {
		let newTemplate = template();


		let virtualTemplate = document.createRange().createContextualFragment(newTemplate);

		const patches = domDiff(Element, virtualTemplate);
		domApply(Element, patches)

	}
}

export default new DomUtils();