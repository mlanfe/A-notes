// 写出Promise的关键是明白Promise的几个关键问题, 并且记住各方法的返回值是Promise实例

// 给同一个Promise实例通过多个调用then方法, 绑定多个回调函数

// 手写过程出现的问题: 
//   测试案例写错;
//   返回值是pending状态的Promise实例, 且没有后续改变pending状态;

(function(window) {
  const RESOLVED = 'resolved';
  const REJECTED = 'rejected';
  const PENDING = 'pending';

  function Promise(executor){
    this.status = PENDING
    this.callbacks = []
    this.data = undefined

    const _this = this

    function resolve(value) {
      if(_this.status !== PENDING) return
      _this.status = RESOLVED 
      _this.data = value

      // 应该把setTimeout写在里面判断语句里面,这样可能避免新建一个计时器
      // setTimeout(() => {
      //   if( _this.callbacks.length > 0 ){
      //     _this.callbacks.forEach(({onResolve}) => onResolve())
      //   }
      // })
      if( _this.callbacks.length > 0 ){
        setTimeout(() => {
            _this.callbacks.forEach(({onResolve}) => onResolve())
        })
      }
    }
    function reject(err) {
      if(_this.status !== PENDING) return
      _this.status = REJECTED
      _this.data = err

      if( _this.callbacks.length > 0 ){
        setTimeout(() => {
            _this.callbacks.forEach(({onReject}) => onReject())
        })
      }
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  
  Promise.prototype.then = function (onResolve, onReject ) {
    onResolve = typeof onResolve === 'function' ? onResolve : value => value
    onReject = typeof onReject === 'function' ? onReject : err => { throw err }
    const _this = this

    return new Promise((resolve, reject) => {
      function execCallback(callback) {
        try {
          const value = callback(_this.data)
          if(value instanceof Promise) {
            value.then(resolve, reject)
          }else {
            resolve(value)
          }
        } catch (error) {
          reject(error)
        }
      }

      if(_this.status === PENDING) {
        // 这里不需要借助setTimeout,因为构造函数中的resolve和reject在内部已经做了异步处理
        // 注意: Promise构造函数只是把resolve和reject传给executor,由executor内部调用, 不是有Promise内部调用
        _this.callbacks.push({
          // 此处的新函数不仅仅作为原来的promise的回调函数, 
          // 还在根据回调函数执行的结果, 内部改变了返回的promise实例的状态
          onResolve() { execCallback(onResolve) },
          onReject() { execCallback(onReject) },
        })
      }else if(_this.status === RESOLVED) {
          setTimeout(() => { execCallback(onResolve) })
      }else{
        setTimeout(() => { execCallback(onReject) })
      }
    })
  }

  Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected)
  }

  Promise.resolve = function (value ) {
    return new Promise((resolve, reject) => { 
      if (value instanceof Promise) {
        value.then(resolve, reject)
      } else {
        resolve(value)
      }
    })
  }
  
  Promise.reject = function (error) {
    return new Promise((resolve, reject) => {
      reject(error)
    })
  }

  Promise.all = function(promiseArr) {
    const values = new Array(promiseArr.length)
    let resolvedCount = 0

    return new Promise((resolve, reject) => {
      promiseArr.foreach((p, index) => {
        // p可能不是Promise实例
        Promise.resolve(p).then(value => {
          resolvedCount ++
          // 为保证values里结果的顺序和promiseArr相对应, 不能使用push
          // 因为每一个p的resolve的时间可能不一样
          values[index] = value

          // 不能用values.length和promiseArr.length作比较,
          // 因为values.length在开始的时候就被设置为promiseArr.length，以便
          // 在通过方括号语法操作values时不报错
          if(resolvedCount === promiseArr.length) {
            resolve(values)
          }
        }, reason => {
          reject(reason)
        })
      })

    })
  }

  Promise.race = function(promiseArr) {
    return new Promise((resolve, reject) => { 
      promiseArr.foreach(p => {
        Promise.resolve(p).then(resolve, reject)
      })
    })
  }

  window.Promise = Promise
})(window)