import Core from './core';
import Component from './component';

function Template(template, templates) {
	return (target) => {
		if (typeof templates === 'object') {
			target.prototype.templates = templates;
		}

		target.prototype.template = () => template;
	};
}

function State(state) {
	return (target) => {
		target.prototype.parameters = () => state;
	};
}

export {
	Core,
	Component,
	Template,
	State
};

window.pyrite = {
	Core,
	Component,
	Template,
	State
};