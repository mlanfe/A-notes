![img](https://upload-images.jianshu.io/upload_images/4389199-600d29d3106e9392?imageMogr2/auto-orient/strip|imageView2/2/w/1172/format/webp)



![img](https://upload-images.jianshu.io/upload_images/4389199-cc26bb10a7bcf1ec?imageMogr2/auto-orient/strip|imageView2/2/w/508/format/webp)



![img](https://upload-images.jianshu.io/upload_images/4389199-69fa6b680835ecf5?imageMogr2/auto-orient/strip|imageView2/2/format/webp)



![img](https://upload-images.jianshu.io/upload_images/4389199-9f9069d6edd455fa?imageMogr2/auto-orient/strip|imageView2/2/w/521/format/webp)



![img](https://upload-images.jianshu.io/upload_images/4389199-98ff805e35213952?imageMogr2/auto-orient/strip|imageView2/2/w/638/format/webp)



| **git add .**       | **添加当前目录的所有文件到暂存区**   |
| ------------------- | ------------------------------------ |
| **git add [dir]**   | **添加指定目录到暂存区，包括子目录** |
| **git add [file1]** | **添加指定文件到暂存区**             |

| **git commit -m [message]**         | **提交暂存区到本地仓库,message代表说明信息** |
| ----------------------------------- | -------------------------------------------- |
| **git commit [file1] -m [message]** | **提交暂存区的指定文件到本地仓库**           |
| **git commit --amend -m [message]** | **使用一次新的commit，替代上一次提交**       |

| **git branch**                                 | **列出所有本地分支**                           |
| ---------------------------------------------- | ---------------------------------------------- |
| **git branch -r**                              | **列出所有远程分支**                           |
| **git branch -a**                              | **列出所有本地分支和远程分支**                 |
| **git branch [branch-name]**                   | **新建一个分支，但依然停留在当前分支**         |
| **git checkout -b [branch-name]**              | **新建一个分支，并切换到该分支**               |
| **git branch --track [branch][remote-branch]** | **新建一个分支，与指定的远程分支建立追踪关系** |
| **git checkout [branch-name]**                 | **切换到指定分支，并更新工作区**               |
| **git branch -d [branch-name]**                | **删除分支**                                   |
| **git push origin --delete [branch-name]**     | **删除远程分支**                               |

| **git reset —soft [commit]**  | 只改变提交点，暂存区和工作目录的内容都不改变               |
| ----------------------------- | ---------------------------------------------------------- |
| **git reset —mixed [commit]** | **改变提交点，同时改变暂存区的内容**                       |
| **git reset —hard [commit]**  | **暂存区、工作区的内容都会被修改到与提交点完全一致的状态** |
| **git reset --hard HEAD**     | **让工作区回到上次提交时的状态**                           |

| git push [remote][branch]     | 上传本地指定分支到远程仓库                 |
| ----------------------------- | ------------------------------------------ |
| **git push [remote] --force** | **强行推送当前分支到远程仓库，即使有冲突** |
| **git push [remote] --all**   | **推送所有分支到远程仓库**                 |

| git status                   | 显示有变更的文件                             |
| ---------------------------- | -------------------------------------------- |
| **git log**                  | **显示当前分支的版本历史**                   |
| **git diff**                 | **显示暂存区和工作区的差异**                 |
| **git diff HEAD**            | **显示工作区与当前分支最新commit之间的差异** |
| **git cherry-pick [commit]** | **选择一个commit，合并进当前分支**           |




链接：https://www.jianshu.com/p/9685a56bdf7a





