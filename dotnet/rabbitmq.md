# RabbitMQ

rabbitmq is a message **broker**, it accepts and forwards messages
类似邮局, 但是它处理的对象是message, 而不是邮件

## 专有名词

1. **producing**: sending

2. **producer**: A program that sends messages

3. **queue**:类似邮箱. 

   - messages can only be stored inside a *queue*

   - queue只受内存和磁盘的大小限制, 它本质上是消息缓存

   - 多个producer可以向同一个queue发送(producing)消息

   - 不同的consumer可以从同一个queue中接受数据

4. **consuming**: receiving
5. **consumer**: a program that mostly waits to receive messages:



task queue: 不是立即执行任务并等待任务完成, 而是shedule the task to be done later.
把task封装成message并把它发送给queue.

不同的consumer在消费message: 就是把一个个task pop出来, 并最终执行task



一个channel可以绑定多个接收到消息的回调函数

一个channel可以绑定多个queue, 并且可以指定处理来自哪个queue的message



## Message acknowledgment

An ack(nowledgement) is sent back by the **consumer** to tell RabbitMQ that a particular message has been received, processed and that RabbitMQ is free to delete it.

### Delivery Acknowledgement Timeout

如果consumer在这个时间内没有发送Message acknowledgment, 那么rabbitmq会re-queue这个message,
默认的超时时间是30min, 也可以手动配置这个超时时间



message acknowledgment只是确保在consumer挂了以后, 消息不会丢失. 
如果rabbitmq挂了, 要保证message不丢失需要配置以下两点:

1. queue不会丢失: 

   ```c#
   // 配置durable: true, 可以确保rabbitmq重启后, queue还在
   await channel.QueueDeclareAsync(queue: "hello",
       durable: true, exclusive: false,
       autoDelete: false, arguments: null);
   ```

   在rabbitmq中不可以修改已经存在的queue的配置, 但是可以通过使用一个新的queuename来声明一个新的queue, 并将其的durable配置成true

2. queue中的message不会丢失

   The persistence guarantees aren't strong, but it's more than enough for our simple task queue. If you need a stronger guarantee then you can use [publisher confirms](https://www.rabbitmq.com/docs/confirms).

   ```c#
   // 在producer app中配置
   var properties = new BasicProperties { Persistent = true} ;
   ```



## Fair dispatch

```c#
await channel.QueueDeclareAsync(queue: "task_queue", durable: true, exclusive: false,
    autoDelete: false, arguments: null);

await channel.BasicQosAsync(prefetchSize: 0, prefetchCount: 1, global: false);
```



## publish/subscribe

事实上, producer基本不会直接给queue发送message, 甚至不知道message是否会发给queue. 
producer往往是把message发送给exchange.
由exchange的类型决定某个message是发个某个queue, 还是发给某些queues, 还是直接discard

### exchange type:

- direct
- topic
- headers
- fanout: 广播message

#### Topic exchange

Topic exchange is powerful and can behave like other exchanges.

- When a queue is bound with `#` (hash) binding key - it will receive all the messages, regardless of the routing key - like in `fanout` exchange.

- When special characters `*` (star) and `#` (hash) aren't used in bindings, the topic exchange will behave just like a `direct` one.

### temporary queues

1. 有一个需求: 接受来自某个exchange下的所有message, 而不是只接受一个exchange下的部分queue的message;  并且只关心新的message, 不关系已经存在的旧message
   要实现上面的行为, 可以通过一下三个步骤

   - 创建一个广播的exchange
   - 每次连接上rabbitmq就创建一个新的空queue
     -  因为是新的queue,这样就不会有之前的旧message存着
     - 因为exchange是广播形式的, 所有这个queue只要bind了这个exchange, 就肯定能接受它的所有message; 
       一个exchange可以绑定多个queue, 通过设置routingkey, 来确认向exchange下的那个queue发送message
   - 在断开连接时, 删除这个queue
     - 因为不关心旧的message, 断开连接后这个queue也不需要保留

   - demo

     ```c#
     
     // 1. 在producer里面配置exchange的类型为广播类型
     await channel.ExchangeDeclareAsync(exchange: "logs", type: ExchangeType.Fanout);
     
     
     // 2. 在consummer里面配置queue的类型
     //create a non-durable, exclusive, autodelete queue with a generated name:
     QueueDeclareOk queueDeclareResult = await channel.QueueDeclareAsync();
     string queueName = queueDeclareResult.QueueName;
     ```



2.  That relationship between exchange and a queue is called a **binding**.
   binding的主角是consumer. 是在consumer application中绑定
   类似于表示queue对exhcange的消息感兴趣

3. ```c#
   await channel.BasicPublishAsync(exchange: "log", routingKey: "task_queue", mandatory: true, basicProperties: properties, body: body);
   
   ```

   - 如果不指定exchange, 就是使用rabbmq的默认exchange
   - 对于fanout类型的exchange, 即使指定了routingkey也不会生效. 
     所以通常将其赋值为string.Empty

4. 



## routing key

可以为queue和exchange的binding, 添加额外的参数routingKey, 可以叫它binding key. 
binding key是用来修饰binding的, binding表示queue对某个exchange的message感兴趣, 加上binding key后, 就可以表示对exchange中routing key和binding key相等的message感兴趣, 相当于对message加了一个过滤

binding key是否有意义取决于exchange的类型, 广播类型的exchange会忽略这个值

 `direct` exchange: The routing algorithm behind a `direct` exchange is simple - a message goes to the queues whose `binding key` exactly matches the `routing key` of the message.





## Demo

1. 在producer中的simple demo

   ```csharp
   using RabbitMQ.Client;
   using System.Text;
   
   var factory = new ConnectionFactory { HostName = "localhost" };
   
   // 是websocket的抽象
   using var connection = await factory.CreateConnectionAsync();
   
   // 封装了很多api
   // channel, which is where most of the API for getting things done resides.
   using var channel = await connection.CreateChannelAsync();
   
   // 定义一个queue. 如果不存在会主动创建
   await channel.QueueDeclareAsync("hello",false, false);
   
   var body = Encoding.UTF8.GetBytes( "hello world");
   
   // publish message to queue
   await channel.BasicPublishAsync(exchange: string.Empty, routingKey: "hello", body: body);
   
   Console.WriteLine(" Press [enter] to exit.");
   Console.ReadLine();
   ```

2. 在consumer中的simple demo

   ```c#
   using RabbitMQ.Client;
   using RabbitMQ.Client.Events;
   using System.Text;
   
   var factory = new ConnectionFactory() { HostName = "localhost" };
   
   var connection = await factory.CreateConnectionAsync();
   
   var channel = await connection.CreateChannelAsync();
   
   await channel.BasicQosAsync(prefetchSize: 0, prefetchCount: 1, global: false);
   
   // 需要声明这个exhcange, 因为如果queue和不存在的exchange绑定, 会出错
   await channel.ExchangeDeclareAsync("logExchange", ExchangeType.Fanout);
   
   var queue = await channel.QueueDeclareAsync();
   await channel.QueueBindAsync(queue, "logExchange", string.Empty);
   
   var consumer = new AsyncEventingBasicConsumer(channel);
   consumer.ReceivedAsync += Consumer_ReceivedAsync;
   
   await channel.BasicConsumeAsync(queue.QueueName, autoAck: false, consumer: consumer);
   
   async Task Consumer_ReceivedAsync(object sender, BasicDeliverEventArgs ea)
   {
       var body = ea.Body.ToArray();
       var msg = Encoding.UTF8.GetString(body);
       await Task.Delay(1000);
       await channel.BasicAckAsync(ea.DeliveryTag, multiple: false);
   
       Console.WriteLine($" [x] {msg}");
   }
   
   
   Console.ReadLine();
   
   
   ```



