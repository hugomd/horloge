const ms = require('ms');

class Horloge {
	constructor(options) {
		this.options = options;
		this.reset();
	}

	reset() {
		this.startTime = null;
		this.endTime = null;
	}

	start() {
		this.startTime = Date.now();
	}

	stop() {
		this.endTime = Date.now();
		this.difference = this.endTime - this.startTime;
	}

	toString() {
		let difference;
		if (this.options && this.options.ms) {
			difference = this.toMs(this.difference);
		} else {
			difference = `${this.difference} ms`;
		}
		return `Timer took ${difference}`;
	}

	toMs(val) {
		return ms(val, this.options.ms);
	}

	log() {
		console.log(this.toString());
	}

	stopAndLog() {
		this.stop();
		this.log();
	}

	static wrapFunction(fn, callback) {
		const h = new Horloge(this.options);
		h.start();
		fn(() => {
			h.stop();
			callback(null, h);
		});
	}

	static async wrapPromise(p) {
		const h = new Horloge(this.options);
		h.start();
		await p();
		h.stop();
		return h;
	}

	raw() {
		const raw = {
			start: this.startTime,
			end: this.endTime
		};

		if (this.difference) {
			Object.assign(raw, {difference: this.difference});
		}

		return raw;
	}
}

module.exports = Horloge;
