class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  extractMin() {
    if (this.isEmpty()) {
      return null;
    }

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return min;
  }

  heapifyUp() {
    let index = this.heap.length - 1;

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index] < this.heap[parentIndex]) {
        this.swap(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  heapifyDown() {
    let index = 0;

    while (true) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let smallest = index;

      if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] < this.heap[smallest]) {
        smallest = leftChildIndex;
      }

      if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[smallest]) {
        smallest = rightChildIndex;
      }

      if (index !== smallest) {
        this.swap(index, smallest);
        index = smallest;
      } else {
        break;
      }
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  swap(i, j) {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }
}

function mincost(arr) {
  const minHeap = new MinHeap();

  // Insert all ropes into the min heap
  for (const rope of arr) {
    minHeap.insert(rope);
  }

  let cost = 0;

  // Keep connecting the two smallest ropes until there is only one rope left
  while (!minHeap.isEmpty()) {
    const firstMin = minHeap.extractMin();
    const secondMin = minHeap.extractMin();

    const currentCost = firstMin + secondMin;
    cost += currentCost;

    if (!minHeap.isEmpty()) {
      minHeap.insert(currentCost);
    }
  }

  return cost;
}

module.exports = mincost;