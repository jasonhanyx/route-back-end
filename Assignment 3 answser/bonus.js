//const nums = [2, 2, 1, 1, 1, 2, 2];

function majorityElement(nums) {
    const count = {};

    for (const num of nums) {
        count[num] = (count[num] || 0) + 1;

        if (count[num] > nums.length / 2) {
            return num;
        }
    }
}

//console.log(majorityElement(nums));
