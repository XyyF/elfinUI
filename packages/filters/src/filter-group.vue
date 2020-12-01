<script>
    export default {
        name: 'ElfinFiltersGroup',
        inject: ['injRoot'],
        props: {
            label: {
                type: String,
                default: '',
            },
        },
        render() {
            return (
                <div class="elfin-filters-group">
                    {this.label && <span class="label">{this.label}:</span>}
                    <div class="group">
                        {this.$slots.default}
                    </div>
                </div>
            );
        },
    };
</script>

<style scoped>
    .elfin-filters-group {
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
