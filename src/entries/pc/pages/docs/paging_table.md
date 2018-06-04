paging-table说明文档：(以pc_workbench/pages/student/index.vue为例)

### pagingTable Attributes

| 参数          | 说明                      | 类型       | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| selection     | 是否显示最左列的选择框     | Boolean | true/false  | false     |
| rowClassName  | 每一行的唯一className     | String | 例如：row => `${row.studentId}`      | -   |
| tableFormatData  | 表格每列的展示规则     | Array | -  | - |
| tableData  | 列表数据  | Array     | -  | -   |
| tableDataSum  | 总数  | String     | 例如：row => `${row.studentId}`      | -   |
| tableFilterHeaders  | 表头的可筛选项,在data中定义     | Object | 例如：{ INSTRUCTOR: {label: '学管', initLabel: '学管', highlight: false}} | -   |
| showPageSizes  | 是否显示每页控制栏    | Boolean | true/false | false  |

### calendar Events

| 事件名称          | 说明            | 回调参数
|------------- |---------------- |----------------
| page-changed | 页码被改变         |
| handle-selection-change | 配合selection使用，选中事件 | v：当前选中的列表

### 相关文件
| 文件路径          | 说明            | 回调参数
|------------- |---------------- |----------------
| store/organization/table_header.js | 表头system选项，配合定义tableFormatData |
| store/student/getters.js | 数据处理，定义tableData |
