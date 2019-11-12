<template>
    <div class="area_root">
        <el-select
            v-model="province"
            class="select-padding"
            placeholder="请选择省份"
            :valueKey="'ssqid'"
            @change="handleChoiceProvince">
            <el-option
                v-for="(item) in provinces"
                :key="item.ssqid"
                :label="item.ssqname"
                :value="item">
            </el-option>
        </el-select>
        <el-select
            v-show="level>=levelCity"
            v-model="city"
            class="select-padding"
            placeholder="请选择城市"
            :valueKey="'ssqid'"
            @change="handleChoiceCity">
            <el-option
                v-for="item in cities"
                :key="item.ssqid"
                :label="item.ssqname"
                :value="item">
            </el-option>
        </el-select>
        <el-select
            v-show="level>=levelArea"
            v-model="area"
            class="select-padding"
            placeholder="请选择区县"
            :valueKey="'ssqid'"
            @change="handleChoiceArea">
            <el-option
                v-for="item in areas"
                :key="item.ssqid"
                :label="item.ssqname"
                :value="item">
            </el-option>
        </el-select>
        <el-input
            v-show="level>=levelDetail && !isShowAll"
            v-model="addressDetail"
            class="address-detail"
            placeholder="详细地址"
            :maxlength="maxLength"
            @input="handleInput">
        </el-input>
    </div>
</template>

<script>
    const ALL = '0' // 全部
    import areaList from './area'
    import areaType from './areaType'
    import {cloneDeep} from 'lodash'

    const MAX_LENGTH = 50 // 最大输入长度
    export default {
        name: 'area-select',
        data() {
            return {
                province: '', // 省选择数据
                city: '', // 市选择数据
                area: '', // 区选择数据
                addressDetail: '', // 手动输入详细地址
                levelArea: areaType.LEVEL_AREA, // 省市区联动
                levelCity: areaType.LEVEL_CITY, // 省市联动
                levelProvince: areaType.LEVEL_PROVINCE, // 只选择省
                levelDetail: areaType.LEVEL_DETAIL, // 详细地址
                maxLength: MAX_LENGTH, // 详细地址最大输入长度
            }
        },
        props: {
            // v-model上绑定的值 返回code码 传入code码展示默认数据
            value: {
                type: String,
                default: '',
            },
            // 是否允许选择'全部'这个选项
            isShowAll: {
                type: Boolean,
                default: false,
            },
            // 联动级别 1->省，2->省市联动，3->省市区联动
            level: {
                type: Number,
                default: areaType.LEVEL_AREA,
            },
            addressDetailProp: {
                type: String,
                default: '',
            },
        },
        computed: {
            // 省list获取
            provinces() {
                // 定义省份'全部'选项
                const all = {
                    'ssqid': '0',
                    'ssqname': '全部',
                    'cities': {
                        'city': [
                            {
                                'ssqid': '0',
                                'ssqname': '全部',
                                'areas': {
                                    'area': [],
                                },
                            },
                        ],
                    },
                }
                // 是否可以选择
                if (!this.isShowAll) {
                    return areaList
                }
                else {
                    return [all, ...areaList]
                }
            },
            // 城市list获取
            cities() {
                // 定义城市'全部'选项
                const all = {
                    'ssqid': this.province.ssqid,
                    'ssqname': '全部',
                    'cities': {
                        'city': [
                            {
                                'ssqid': '0',
                                'ssqname': '全部',
                                'areas': {
                                    'area': [
                                        {
                                            'ssqid': '0',
                                            'ssqname': '全部',

                                        },
                                    ],
                                },
                            },
                        ],
                    },
                }
                // 是否可以选择'全部'
                if (this.isShowAll) {
                    // 省列表是否已经加载完成
                    if (this.province) {
                        if (this.province.ssqid === ALL) {
                            return [...this.province.cities.city]
                        }
                        else {
                            return [all, ...this.province.cities.city]
                        }
                    }
                    else {
                        return [all]
                    }
                }
                else {
                    if (this.province) {
                        return this.province.cities.city
                    }
                    else {
                        return []
                    }
                }

            },
            // 区县list获取
            areas() {
                // 定义区县'全部'选项
                const all = {
                    'ssqid': this.city.ssqid,
                    'ssqname': '全部',
                }
                // 是否可以选择'全部'
                if (this.isShowAll) {
                    // 省列表和市列表是否已经加载完成（是否之前选择的为全部）
                    if (this.province && this.city) {
                        if (this.city.areas) {
                            return [all, ...this.city.areas.area]
                        }
                        else {
                            return [all]
                        }
                    }
                    else { // 不存在则返回全部
                        return [all]
                    }
                }
                else {
                    if (this.province && this.city) {
                        return this.city.areas.area
                    }
                    else {
                        return []
                    }
                }
            },
            // 返回对象
            addressInfo() {
                return {
                    province: this.province.ssqname,
                    city: this.city.ssqname,
                    zone: this.area.ssqname,
                    street: this.addressDetail,
                    code: this.area.ssqid,
                }
            },
        },
        methods: {
            // 选择省
            handleChoiceProvince() {
                this.city = this.cities[0]
                this.area = this.areas[0]
                this.$emit('input', this.area.ssqid)
                this.$emit('getObject', this.addressInfo)
                this.$emit('getAddress', `${this.province.ssqname}${this.city.ssqname}${this.area.ssqname}${this.addressDetail}`)
            },
            // 选择市
            handleChoiceCity() {
                this.area = this.areas[0]
                if (this.area.ssqid) {
                    this.$emit('input', this.area.ssqid)
                    this.$emit('getObject', this.addressInfo)
                    this.$emit('getAddress', `${this.province.ssqname}${this.city.ssqname}${this.area.ssqname}${this.addressDetail}`)
                }
                else {
                    this.$message.warning('请先选择省')
                }

            },
            // 选择区
            handleChoiceArea() {
                if (this.area.ssqid) {
                    this.$emit('input', this.area.ssqid)
                    this.$emit('getObject', this.addressInfo)
                    this.$emit('getAddress', `${this.province.ssqname}${this.city.ssqname}${this.area.ssqname}${this.addressDetail}`)
                }
                else {
                    this.$message.warning('请先选择省')
                }
            },
            // 输入详细地址时
            handleInput() {
                if (this.area.ssqid) {
                    this.$emit('input', this.area.ssqid)
                    this.$emit('getAddress', `${this.province.ssqname}${this.city.ssqname}${this.area.ssqname}${this.addressDetail}`)
                    this.$emit('getObject', this.addressInfo)
                }
                else {
                    this.$message.warning('请先选择省')
                }
            },
            // 默认值设置
            setDefaultValue() {
                // 设置省默认值

                if (this.value) {

                    let province = this.value.substring(0, 2) + '0000'
                    for (let item of this.provinces) {
                        if (province === item.ssqid) {
                            this.province = item
                            break
                        }
                    }

                    // 设置市默认值
                    let city = this.value.substring(0, 4) + '00'
                    for (let item of this.cities) {
                        if (city === item.ssqid) {
                            this.city = item
                            break
                        }
                    }

                    // 设置区县默认值
                    let area = this.value
                    for (let item of this.areas) {
                        if (area === item.ssqid) {
                            this.area = item
                            break
                        }
                    }
                }
                else {
                    if (this.isShowAll) {
                        this.province = {
                            'ssqid': '0',
                            'ssqname': '全部',
                            'cities': {
                                'city': [
                                    {
                                        'ssqid': '0',
                                        'ssqname': '全部',
                                        'areas': {
                                            'area': [],
                                        },
                                    },
                                ],
                            },
                        }
                        this.city = {
                            'ssqid': this.province.ssqid,
                            'ssqname': '全部',
                            'cities': {
                                'city': [
                                    {
                                        'ssqid': '0',
                                        'ssqname': '全部',
                                        'areas': {
                                            'area': [
                                                {
                                                    'ssqid': '0',
                                                    'ssqname': '全部',

                                                },
                                            ],
                                        },
                                    },
                                ],
                            },
                        }
                        this.area = {
                            'ssqid': this.city.ssqid,
                            'ssqname': '全部',
                        }
                    }
                }

            },
        },
        watch: {
            // 监听传入的数据变化
            value: {
                immediate: true,
                handler() {
                    this.setDefaultValue()
                },
            },
            addressDetailProp: {
                immediate: true,
                handler() {
                    this.addressDetail = cloneDeep(this.addressDetailProp)
                },
            },
        },
    }
</script>

<style scoped>
    .select-padding {
        flex: 0 0 204px;
        padding-right: 10px;
    }

    .area_root {
        display: flex;
    }

    .address-detail {
        flex: 1 1;
    }
</style>