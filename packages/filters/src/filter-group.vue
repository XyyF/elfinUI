<script>
    export default {
        name: 'xjl-filter-group',
        inject: ['injRoot'],
        props: {
            label: {
                type: String,
                default: '',
            },
        },
        render(h) {
            return (
                <div class="xjl-filter-group">
                    {this.label && <span class="label">{this.label}:</span>}
                    <div class="group">
                        {this.$slots.default}
                    </div>
                </div>
            )
        },
    }
</script>

<style scoped>
    .xjl-filter-group {
        display: flex;
        flex-direction: row;
    }

    .label {
        display: flex;
        color: #90999D;
        font-size:14px;
        margin: 5px 10px 0 0;
        flex-shrink: 0;
    }

    .group {
        display: flex;
        flex-wrap: wrap;
    }

    .group > * {
        margin: 5px 10px 5px 0;
    }
</style>