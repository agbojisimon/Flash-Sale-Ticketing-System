// Lightweight in-memory mutex registry for serializing critical sections.
class Mutex {
  // Create a mutex with a locked state and waiting queue.
  constructor() {
    this.locked = false;
    this.waiters = [];
  }

  // Acquire the lock and receive a release callback.
  acquire() {
    if (!this.locked) {
      this.locked = true;
      return Promise.resolve(this.release.bind(this));
    }

    return new Promise((resolve) => {
      this.waiters.push(() => resolve(this.release.bind(this)));
    });
  }

  // Release the lock and wake the next waiter, if any.
  release() {
    const nextWaiter = this.waiters.shift();

    if (nextWaiter) {
      nextWaiter();
      return;
    }

    this.locked = false;
  }

  // Run a callback exclusively while holding the lock.
  async runExclusive(callback) {
    const release = await this.acquire();

    try {
      return await callback();
    } finally {
      release();
    }
  }
}

const mutexes = new Map();

// Return a shared mutex instance for the provided key.
function getMutex(key) {
  if (!mutexes.has(key)) {
    mutexes.set(key, new Mutex());
  }

  return mutexes.get(key);
}

module.exports = {
  getMutex,
};