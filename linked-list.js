var debug = require('debug')('LinkedList');

/**
 * A quick helper function to make modifying the prototype a little bit easier.
 */
function extend(obj, src) {
  for (var prop in src)
    if (Object.prototype.hasOwnProperty.call(src, prop))
      obj[prop] = src[prop];
}

/**
 * A node in our linked list. Every node has a value and a pointer to the next
 * node in the linked list.
 * @param {mixed} value the value of the node
 * @param {Node} optional next the next node in the linked list
 * @return undefined
 */
function Node(value, next) {
  debug('Instantiating new node with value', value);
  this.value = value;
  this.next = next;
}

/**
 * The Linked List constructor. Instantiates a new LinkedList. If an array of
 * values is passed each value in the array will be instantiated as a node in
 * the list.
 * @param {array} values
 */
function LinkedList(values) {

  if (!Array.isArray(values))
    throw new TypeError("Argument must be an array");

  var _this = this;

  this.start = null;
  this.end = null;
  this.length = 0;

  if (values) values.forEach(function(value) {
    _this.push(value);
  });
}

extend(LinkedList.prototype, {

  /**
   * Print a graphical representation of the linked list to stdout. Values will
   * be separated by {separator} or ' --> '.
   * @return undefined
   */
  toString: function(separator) {
    var node   = this.start,
        string = '';

    if (!separator) separator = ' --> ';

    this.forEach(function(node, i) {
      if (i === this.length - 1)
        string += node.value;
      else
        string += node.value + separator;
    });

    return string;
  },

  /**
   * Add a new node to the end of the list. Works like [].push. Adds a new
   * element to the end of the list and increments the length.
   * @param {mixed} value
   * @return this
   */
  push: function(value) {

    // Set start if this is the first node
    if (!this.start) {
      debug('Inserting start node with value', value);
      this.start = new Node(value);
      this.end = this.start;
      this.length++;
      return;
    }

    debug('Inserting new node with value', value);
    this.end.next = new Node(value);
    this.end = this.end.next;
    this.length++;
  },

  /**
   * Add a new node to the start of the list. Works like [].unshift. Adds a new
   * element to the start of the list and increments the length.
   * @param {mixed} value
   * @return this
   */
  unshift: function(value) {
    this.start = new Node(value, this.start);
    this.length++;
    return this;
  },

  /**
   * TODO: No longer broken, but should refactor.
   */
  pop: function() {
    if (!this.length) return null;

    var secondToLast = this.start,
        val          = this.end.value;

    while(secondToLast.next !== this.end) {
      secondToLast = secondToLast.next;
    }

    this.end = secondToLast;
    this.end.next = null;

    this.length--;

    return val;
  },

  shift: function() {
    if (!this.length) return null;

    var val = this.start.value;
    this.start = this.start.next;
    this.length--;

    // Make sure to update this.end if there was only one item in the list
    if (!this.length) this.end = null;

    return val;
  },

  /**
   * Linear Search hoooray!
   */
  indexOf: function(value) {
    var index = -1;
    this.forEach(function(node, i) {
      if (node.value === value) index = i;
    });
    return index;
  },

  /**
   * Functions just like [].forEach
   * @param {function} func Gets passed the current Node, the index and the list
   *                   object
   * @return undefined
   */
  forEach: function(func, context) {
    var node = this.start,
        index = 0;

    while (node) {
      func.call((context || this), node, index, this);
      node = node.next;
      index++;
    }
  }

});

module.exports = LinkedList;

if (require.main === module) {

  /**
   * Just for demonstration purposes, this will genarate and a random list of
   * length 10 and print it to the console.
   */
  (function() {
    var vals = ['hey', 'there', 'bro'],
        list;


    var l = new LinkedList(['rage', 'monster']);

    console.log(l.toString());
    l.push('food');
    l.push('face');
    l.push('house');
    console.log(l.toString());


    // var vals = [4,3,4,5];

    // for (var i = 0; i < 10; i++)
    //   vals.push(Math.floor(Math.random() * 10));

    list = new LinkedList(vals);
    console.log(list.toString());

    list.shift();
    console.log(list.toString());

    list.pop();
    console.log(list.toString());

    list.push('fro');
    list.push('bag');
    console.log(list.toString(), 'length:', list.length);

  })();
}
