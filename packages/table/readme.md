### props字段解释
* isShowPagination 是否渲染分页组件
```
                [
                    {
                        type: 'index',
                        fixed: 'left',
                    }, {
                        type: 'selection',
                    }, {
                        prop: 'date',
                        label: '日期',
                        sortable: true,
                        'min-width': 200,
                        filterConfig: {
                            handler: this.filterHandler,
                            options: [{
                                label: '今天',
                                value: '0',
                            }, {
                                label: '明天',
                                value: '1',
                            }],
                        },
                    }, {
                        prop: 'name',
                        label: '姓名',
                        minWidth: 100,
                        filterConfig: {
                            handler: this.filterHandler,
                            options: [{
                                label: '狮子头',
                                value: '0',
                            }, {
                                label: '美人尖',
                                value: '1',
                            }],
                        },
                    }, {
                        label: '地址',
                        columns: [{
                            prop: 'address',
                            label: '地址',
                            'min-width': 250,
                        }, {
                            prop: 'address',
                            label: '地址',
                            'min-width': 250,
                        }],
                    }, {
                        prop: 'tag',
                        label: '标签',
                    }, {
                        label: '组件',
                        component: {
                            dom: SchedulingColumn,
                            options: {
                                props: {
                                    demo: 'demo',
                                    eventHandler: this.eventHandler,
                                },
                            },
                        },
                    },
                ]

```