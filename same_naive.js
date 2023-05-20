/*
Write a function called same, which accepts two arrays.
The function should return true if every value in the array has its corresponding values squared in the second array.
The frequency of values must be the same.

same([1,2,3], [4,1,9]) // true
same([1,2,3], [1,9]) // false
same([1,2,1], [4,4,1]) // false (must be same frequency)
*/

const same = (arr1, arr2) => {
    // Step 1: loop through the arr1
    for (let i = 0; i < arr1.length; i++) {
        // Step 2: find the index
        const index = arr2.indexOf(arr1[i] ** 2);

        // Step 3; if index doesn't exist, return false
        if (index === -1) {
            return false;
        }
        // Step 4: splice off the matched index
        arr2.splice(index, 1);
    }
    // Step 5: return true;
    return true;
};

console.log(same([1, 2, 3], [4, 1, 9])) // true
console.log(same([1, 2, 3], [1, 9])) // false
console.log(same([1, 2, 1], [4, 4, 1])) // false (must be same frequency)
