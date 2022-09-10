### 自动化部署流程
  - 登录购买得服务器
  - ssh root@服务器ip地址
  - 敲一下dnf指令，看服务器是否有dnf(有得linux系统没有dnf),如有没有在centos7中 通过yum install dnf安装一下
## 安装jenkins(依赖于java)
  - 安装java `dnf search java-1.8` (搜索)
  - 在/root目录下执行 `dnf install java-1.8.0-openjdk.x86_64`
  - 敲击java看是否安装成功
  - 安装jenkins `dnf search jenkins`这个指令不会成功，因为dnf 里面没有这个包
  - 用linux中得`wget`指令下载jenkins(wget在linux中代表下载)
  - 安装jenkins得两种方式
  ```shell
 sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat/jenkins.repo
  sudo rpm --import https://pkg.jenkins.io/redhat/jenkins.io.key
  ```

  - 安装完成后查进入到jenkins安装的目录就是上面指定的目录`cd /etc/yum.repos.d`
  - 配置jenkins在dnf使用中的合法性,导入密钥(两种方式)
  ```shell
    rpm --import https://pkg.jenkins.io/redhat/jenkins.io.key
    rpm --import http://pkg.jenkins-ci.org/redhat/jenkins-ci.org.key
  ```
  -  编辑 jenkins.repo 这个文件(默认不需要编辑，如果有其他内容，需要跟下面的配置保持一致)
  - ```
    name=Jenkins
    baseurl=http://pkg.jenkins.io/redhat
    gpgcheck=1
    ```
  - 用dnf安装jenkins`dnf install jenkins`
  - 启动jenkins的服务
  ```
    systemctl start jenkins 启动jenkins
    systemctl status jenkins 查看状态
    systemctl enable jenkins 自动重启，执行一遍之后服务器重启jenkins也会重启
  ```
  - jenkins 启动成功后就可以直接在浏览器上访问了，默认端口是8080这个时候需要在云服务器上配置安全组开放8080
  - 访问之后出现jenkins的解锁页面这个时候需要执行`cat /var/lib/jenkins/secrets/initialAdminPassword`查看解锁密码
  
### Nginx的配置
- 安装nginx`dnf install nginx`
- 启动nginx`systemctl start nginx`
- `systemctl status nginx`查看nginx状态
- `systemctl enable nginx`随着操作系统的启动自己启动
## 配置nginx
- `cd /usr/share/nginx/html` 进入到nginx中的html页面
- ```
  cd root/
  mkdir cms
  touch index.html
  编辑 index.html
  ```
## nginx映射
 - 修改nginx的配置 nginx.


 