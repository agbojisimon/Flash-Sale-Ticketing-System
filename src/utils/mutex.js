class Mutex {
  constructor() {
    this.locked = false;
    this.waiters = [];
  }

  acquire() {
    if (!this.locked) {
      this.locked = true;
      return Promise.resolve(this.release.bind(this));
    }

    return new Promise((resolve) => {
      this.waiters.push(() => resolve(this.release.bind(this)));
    });
  }

  release() {
    const nextWaiter = this.waiters.shift();

    if (nextWaiter) {
      nextWaiter();
      return;
    }

    this.locked = false;
  }

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

function getMutex(key) {
  if (!mutexes.has(key)) {
    mutexes.set(key, new Mutex());
  }

  return mutexes.get(key);
}

module.exports = {
  getMutex,
};