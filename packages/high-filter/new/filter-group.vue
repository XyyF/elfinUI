<template>
    <div class="xjl-filter-group">
        <span v-if="label" class="label">
            {{ label }}
        </span>
        <div class="group">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'filter-group',
        props: {
            label: {
                type: String,
                default: ''
            }
        },
        methods: {
        },
    }
</script>

<style scoped>
    .xjl-filter-group {
        display: flex;
        flex-direction: column;
    }

    .label {
        display: flex;
        font-weight: bold;
        margin-bottom: 10px;
        font-weight: 600;
    }

    .group {
        display: flex;
        flex-wrap: wrap;
        margin-top: -15px;
    }

    .group > * {
        margin-right: 10px;
        margin-top: 15px;
    }
</style>