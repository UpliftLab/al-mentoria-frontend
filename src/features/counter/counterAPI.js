// A mock function to mimic making an async request for data
const fetchCount = (amount = 1) => new Promise(
  (resolve) => setTimeout(() => resolve({ data: amount }), 500),
);

export default fetchCount;
