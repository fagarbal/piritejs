class Utils {
	sanitize(strings, ...values) {
	    return strings.reduce((prev, next, i) => {
	    	if (Array.isArray(values[i])) {
	    		return `${prev}${next}${values[i].join('')}`;
	    	}

	    	const value = this.htmlEscape(values[i]);

	    	return `${prev}${next}${value}`
	    }, '');
	}

	htmlEscape(str) {
		if (!str) return '';

	    return str.replace(/&/g, '&amp;')
	              .replace(/>/g, '&gt;')
	              .replace(/</g, '&lt;')
	              .replace(/"/g, '&quot;')
	              .replace(/'/g, '&#39;')
	              .replace(/`/g, '&#96;');
	}

	mergeDeep(target, ...sources) {
		if (!sources.length) return target;
		const source = sources.shift();

		if (this.isObject(target) && this.isObject(source)) {
			for (const key in source) {
				if (this.isObject(source[key])) {
					if (!target[key]) Object.assign(target, {
						[key]: {}
					});
					this.mergeDeep(target[key], source[key]);
				} else {
					Object.assign(target, {
						[key]: source[key]
					});
				}
			}
		}

		return this.mergeDeep(target, ...sources);
	}

	isObject(item) {
		return (item && typeof item === 'object' && !Array.isArray(item));
	}

	hasBrackets(value) {
		return value[0] === '{' && value[value.length - 1] === '}';
	}

	expresion(expresion, scope) {
		return (() => eval(expresion)).call(scope);
	}
}

export default new Utils();