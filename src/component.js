import domUtils from './dom';
import utils from './utils';

class Component {
	constructor(element) {
		this.props = this.__getProps(element);

		this.template = this.getTemplate ? this.getTemplate() : '';
		this.__setState(element);
		this.__setEvents(element);
		this.__setRefs(element);
	}

	__setState(element) {
		this.__stateHandler = {
			set: (obj, prop, newval) => {
				obj[prop] = newval;

				this.secureState[prop] = utils.htmlEntities(newval);

				const state = Object.assign({}, this.state)

				utils.mergeDeep(obj, this.secureState);

				domUtils.changeDom(initialElements, element, this.render.bind(this));

				utils.mergeDeep(obj, state);

				obj[prop] = newval;

				return true;
			}
		};

		this.state = new Proxy(this.initState(), this.__stateHandler);
		this.secureState = {};

		let initialElements = domUtils.loadDom(element, this.render.bind(this));
	}

	__setEvents(element) {
		this.events = ['click', 'input'];

		this.events.forEach((event) => {
			const eventElements = element.querySelectorAll('[py-' + event + ']');

			Array.from(eventElements).forEach((eventElement) => {
				const attribute = eventElement.getAttribute('py-' + event);

				if (attribute[0] === '{' && attribute[attribute.length - 1] === '}') {
					const expresion = attribute.substring(1, attribute.length - 1);

					const method = (() => eval(expresion)).call(this);

					eventElement.addEventListener(event, method);
				}
			});
		})
	}

	__getProps(element) {
		let attributes = element.attributes;

		const props = {};

		Array.from(attributes).forEach((attribute) => {
			if (attribute.value[0] === '{' && attribute.value[attribute.value.length - 1] === '}') {
				const expresion = attribute.value.substring(1, attribute.value.length - 1);
				try {
					props[attribute.name] = eval(expresion);
				} catch (error) {
					throw new TypeError(element.nodeName + ': Attribute expression - ' + attribute.name + ' -> ' + expresion)
				}
			} else props[attribute.name] = attribute.value;
		});

		props.children = element.innerHTML;

		return props;
	}

	__setRefs(element) {
		const refs = element.querySelectorAll('[ref]');

		this.refs = {};

		Array.from(refs).forEach((ref) => {
			const refName = ref.getAttribute('ref');
			this.refs[refName] = ref;
		});
	}

	render() {
		return this.template ? eval('`' + this.template + '`') : '';
	}
}

export default Component;