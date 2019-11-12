import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/form',
            name: 'form',
            component: () => import(/* webpackChunkName: "form" */ './docs/form/index.md'),
        },
        {
            path: '/displayNotify',
            name: 'displayNotify',
            component: () => import(/* webpackChunkName: "displayNotify" */ './docs/display-notify/index.md'),
        },
        {
            path: '/routeLoading',
            name: 'routeLoading',
            component: () => import(/* webpackChunkName: "routeLoading" */ './docs/route-loading/index.md'),
        },
        {
            path: '/dialogController',
            name: 'dialogController',
            component: () => import(/* webpackChunkName: "dialogController" */ './docs/dialog-controller/index.md'),
        },
        {
            path: '/upload',
            name: 'upload',
            component: () => import(/* webpackChunkName: "upload" */ './docs/upload/index.md'),
        },
        {
            path: '/businessTable',
            name: 'businessTable',
            component: () => import(/* webpackChunkName: "businessTable" */ './docs/business-table/index.md'),
        },
        {
            path: '/textAutoTooltip',
            name: 'textAutoTooltip',
            component: () => import(/* webpackChunkName: "textAutoTooltip" */ './docs/text-auto-tooltip/index.md'),
        },
        {
            path: '/tooltipTag',
            name: 'tooltipTag',
            component: () => import(/* webpackChunkName: "tooltipTag" */ './docs/tooltip-tag/index.md'),
        },
        {
            path: '/disableTipsButton',
            name: 'disableTipsButton',
            component: () => import(/* webpackChunkName: "disableTipsButton" */ './docs/disable-tips-button/index.md'),
        },
        {
            path: '/previewer',
            name: 'previewer',
            component: () => import(/* webpackChunkName: "previewer" */ './docs/previewer/index.md'),
        },
        {
            path: '/xjl_tag',
            name: 'xjl_tag',
            component: () => import(/* webpackChunkName: "previewer" */ './docs/xjl_tag/index.md'),
        },
        {
            path: '/previewer',
            name: 'previewer',
            component: () => import(/* webpackChunkName: "previewer" */ './docs/previewer/index.md'),
        },
        {
            path: '/textareaPlus',
            name: 'textareaPlus',
            component: () => import(/* webpackChunkName: "previewer" */ './docs/textarea-plus/index.md'),
        },
        {
            path: '/waterMark',
            name: 'waterMark',
            component: () => import(/* webpackChunkName: "previewer" */ './docs/water-mark/index.md'),
        },
        {
            path: '/areaSelect',
            name: 'areaSelect',
            component: () => import(/* webpackChunkName: "previewer" */ './docs/area-select/index.md'),
        },
        {
            path: '/transitionAutoHeight',
            name: 'transitionAutoHeight',
            component: () => import(/* webpackChunkName: "previewer" */ './docs/transition-auto-height/index.md'),
        },
        {
            path: '/xjlButtons',
            name: 'xjlButtons',
            component: () => import(/* webpackChunkName: "previewer" */ './docs/xjl-buttons/index.md'),
        },
        {
            path: '/xjlButtonsContainer',
            name: 'xjlButtonsContainer',
            component: () => import(/* webpackChunkName: "previewer" */ './docs/xjl-buttons-container/index.md'),
        },
        {
            path: '/xjlTabs',
            name: 'xjlTabs',
            component: () => import(/* webpackChunkName: "previewer" */ './docs/xjl-tabs/index.md'),
        },
        {
            path: '/sidePopup',
            name: 'sidePopup',
            component: () => import(/* webpackChunkName: "previewer" */ './docs/side-popup/index.md'),
        },
        {
            path: '/tabRoutable',
            name: 'tabRoutable',
            component: () => import(/* webpackChunkName: "previewer" */ './docs/tab-routable/index.md'),
        },
        {
            path: '/upload_file',
            name: 'upload_file',
            component: () => import(/* webpackChunkName: "previewer" */ './docs/upload_file/index.md'),
        },
    ]
});
