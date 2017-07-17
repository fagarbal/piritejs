class Utils {
	htmlEntities(str) {
		if (str === '') return ' ';
		if (typeof str !== 'string') return str;

		return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
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
}

export default new Utils();