'use strict';

/**
 * Arrays
 */
// 1. Merge two sorted arrays
const mergeSortedArray = (arr1, arr2) => {
	if (!arr1 || !arr1.length) return arr2;
	if (!arr2 || !arr2.length) return arr1;

	const sortedArr = [];

	while (arr1.length || arr2.length) {
		if (arr1[0] < arr2[0]) {
			sortedArr.push(arr1.shift());
		} else {
			sortedArr.push(arr2.shift());
		}
	}

	console.log(sortedArr);
};

// mergeSortedArray([1, 3, 7], [3, 20, 51]);

/**
 * Hash Maps
 */
// 1. Create Hash
class HashTable {
	constructor(size) {
		this.data = new Array(size);
	}

	_hash(key) {
		let hash = 0;
		for (let i = 0; i < key.length; i++) {
			hash = (hash + key.charCodeAt(i) * i) % this.data.length;
		}
		return hash;
	}

	set(key, value) {
		const address = this._hash(key);
		if (!this.data[address]) {
			this.data[address] = [];
		}
		this.data[address].push([key, value]);
		return this.data.length;
	}

	get(key) {
		const address = this._hash(key);
		const currentBucket = this.data[address];
		if (currentBucket) {
			for (let curr of currentBucket) {
				if (curr[0] === key) {
					return curr[1];
				}
			}
		}
		return undefined;
	}

	keys() {
		const keysArray = [];
		for (let item of this.data) {
			if (item) {
				keysArray.push(item[0][0]);
			}
		}
		return keysArray;
	}
}

// const myHashTable = new HashTable(50);
// myHashTable.set('grapes', 10000);
// const grapes = myHashTable.get('grapes');
// myHashTable.set('apples', 9);
// const apples = myHashTable.get('apples');
// console.log(myHashTable.data);
// console.log(grapes);
// console.log(apples);
// console.log(myHashTable.keys());

// 2. Given an array, find the first recurring character
// Example: [2, 5, 1, 2, 3, 5, 1, 2, 4] -> result = 2
// Example 2: [2, 3, 4, 5] -> result = undefined
function recurring(input) {
	const map = createRecurringMap(input);

	return findFirstRecurringItem(map);
}

function createRecurringMap(list) {
	const map = new Map();

	list.forEach((item) => {
		if (map.has(item)) {
			map.set(item, true);
		} else {
			map.set(item, false);
		}
	});

	return map;
}

function findFirstRecurringItem(map) {
	for (const [key, value] of map.entries()) {
		if (value !== true) continue;

		return key;
	}

	return undefined;
}

// console.log(recurring([2, 5, 1, 2, 3, 5, 1, 2, 4]));
// console.log(recurring([2, 3, 4, 5]));

/**
 * Linked Lists
 */
class LLNode {
	constructor(data, next = null) {
		this.data = data;
		this.next = next;
	}
}

class LinkedList {
	constructor(data) {
		this.head = new LLNode(data);
		this.tail = this.head;
		this.length = 1;
	}

	append(data) {
		const node = new LLNode(data);

		this.tail.next = node;
		this.tail = node;
		this.length++;

		return this;
	}

	prepend(data) {
		this.head = new LLNode(data, this.head);
		this.length++;

		return this;
	}

	getAt(index) {
		let count = 0;
		let currentNode = this.head;

		while (currentNode) {
			if (count === index) {
				return currentNode;
			}

			count++;
			currentNode = currentNode.next;
		}

		return null;
	}

	insert(data, index) {
		if (index === 0) {
			return this.prepend(data);
		}

		if (index >= this.length) {
			return this.append(data);
		}

		const prevNode = this.getAt(index - 1);
		prevNode.next = new LLNode(data, prevNode.next);

		return this;
	}

	remove(index) {
		if (index === 0) {
			this.head = this.head.next;
			this.length--;
			return;
		}

		if (index >= this.length) {
			this.getAt(this.length - 2).next = null;
			this.length--;
			return;
		}

		const prevNode = this.getAt(index - 1);
		prevNode.next = prevNode.next.next;
		this.length--;

		return this;
	}

	reverse() {
		if (this.length === 1) return this;

		let first = this.head;
		this.tail = this.head;
		let second = first.next;

		while (second) {
			const temp = second.next;
			second.next = first;
			first = second;
			second = temp;
		}

		this.head.next = null;
		this.head = first;
	}

	printListData() {
		const arr = [];
		let currentNode = this.head;

		while (currentNode) {
			arr.push(currentNode.data);
			currentNode = currentNode.next;
		}

		console.log(arr);
	}
}

class DLLNode {
	constructor(data, prev = null, next = null) {
		this.data = data;
		this.prev = prev;
		this.next = next;
	}
}

class DoublyLinkedList {
	constructor(data) {
		this.head = new DLLNode(data);
		this.tail = this.head;
		this.length = 1;
	}

	append(data) {
		const node = new DLLNode(data, this.tail, null);

		this.tail.next = node;
		this.tail = node;
		this.length++;

		return this;
	}

	prepend(data) {
		const node = new DLLNode(data, null, this.head);

		this.head.prev = node;
		this.head = node;
		this.length++;

		return this;
	}

	getAt(index) {
		let count = 0;
		let currentNode = this.head;

		while (currentNode) {
			if (count === index) {
				return currentNode;
			}

			count++;
			currentNode = currentNode.next;
		}

		return null;
	}

	insert(data, index) {
		if (index === 0) {
			return this.prepend(data);
		}

		if (index >= this.length) {
			return this.append(data);
		}

		const prevNode = this.getAt(index - 1);
		const node = new DLLNode(data, prevNode, prevNode.next);

		prevNode.next = node;

		node.next.prev = node;
		this.length++;

		return this;
	}

	remove(index) {
		if (index === 0) {
			this.head = this.head.next;
			this.head.prev = null;
			return;
		}

		if (index >= this.length) {
			this.getAt(this.length - 2).next = null;
			return;
		}

		const prevNode = this.getAt(index - 1);
		prevNode.next = prevNode.next.next;
		prevNode.next.prev = prevNode;
		this.length--;

		return this;
	}

	printListData() {
		const arr = [];
		let currentNode = this.head;

		while (currentNode) {
			arr.push(currentNode.data);
			currentNode = currentNode.next;
		}

		console.log(arr);
	}
}

const myLinkedList = new LinkedList(10);
myLinkedList.append(5);
myLinkedList.append(16);
myLinkedList.reverse();

myLinkedList.printListData();
console.log(myLinkedList);
