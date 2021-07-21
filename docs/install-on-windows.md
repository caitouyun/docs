# Windows 版本安装

## 下载 exe 可执行文件

首先在 **[菜头云](https://caitouyun.com/)** 处下载[菜头云 Windows 版](https://cli.caitouyun.com/caitou.exe)的 `caitou.exe` 文件。下载后放到你喜欢的文件夹，例如 `C:\\caitouyun\`.

之后进行环境变量配置，先复制菜头云 (`caitou.exe`)所在文件夹的路径，然后双击打开 **此电脑** -> 右键 **属性** -> 在左边的 **高级系统设置** -> 环境变量 -> 在下面的系统变量中， 找到 `Path`,把菜头云所在文件夹的路径添加到里面。就可以在终端(`cmd 、Powershell`)上使用啦！
使用方法请参照[README](https://github.com/caitouyun/docs#%E8%8F%9C%E5%A4%B4%E4%BA%91)

详情：
[下载链接](https://cli.caitouyun.com/caitou.exe)
[菜头云官网](https://caitouyun.com/)
[Windows 如何添加环境变量](https://jingyan.baidu.com/article/47a29f24610740c0142399ea.html)

## WSL Version 使用说明

在 Microsoft Store 上下载某个 Linux 发行版，推荐[Ubuntu](https://www.microsoft.com/zh-cn/p/ubuntu/9nblggh4msv6#activetab=pivot:overviewtab),然后搭配[Windows Terminal](https://www.microsoft.com/zh-cn/p/windows-terminal/9n0dx20hk701?activetab=pivot:overviewtab)使用。
在终端运行 WSL 后，进行账号密码的设置，WSL 就可以使用了。
接着在终端中运行以下命令安装
`curl -sf https://cli.caitouyun.com/install.sh | sh`
安装成功后运行 `caitou version` 输出当前版本则表明安装成功。
之后就可以照着[菜头云官方文档](https://github.com/caitouyun/docs)愉快的使用啦~
详情：
[菜头云官网](https://caitouyun.com/)
[WSL 安装指南](https://docs.microsoft.com/zh-cn/windows/wsl/install-win10)
