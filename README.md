# ⏲  Horloge
[![npm](https://img.shields.io/npm/v/horloge.svg?maxAge=2592000)](https://www.npmjs.com/package/horloge) [![Build Status](https://travis-ci.org/hugomd/horloge.svg?branch=master)](https://travis-ci.org/hugomd/horloge/builds) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo) 

> _Horloge_ means clock in French 🇫🇷, and is a simple timer utility.

# Installation
```javascript
npm install horloge
```

# Usage
```javascript
const Horloge = require('horloge');

// Using an async function so we can use await
(async () => {
	const delay = duration =>
		new Promise(resolve => setTimeout(resolve, duration));

	let t = new Horloge();
	t.start();
	await delay(1000);
	t.stop();

	t.log(); // Timer took ~1000 ms
})();
```

# Contributing
* `git clone git@github.com:hugomd/horloge.git`
* `npm install`
* Make your changes
* Open a pull request and ask for review ✌️
* Optional: use emoji in your commits 🔥
