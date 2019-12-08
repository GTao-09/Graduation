<template>
    <div class="pagination">
        <el-pagination :class="{'my-pagination': small}"
            :small="small"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="pageSizes"
            :page-size.sync="pageSize"
            :layout="layout"
            :total="total"
            v-bind="$attrs"
            v-on="$listeners">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    props: {
        total: {
            type: Number,
            default: 0
        },
        page: {
            type: Number,
            default: 1
        },
        limit: {
            type: Number,
            default: 10
        },
        layout: {
            type: String,
            default: 'total, sizes, prev, pager, next, jumper'
        },
        pageSizes: {
            type: Array,
            default: () => {
                return [10, 20, 30, 40]
            }
        },
        small: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        currentPage: {
            get () {
                return this.page
            },
            set (val) {
                this.$emit('update:page', val)
            }
        },
        pageSize: {
            get () {
                return this.limit
            },
            set (val) {
                this.$emit('update:limit', val)
            }
        }
    },
    methods: {
        handleSizeChange (val) {
            this.$emit('pagination', { page: this.currentPage, limit: val, total: this.total })
        },
        handleCurrentChange (val) {
            this.$emit('pagination', { page: val, limit: this.pageSize, total: this.total })
        }
    }
}
</script>

<style scoped>
.pagination {
    text-align: right
}
</style>
<style lang="less">
.my-pagination {
    .el-input__inner, .el-input--mini .el-input__icon {
        height: 22px;
        line-height: 22px;
    }
}
</style>
