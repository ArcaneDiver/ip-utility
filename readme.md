# IP UTILITY

[![NPM version][npm-image]][npm-url]
## Installation

You can install with npm:
```bash
$ npm install ip-utility --save
```

You can also install through yarn:
```bash
$ yarn add ip-utility
```


## Features
It`s written in Typescript then you can access to the relative data types.
This package exposes 2 functions
* getPublic
* getPrivate

### getPublic
This is an async function that return you a string with your public ip

Without async
```js
const { getPublic } = require(`ip-utility`);

getPublic()
.then( ip => {
    console.log("Public IP:", ip);
})
```

With async
```js
( async function () {
const { getPublic } = require(`ip-utility`);

const ip = await getPublic();
console.log("Public IP:", ip);
})()
```
### getPrivate( options )
* ##### options
    * ###### wifi
        * ###### not required
        * ###### boolean
        * ###### return an array of object or an single object that describes all Wi-Fi `interfaces`
    * ###### ethernet
        * ###### not required
        * ###### boolean
        * ###### return an array of object or an single object that describes all Ethernet `interfaces`
```js
const { getPrivate } = require(`ip-utility`);

// Only 1 wifi interface
const ip = getPrivate({
    wifi: true
});

console.log("my WI-FI local IP:", ip.wifi.ip.v4);
console.log("my WI-FI mac", ip.wifi.mac);
```
