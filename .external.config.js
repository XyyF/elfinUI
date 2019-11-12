module.exports = [
    {
        sshAddress: 'git@code.aliyun.com:meetin_web/edu-saas-data-center.git', // clone 到此文件夹
    },
    {
        sshAddress: 'git@code.aliyun.com:meetin_web/edu-saas-utils.git', // clone 到此文件夹
    },
    {
        sshAddress: 'git@code.aliyun.com:meetin_web/microserver_common.git', // clone 到此文件夹
        branch: 'develop',
        skipInstall: true,
        protect: true,
    },
]