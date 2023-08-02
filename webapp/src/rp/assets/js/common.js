const aa = 'test'

const bb = Promise.resolve(111)

const cc = async () => {
  const aa = await bb
  console.log(aa)
  console.log(2)
}

class Test {
  constructor(target, options) {
    this.target = target
    this.options = options
  }
  addLoop() {
    const options = {
      ...this.options,
      loop: true
    }
    this.options = options
    return this
  }
}

console.log(aa, bb)

cc()

const instance = new Test('target', {test: 11})
console.log(instance)
