class DomUtils {
	getNodes(node, tags = [], texts = []) {
		Array.from(node.childNodes).forEach((childNode) => {
			if (childNode.childNodes.length) this.getNodes(childNode, tags, texts);
			else if (childNode.nodeType === 3) texts.push(childNode);
			else if (childNode.nodeType === 1) tags.push(childNode);
		});

		if (node.nodeType !== 3) tags.push(node);

		return {
			tags,
			texts
		};
	}

	loadDom(component, render) {
		component.innerHTML = render();
		return this.getInnerElements(component);
	}

	getInnerElements(node) {
		let childs = this.getNodes(node);

		childs.tags.pop();

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
					}
				});
			}
		});
	}

	changeDom(initialNodes, component, render) {
		let newTemplate = render();

		if (component.innerHTML === newTemplate) return;

		let virtualTemplate = document.createRange().createContextualFragment(newTemplate);

		let newNodes = this.getInnerElements(virtualTemplate);

		this.changeTextNodes(initialNodes.texts, newNodes.texts);
		this.changeTagNodes(initialNodes.tags, newNodes.tags);
	}
}

export default new DomUtils();