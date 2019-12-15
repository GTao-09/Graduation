<template>
    <div class="registered">
        <div style="display: flex;">
            <div class="box_left" style="margin-right: 100px;">
                <div class="templateTask">待添加</div>
                <template v-if="showForm">
                    <vuedraggable
                        v-model="showTask"
                        group="people"
                        style="width: 400px;height:300px;border: 1px solid black;padding: 10px;">
                        <div v-for="(item,key) in showTask" :key="key" style="margin-bottom: 5px;" disabled="false">
                            <el-card shadow="hover" disabled="false" @dblclick.native.capture="showChangeRight(item)">
                                <div style="margin-bottom: 5px;">{{item.value}}</div>
                            </el-card>
                        </div>
                    </vuedraggable>
                </template>
                <template v-else>
                     <el-form :model="formArr" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <template v-for="(item, index) in Object.keys(formArr)">
                            <el-form-item :label="formArr[item].label" :prop="formArr[item].prop" :key="index">
                                <el-input v-model="formArr[item].value"></el-input>
                            </el-form-item>
                        </template>
                    </el-form>
                </template>
            </div>
            <div class="box_right">
                <div class="templateTask">可选择选项</div>
                <vuedraggable
                    :group="{ name: 'people' }"
                    v-model="rightTask"
                    style="width: 400px;height:300px; border: 1px solid black;padding: 10px;">
                    <div v-for="(item,key) in rightTask" :key="key" style="margin-bottom: 5px;">
                        <el-card shadow="hover">
                            <div style="margin-bottom: 5px;">{{item.value}}</div>
                        </el-card>
                    </div>
                </vuedraggable>
            </div>
        </div>
        <div @click="editForm">编辑</div>
        <div @click="complete">完成</div>
        <div class="footer-addshop">
            <el-button type="primary" v-show="!showForm" class="submitbtn-footer" @click="submitForm()">提交</el-button>
        </div>
    </div>
</template>

<script>
import vuedraggable from 'vuedraggable'
export default {
    name: 'Registered', // 注册
    components: {
        vuedraggable
    },
    data () {
        return {
            formArr: {
                name: {
                    id: 0,
                    label: '活动名称',
                    prop: 'name',
                    value: ''
                }
            },
            showTask: [ // 左边显示的组件
                {
                    id: 1,
                    value: 'leftOne',
                    name: 'Lone',
                    label: '左一'
                },
                {
                    id: 2,
                    value: 'leftTwo',
                    name: 'Ltwo',
                    label: '左二'
                },
                {
                    id: 3,
                    value: 'leftThree',
                    name: 'Lthree',
                    label: '左三'
                }
            ],
            rightTask: [ // 右边显示组件,
                {
                    id: 4,
                    value: 'rightOne',
                    name: 'Rone',
                    label: '右一'
                },
                {
                    id: 5,
                    value: 'rightTwo',
                    name: 'Rtwo',
                    label: '右二'
                },
                {
                    id: 6,
                    value: 'rightThree',
                    name: 'Rthree',
                    label: '右三'
                }
            ],
            showForm: false,
            editable: true,
            isDragging: false,
            delayedDragging: false,
            rules: {}
        }
    },
    methods: {
        editForm () {
            this.showForm = true
        },
        complete () { // 完成按钮
            this.showTask.forEach(item => {
                this.$set(this.formArr, item.label, { label: item.label, prop: item.name, value: item.value })
            })
            this.showForm = false
        },
        showChangeRight (val) { // 从已有任务双击到选择任务
            this.showTask.map((item, index) => {
                if (item.id === val.id) {
                    this.showTask.splice(index, 1)
                    this.$delete(this.formArr, val.label)
                }
            })
            this.rightTask.push(val)
        },
        submitForm () {
            console.log(this.formArr)
        }
    }
}
</script>

<style lang="less" scoped>
.registered {
    text-align: left;
}
</style>
