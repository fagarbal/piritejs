class Core {
	constructor() {
		this.components = {};
		this.componentInstances = {};
	}

	add(component) {
		this.components[component.name] = component;
		return this;
	}

	run(nameApp) {
		window.addEventListener('DOMContentLoaded', (event) => {
			let idInstances = 0;

			const appContent = nameApp ? document.getElementById(nameApp) : document.body;

			Object.keys(this.components).forEach((componentName) => {
				const componentsElements = appContent.querySelectorAll(componentName);

				Array.from(componentsElements).forEach((element) => {
					try {
						this.componentInstances[idInstances] = new this.components[componentName](element);
					} catch (error) {
						console.error(error);
					}
					idInstances++;
				});
			})
		});
	}

}

export default new Core();