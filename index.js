const ms = require('ms');

/**
 * @class Horloge
 * @constructor Constructor
 * @example
 * ```
 * const Horloge = require('horloge');
 * // Using an async function so we can use await
 * (async () => {
 * 	const delay = duration =>
 * 		new Promise(resolve => setTimeout(resolve, duration));
 *
 * 	let t = new Horloge();
 * 	t.start();
 * 	await delay(1000);
 * 	t.stop();
 *
 * 	t.log(); // Timer took ~1000 ms
 * })();
 * ```
 */
class Horloge {
	/**
   * @constructor
   * @param options {Object} Options object
   * @note options.ms may contain options for the `ms` library
   */
	constructor(options) {
		this.options = options;
		if (!this.options.ms) {
			this.options.me = {};
		}
		this.reset();
	}

	/**
   * Initialises start and end times to null
   * @method reset
   *
   */
	reset() {
		this.startTime = null;
		this.endTime = null;
	}

	/**
   * Records the start time
   * @method start
   */
	start() {
		this.startTime = Date.now();
	}

	/**
   * Records the end time and sets the difference
   * @method stop
   */
	stop() {
		this.endTime = Date.now();
		this.difference = this.endTime - this.startTime;
	}

	/**
   * Override for the toString method
   * @method toString
   */
	toString() {
		let difference;
		if (this.options && this.options.ms) {
			difference = this.toMs(this.difference);
		} else {
			difference = `${this.difference} ms`;
		}
		return `Timer took ${difference}`;
	}

	/**
   * Convert time in milliseconds to a readable format, with provided options
   * @method toMs
   * @returns {String} Readable time with unit
   */
	toMs(val) {
		return ms(val, this.options.ms);
	}

  /**
   * Log the Horloge instance
   * @method log
   */
	log() {
		console.log(this.toString());
	}

  /**
   * Convenience function to stop the timer and log the result
   * @method stopAndLog
   */
	stopAndLog() {
		this.stop();
		this.log();
	}

  /**
   * Wraps a function with a callback and calls it, recording start and end time
   * @method wrapFunction
   * @param fn {Function} The function to wrap
   * @param callback  {Function} Callback to call when `fn` finishes
   * @returns {Horloge} An Horloge instance
   */
	static wrapFunction(fn, callback) {
		const h = new Horloge(this.options);
		h.start();
		fn(() => {
			h.stop();
			callback(null, h);
		});
	}

  /**
   * Wraps a promise and calls it, recording start and end time
   * @method wrapPromise
   * @param p {Promise} The promise to wrap
   * @returns {Horloge} An Horloge instance
   */
	static async wrapPromise(p) {
		const h = new Horloge(this.options);
		h.start();
		await p();
		h.stop();
		return h;
	}

  /**
   * Returns the raw values for start, end and (optionally) the difference between the two
   * @method raw
   * @returns {Object} raw
   */
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
