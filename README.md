# JS Linked List

_Why? Because Data Structures!_

This is a JavaScript implementation of a Linked List data structure. It works largely like an array in JS and can be used as shown below.

## Usage

```js
var LinkedList = require('linked-list');

var list = new LinkedList(['some', 'list', 'of', 'values']);

list.length; // => 4
list.pop(); // => 'values'
list.push('stuff');
list.push('things');
list.length; // => 5
list.toString(); // => 'some --> list --> of --> values'
```

## Methods

#### `.push`

#### `.pop`

#### `.shift`

#### `.unshift`

