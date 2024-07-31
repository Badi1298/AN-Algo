'use strict';

/**
 * Arrays
 */
// 1. Merge two sorted arrays
const mergeSortedArray = (arr1, arr2) => {
	const sortedArr = [];

	while (arr1.length && arr2.length) {
		if (arr1[0] < arr2[0]) {
			sortedArr.push(arr1.shift());
		} else {
			sortedArr.push(arr2.shift());
		}
	}

	return [...sortedArr, ...arr1, ...arr2];
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

// const myLinkedList = new LinkedList(10);
// myLinkedList.append(5);
// myLinkedList.append(16);
// myLinkedList.reverse();

// myLinkedList.printListData();
// console.log(myLinkedList);

/**
 * Stacks & Queues
 */
class Node {
	constructor(data, next = null) {
		this.data = data;
		this.next = next;
	}
}

class Stack {
	constructor() {
		this.top = null;
		this.bottom = null;
		this.length = 0;
	}

	peek() {
		console.log(this.top);

		return this.top;
	}

	push(data) {
		if (this.length === 0) {
			const node = new Node(data);
			this.top = node;
			this.bottom = node;
		} else {
			this.top = new Node(data, this.top);
		}

		this.length++;

		return this;
	}

	pop() {
		if (!this.top) return null;

		this.top = this.top.next;
		this.length--;

		return this;
	}
}

// const stack = new Stack();
// stack.push('google');
// stack.push('discord');
// stack.push('youtube');
// stack.pop();
// stack.peek();

// console.log(stack);

class Queue {
	constructor() {
		this.first = null;
		this.last = null;
		this.length = 0;
	}

	peek() {
		console.log(this.first);

		return this.first;
	}

	enqueue(data) {
		const node = new Node(data);

		if (this.length === 0) {
			this.first = node;
			this.last = node;
		} else {
			this.last.next = node;
			this.last = node;
		}

		this.length++;

		return this;
	}

	dequeue() {
		if (!this.first) return null;

		this.first = this.first.next;
		this.length--;

		return this;
	}
}

// const queue = new Queue();
// queue.enqueue('Ioana');
// queue.enqueue('Serban');
// queue.enqueue('Calin');
// queue.dequeue();

// console.log(queue);

/**
 * Trees
 */
class BSTNode {
	constructor(data, left = null, right = null) {
		this.data = data;
		this.left = left;
		this.right = right;
	}

	insert(data) {
		const node = new BSTNode(data);

		if (data < this.data && this.left) {
			this.left.insert(data);
		} else if (data < this.data) {
			this.left = node;
		} else if (data > this.data && this.right) {
			this.right.insert(data);
		} else {
			this.right = node;
		}
	}

	lookup(data) {
		if (data < this.data && this.left) {
			this.left.lookup(data);
		} else if (data < this.data) {
			console.log(this);
		} else if (data > this.data && this.right) {
			this.right.lookup(data);
		} else {
			console.log(this);
		}
	}
}

// const bst = new BSTNode(10);
// bst.insert(20);
// bst.insert(2);
// bst.insert(5);
// bst.insert(1);
// bst.insert(24);
// bst.insert(17);
// bst.lookup(20);

// console.log(bst);

/**
 * Graphs
 */
// Edge List
const graphEdgeList = [
	[0, 2],
	[2, 3],
	[2, 1],
	[3, 1],
];

// Adjacent List
const graphAdjacentList = [[2], [2, 3], [0, 1, 3], [1, 2]];
const graphAdjacentListObj = {
	0: [2],
	1: [2, 3],
	2: [0, 1, 3],
	3: [1, 2],
};

// Adjacent Matrix
const graphAdjacentMatrix = [
	[0, 0, 1, 0],
	[0, 0, 1, 1],
	[1, 1, 0, 1],
	[0, 1, 1, 0],
];
const graphAdjacentMatrixObj = {
	0: [0, 0, 1, 0],
	1: [0, 0, 1, 1],
	2: [1, 1, 0, 1],
	3: [0, 1, 1, 0],
};

class Graph {
	constructor() {
		this.numberOfNodes = 0;
		this.adjacentList = {};
	}

	addVertex(node) {
		this.adjacentList[node] = [];
		this.numberOfNodes++;
	}

	addEdge(node1, node2) {
		this.adjacentList[node1].push(node2);
		this.adjacentList[node2].push(node1);
	}
}

const graph = new Graph();

// graph.addVertex(0);
// graph.addVertex(1);
// graph.addVertex(2);
// graph.addVertex(3);
// graph.addVertex(4);
// graph.addVertex(5);
// graph.addVertex(6);
// graph.addEdge(0, 1);
// graph.addEdge(0, 2);
// graph.addEdge(1, 2);
// graph.addEdge(1, 3);
// graph.addEdge(2, 4);
// graph.addEdge(3, 4);
// graph.addEdge(4, 5);
// graph.addEdge(5, 6);

// console.log(graph);

/**
 * Recursion
 */

// 1. Factorial
function factorial(number = 1, fact = 1) {
	if (number === 1) return fact;

	return factorial(number - 1, fact * number);
}

function factorialV2(number = 2) {
	if (number === 2) return 2;

	return number * factorialV2(number - 1);
}

// console.log(factorial(5));
// console.log(factorialV2(5));

// 2. Fibonacci
function fibonacci(n = 0) {
	if (n < 2) return n;

	return fibonacci(n - 1) + fibonacci(n - 2);
}

// console.log(fibonacci(9));

// 3. Reverse String
function reverseString(str = '') {
	if (!str) return str;

	return str.slice(str.length - 1) + reverseString(str.slice(0, str.length - 1));
}

// console.log(reverseString('aaab'));

/**
 * Sorting
 */

const arrToSort = [99, 44, 6, 2, 1, 1, 5, 63, 87, 283, 4, 0];

// 1. Bubble Sort
function bubbleSort(arr) {
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr.length; j++) {
			if (arr[j] > arr[j + 1]) {
				const temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
			}
		}
	}

	return arr;
}

// console.log(bubbleSort(arrToSort));

// 2. Selection Sort
function selectionSort(arr) {
	for (let i = 0; i < arr.length; i++) {
		let minIndex = i;
		let min = arr[i];

		for (let j = i + 1; j < arr.length; j++) {
			if (arr[j] > min) continue;

			minIndex = j;
			min = arr[j];
		}

		arr[minIndex] = arr[i];
		arr[i] = min;
	}

	return arr;
}

// console.log(selectionSort(arrToSort));

// 3. Insertion Sort
function insertionSort(arr) {
	for (let i = 1; i < arr.length; i++) {
		let current = arr[i];
		let j;

		for (j = i - 1; j >= 0 && arr[j] > current; j--) {
			arr[j + 1] = arr[j];
		}

		arr[j + 1] = current;
	}

	return arr;
}

// console.log(insertionSort(arrToSort));

// 4. Merge Sort
function mergeSort(arr) {
	if (arr.length === 1) return arr;

	const left = arr.slice(0, Math.floor(arr.length / 2));
	const right = arr.slice(Math.floor(arr.length / 2));

	return mergeSortedArray(mergeSort(left), mergeSort(right));
}

console.log(mergeSort(arrToSort));
