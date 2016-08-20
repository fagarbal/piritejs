var fabiolib = function() {};
fabiolib.components = [];

fabiolib.App = function (name) {
	this.nameApp = name;
	return this;
}

fabiolib.Component = function(opts) {
	let name = opts.name;
	let controller = opts.controller ? new opts.controller() : (function() {})();

	let template = opts.template;

	let expr = /{{.*?}}/g;
	let variables = template.match(expr) || [];
	let nameVariables = [];
	let validVariables = [];

	for (let i = 0; i < variables.length; i++) {
		nameVariable = variables[i].replace('{{','').replace('}}','');
		if (nameVariables.indexOf(nameVariable) < 0) {
			validVariables.push(variables[i]);
			nameVariables.push(nameVariable);
		}
	}

	for (let i = 0; i < nameVariables.length; i++) {
		if (typeof controller[nameVariables[i]] !== 'function') {
			template = template.split('{{' + (opts.alias ? (opts.alias + '.') : '') + nameVariables[i] + '}}').join(controller[nameVariables[i]]);
		}
	}	

	fabiolib.components.push({
		name: name,
		controller: controller,
		getElement: function() {
			this.element = document.createElement("div"); 
  			this.nameVariables = nameVariables;
  			this.validVariables = validVariables;

			let exprIO = /{!.*?}/g;
			let variablesIO = template.match(exprIO) || [];

			this.validAttributes = [];
			this.nameAttributes = [];



			this.elementB = document.createElement("div"); 
			this.elementB.innerHTML = template;
			this.initTemplate = this.elementB.innerHTML;

			for (let i = 0; i < variablesIO.length; i++) {
				nameAttribute = variablesIO[i].replace('{!','').replace('}','');
				template = template.split('{!'+ nameAttribute + '}').join('');

				if (this.nameAttributes.indexOf(nameAttribute) < 0) {
					this.nameAttributes.push(nameAttribute);
					this.validAttributes.push(variablesIO[i]);
				}
			}


  			this.element.innerHTML = template;


			for (let i = 0; i < this.nameVariables.length; i++) {
				if (typeof controller[this.nameVariables[i]] === 'function') {
					for(let s = 0; s < this.element.children.length; s++) {
						for(let h = 0; h < this.element.children[s].attributes.length; h++) {
							if (this.element.children[s].attributes[h].value === this.validVariables[i]) {
								this.element.children[s][this.element.children[s].attributes[h].name] = (function (event) {
									event.preventDefault();
									controller[this.nameVariables[i]]();
								}).bind(this);
							}
						}
					}
				}
			}





			for(let s = 0; s < this.element.children.length; s++) {
				if(this.element.children[s].hasAttribute('model')) {
					let attribute = this.element.children[s].getAttribute('model');

					this.element.children[s].oninput = (function (event) {

						for (let x = 0; x < this.element.children.length; x++) {

								if(this.elementB.children[x].innerHTML.indexOf('{!' +event.currentTarget.getAttribute('model') + '}') >= 0) {
									this.element.children[x].innerText = this.elementB.children[x].innerText.replace('{!' +event.currentTarget.getAttribute('model') + '}', event.currentTarget.value);
									this.controller[event.currentTarget.getAttribute('model')] = event.currentTarget.value;
								}
						}
					}).bind(this);
				}
			}

			return this.element;
		}
	});
	return this;
};
 
window.onload = function() {
  for (let i = 0, j = fabiolib.components.length; i < j; i++) {
    let component = fabiolib.components[i];

    let findComponents = document.getElementsByTagName(fabiolib.nameApp + ":" + component.name);

    for (let i = 0, j = findComponents.length; i < j; i++) {
    	let renderComponent = findComponents[i];

    	for(let h = 0; h < renderComponent.attributes.length; h++) {
    		component.controller[renderComponent.attributes[h].name] = renderComponent.attributes[h].value;
    	}

    	renderComponent.appendChild(component.getElement());
    }
  }
}