'use strict';

// Arrays
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

// Hash Maps
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

console.log(recurring([2, 5, 1, 2, 3, 5, 1, 2, 4]));
console.log(recurring([2, 3, 4, 5]));
