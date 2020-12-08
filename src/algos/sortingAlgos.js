
// algorithm knowledge refreshed from Gayle Laakmann McDowell's tutorial https://www.youtube.com/watch?v=KF2j-9iSf4Q 
export const mergeSort = array => {
    // array to store animations to return
    const animations = []

    // temp array that will hold sorted values
    const temp = [...array]

    // call helper
    mergeSortHelper(array, temp, 0, array.length - 1, animations)

    // return JSON with sorted array and array of animations
    return {sortedArray: array, animations: animations}
}

const mergeSortHelper = (array, temp, leftStart, rightEnd, animations) => {
    if (leftStart >= rightEnd) return;
    const middle = Math.floor( (leftStart + rightEnd) / 2);
    mergeSortHelper(array, temp, leftStart, middle, animations);
    mergeSortHelper(array, temp, middle + 1, rightEnd, animations);
    merge(array, temp, leftStart, rightEnd, animations);
}

// merges two sorted arrays together
const merge = (array, temp, leftStart, rightEnd, animations) => {
    // left end index and right start index
    let leftEnd = Math.floor((leftStart + rightEnd) / 2);
    let rightStart = leftEnd + 1;

    // array pointers
    let left = leftStart;
    let right = rightStart;
    let index = leftStart;

    // perform merge
    while (left <= leftEnd && right <= rightEnd) {
        // Values that we are comparing, push to select
        animations.push([left, right])
        // Push second time to deselect them
        animations.push([left, right])
        if (array[left] <= array[right]) {
            // push new height value at this index and overwrite temp array
            animations.push([index, array[left]]);
            temp[index] = array[left];
            left++;
        } else {
            // push new height value at this index and overwrite temp array
            temp[index] = array[right];
            animations.push([index, array[right]]);
            right++;
        }
        // increment pointer
        index++;
    }

    // only one of the while loops below will execute since previous while loop exited.
    while (left <= leftEnd) {
        // push triplet to select, deselect and update index
        animations.push([left, left]);
        animations.push([left,left]);
        animations.push([index, array[left]]);
        temp[index] = array[left];
        left++;
        index++;
    }
    
    while (right <= rightEnd) {
        // push triplet to select, deselect and update index
        animations.push([right, right]);
        animations.push([right, right]);
        animations.push([index, array[right]]);
        temp[index] = array[right];
        right++;
        index++;
    }

    // copy back into original array
    for (let i = leftStart; i <= rightEnd; i++) {
        array[i] = temp[i];
    }
}