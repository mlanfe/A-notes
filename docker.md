## Docker



Docker vs Virtual Machine

make developing and deploying application more easier

1. own isolated environment
2. with all dependencies and configurations
3. same commands in different OS
4. can run different version of same app without any conflicts



docker artifact includes everything the app needs (dependencies and configurations)

 

operating system have two mainly layers:

- OS Application Layer: Chrome, word等应用属于OS application layer，它们安装在OS application layer的顶层
- OS Kernel: 负责和硬件交流
  - at the top of OS
  - interacts between hardware and software
- Hardware: CPU, memory storage



docker visualizes the applications layer, so docker has its own applications layer of OS, 

virtual machine visualize the OS application layer and OS Kernel, 

所以虚拟机虚拟了整个操作系统， 而docker只虚拟了操作系统的Application layer. 所以docker images比VM images更小， docker container启动更快， 



VM can run virtual image of any OS on any other OS host
但是对于docker却不行, 至少通过直接的方式不行。 例如想在windows上运行基于Linux的Docker images会失败， 因为无法使用windows kernel. 



most containers for the popular services are actually Linux based

docker其实一开始也是为Linux设计的

docker做出了更新， 使得docker desktop allows you to run Linux containers on windows or macOS



docker image： 

- an executable app artifact
- includes app source code, but also complete environment configuration
- add environment variables , create directories, files etc



**a running instance of an image is a container.**

can run multiple container form 1 image.

- 可以相同的app运行多个实例，来提高性能



**docker hub**: find and share docker images(类似于npm)

command: 

1. **docker images**: 查看已安装的images
2. **docker ps**: list running containers
   - 使用docker run每次都会创建一个container
   - 但是docker ps只会显示正在运行的container, 而不会显示之前运行但是已经停止了的container
   - 可以使用**-a**或者**--all**来列出所有的container, 无论是否其正在运行
3. **docker pull**: 安装某个image
4. **docker run <imageName: imageTag>**
   - 如果不指定imageTag, 将默认安装最新版本的images
   - 如果想运行某个image但是不阻塞终端, 可以使用参数**-d** 或者**--detach** 
     例: docker run -d nginx
   - 在detach模式下运行image, 看不到log. 
     如果想要看到log(这对debug很有用), 可以command: **docker logs \<containerId/containerName>**

5. **docker run -d <imageName: imageTag>**: 如果本地没有这个image, docker将会先安装这个image, 再运行
6. **docker run -d -p \<hostPort : containerPort> <imageName: imageTag>**
   - containerPort是指这个服务在container内部运行的端口号, 例如nginx运行在80端口上
   - hostPort 是指对外暴露的端口号
   - 通常标准做法是把hostPort和containerPort保持一致, 也就是使用这个服务的默认端口
7. 可以使用**--name**, 来为container指定名称, 如果没有指定, docker也会为container 生成一个默认的名称
   - **docker run --name demo-container -d -p 80:80 nginx:1.23**
   - 指定名称就可以不使用docker ps -a来查询containerId, 而是直接使用containerName来启动/停止container了
8. **docker stop \<containerId/containerName>**:
9. **docker start \<containerId/containerName>**: 区别于docker run, 不会创建一个新的container, 而是运行已经存在的container



application inside container runs in an isolate docker network.
this allows us to run the same app running on the same port multiple times



**Port B inding**: bind the container's port to the host's port to make the service available to the outside world



生成自己的docker image

1. 配置dockerFile

2. build docker image

   在dockerFile配置好后, 执行**docker build -t \<imageName:imageVersion> \<dcokerFilePath>**

   - -t 是--tag的简写, 表示这个dockerimage的名字

   - imageVersion是可选的

3. run as docker container







demo: 

1. 配置Dockerfile

   ```dockerfile
   FROM node
   
   WORKDIR /app
   
   COPY package.json .
   COPY src ./src
   
   RUN ls -la ./src
   
   RUN npm install
   
   CMD [ "node", "./src/index.js" ]
   
   ```

2. 生成image

   在dockerfile所在的目录下执行**docker build -t node-app:1.0**
   -t是--tag的缩写, 指定了image的版本和名字

3. 接下来就可以像运行其他image一样运行node-app了



