# elfinUI

### 安装依赖
```
npm install
```

### 运行服务
```
npm run serve
```

### 构建
```
npm run build
```

### 测试
```
npm run test:unit
```
vue-cli3的测试搭建，见[cli-plugin-unit-jest](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-unit-jest)

只需执行vue add @vue/unit-jest，package.json会有默认的配置，若是想修改，则参考[jest官网](https://jestjs.io/docs/en/cli.html)

vue的内置单元测试方法：[vue test utils](https://vue-test-utils.vuejs.org/zh/)

#### 关于meetin-sass-ui的css文件引入，需要在新工程中单独引入

@import '~meetin-sass-ui/packages/theme-chalk/src/index';

#### 发布问题

发布流程：发布一个版本，测试后若有问题，删除该版本，修改后重新发布

需要在npm的organizations中添加成员

(第一次：)npm init --scope=edu_sass_fe_xjl

npm publish --access public

删除(版本)：

npm unpublish edu_sass_fe_xjl/<pkg>[@<version>]

### 分支管理
-- edu_sass_fe_ui

master 构建版本

dev UI文档开发版本

... 产品开发版本

-- edu-saas-data-center
-- edu-saas-utils
-- microserver_common

manster 构建版本