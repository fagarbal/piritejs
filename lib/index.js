import Core from './core';
import Component from './component';
import { Template, State } from './decorators';
import Utils from './utils';

const sanitize = Utils.sanitize.bind(Utils);

export {
	Core as pyrite,
	Component,
	Template,
	State,
	sanitize
};

window.pyrite = {
	pyrite: Core,
	Component,
	Template,
	State,
	sanitize
};