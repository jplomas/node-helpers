# @theqrl/node-helpers

[![Build Status](https://travis-ci.org/theQRL/node-helpers.svg?branch=master)](https://travis-ci.org/theQRL/node-helpers) [![Coverage Status](https://coveralls.io/repos/github/theQRL/node-helpers/badge.svg?branch=master)](https://coveralls.io/github/theQRL/node-helpers?branch=master) [![npm version](https://badge.fury.io/js/%40theqrl%2Fnode-helpers.svg)](https://badge.fury.io/js/%40theqrl%2Fnode-helpers) ![GitHub](https://img.shields.io/github/license/theqrl/node-helpers)

A helper library for interacting with QRL nodes via GRPC

## Installation

  `npm install @theqrl/node-helpers`

## Usage

import the helper class:

```javascript
import QrlNode from '@theqrl/node-helpers'
```

instantiate a new class object:

```javascript
const ip = 'testnet-1.automated.theqrl.org'
const port = '19009'
const testnet = new QrlNode(ip, port)
```

make a connection to the node:

```javascript
testnet.connect().then(client => {
  console.log(client.connection) // true if connection successful
})
```

make an API call:

```javascript
testnet.api('GetStats').then((result) => {
  console.log(result)
})
```

## Development of this module

Development requires node version > 10.  If using nvm (which is recommended) then `nvm use` inside the cloned repo will set a correct node version.

`npm install` to install dependecies

`npm run dev` will run a nodemon server with continual linting, testing and coverage on file updating

`npm run build` will transpile ES6 JS using babel for the deployed module

Contact jp@theqrl.org if you are interested in contributing.  PRs welcomed.