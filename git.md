# mylearn
# Usually study accumulation
# author: lu.wei
# time: 2016-01-12

# 常用git命令


 1. 新建文件
 2. git加入到本地文件版本库 git add git.md
 3. git commit -m 'test git' git.md  提交单个文件；  git commit -m 'cart' *  提交所有文件
 4. git stash 暂存当前内容   git stash pop{0} 释放
 5. git push  推送到服务器
  使用git命令没有工具方便，而且有延时，有木有，删一个文件，命令行显示删除成功，
  但要再点一下才能立马知道真的删了，不然文件看着还在，以为没删呢。


 附件：git 使用大纲
    1.安装git
    	1.1在Linux上安装git
    		sudo apt-get install git(git -core老版本ubuntu linux)
    	1.2在Mac os x上安装git
    		通过homebrew->brew install git
    	1.3在Windows上安装git
    		下载msysgit->git bash
    2.创建版本库
    	2.1版本库的概念
    	2.2如何创建版本库 git init 
    新建远程分支
    在远程服务器中直接新建然后同步到本地或者新建一个本地分支推送到远程
    克隆远程库到本地
    git clone http://dev.tqmall.com/tqmall/watermelon.git
    3添加文件到版本库的暂存区 git add filename
    4提交文件到版本库 git commit -m ‘xxx’ filename
    5.查看当前版本库的状态 git status
    6.查看文件修改前后的区别 git diff
    7.版本回退
    	7.1查看提交历史记录 git log
    	7.2版本回退 git reset －－hard HEAD^(退回上一个版本)
    			  git reset －－hard HEAD^^(退回上上个版本)
    			  git reset －－hard HEAD～100(退回第上100个版本)
    			  git reset －－hard commit-id(按commit id回退版本)
    	7.3查看命令历史记录 git reflog
    8.工作区和暂存区
    ￼
    前面讲了我们把文件往Git版本库里添加的时候，是分两步执行的：
    第一步是用git add把文件添加进去，实际上就是把文件修改添加到暂存区；
    第二步是用git commit提交更改，实际上就是把暂存区的所有内容提交到当前分支。
    9.撤销修改
    	9.1撤销工作区的修改
    		git checkout －－ filename
    		这里有两种情况：
    		一种是readme.txt自修改后还没有被放到暂存区，现在，撤销修改就回到和版本	库一模一样的状态；

    		一种是readme.txt已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。
    	9.2撤销暂存区 
    		git reset HEAD filename
    10.删除文件
    	10.1使用rm命令删除工作区的文件，此时，工作区和版本库就不一致了，使用git status查看版本库状态。
    	现在你有两个选择，一是确实要从版本库中删除该文件，那就用命令git rm删掉，并且git commit
    	另一种情况是删错了，因为版本库里还有呢，所以可以很轻松地使用git checkout — filename 把误删的文件恢复到最新版本
    11.新建分支
    	git branch 分支名
    12.切换分支
    	git checkout 分支名
    13.合并写法－新建并切换到所新建的分支
    	git checkout -b 分支名
    14.推送本地分支到远程
    	git push 
    15.合并分支
    	比如我要合并dev分支到test分支，先切换到test分支上，然后合并dev分支
    	git checkout test->git merge dev
    16.删除分支
    	git branch -d 分支名
    16.拉取远程分支的内容到本地
    	git pull:git fetch->git merge
    17.关于git stash的使用
    	git stash
    	git stash list
    	git stash pop stash@{num} 恢复并删除stash队列中对应的stash
    	git stash apply stash@{num} 恢复stash队列中对应的stash
    	git stash drop(stash@{num})默认删除最新的stash
    	git stash clear删除所有stash
