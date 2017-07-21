import domUtils from './dom';
import core from './core'
import utils from './utils';

class Component {
	constructor(element) {
		this.props = this.__getProps(element);
		this.__templateString = this.__template();

		this.__setParameters(element);
		this.__setEvents(element);
		this.__setRefs(element);
	}

	__parameters () {
		return {};
	}

	__template() {
		return '';
	}

	onLoad() {}

	__setParameters(element) {
		this.__parametersHandler = {
			set: (obj, prop, newval) => {
				obj[prop] = newval;

				this.secureParam[prop] = utils.htmlEntities(newval);

				const params = Object.assign({}, this.state);

				utils.mergeDeep(obj, this.secureParam);
				domUtils.changeDom(core.componentNames, initialElements, element, this.__getTemplate.bind(this));
				utils.mergeDeep(obj, params);


				if (newval && typeof newval === 'object' && !newval.__isProxy) {
					newval.__isProxy = true;
					obj[prop] = new Proxy(newval, this.__parametersHandler);
				} else {
					obj[prop] = newval;
				}

				return true;
			}
		};

		this.state = new Proxy(this.state, this.__parametersHandler);
		this.secureParam = {};

		const initialElements = domUtils.loadDom(core.componentNames, element, this.__getTemplate.bind(this));

		initialElements.components.forEach((child) => child.setAttribute('py-parent', element.getAttribute('py-id')));
	}

	__setEvents(element) {
		core.events.forEach((event) => {
			const eventName = `py-${event}`;
			const eventElements = Array.from(element.querySelectorAll(`[${eventName}]`));

			eventElements.forEach((eventElement) => {
				const attribute = eventElement.getAttribute(eventName);

				if (utils.hasBrackets(attribute)) {
					const expresion = attribute.substring(1, attribute.length - 1);

					const method = utils.expresion(expresion, this);

					eventElement.addEventListener(event, method);
				}
			});
		});
	}

	__getProps(element) {
		let attributes = Array.from(element.attributes);

		const props = {};

		const parentId = element.getAttribute('py-parent');

		attributes.forEach((attribute) => {
			if (!utils.hasBrackets(attribute.value))
				return props[attribute.name] = attribute.value;

			const expresion = attribute.value.substring(1, attribute.value.length - 1);
			const scope = parentId ? core.componentInstances[parentId] : this;

			try {
				props[attribute.name] = utils.expresion(expresion, scope);
			} catch (error) {
				throw new TypeError(`${element.nodeName} -> Attribute: ${attribute.name} :: ${expresion}`)
			}
		});

		props.children = element.innerHTML;

		this.state = Object.assign({}, this.__parameters(), props);

		return props;
	}

	__setRefs(element) {
		const refs = Array.from(element.querySelectorAll('[ref]'));

		setTimeout(() => {
			this.refs = {};

			refs.forEach((ref) => {
				const refName = ref.getAttribute('ref');
				const id = ref.getAttribute('py-id');

				this.refs[refName] = id ? core.componentInstances[id] : ref;
			});

			this.onLoad();
		});
	}

	__getTemplate() {
		return eval('`' + this.__templateString + '`');
	}

	__setService(service) {
		this.rpc = service;
	}
}

export default Component;