class Core {
	constructor() {
		this.components = {};
		this.componentNames = [];
		this.componentInstances = {};
		this.events = ['click', 'input', 'change'];
	}

	add(components, alias) {
		if (Array.isArray(components)) {
			components.forEach((component, i) => this.add(component, alias[i]));
		} else {
			const componentName = alias || components.name;

			this.components[componentName] = components;
			this.componentNames.push(componentName.toUpperCase());
		}

		return this;
	}

	run(nameApp) {
		window.addEventListener('DOMContentLoaded', (event) => {
			let idInstances = 0;

			const appContent = nameApp ? document.getElementById(nameApp) : document.body;

			Object.keys(this.components).forEach((componentName) => {
				const componentsElements = Array.from(appContent.querySelectorAll(componentName));

				componentsElements.forEach((element) => {
					try {
						element.setAttribute('py-id', idInstances);

						this.componentInstances[idInstances] = new this.components[componentName](element);
					} catch (error) {
						console.error(error);
					}

					idInstances++;
				});
			});
		});
	}

}

export default new Core();