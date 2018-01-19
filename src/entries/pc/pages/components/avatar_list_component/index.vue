<template>
    <div class="avatar-list-component">
        <avatar-list-md></avatar-list-md>
    </div>
</template>

<script>
    import avatarListMd from './avatar-list.md'

    export default {
        name: 'avatar-list-component',
        components: {
            avatarListMd,
        },
    }
</script>
