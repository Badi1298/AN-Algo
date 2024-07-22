// Arrays
// 1. Merge two sorted arrays
const mergeSortedArray = (arr1: number[], arr2: number[]) => {
	if (!arr1 || !arr1.length) return arr2
	if (!arr2 || !arr2.length) return arr1

	const sortedArr: number[]  = []

	while (arr1.length || arr2.length) {
		if (arr1[0] < arr2[0]) {
			sortedArr.push(arr1.shift()!)
		} else {
			sortedArr.push(arr2.shift()!)
		}
	}

	console.log(sortedArr)
}

mergeSortedArray([1, 3, 7], [3, 20, 51])