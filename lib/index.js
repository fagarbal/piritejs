import Core from './core';
import Component from './component';
import { Template, State } from './decorators';

export {
	Core as pyrite,
	Component,
	Template,
	State
};

window.pyrite = {
	pyrite: Core,
	Component,
	Template,
	State
};