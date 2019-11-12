import {colorConfig, Color} from '@external/edu-saas-utils/color-theme'

/* 主题颜色 */
export const themeName = {
    'RED': 'RED', // 红色
    'BLUE': 'BLUE', // 蓝色
    'PURPLE': 'PURPLE', // 紫色
    'YELLOW': 'YELLOW', // 黄色
    'GREEN': 'GREEN', // 绿色
    'PINK': 'PINK', // 粉红色
}

/**
 * 颜色主题，包含边框、背景色、字体颜色
 * 键名直接用样式名
 * */

export const themeConfig = {
    [themeName.BLUE]: {
        borderColor: colorConfig[Color.blue],
        backgroundColor: colorConfig[Color.lightBlue],
        color: colorConfig[Color.blue],
    },
    [themeName.PURPLE]: {
        borderColor: colorConfig[Color.purple],
        backgroundColor: colorConfig[Color.lightPurple],
        color: colorConfig[Color.purple],
    },
    [themeName.YELLOW]: {
        borderColor: colorConfig[Color.yellow],
        backgroundColor: colorConfig[Color.lightYellow],
        color: colorConfig[Color.deepYellow],
    },
    [themeName.GREEN]: {
        borderColor: colorConfig[Color.green],
        backgroundColor: colorConfig[Color.lightGreen],
        color: colorConfig[Color.green],
    },
    [themeName.RED]: {
        borderColor: colorConfig[Color.red],
        backgroundColor: colorConfig[Color.lightRed],
        color: colorConfig[Color.red],
    },
    [themeName.PINK]: {
        borderColor: colorConfig[Color.pink],
        backgroundColor: colorConfig[Color.lightPink],
        color: colorConfig[Color.pink],
    },
}


/* 尺寸大小 */
export const sizeName = {
    'SMALL': 'SMALL', // 小号
    'NORMAL': 'NORMAL', // 常规
}

/**
 * 尺寸配置
 * */

export const sizeConfig = {
    [sizeName.SMALL]: {
        transform: 'scale(.85)',
        marginLeft: '0',
    },
    [sizeName.NORMAL]: {
        transform: 'scale(1)',
    },
}

