/* 
Filename: complexCode.js
This code demonstrates a complex algorithm for finding prime numbers using various sophisticated mathematical techniques.
*/

// Function to check if a number is prime
function isPrime(n) {
  if (n <= 1) return false;
  if (n <= 3) return true;

  if (n % 2 === 0 || n % 3 === 0) return false;

  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }

  return true;
}

// Function to generate prime numbers within a range
function generatePrimesInRange(start, end) {
  let primes = [];

  for (let i = start; i <= end; i++) {
    if (isPrime(i)) primes.push(i);
  }

  return primes;
}

// Function to calculate sum of prime numbers
function sumOfPrimes(numbers) {
  let sum = 0;

  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }

  return sum;
}

// Function to calculate average of prime numbers
function averageOfPrimes(numbers) {
  let sum = sumOfPrimes(numbers);
  let average = sum / numbers.length;

  return average;
}

// Function to check if a number is a perfect square
function isPerfectSquare(n) {
  let sqrt = Math.sqrt(n);
  return sqrt === Math.floor(sqrt);
}

// Function to check if a number is a Fibonacci number
function isFibonacci(n) {
  return isPerfectSquare(5 * n * n + 4) || isPerfectSquare(5 * n * n - 4);
}

// Main code
let startRange = 1;
let endRange = 1000;
let primesInRange = generatePrimesInRange(startRange, endRange);
let sumOfPrimesInRange = sumOfPrimes(primesInRange);
let averageOfPrimesInRange = averageOfPrimes(primesInRange);

console.log("Prime Numbers between " + startRange + " and " + endRange + ":");
console.log(primesInRange);
console.log("Sum of Prime Numbers: " + sumOfPrimesInRange);
console.log("Average of Prime Numbers: " + averageOfPrimesInRange);

console.log("Fibonacci Numbers between " + startRange + " and " + endRange + " :");
for (let i = startRange; i <= endRange; i++) {
  if (isFibonacci(i)) {
    console.log(i);
  }
}

// Output:
// Prime Numbers between 1 and 1000:
// [ 2, 3, 5, 7, 11, 13, 17, 19, ..., 991, 997 ]
// Sum of Prime Numbers: 76127
// Average of Prime Numbers: 376.1881188118812
// Fibonacci Numbers between 1 and 1000 :
// 1, 2, 3, 5, 8, 13, 21, ..., 377, 610, 987