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
			this.socket.on('controllersAllow', (controllers) => {
				for (let controller in controllers) {
					this[controller] = {};

					for (let method of controllers[controller]) {
						const callback = this.__handleMethod(controller, method);

						this[controller][method] = callback.bind(this[controller]);
					}

				}
				resolve(this);
			});
		});
	}
}

export default Rpc;