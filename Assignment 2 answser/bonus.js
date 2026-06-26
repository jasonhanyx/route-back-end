//const arr = [2, 3, 4, 7, 11] // 1 , 5 , 6 , 8 , 9 .....

const findK = (arr, k) => {
    for (let i = 0; i < arr.length; i++) {
        const missing = arr[i] - (i + 1);

        if (missing >= k) {
            return i + k;
        }
    }
    console.log(i);
    return arr.length + k;
};

//console.log(findK(arr, 5));