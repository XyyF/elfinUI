'use strict';

var fs = require('fs');
var path = require('path');

fs.readdir(path.resolve(__dirname, '../packages/'), function(err, files) {
    const routes = []
    files.filter(e => {
        const temp = path.join(__dirname, '../packages/', e);
        return fs.statSync(temp).isDirectory()
    }).forEach(e => {
        routes.push([transForHump(e), e])
    })
    fs.writeFile(path.resolve(__dirname, '../examples/routers.json'), JSON.stringify(routes), () => {})
    console.log('rengar log：routers.json路由配置文件生成完毕')
});

// 转化为驼峰形式
function transForHump(e) {
    return e.replace(/-([a-z])/g, function (all, i) {
        return i.toUpperCase();
    })
}