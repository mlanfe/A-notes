# Angular

## Dependency Injection

### 4个核心对象

- Injector

- Dependency

- Dependency Consumer

- Dependency Provider



 项目启动启动时会自动创建Injector. 

Injector通过注册的provider实例化Dependency. 

Angular creates an application-wide injector ( "root" injector) during the application bootstrap process. 
In most cases you don't need to manually create **injectors**, but you should know that there is a layer that connects **providers** and **consumers**.

When a dependency is requested, the injector checks its registry to see if there is an instance already available there. If not, a new instance is created and stored in the registry.

When Angular discovers that a component depends on a service, it first checks if the **injector** has any existing instances of that service. If a requested service instance doesn't yet exist, the injector creates one using the **registered provider**, and adds it to the injector before returning the service to Angular.

When all requested services have been resolved and returned, Angular can call the component's constructor with those services as arguments.

`@Injectable` decorator to show that the class can be injected.



### Provide a dependency  

##### 1. applicaiton root level(推荐): **providedIn**

- ```typescript
  @Injectable({
    providedIn: 'root'
  })
  ```

- tree-shaking

- creates **single**, **shared** instance

#####  2. component level: **providers**

- ```typescript
  @Component({
    selector: 'hero-list',
    template: '...',
    providers: [HeroService]
  })
  class HeroListComponent {}
  ```

- 不能被tree-shaking

- creates a new instance of the service with each new instance of that component.

##### 3. applicaiton root level: **AppplicationConfig**

- ```typescript
  export const appConfig: ApplicationConfig = {
      providers: [
        { provide: HeroService },
      ]
  };
  bootstrapApplication(AppComponent, appConfig)
  ```

- 不能被tree-shaking

- creates **single**, **shared** instance

##### 4. Ngmodule based applicaitons(少数情况)

- 不能被tree-shaking
- <span style="color: red">todo ???</span>
- [detail](https://angular.dev/guide/di/dependency-injection#ngmodule-based-applications)



### Inject a dependency

##### 1. 通过构造函数

```typescript
@Component({ … })
class HeroListComponent {
  constructor(private service: HeroService) {}
}
```

- `@Inject()`是一个装饰器，用于在类的**构造函数**参数中显式指定依赖项。通常在依赖项的类型不能通过类型推断自动解析时使用。

  对于可以自动解析的依赖, 也可以显示使用@Inject()装饰, 所以上面的例子也可以写成

  ```typescript
  @Component({ … })
  class HeroListComponent {
    constructor(@Inject(HeroService) private service: HeroService) {}
  }
  ```

##### 2. 通过**inject**方法

- 用于在类的构造函数之外获取依赖项。
  - 注意, 只有在injector存在的上下文中才可以执行该方法

```typescript
@Component({ … })
class HeroListComponent {
  private service = inject(HeroService);
}
```

 

> The dependency injection (DI) system relies internally on a **runtime context** where the current injector is available. This means that injectors can only work when code is executed in such a context.
>
> The injection context is available in these situations:
>
> - During construction (via the `constructor`) of a class being instantiated by the DI system, such as an `@Injectable` or `@Component`.
> - In the initializer for fields of such classes.
> - In the factory function specified for `useFactory` of a `Provider` or an `@Injectable`.
> - In the `factory` function specified for an `InjectionToken`.
> - Within a stack frame that runs in an injection context.
>
> Knowing when you are in an injection context will allow you to use the [`inject`](https://angular.dev/api/core/inject) function to inject instances.



可以根据需要, 为相同的service配置不同的provider
Ideally, **a component's job is to enable the user experience and nothing more**. A component should present properties and methods for data binding, to mediate between the view (rendered by the template) and the application logic (which often includes some notion of a model).



### Define dependency providers

除了可以把类作为依赖, 还可以把值: boolean, string, date和对象作为依赖

`providers: [Logger]`其实是`providers: [{ provide: Logger, useClass: Logger }]`的简写

provide对应的值是Injection Token, 注意class可以作为InjectionToken,但是接口不可以作为InjectionToken

##### **Provider**对象分析

- The `provide` property holds the token that serves as the key for consuming the dependency value.

- The second property is a provider definition object, which tells the injector how to create the dependency value. The provider-definition can be one of the following:

  - `useClass` - this option tells Angular DI to instantiate a provided class when a dependency is injected
  - `useExisting` - allows you to alias a token and reference any existing one.
  - `useFactory` - allows you to define a function that constructs a dependency.
  - `useValue` - provides a static value that should be used as a dependency.

  

##### **Interface plays no role in DI**

-  Can't use interface as provider token
- Can't inject using the interface as the parameter type

In TypeScript, an interface is a design-time artifact, and does not have a runtime representation, or token, that the DI framework can use.
When the TypeScript transpiles to JavaScript, the interface disappears because JavaScript doesn't have interfaces. Because there is no interface for Angular to find at runtime, the interface cannot be a token, nor can you inject it:

```typescript
export interface AppConfig {
  title: string;
}
const MY_APP_CONFIG_VARIABLE: AppConfig = {
  title: 'Hello',
};
// Can't use interface as provider token
[{ provide: AppConfig, useValue: MY_APP_CONFIG_VARIABLE })]


export class AppComponent {
  // Can't inject using the interface as the parameter type
  constructor(private config: AppConfig) {}
}
```

正确的方式应该是:

```typescript
import { InjectionToken } from '@angular/core';
export interface AppConfig {
  title: string;
}
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config description');

const MY_APP_CONFIG_VARIABLE: AppConfig = {
  title: 'Hello',
};


providers: [{ provide: APP_CONFIG, useValue: MY_APP_CONFIG_VARIABLE }]

export class AppComponent {
  constructor(@Inject(APP_CONFIG) config: AppConfig) {
    this.title = config.title;
  }
}
```





##### demo

```typescript
import {
  Component,
  Inject,
  InjectionToken,
  OnInit,
} from '@angular/core';
import { Logger1 } from '../../shared/services/Logger1.service';
import { Logger2 } from '../../shared/services/Logger2.service';
import { BaseLogger } from '../../shared/services/BaseLogger';
import { LoggerExist } from '../../shared/services/LoggerExist.service';
import { ILogger } from '../../shared/Interfaces/ILogger';

const TOKEN_TEST = new InjectionToken<BaseLogger[]>('BaseLogger description');

@Component({
  selector: 'app-di-demo',
  imports: [],
  templateUrl: './di-demo.component.html',
  styleUrl: './di-demo.component.sass',
  providers: [
    {
      provide: 'heroName',
      useValue: 'Windstorm',
    },
    LoggerExist,
    {
      // usingExisting不会创建新的实例, 根据useExisting对应的依赖的注入方式, 使用相应的实例
      // useClass会创建新的实例
      provide: BaseLogger,
      useExisting: LoggerExist,
      multi: true,
    },
    {
      // 使用multi时, 会将所有的实例放到一个数组中
      provide: BaseLogger,
      multi: true,
      useClass: Logger1,
    },
    {
      provide: BaseLogger,
      multi: true,
      useClass: Logger2,
    },
    {
      provide: TOKEN_TEST,
      useExisting: BaseLogger,
    },
  ],
})
export class DiDemoComponent implements OnInit {
  constructor(
    @Inject(TOKEN_TEST) public loggers: BaseLogger[],
    @Inject(LoggerExist) public loggerExist: LoggerExist,
    // 根据上面的BaseLogger的提供方式,此处的loggers2其实类型是BaseLogger[]
    // 所以使用TOKEN_TEST这个InjectionToken, 来使得类型更加明确, 为BaseLogger[]
    public loggers2: BaseLogger
  ) {}

  ngOnInit() {
    this.loggers.forEach((x: ILogger) => {
      x.log('Hello from DiDemoComponent');
    });
  }
}

```



### Hierarchical injectors

#### angular有两种injector层级结构

| Injector hierarchies            | Details                                                      |
| :------------------------------ | :----------------------------------------------------------- |
| `EnvironmentInjector` hierarchy | Configure an `EnvironmentInjector` in this hierarchy using `@Injectable()` or `providers` array in `ApplicationConfig`. |
| `ElementInjector` hierarchy     | Created implicitly at each DOM element. An `ElementInjector` is empty by default unless you configure it in the `providers` property on `@Directive()` or `@Component()`. |

#### EnvironmentInjector

EnvironmentInjector可以通过两种方式配置

1. The `@Injectable()` `providedIn` property to refer to `root` or `platform`
   - 推荐. 因为可以被tree-shaking
2. The `ApplicationConfig` `providers` array

```typescript
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'  // <--provides this service in the root EnvironmentInjector
})
export class ItemService {
  name = 'telephone';
}
```

@Injectable({providedIn: 'root' })和ApplicationConfig.providers其实都是指在root EnvironmentInjector提供服务. 在EnvironmentInjector前面加上root, 其实就是个别名, 便于区分, 但是本质还是EnvironmentInjector

一个服务既是@Injectable({providedIn: 'root' }), 又在ApplicationConfig.providers中配置, 那么ApplicationConfig.providers将覆盖@Injectable({providedIn: 'root' }

```typescript
@Injectable({ providedIn: 'root' })
export class ItemService {}

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: ItemService, useClass: OtherItemService },
  ],
};

@Component({
  selector: 'app-di-demo',
  imports: [],
  templateUrl: './di-demo.component.html',
  styleUrl: './di-demo.component.sass',
})
export class DiDemo2Component {
    // 此处ItemService实际是OtherItemService
  constructor(private bar: ItemService) {
  }
}

```



在root EnvironmentInjector之上就是Platform Injector. Platform Injector也是EnvironmentInjector, 它可以在同一个平台上的多个 Angular 应用程序之间共享服务。

在Platform Injector之上就是**NullInjector**, 这是Injector树的最顶级

> The next parent injector in the hierarchy is the `NullInjector()`, which is the top of the tree. If you've gone so far up the tree that you are looking for a service in the `NullInjector()`, you'll get an error unless you've used `@Optional()` because ultimately, everything ends at the `NullInjector()` and it returns an error or, in the case of `@Optional()`, `null`. For more information on 

#### ModuleInjector

ModuleInjector可以通过两种方式配置

1. The `@Injectable()` `providedIn` property to refer to `root` or `platform`

2. The `@NgModule()` `providers` array

3. NgModule.imports

4. `ModuleInjector` is configured by the `@NgModule.providers` and `NgModule.imports` property. `ModuleInjector` is a **flattening** of all the providers arrays that can be reached by following the `NgModule.imports` **recursively**.

   如果A模块导入了B模块, B模块提供了X服务, B模块导入了C模块, C模块提供Y服务, 那么A模块将可以使用X和Y服务

5. Child `ModuleInjector` hierarchies are created when lazy loading other `@NgModules`.

#### ElementInjector

When the component instance is destroyed, so is that service instance.

#### resolution rules 查找依赖的原则

如果在ElementInjector层级树上找不到对应的依赖, 就从EnvironmentInjector层级树上查找, 如果还是找不到, 就会报错. 如果相同的DI token在不同的层级上, angular会使用第一个遇到token来解析依赖

注意EnvironmentInjector层级树不是在ElementInjector层级树上面, 它们是两个不同的树



#### Resolution modifier

可以使用装饰器来改变查找依赖的规则

- What to do if Angular doesn't find what you're looking for, that is `@Optional()`
- Where to start looking, that is `@SkipSelf()`
- Where to stop looking, `@Host()` and `@Self()`

可以组合使用这些装饰器, 但是不能是下面两种组合

- `@Host()` and `@Self()`
- `@SkipSelf()` and `@Self()`.



### Optimizing injection token

对于没有使用的组件或者服务, tree shaking可以在打包时不包含这些组件和服务

但是**angular会存储Injection token**, 这可能导致那些没有使用过的服务或者组件还是被打包了
可以使用**Lightweight injection tokens**来部分解决这个问题

**Lightweight injection tokens are only useful with components.** 
对service使用Lightweight injection是无效的. `@Injectable({ providedIn: 'root' })`因为服务只有被这样提供时才能被tree shaking, 这里不存在配置Injection token的空间

> The **lightweight injection token** design pattern is especially important for library developers. It ensures that when an application uses only some of your library's capabilities, the unused code can be eliminated from the client's application bundle.
>
> 

当一个组件没有被使用, 但是却作为了Injection token时, 就会导致这个组件不被tree shaking, 主要是一下两种情况: 

- The token is used in the value position of a [content query](https://angular.dev/guide/components/queries#content-queries).
- The token is used as a type specifier for constructor injection.

```typescript
class MyComponent {
  constructor(@Optional() other: OtherComponent) {}
  @ContentChild(OtherComponent) other: OtherComponent|null;
}

// 其实构造函数中的OtherComponent不仅仅是类型声明, 还是Injection token.
// @ContentChild(OtherComponent)中的OtherComponent, 是Injection token
// @ContentChild(OtherComponent) other: OtherComponent|null中的OtherComponent|null, 是类型声明, 不是是Injection token, 不会导致组件不被tree shaking

```

Lightweight injection tokens demo: 

1. demo1

```typescript
abstract class LibHeaderToken {
  abstract doSomething(): void;
}
@Component({
  selector: 'lib-header',
  providers: [
    {provide: LibHeaderToken, useExisting: LibHeaderComponent}
  ]
  …,
})
class LibHeaderComponent extends LibHeaderToken {
  doSomething(): void {
    // Concrete implementation of `doSomething`
  }
}
@Component({
  selector: 'lib-card',
  …,
})
class LibCardComponent implement AfterContentInit {
  @ContentChild(LibHeaderToken) header: LibHeaderToken|null = null;
  ngAfterContentInit(): void {
    if (this.header !== null) {
      this.header?.doSomething();
    }
  }
}
```



2. demo2

```typescript
export const LibHeaderToken = new InjectionToken('LibHeaderToken Description');

@Component({
  selector: 'lib-header',
  providers: [
    {provide: LibHeaderToken, useExisting: LibHeaderComponent}
  ]
  …,
})
class LibHeaderComponent  {
  doSomething(): void {
    // Concrete implementation of `doSomething`
  }
}
@Component({
  selector: 'lib-card',
  …,
})
class LibCardComponent implement AfterContentInit {
    // 此处的LibHeaderComponent只是作为Typescript中的类型, 不是Injection token, 不会造成
    // LibHeaderComponent在没有使用的时候, 不被treeshaking
  @ContentChild(LibHeaderToken) header: LibHeaderComponent|null = null;
  ngAfterContentInit(): void {
    if (this.header !== null) {
      this.header?.doSomething();
    }
  }
}
```

