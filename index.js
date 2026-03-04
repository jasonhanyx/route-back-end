//1. convert string
var x = "123"
var y = Number(x) + 7
console.log(y)


//2. false check
var x = 1
if (x != 0) {
    console.log("Invalid")
}
else {
    console.log("Valid")
}


//3. skipping even numbers
for (i = 1; i <= 10; i++) {
    if (i % 2 === 0) continue
    console.log(i)
}


//4. filter for even numbers
var x = [1, 2, 4, 5, 6, 7, 8, 9]
var even = arr.filter(n => n % 2 === 0)
console.log(even)


//5 merge two arrays
var arr1 = [1, 2, 3]
var arr2 = [4, 5, 6]
var arr = [...arr1, ...arr2]
console.log(arr)


//6 switch fro week days
var day = 4
switch (day) {
    case 1: console.log("Friday"); break;
    case 2: console.log("Saterday"); break;
    case 3: console.log("Sunday"); break;
    case 4: console.log("Monday"); break;
    case 5: console.log("Tuesday"); break;
    case 6: console.log("wednesday"); break;
    case 7: console.log("Thursday"); break;
}



//7 mapping length
var arr = ["a", "ab", "abc"]
var l = arr.map(l => l.length)
console.log(l)

//8 divisible check
var x = 15
if (x % 3 === 0 && x % 5 === 0)
    console.log("“Divisible by both”")
else
    console.log("“Not divisible by both”")


//9 square a number
let x = 6;
let sqr = x * x;
console.log(sqr);


//10 destructure



//11 sum of numbers
var sum = 1 + 2 + 3 + 4 + 5;
console.log(sum);


//12 promise
new Promise((resolve) => {
    setTimeout(() => resolve("Success"), 3000);
}).then(msg => console.log(msg));


//13 
var nums = [1, 3, 7, 2, 9];
var largest = nums[0];

for (var i in nums) {
    if (nums[i] > largest)
        largest = nums[i]
}
console.log(largest);


//14
var arr = { name: "john", age: 30 }
var value = Object.values(arr)

console.log(value)


//15
var s = "The quick brown fox";
var words = s.split(" ");
console.log(words);

//part 2
/* 1. foreach: only on the array , connot use break or continue.
for...of: can use it on every thing , con use break or continue

2.hoisting: يعني JavaScript بترفع تعريفات المتغيرات والدوال لأعلى السكوب قبل تنفيز باقي الكود , with var
TDZ: with let , const

3.  == (loose equal): بتقارن اماكن ال variables في ال data base او بتقارن القيم حتي لو نوعها مختلف (auto type)
=== (strict equal): بتقارن القيم و نوعها

4.Type Conversion: changing the variables types by the coder
Type coercion: changing the variables types by the javascript itself (auto) */
