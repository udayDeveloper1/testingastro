// myWorker.js

self.onmessage = function (event) {
  const number = event.data;

  // Example: Heavy calculation
  const result = factorial(number);
  self.postMessage(result);
};

function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
