### 一、 模块

1. NgModule 为一个组件集声明了编译的上下文环境
2. NgModule vs es6模块: 没有直接关联,  可以配合使用来开发应用。

### 二、组件

#### 1. 生命中周期 

- **constructor**
  - 组件的构造应该既便宜又安全。获取初始数据应该在`ngOnInit()` 中, 而不应该在组件构造函数中

- **OnChanges(changes: [SimpleChanges](https://angular.cn/api/core/SimpleChanges))**
  -  设置或重新设置数据绑定的输入属性时响应。
- **OnInit**
  -  第一次显示数据绑定和设置指令/组件的输入属性之后，初始化指令/组件。
  - 只调用**一次**

- DoCheck
  - 频繁执行-无论是否发生状态改变

- AfterContentInit
  - 只调用**一次**

- AfterContentChecked
  - 频繁执行-无论是否发生状态改变

- **AfterViewInit**
  - 当 Angular 初始化完组件视图及其子视图或包含该指令的视图之后调用
  - 只调用**一次**

- AfterViewChecked
  - 频繁执行-无论是否发生状态改变

- **OnDestroy**
  - 销毁指令/组件之前调用并清扫

#### 2. 组件交互

1. @Input和@Output
   - [`@input`装饰器可以装饰**getter **和**setter**](https://angular.io/guide/component-interaction#intercept-input-property-changes-with-a-setter)
2. ngOnChanges生命周期来监听输入属性@input的变化
3. 父组件通过模板变量, 获取子组件实例的引用
   - 缺点: 父组件类无法直接获取子组件实例
4. @ViewChild
5. 共享同一个service

#### 3. @ViewChild vs @ContentChild

ViewChild和ContentChild其实都是从子组件中获取内容, 本质的区别只是在于方法调用的`时机`以及获取内容的`地方`：            

- 时机：            

  - ViewChild在ngAfterViewInit的回调中调用           
  -  ContentChild在ngAfterContentInit的回调用调用                    

- 获取内容的地方            

  - ViewChild: 从组件模板中获取内容. 用于在组件类中访问子组件、DOM 元素或指令      

    ```JavaScript
    import { Component, ViewChild, ElementRef } from '@angular/core';
    
    @Component({
      selector: 'app-child',
      template: '<p #paragraph>Child Component</p>'
    })
    export class ChildComponent {
      @ViewChild('paragraph') paragraph: ElementRef;
    
      ngAfterViewInit() {
        console.log(this.paragraph.nativeElement.textContent); // 访问子组件的 DOM 元素
      }
    }
    ```
  
      
  
  - ContentChild:  该组件从投影的内容中(ng-content)获取指令所在的元素, 也就是没有使用ng-content投影就无法获取内容

    ```typescript
    
    @Component({
      selector: 'app-example-zippy',
      template: `
        <ng-content></ng-content>
        <div *ngIf="expanded" [id]="contentId">
          <ng-container [ngTemplateOutlet]="content.templateRef"></ng-container>
        </div>
      `,
    })
    export class ZippyComponent {
       /// 获取ZippyComponent组件内容投影中含有ZippyContentDirective指令的元素
       /// 例如, 下面代码块ZippyComponent的内容投影中, ZippyContentDirective在ng-template元素上.
      @ContentChild(ZippyContentDirective) content!: ZippyContentDirective;
    }
    ```
  
    ```html
    
    <app-example-zippy [expanded]="expaned">
      <button type="button" appExampleZippyToggle>Is content project cool?</button>
      <ng-template appExampleZippyContent>
        It depends on what you do with it
      </ng-template>
    </app-example-zippy>
    ```


#### 4. 组件投影

1. 父组件可以有多个投影, 但是同一个投影, 在子组件只能使用一次

#### 5.**ViewContainerRef**

1. 用于在**运行时**动态创建、插入和删除组件

### 三、模板

#### 1. 模板变量

1. [指定名称的变量](https://angular.cn/guide/template-reference-variables#variable-specifying-a-name)
   如果在模板变量的右侧指定了一个名字，比如 `#var="ngModel"`，那么该变量就会引用所在元素上具有名字的指令或组件。
   例如:  `#var="ngModel"` `#var="ngForm"`

2. [模板变量的作用域]([Angular - Understanding template variables](https://angular.io/guide/template-reference-variables#template-variable-scope))
   诸如 `*ngIf` 和 `*ngFor` 类的[结构指令](https://angular.cn/guide/built-in-directives)或 `<ng-template>` 声明会创建一个新的嵌套模板范围，就像 JavaScript 的控制流语句（例如 `if` 和 `for` 创建新的词法范围。你不能从边界外访问这些结构指令之一中的模板变量。子可以访问父, 父不可以访问子
   其他普通的html元素嵌套不会创建模板变量的作用域

3. [模板输入变量]([Angular - Understanding template variables](https://angular.io/guide/template-reference-variables#template-input-variable))

#### 2. [数据绑定]([Angular - Binding syntax](https://angular.io/guide/binding-syntax))

- 在 Angular 中，HTML Attribute 的唯一作用是初始化元素和指令的状态。
- 编写数据绑定时，你只是在处理 DOM Property 和目标对象的事件。
- 从技术角度上说，可以设置 `[attr.disabled]` Attribute 这个绑定。
  通常，要使用 Property 绑定而不是 Attribute 绑定。
- 数据绑定的类型
  - 属性绑定(DOM property) 例如: ` [className='tstname']` `[[ngClass]="{'special': isSpecial}"` `<input [disabled]="condition ? true : false">`
  - attribute绑定(HTML Attribute)  `[attr.aria-label]="help"`  `<input [attr.disabled]="condition ? 'disabled' : null">`
  - 事件绑定
  - 双向绑定
  - 类绑定 ` [class.special]="isSpecial` `[class]="tst`
  - style绑定 `[style.color]="isSpecial ? 'red' : 'green'"`

#### 其他

1. `ngNonBindable` 停用模板中的插值、指令和绑定。
2. Angular 在每个 JavaScript 事件循环中处理*所有的*数据绑定，它会从组件树的根部开始，递归处理全部子组件。

### 四、服务

1. 影响服务是否是共享同一个实例
   - 服务定义时: `@Injectable`中providedIn: root|platform|any
   - 服务使用时: 在组件的@Component装饰器的元数据的providers里注册
   - 即使服务定义时providedIn的值是root, 使用该服务时, 服务如果注册在组件中, 组件的子组件共享这个组件级别的服务实例, 而不是使用该服务全局的根级别的实例, 如果组件销毁, 对应的服务实例也会销毁, 下一次组件初始化的时候, 使用服务实例的初始值.

 

### 五、路由

路由器会把类似 URL 的路径映射到`视图`而不是`页面`。



### 六、指令

#### 1. 指令的类型

- *组件* :  带有模板的指令。这种指令类型是最常见的指令类型

- *结构型指令* :  通过添加、移除或替换 DOM 元素来修改布局。`*ngFor` `*ngIf` `ngSwitch` `*ngSwitchCase` `*ngSwitchDefault`

  - 应用结构指令时，它们通常以星号 `*` 为前缀。
    本约定是 Angular 解释并转换为更长形式的速记。Angular 会将结构指令前面的星号转换为围绕宿主元素及其后代的 `<ng-template>`。

    `<ng-template>`包裹的内容默认情况下不会渲染, 除非你间接或直接的控制来使其内容render
    `<ng-template>`是[TemplateRef](https://angular.cn/api/core/TemplateRef)类的实例

  - 使用 `*ngFor` 的 [trackBy]([Angular - Built-in directives](https://angular.io/guide/built-in-directives#tracking-items-with-ngfor-trackby)) 属性, 作用类似vue中v-for的key

  - `*ngif`不显示: '', null, undefined, false, 0

- *属性型指令* :  会修改现有元素的外观或行为。`ngModel` `ngStyle` `ngClass`

#### 2. 定义指令相关的api

1. 属性型指令

   1. @Input装饰器: 和组件一样, 使用多个Input装饰器, 可以将多个值传递给属性型指令

   2. @HostListener装饰器: 监听宿主元素发出的指定事件
      - 对于结构型指令: 因为宿主元素是注释类型的DOM节点, 无法添加事件监听
   3. [ElementRef](https://angular.cn/api/core/ElementRef)   `ElementRef` 的 `nativeElement` 属性会提供对宿主 DOM 元素的直接访问权限。
      - 对于结构型指令: 该值是Comment 类型的DOM节点

1. [结构性指令]([Angular - Structural directives](https://angular.io/guide/structural-directives))
   1. @Input装饰器: 
   2. ViewContainerRef
   3. TemplateRef: `<ng-template>`是[TemplateRef](https://angular.cn/api/core/TemplateRef)类的实例

#### 其他

1. 当 Angular 渲染模板时，会根据*指令*给出的指示对 DOM 进行转换 
2. 每个元素只能有一个结构型指令。
3. @[Directive](https://angular.cn/api/core/Directive)()装饰器的配置属性: `selector`, 是css属性选择器
4. 组件从技术角度上说就是一个指令，但是由于组件对 Angular 应用来说非常独特、非常重要，因此 Angular 专门定义了 `@Component()` 装饰器，它使用一些面向模板的特性扩展了 `@Directive()` 装饰器。





### 七、其他

#### 1. service的`providedIn`理解

**TL;DR**: It's all about controlling how many instances of your service will be created, and where should they be available after being created.

------

**Terminology:**

- **Injectable** - any class decorated with `@Injectable`, for example a service.
- **injector** - 注入器. an Angular class that is capable of providing Injectables to classes below it. (This includes all components and modules.)
- **injector scope/level** - the scope of all class instances that live "below" a specific injector.
- **injector hierarchy** - a proritized tree of injector scopes, organized in `platform -> root -> module -> component` order.
- Injectable is **provided** - an instance of the Injectable will be given to classes below this specific injector level, whenever they request it.
- Injectable is **injected** - a class constructor has requested to be given some instance of the service, so Angular will try to [give it the nearest instance that can be found in the injector hierarchy](https://angular.io/guide/hierarchical-dependency-injection#resolution-rules)".
  翻译: 如果一个类的构造函数请求使用某个服务的实例, ng会从injector树中找最近的其所需的服务的的实例给该组件
- **tree-shaking** - an optimization that happens automatically thanks to the Angular compiler. When it detects that some code is not being used, that code is removed from the final compilation of the app (or compilation of a given lazy-loaded module).

Other terms that you should already know: **class, instance, module, component, lazy/eagerly loaded modules**.

------

**Q: What exactly does `providedIn` do?**

It's a setting that determines which injectors should provide your Injectable.

Let's assume we create an Injectable called `MyService`, and go through what [all the options](https://angular.io/api/core/Injectable#options) do.

```js
providedIn: Type<any> | 'root' | 'platform' | 'any' | null
```

> ```
> providedIn: 'platform'
> ```

Angular will create and provide a single shared instance of `MyService` to all Angular *applications* on the page. (This is only relevant in advanced use cases, if you use a micro-frontends architecture.)

> ```
> providedIn: 'root'
> ```

Angular will create a single shared instance of `MyService` and provide it to all classes in the application.

> ```
> providedIn: 'any'
> ```

Angular will create a single shared instance of `MyService` and provide it to all classes *in eagerly-loaded modules*.

However, each *lazy-loaded module* will provide its own, new, separate instance of `MyService` (that will then be only available in classes inside that module).

> ```
> providedIn: MyModule
> ```

Angular will only create an instance of `MyService` if `MyModule` is loaded.

If `MyModule` is *eagerly loaded*, that instance will be available to all other eagerly loaded modules from now on. (Note that this is effectively identical to `providedIn: 'root'`.)

However, if `MyModule` is *lazy loaded*, then this instance will be provided only for classes inside `MyModule`, whenever it happens to be loaded.

> ```
> providedIn: MyComponent
> ```

Angular will create a new, fresh instance of `MyService` whenever `MyComponent` is instantiated.

This `MyService` instance will only be provided for descendants of that specific `MyComponent` *instance*, and will be destroyed as soon as the component instance is destroyed. (Note that means that a new `MyService` will be created for each time this component is rendered.)

> ```
> providedIn: null
> ```

`MyService` can only ever be instantiated by being added to `providers` array in a specific module or component.

Whenever that module/component is instantiated, it will create a new instance of `MyService`, and provide it only in its specific scope. (See full description of `providers` array below.)

------

**Q: What does `providers` array do?**

Any injector can be set up with a `providers` array:

```js
@NgModule({
  providers: [MyService],
})

@Component({
  providers: [MyService],
})
```

All Injectables can be added to a `providers` array, *regardless* of their `providedIn` setting.

Adding `MyService` to `providers` array will cause the injector to create and provide an entirely separate instance of it to classes in its scope. (The scope is exactly the same as described in `providedIn: MyModule` and `providedIn: MyComponent` examples above.)

This method of providing does not support tree-shaking. The service will always be included in the compilation, even if none uses it. (See tree-shaking notes below.)

**Q: Why would I use `providers` array  and  `providedIn` simultaneously?**

An example use case might be if `MyService` is `providedIn: 'root'` and already has a shared instance, but you want your module/component to have its own, separate instance.

------

**Additional notes:**

**Q: How do `providedIn`/`providers` settings affect tree-shaking?**

An Injectable *configured with `providedIn`* will be tree-shaken if it is not injected by any (eagerly or lazy loaded) class in its assigned injector scope.

However, an *Injectable assigned to a `providers` array* in some module/component will never be tree-shaken, even if it is not injected anywhere.

To make tree-shaking most effective, you should aim to always use `providedIn` over `providers` array.

**Q: Why would I use `providedIn: 'root'` if I think using `providers` array in `AppModule` looks cleaner?**

As explained above, the main difference is that between the two methods, `providedIn` supports tree-shaking, and `providers` array does not.

Other than that, it's an architectural decision: if we set `providedIn` directly in the Injectable file, the Injectable *owns* the decision of how it should be provided. Distinguishing *who owns the contract* has significant implications for large apps and teams that have to cooperate between hundreds of modules.

**Q: Is there a difference between setting `providers: [MyService]` array in `AppComponent` or `AppModule`?**

Yes. `MyService` will be provided in lazy-loaded modules *only* if you do it in `AppModule`, not `AppComponent`.

(That's because lazy-loaded modules rely on `Router`, which gets imported in `AppModule`, one injector scope higher than `AppComponent`.)

#### 2. 常用装饰器

1. @Input
2. @Output
3. @ViewChild
4. @ContentChild
5. @HostListener
6. [@HostBinding]([Angular - HostBinding](https://angular.io/api/core/HostBinding)): 把一个 DOM 属性标记为绑定到宿主的属性

#### 3. 常用类

1. [TemplateRef](https://angular.cn/api/core/TemplateRef)
2. [ViewContainerRef](https://angular.cn/api/core/ViewContainerRef):   createEmbeddedView<T>(templateRef: TemplateRef<T>,); createComponent<T>(componentType: Type<T>)

#### 其他

1. 处理事件的常见方法之一是把事件对象 `$event` 传给处理该事件的方法。
   目标事件决定了 `$event` 对象的形态。如果目标事件是来自原生 DOM 元素的，那么 `$event` 是一个[DOM 事件对象](https://developer.mozilla.org/docs/Web/Events)，它具有 `target` 和 `target.value` 等属性。
2. - ng:  `<ng-container>`
   - vue:  `<template>`
   - react:  `<React.Fragment>`
   - 小程序:  `<block>`







### ques: 

1. 模块可以懒加载, 而不是组件的懒加载?
2. 路由是服务?



### 待看列表

- [ ] [结构型指令]([Angular - Structural directives](https://angular.io/guide/structural-directives))
- [ ] [ng元素](https://angular.cn/guide/elements)





