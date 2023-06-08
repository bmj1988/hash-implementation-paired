class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    this.data = new Array(numBuckets).fill(null)
    this.capacity = numBuckets
    this.count = 0
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    const loadSize = this.count / this.capacity
    if (loadSize > 0.7) this.resize()
    let index = this.hashMod(key)
    let node = this.data[index]
    while (node && node.key !== key) {
      node = node.next
    }
    if (node) {
      node.value = value
    }
    else {
      let newNode = new KeyValuePair(key, value)
      if (!this.data[index]) {
        this.data[index] = newNode
      }
      else {
        newNode.next = this.data[index]
        this.data[index] = newNode
      }
      this.count++


    }
  }


  read(key) {
    const i = this.hashMod(key)
    let currentNode = this.data[i]
    while (currentNode) {
      if (currentNode.key === key) {
        return currentNode.value
      }
      currentNode = currentNode.next
    }
    return undefined
  }


  resize() {
    const oldData = this.data
    this.capacity *= 2
    this.data = new Array(this.capacity).fill(null)
    this.count = 0
    for (let i = 0; i < oldData.length; i++) {
      let node = oldData[i]
      while (node) {
        this.insert(node.key, node.value)
        node = node.next
      }
    }
    return
  }


  delete(key) {
    let index = this.hashMod(key)
    let currentNode = this.data[index]
    let nextNode = this.data[index].next
    while (currentNode.next) {
      if (nextNode.key === key) {
        if (!nextNode.next) {
          currentNode.next = undefined
          return
        }
        else {
          let nx = currentNode.next.next
          currentNode.next = nx
          return
        }
      }
      currentNode = currentNode.next
    }
    return
  }
}


module.exports = HashTable;
