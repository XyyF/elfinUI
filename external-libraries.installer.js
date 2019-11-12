/**
 * Created by gukong on 2018/1/16.
 */
const shell = require('shelljs')
const argv = require('yargs')
    .option('needClone', {
        describe: 'git clone',
        boolean: true,
    })
    .option('username', {
        // npm scripts中的--username参数
        describe: 'username for git clone',
    })
    .option('password', {
        // npm scripts中的--password参数
        describe: 'password for git clone',
    })
    .option('needInstall', {
        // 会执行 npm install
        describe: 'npm install',
        boolean: false,
    })
    .argv

const libPath = '__external-libraries'
const gitRepositories = [
    {
        name: 'edu-saas-data-center', // clone 到此文件夹
        address: 'meetin_web/edu-saas-data-center.git',
        branch: 'master',
        needInstall: true,
    },
    {
        name: 'edu-saas-utils', // clone 到此文件夹
        address: 'meetin_web/edu-saas-utils.git',
        branch: 'master',
        needInstall: true,
    },
    {
        name: 'microserver_common', // clone 到此文件夹
        address: 'meetin_web/microserver_common.git',
        branch: 'master',
        needInstall: false,
    },
]

function gitClone() {
    // 传入了 username，rdc 部署的时候
    // 不传入 username，会得到 'undefined'
    if (argv.username && argv.username !== 'undefined') {
        shell.exec(`mkdir ${libPath}`)
        gitRepositories.forEach((repository) => {
            shell.exec(`cd ${libPath} && git clone https://${argv.username}:${argv.password}@code.aliyun.com/${repository.address} -b ${repository.branch} ${repository.name}`)
        })
    }
    else {
        shell.exec(`mkdir ${libPath}`)
        gitRepositories.forEach((repository) => {
            shell.exec(`cd ${libPath} && git clone git@code.aliyun.com:${repository.address} -b ${repository.branch} ${repository.name}`)
        })
    }
}

function npmInstall() {
    gitRepositories.forEach((repository) => {
        if (!repository.needInstall) return
        shell.exec(`cd ${libPath}/${repository.name} && npm i`)
    })
}


if (argv.needClone === true || argv.needClone === 'true') {
    gitClone()
}

if (argv.needInstall === true || argv.needInstall === 'true') {
    npmInstall()
}