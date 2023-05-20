/*
Write a function called sumZero which accepts a sorted array of integers.
The function should find the first pair where the sum is 0.
Return an array that includes both values that sum to zero or undefined if a pair does not exist.

sumZero([-3, -2, -1, 0, 1, 2, 3]) // [-3, 3]
sumZero([-2, 0, 1, 3]) // undefined
sumZero([1, 2, 3]) // undefined
*/

const sumZero = (intArr) => {
    for (let i = 0; i < intArr.length; i++) {
        for (let j = intArr.length - 1; j >= 0; j--) {
            if (intArr[i] + intArr[j] === 0) return [intArr[i], intArr[j]]
            else return;
        }
    }
}

console.log(sumZero([-3, -2, -1, 0, 1, 2, 3])) // [-3, 3]
console.log(sumZero([-2, 0, 1, 3])) // undefined
console.log(sumZero([1, 2, 3])) // undefined
