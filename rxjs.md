```javascript

// Subscription
const subscribe = subscriber => {
  // Observable execution: emit value
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
}

// Observer
const observer = {
  next: x => console.log('Observer got a next value: ' + x),
  error: err => console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification'),
};

// 1. 创建 observable
const observable = new Observable(subscribe);

// 2. 订阅 observable
// A Subscription is an object that represents a disposable resource, usually the execution of an Observable
const subscription observable.subscribe(observer);

// 3. 执行 observable
//subscribe函数里面的代码表示"Observable execution", 这些代码是懒执行的, 只有observable被订阅后才会执行

// 4. 取消订阅 observable
subscription.unsubscribe()


```



### 一. Observable

### 二. Observer

### 三. Operator

纯函数, 不影响原来的Observable, 产生新的Observable, 新的Observable的

#### 1. 种类

- **Pipeable Operators**: 在pipe()里面使用
- **Creation Operators**: 可以单独调用

#### 2. Higher-order Observables

Observables most commonly emit ordinary values like strings and numbers, but surprisingly often, it is necessary to handle Observables *of* Observables, so-called higher-order Observables [#](https://rxjs.dev/guide/operators#higher-order-observables)

### 

### 四. Subscription

A Subscription is an object that represents a disposable resource, usually the execution of an Observable.

大概就是指Observable传值的过程叫做`Subscription` / `Observable execution`



### 五. Subject

1. 特殊的Observable, 既是Observable又是Observer

2. 通常使用Observable, 只能在订阅时传递一个Observer(`单播` **unicast** ), 但是通过Subject, 可以在订阅的时候传递多个Observer(`多播`**multicast**)

   - Subjects are the only way of making any Observable execution be shared to multiple Observers.
   - From the perspective of the Observer, it cannot tell whether the Observable execution is coming from a plain unicast Observable or a Subject.
   - Internally to the Subject, `subscribe` does not invoke a new execution that delivers values. It simply registers the given Observer in a list of Observers, similarly to how `addListener` usually works in other libraries and languages.
     Observable的订阅会导致Subscription执行, 但是Subject的订阅不会, 可以使用`BehaviorSubject`, `ReplaySubject`来传递之前的值

3. Subject的种类

   1. `BehaviorSubject`

   2. `ReplaySubject`

   3. `AsyncSubject`

      The AsyncSubject is a variant where only the last value of the Observable execution is sent to its observers, and only when the execution completes.

      如果不调用`subject.complete()`, 即使`subject.next('val')`是最后一个Observable execution, Observer的next方法也不会执行

   4. *void subject*:  by declaring a *void subject*, you signal that the value is irrelevant. Only the event itself matters.

      ```javascript
      const subject = new Subject<void>();
      setTimeout(() => subject.next(), 1000);
      ```

### 六. 其他

1. rxjs的代码是**同步执行**, 也就是说observer的next方法会在Promise等微任务前面执行
2. **to read of document**
   - [multicasted Observable](multicasted Observable)
   - [Scheduler](https://rxjs.dev/guide/scheduler)









