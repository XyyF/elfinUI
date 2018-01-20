<template>
    <div class="calendar"
         :class="{'showAll': showAllCalendar, 'showLongAll': showAllCalendar && showLongAll}">
        <header class="top">
            <div class="arrow left"
                 @click="changeWeek(-1)">
                <img :src="iconLeft"/></div>
            <div>{{topTitle}}</div>
            <div class="arrow right"
                 @click="changeWeek(1)"><img :src="iconRight"/></div>
        </header>
        <div class="date-wrap">
            <div class="date-index" v-for="index in 7">{{weekDay[index]}}</div>
            <div class="date-cell-wrap" v-for="date, index in dateArray">
                <div class="date-cell"
                     :class="{'disable-day': date.disabled,
                     'select-day': date.isSelect,
                     'other-month': !date.isNowMonth && showAllCalendar,
                     'all-calendar': showAllCalendar}">
                    <slot name="sup"></slot>
                    <div class="date-number"
                         @click="setSelectedDay(index, date.value)"
                         :class="{
                                 'today': date.isToday
                             }">{{date.isToday ? '今' : date.number}}
                    </div>
                    <div class="circle"
                         :class="{'show-circle': date.hasBottomCircle}"></div>
                </div>
            </div>
        </div>
        <div class="calendar-bottom">
            <slot name="calendar-bottom">
                <div class="back-to-today" @click="backToToday">
                    <i class="el-icon-d-arrow-left-1"></i>
                    <i class="el-icon-d-arrow-left-2"></i>
                    <div>今日</div>
                </div>
                <div class="change-calendar-sta" @click="changeCalendarSta">
                    <div class="calendar-sta-icon">
                        <i :class="{'long-line': !showAllCalendar, 'short-line': showAllCalendar}"></i>
                        <i :class="{'long-line': showAllCalendar, 'short-line': !showAllCalendar}"></i>
                    </div>
                    <div class="calendar-sta">{{showAllCalendar ? '收起' : '展开'}}</div>
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import iconLeft from '../images/icon-left.svg'
    import iconRight from '../images/icon-right.svg'

    // 注意：safari不兼容new Date('2018-1-1')月/日为个位数的
    const ENUM_WEEK_DAY = {
        1: '日',
        2: '一',
        3: '二',
        4: '三',
        5: '四',
        6: '五',
        7: '六',
    }

    export default {
        data() {
            return {
                // 顶部左右切换按钮
                iconLeft,
                iconRight,
                // 当前天的年-月-日,暂未使用,预留
                currentMonth: moment().month() + 1,
                currentYear: moment().year(),
                currentDate: moment().date(),
                // 当前选中的一天
                selectDay: '',
                weekDay: ENUM_WEEK_DAY,
                // 显示全部日历，默认展开高度387px
                showAllCalendar: false,
                // 显示5行时，控制高度437px
                showLongAll: false,
            }
        },
        props: {
            // 是否显示底部的圆点
            showBottomCircle: {
                type: Array,
                default: () => [],
            },
            // 控制默认选中哪一天，时间戳
            defaultSelectDay: {
                type: Number,
                default: Date.now(),
            },
        },
        computed: {
            // 顶部标题
            topTitle() {
                return moment(this.selectDay).format('Y年M月')
            },
            // todo 计算次数优化，同月选中可以不进行计算
            // 日历数据，根据selectDay填充
            dateArray() {
                const today = moment()
                const dateArray = []
                let rows = 1
                let currTime = (this.selectDay || today).day() // 选中当天是一周中的第几天，周天为0
                let dateType = 'w' // week
                if (this.showAllCalendar) {
                    const day = (this.selectDay || today).date() // 一月中的第几天
                    // 为了兼容safari生成日期对象时，不支持month和day是个位数
                    const selectDay = moment(`${this.selectDay.year()}-${this.standMonthOrDay(this.selectDay.month() + 1)}-01`) // 当前选中的年-月-1
                    const currentWeekday = moment(selectDay).date(1).day(); // 获取当月1日为星期几，周天为0
                    rows = Math.ceil((moment(selectDay).daysInMonth() + currentWeekday) / 7) // 显示多少行
                    this.showLongAll = rows % 6 === 0
                    currTime = day + currentWeekday - 1 // 当前选中的天是第几个数据
                    dateType = 'm' // month
                }
                for (let i = 0; i <= currTime; i++) {
                    dateArray[i] = moment(this.selectDay).add(-currTime + i, 'd').add(0, `${dateType}`)
                }
                for (let i = currTime + 1; i <= rows * 7 - 1; i++) {
                    dateArray[i] = moment(this.selectDay).add(i - currTime, 'd').add(0, `${dateType}`)
                }
                return dateArray.map((date) => {
                    return this.dateToMoment(date)
                })
            },
        },
        methods: {
            // 点击返回今日
            backToToday() {
                this.selectDay = moment()
            },
            // 将date用moment包装
            dateToMoment(date) {
                const today = moment()
                const dayValue = date.millisecond(0).second(0).minute(0).hour(0)
                    .valueOf()
                return {
                    number: date.date(), // 对应该月的天数
                    value: date, // 传给selectDay的数据
                    isToday: date.isSame(moment(), 'day'), // 是否今天
                    isSelect: date.isSame(this.selectDay, 'day'), // 是否被选中
                    hasBottomCircle: this.showBottomCircle.includes(dayValue), // 是否有课
                    disabled: today.valueOf() - 8.64e7 > date.valueOf(), // 是否今日过后
                    isNowMonth: date.isSame(this.selectDay, 'month'), // 是否在当前月份
                }
            },
            // 点击选中某一天
            setSelectedDay(index, v) {
                this.selectDay = v
            },
            // 点击左右切换周/月
            changeWeek(index) {
                const selectedtYear = this.selectDay.year() // 当前选中多少年
                const selectedtMonth = this.selectDay.month() + 1 // 当前选中多少月
                const selectedtDay = this.selectDay.date() // 当前选中的是多少天
                // 标准化年-月
                const standMonth = (year, month) => {
                    if (month > 12) { // 12月->1月
                        month = 1
                        year += 1
                    } else if (month < 1) { // 1月->12月
                        month = 12
                        year -= 1
                    }
                    return [year, this.standMonthOrDay(month)]
                }
                // 前一月
                const [refYear, refMonth] = standMonth(selectedtYear, selectedtMonth - 1)
                const ref = moment(`${refYear}-${refMonth}-01`)
                // 下一月
                const [nextYear, nextMonth] = standMonth(selectedtYear, selectedtMonth + 1)
                const next = moment(`${nextYear}-${nextMonth}-01`)
                if (!this.showAllCalendar) { // 折叠模式
                    this.selectDay = moment(this.selectDay).add(index * 7, 'd').add(0, 'w')
                } else if (this.showAllCalendar && index === 1) { // 展开模式
                    if (selectedtDay > next.daysInMonth()) { // 在31号时，跳转到下月月底
                        this.selectDay = moment(`${nextYear}-${nextMonth}-${this.standMonthOrDay(next.daysInMonth())}`)
                    } else {
                        this.selectDay = moment(this.selectDay).add(index * this.selectDay.daysInMonth(), 'd').add(0, 'm')
                    }
                } else if (this.showAllCalendar && index === -1) {
                    if (selectedtDay > ref.daysInMonth()) { // 在31号时，跳转到上月月底
                        this.selectDay = moment(`${refYear}-${refMonth}-${this.standMonthOrDay(ref.daysInMonth())}`)
                    } else {
                        this.selectDay = moment(this.selectDay).add(index * ref.daysInMonth(), 'd').add(0, 'm')
                    }
                }
            },
            // 控制显示全部日历还是部分日历
            changeCalendarSta() {
                this.showAllCalendar = !this.showAllCalendar
            },
            // 为了兼容safari不支持new Date('2018-1-1')的情况
            standMonthOrDay(num) {
                return num < 10 ? `0${num}` : num
            },
        },
        watch: {
            selectDay: function selectedDay(v, oldV) {
                this.$emit('click-calendar', v, oldV)
            }
        },
        components: {},
        mounted() {
            this.selectDay = moment(this.defaultSelectDay)
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    @import "../../../../common/mobile/basic_const";

    .calendar {
        width: 100%;
        height: 182px;
        padding: 0 18px;
        min-height: 100px;
        background-color: #fff;
        overflow: hidden;
        margin-bottom: 15px;
        box-shadow: 0 2px 6px rgba(36, 45, 51, 0.05);
        transition: height .3s ease;
        &.showAll {
            height: 387px;
        }
        &.showLongAll {
            height: 437px;
        }
        .top {
            display: flex;
            justify-content: space-between;
            line-height: 30px;
            margin-top: 9px;
            height: 30px;
            margin-bottom: 30px;
            .arrow {
                font-size: 20px;
                width: 30px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                border-radius: 100%;
                background-color: #F5F7F9;
                color: #9CB5C9;
                img {
                    width: auto;
                    height: 14px;
                }
                &.left img {
                    position: relative;
                    left: 3px;
                }
                &.right img {
                    position: relative;
                    right: 3px;
                }
            }
        }
        .date-wrap {
            display: flex;
            flex-flow: row wrap;
            & > div {
                width: calc(100% / 7);
                text-align: center;
            }
            color: $text-hint;
            .date-index {
                font-size: 14px;
                color: #242D33;
                height: 28px;
            }
            .date-cell-wrap {
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .date-cell {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                margin: 0 5px;
                width: 34px;
                .date-number {
                    color: $text-strong;
                    margin: 4px auto 0;
                    border-radius: 100%;
                    width: 30px;
                    line-height: 30px;
                    &.today {
                        color: #FF5500;
                    }
                }
                .circle {
                    width: 6px;
                    height: 6px;
                    border-radius: 100%;
                    background-color: inherit;
                    margin: 0 auto 5px;
                }
                .show-circle {
                    background-color: $manager-primary-text;
                }
                &.select-day {
                    color: #fff !important;
                    background: #36B459;
                    border-radius: 100px;
                    .circle {
                        background-color: #FFFFFF;
                    }
                    .date-number {
                        color: #fff;
                    }
                }
            }
            .date-cell.disable-day {
                .date-number {
                    color: $text-hint;
                }
                .show-circle {
                    background-color: $text-hint;
                }
            }
            .date-cell.other-month {
                .date-number {
                    color: $text-hint;
                }
                .show-circle {
                    background-color: $text-hint;
                }
            }
            .date-cell.all-calendar {
                width: 38px;
                height: 38px;
                &.select-day {
                    border-radius: 50%;
                }
                .date-number {
                    margin: 0;
                    width: 28px;
                    height: 28px;
                    line-height: normal;
                }
                .circle {
                    margin: 0 auto 2px;
                }
                margin: 6px 0;
            }
        }
        .calendar-bottom {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
            padding-top: 20px;
            padding-bottom: 11px;
            font-size: 14px;
            color: rgba(159, 185, 204, 1);
            .change-calendar-sta {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                justify-content: space-between;
                .calendar-sta-icon {
                    display: flex;
                    flex-flow: column nowrap;
                    align-items: center;
                    justify-content: center;
                    margin-right: 7px;
                    .long-line {
                        width: 14px;
                        height: 1px;
                        background-color: #9FB9CC;
                        margin-bottom: 2px;
                    }
                    .short-line {
                        width: 7px;
                        height: 1px;
                        background-color: #9FB9CC;
                        margin-bottom: 2px;
                    }
                }
            }
            .back-to-today {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                justify-content: center;
                .el-icon-d-arrow-left-1 {
                    display: inline-block;
                    border-left: 1px solid;
                    border-bottom: 1px solid;
                    width: 6px;
                    height: 6px;
                    transform: rotate(45deg);
                }
                .el-icon-d-arrow-left-2 {
                    display: inline-block;
                    border-left: 1px solid;
                    border-bottom: 1px solid;
                    width: 6px;
                    height: 6px;
                    transform: rotate(45deg);
                    margin-right: 5px;
                }
            }
        }
    }
</style>
