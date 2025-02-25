# Learn Git

## 一、常用指令

`git init`

`git add <file>` 

- ​	changed没有git add, 输入git status, 返回: no changes added to commit或Untracked files:	

- ​	 changed已经git add, 输入git status, 返回: Changes to be committed:

`git commit`  

- ​	把暂存区的所有内容提交到当前分支。
- ​	相当于保存文件某一时刻的状态的快照.
- ​	一旦提交后，如果你又没有对工作区做任何修改，那么工作区就是“干净”的: nothing to commit, working tree clean	
- ​	一旦你把文件改乱了，或者误删了文件，还可以从最近的一个`commit`恢复，然后继续工作

`git rm`用于删除一个文件

查看信息:

- `git log` 显示从最近到最远的提交(commit)日志

- `git log --pretty=oneline`  可以让提交日志信息简洁

- `git log --graph`:  查看分支合并情况。

- `git log --graph --pretty=oneline --abbrev-commit`	查看分支合并情况

- `git reflog`  查看命令历史，以便确定要回到未来的哪个版本。假设commit的顺序从a => b => c, 最新的commit是c, 如果回退到b, git log将看不到c ,只能用git reflog 查看.

- `git status` 

- `git diff`  	查看工作区和版本库里面最新版本的区别：

  ​	-开头的行，是只出bai现在源文件中的du行

  ​	+开头的行，是只出现在目标文件中的行

  ​	空格开头的行，是源文件和zhi目标文件中都出现的行	

  ​	差异按照差异小结进行组织，每个差异小结的第一行都是定位语句，由@@开头，@@结尾。
  ​	-2,3 +2,4: 在源文件( a/LICENSE)第二行开始的三行， 和目标文件(b/LICENSE)第二行开始的四行不同。

   

## 二、 版本回退相关

工作区（Working Directory）处理.git 文件夹以外的文件

暂存区 （Stage）

版本库（Repository）	就是.git文件夹



![git-repo](https://www.liaoxuefeng.com/files/attachments/919020037470528/0)

`git reset --hard <commit_id>` 

- ​	在Git中，`HEAD`指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭

- ​	上一个版本就是`HEAD^`，上上一个版本就是`HEAD^^`，当然往上100个版本写100个`^`比较容易数不过来，所以	写成`HEAD~100`。`$ git reset --hard HEAD^`  回退到上个版本(会改变工作区的内容, 也就是实际文件的内容)

`git reset HEAD <file>` 清空暂存区, 不改变工作区

`git restore <file>`   

- 让文件回到最近一次`git commit`或`git add`时的状态;	是对工作区的修改全部撤销,  使工作区和暂存区一致, 若暂存区为空, 就是和版本库一致
- 等价于`git checkout -- file`
  - `git checkout -- file`命令中，没有`--`，就变成了“切换到另一个分支”的命令
  - `git switch <branch>` 等价于`git checkout <branch>`		

小结:

- 场景1：当改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令`git restore -- file`。

- 场景2：当不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令`git reset HEAD <file>`，就回到了场景1，第二步按场景1操作。

  `git restore <file>` 和`git reset HEAD <file>  `使用的先后顺序不同会影响工作区

- 场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，就要版本回退`git reset --hard commit_id`



## 三、远程仓库

### 将本地库添加至远程库

`git push`   把本地库的内容推送到远程

`git push origin master`	把本地`master`分支的最新修改推送至GitHub

### 克隆远程库

`git clone ` 克隆一个远程仓库, 要知道远程仓库的地址

## 四、branch

### 创建与合并分支

`git switch -c <name>`创建并切换名叫dev的分支,  等价于`git checkout -b <name>`  .  相当于以下两条命令：

- `git branch <name>` 创建分支
- `git checkout <name>` 切换分支, 可以新命令`git switch <name>`替代

`git branch`  查看当前分支

`git merge <name>`  合并指定分支到当前分支

`git branch -d <name>`  删除指定分支



### 解决合并冲突

当Git无法自动合并分支时，就必须首先解决冲突。解决冲突后，再提交，合并完成。解决冲突就是把Git合并失败的文件手动编辑为我们希望的内容，再提交。



### 分支管理策略

两种合并模式:

1. 使用`Fast forward`模式合并,不创建新的commit,  直接把master移动到的dev的位置:

   <img src="https://www.liaoxuefeng.com/files/attachments/919022412005504/0" alt="git-br-ff-merge" style="zoom:67%;" align="left"/>



2. 不使用`Fast forward`模式合并,创建新的commit

   <img src="https://www.liaoxuefeng.com/files/attachments/919023225142304/0" alt="git-no-ff-mode" style="zoom: 67%;"  align="left"/>

   

   

   - `git merge --no-ff -m <message> <name>`	
   - 通常，合并分支时，如果可能，Git会用`Fast forward`模式，这种模式下，删除分支后，会丢掉分支信息。
   - 如果要强制禁用`Fast forward`模式，Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息。



### bug分支

- `git stash`把工作区临时存储起来 使用该命令后, 工作区是干净的

- `git stash list`	查看临时存储的stash
  - 多次stash，恢复的时候，先用`git stash list`查看，然后恢复指定的stash

- `git stash apply stash@{num}` 	恢复临时存储的内容，stash内容并不删除，你需要用`git stash drop`来删除
- `git stash pop stash@{num}`   恢复的同时把stash内容也删了
- `git cherry-pick <commit>`复制一个特定的提交到当前分支

### feature 分支

每添加一个新功能，最好新建一个feature分支，在上面开发，完成后，合并，最后，删除该feature分支。

git branch -D <name> 删除没有合并的分支

远程仓库的默认名称是origin

`git remote`	查看远程仓库的信息

`git remote -v`	查看远程仓库的详细信息

`git push origin <branch>` 	将指定分支推送到远程库对应的远程分支



### 多人协作的工作模式

1. 查看远程库信息，使用`git remote -v`；

2. 本地新建的分支如果不推送到远程，对其他人就是不可见的；

3. 将本地新建的分支推送的远程: 首先要在需要push的brand下

   - 第一步:  `git push origin <branch-name>` 使远程仓库具有该分支
   - 第二步:  `git branch --set-upstream-to=origin/<branch> <branch>` 使远程仓库的分支与本地仓库对应的分支建立连接关系. 之后这个分支每次push指令就不需要再加上具体的远程分支的名字, 直接输入git push 即可; 

4. 从本地推送内容到远程，使用`git push origin <branch-name>`

5. 将远程分支拉取到本地，使用`git checkout -b <branch> origin/<branch>`，本地和远程分支的名称最好一致；

   如果出现提示类似于下面,  表示拉取不成功：

   ```
   fatal: Cannot update paths and switch to branch 'dev2' at the same time.
   Did you intend to checkout 'origin/dev2' which can not be resolved as commit?
   ```

   我们需要先执行`git fetch`,  然后再执行`git checkout -b <branch> origin/<branch>`,  此时就获取了远程仓库的分支,  并与本地仓库对应的分支建立了连接关系

6. 如果`git push`失败，则因为远程分支比你的本地更新，需要先用`git pull`抓取远程的新提交,  没有冲突或者解决掉冲突后，再用`git push`推送就能成功; `git pull` = `git fetch` + `git merge`	

   

## 五、tag

`git tag <name>`  添加tag.  

- 默认标签是打在最新提交的commit上
- 为指定commit打tag:  `git tag <name> <commit>`

`git tag`  查看所有的tag

`git show <tagname>` 查看具体tag的信息

`git tag -a <tagname> -m <description> <commit>`: 为指定commit添加命名tag,  并为tag添加说明

`git tag -d <tagname>`	删除本地tag

`git push origin <tagname> `  推送某个标签到远程

`git push origin --tags`	推送所有标签到远程

`git push origin :refs/tags/<tagname>`	删除远程标签,  前提是先删除本地标签

标签不是按时间顺序列出，而是按字母排序的

标签总是和某个commit挂钩。如果这个commit既出现在master分支，又出现在dev分支，那么在这两个分支上都可以看到这个标签。



