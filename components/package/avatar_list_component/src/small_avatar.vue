<template>
    <div class="small-avatar">
        <!-- <div v-if="!!name && !url" class="small-avatar__name small-avatar__avatar">{{name.slice(0, 1)}}</div> -->
        <div :style="avatarStyle" class="small-avatar__avatar"></div>
    </div>
</template>

<script type="text/babel">
    import { Gender } from 'common/student_enums'
    import manAvatar from '../../../../src/entries/pc/pages/demo/images/man-avatar.png'
    import womanAvatar from '../../../../src/entries/pc/pages/demo/images/woman-avatar.png'

    export default {
        name: 'small-avatar',
        props: {
            /** 原始头像地址 */
            url: {
                type: String,
                default: ''
            },
            defaultUrl: {
                type: String,
                default: manAvatar,
            },
            // 姓名，若没有头像则显示姓名第一个字
            name: {
                type: String,
                default: ''
            },
            gender: {
                type: Number,
                default: Gender.BOY
            }
        },
        data() {
            return {}
        },
        computed: {
            avatarStyle() {
                let bgUrl = this.url || this.defaultUrl;
                if (this.gender && this.gender === Gender.GIRL) {
                    bgUrl = this.url || womanAvatar
                }
                return {'background-image': `url(${bgUrl})`};
            },
        },
    };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../../../common/basic_const";

    .small-avatar {
        position: relative;
        &__avatar {
            width: 100%;
            height: 100%;
            background: transparent center center no-repeat;
            background-size: cover;
            background-origin: border-box;
            border-radius: 100%;
        }
        &__name {
            background-color: #26c0c0;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 200;
        }
    }
</style>
