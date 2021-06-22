import {
  ElfinFilters,
  ElfinFilterGroup,
  ElfinFilterItem,
  ElfinFilterItemType,
} from '../../../packages/filters';

export default {
  title: 'ElfinUI/Filters',
  component: ElfinFilters,
  argTypes: {},
};

export const Primary = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  // The story's `args` need to be mapped into the template through the `setup()` method
  components: {
    ElfinFilters,
    ElfinFilterGroup,
    ElfinFilterItem,
  },
  methods: {
  },
  data() {
    return {
      filterData1: {},
    };
  },
  computed: {
    selectFields() {
      return [
        {
          type: ElfinFilterItemType.SELECT,
          prop: 'age',
          label: '月份',
          itemOptions: {
            placeholder: '请选择',
            options: [
              { label: '一月', value: 1 },
              { label: '二月', value: 2 },
              { label: '三月', value: 3 },
            ],
          },
        },
      ];
    },
  },
  // watch: {
  //   filterData1: firstArgDecorate.action('高频筛选'),
  //   filterData2: firstArgDecorate.action('低频筛选'),
  //   filterData3: firstArgDecorate.action('组合频筛选'),
  // },
  render() {
    return (
      <elfin-filters modelValue={this.filterData1} onInput:d={($event) => { this.filterData1 = $event }}>
        <elfin-filter-group>
          {
            this.selectFields.map((field) => {
              return (
                <elfin-filter-item
                  {...field}
                  key={field.prop}
                  inline={true}>
                </elfin-filter-item>
              )
            })
          }
        </elfin-filter-group>
      </elfin-filters >
    )
  },
});
Primary.args = {};
