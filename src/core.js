class Core {
	constructor() {
		this.components = {};
		this.componentNames = [];
		this.componentInstances = {};
		this.events = ['click', 'input', 'change'];
	}

	add(components) {
		if (Array.isArray(components)) {
			components.forEach((component) => this.add(component));
		} else {
			this.components[components.name] = components;
			this.componentNames.push(components.name.toUpperCase());
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