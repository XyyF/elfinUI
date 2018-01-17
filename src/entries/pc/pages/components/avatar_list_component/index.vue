<template>
    <div class="avatar-list-component">
        avatarList 头像列表显示框
        <avatar-list></avatar-list>
    </div>
</template>

<script>
    import avatarList from './avatar_list.vue'

    export default {
        name: 'avatar-list-component',
        components: {
            avatarList,
        },
        computed: {
            infoList() {
                return []
            },
            relationList() {
                return []
            },
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../../../../components/pc/styles/basic_const";

    .avatar-list-component {
    }
</style>
