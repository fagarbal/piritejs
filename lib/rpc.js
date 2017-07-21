import uuid from 'uuid';
import io from 'socket.io-client';

class Rpc {
	constructor(url) {
		this.socket = url ? io.connect(url) : io();

		return this.get();
	}

	__handleMethod(controller, method) {
		return (...args) => {
			return new Promise((resolve, reject) => {
				const id = uuid();
				this.socket.once(id + '-success', resolve);
				this.socket.once(id + '-error', reject)
				this.socket.emit(controller + '.' + method, id, ...args);
			}).catch((error) => {
				throw new Error(error.type + ' : ' + error.error);
			});
		};
	}

	get() {
		return new Promise((resolve) => {
			this.socket.on('controllersMethods', (controllers) => {
				const controllersAllow = controllers.allow;
				const controllersEmit = controllers.emit;

				for (let controller in controllersAllow) {
					this[controller] = {};

					for (let method of controllersAllow[controller]) {
						const callback = this.__handleMethod(controller, method);

						this[controller][method] = callback.bind(this[controller]);

						if (controllersEmit[controller].length) {
							this[controller].on = {};
						}

						if (controllersEmit[controller].includes(method)) {
							this[controller].on[method] = (cb) => {
								if (!this[controller].on['__' + method]) this[controller].on['__' + method] = [];
								this[controller].on['__' + method].push(cb);
							}

							this.socket.on(controller + '.on.' + method, (data) => {
								this[controller].on['__' + method].forEach((f) => f(data));
							});
						}
					}
				}
				resolve(this);
			});
		});
	}
}

export default Rpc;