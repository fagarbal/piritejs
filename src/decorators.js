export function Template(template, templates) {
	return (target) => {
		if (typeof templates === 'object') {
			target.prototype.templates = templates;
		}

		target.prototype.template = () => template;
	};
};

export function State(state) {
	return (target) => {
		target.prototype.parameters = () => state;
	};
};
