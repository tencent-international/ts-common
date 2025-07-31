type LockerResolve = () => void
type LockerType = 'read' | 'write'

interface LockerQueueItem {
  type: LockerType
  resolve: LockerResolve
}

export class ReadWriteLock {
  private readers = 0
  private writer = false
  private queue: LockerQueueItem[] = []

  async acquireRead() {
    if (!this.writer && !this.queue.some(q => q.type === 'write')) {
      this.readers++
      return
    }
    await new Promise<void>(resolve => this.queue.push({ type: 'read', resolve }))
    this.readers++
  }

  releaseRead() {
    this.readers--
    if (this.readers === 0) this._next()
  }

  async acquireWrite() {
    if (!this.writer && this.readers === 0) {
      this.writer = true
      return
    }
    await new Promise<void>(resolve => this.queue.push({ type: 'write', resolve }))
    this.writer = true
  }

  releaseWrite() {
    this.writer = false
    this._next()
  }

  private _next() {
    if (this.queue.length === 0) return
    if (this.queue[0]?.type === 'write') {
      const next = this.queue.shift()
      next?.resolve()
    } else {
      while (this.queue.length > 0 && this.queue[0]?.type === 'read') {
        const next = this.queue.shift()
        next?.resolve()
      }
    }
  }

  async runWithRead<T>(fn: () => Promise<T>): Promise<T> {
    await this.acquireRead()
    try {
      return await fn()
    } finally {
      this.releaseRead()
    }
  }

  async runWithWrite<T>(fn: () => Promise<T>): Promise<T> {
    await this.acquireWrite()
    try {
      return await fn()
    } finally {
      this.releaseWrite()
    }
  }
}

export class MutexLock {
  private locked = false
  private queue: (() => void)[] = []

  async lock() {
    if (!this.locked) {
      this.locked = true
      return
    }
    await new Promise<void>(resolve => this.queue.push(resolve))
    this.locked = true
  }

  unlock() {
    if (this.queue.length > 0) {
      const next = this.queue.shift()
      next && next()
    } else {
      this.locked = false
    }
  }

  tryLock(): boolean {
    if (!this.locked) {
      this.locked = true
      return true
    }
    return false
  }
}
