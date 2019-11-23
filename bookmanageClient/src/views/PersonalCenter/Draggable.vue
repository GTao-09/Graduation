<template>
    <div class="box_main">
        <div style="display: flex;">
            <div class="box_left" style="margin-right: 100px;">
                <div class="templateTask">已有任务</div>
                <vuedraggable
                    @change="log"
                    v-model="showTask"
                    group="people"
                    style="width: 400px;height:300px;border: 1px solid black;padding: 10px;">
                    <div v-for="(item,key) in showTask" :key="key" style="margin-bottom: 5px;">
                        <el-card shadow="hover" @dblclick.native.capture="showChangeRight(item)">
                            <div style="margin-bottom: 5px;">{{item.value}}</div>
                        </el-card>
                    </div>
                </vuedraggable>
            </div>
            <div class="box_right">
                <div class="templateTask">请选择任务</div>
                <vuedraggable
                    v-model="rightTask"
                    :group="{ name: 'people', pull: 'clone', put: false }"
                    style="width: 400px;height:300px; border: 1px solid black;padding: 10px;">
                    <div v-for="(item,key) in rightTask" :key="key" style="margin-bottom: 5px;">
                        <el-card shadow="hover">
                            <div style="margin-bottom: 5px;">{{item.value}}</div>
                        </el-card>
                    </div>
                </vuedraggable>
            </div>
        </div>
        <div style="margin-top: 10px;">
            <el-form :model="formArr" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <template v-for="(item, index) in Object.keys(formArr)">
                    <el-form-item :label="formArr[item].label" :prop="formArr[item].prop" :key="index">
                        <el-input v-model="formArr[item].value"></el-input>
                    </el-form-item>
                </template>
            </el-form>
        </div>
        <div @click="test">提交</div>
        <div @click="complete">完成</div>
        <!-- <div class="footer-addshop"> -->
            <!-- <el-button type="primary" class="submitbtn-footer" @click="submitForm('shopform')">提交</el-button> -->
        <!-- </div> -->
    </div>
</template>

<script>
import vuedraggable from 'vuedraggable'
// https://sortablejs.github.io/Vue.Draggable/#/simple
export default {
    name: 'clone-on-control',
    mounted () {
        this.firstForm = this.formArr
    },
    data () {
        return {
            firstForm: null, // 始终保存formArr的初始值
            formArr: {
                name: {
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
            editable: true,
            isDragging: false,
            delayedDragging: false,
            rules: {}
        }
    },
    components: {
    // 调用组件
        vuedraggable
    },
    methods: {
        test () {
            console.log(this.formArr)
        },
        complete () { // 完成按钮
            this.formArr = this.firstForm
            this.showTask.forEach(item => {
                this.$set(this.formArr, item.name, { label: item.label, prop: item.name, value: item.value })
            })
            console.log(this.formArr)
        },
        showChangeRight (val) { // 从已有任务双击到选择任务
            this.showTask.map((item, index) => {
                if (item.id === val.id) {
                    this.showTask.splice(index, 1)
                }
            })
            this.rightTask.push(val)
        },
        log (evt) { // 选择任务移动后的事件
            console.log(evt)
            this.rightTask.map((item, index) => {
                if (item.id === evt.added.element.id) {
                    this.rightTask.splice(index, 1)
                }
            })
            console.log(this.rightTask)
        },
        submitForm () {
            // console.log(this.form)
        }
        // checkMove (evt) {
        //     console.log(evt)
        //     return false
        // }
    }
}
</script>
<style scoped>
</style>
