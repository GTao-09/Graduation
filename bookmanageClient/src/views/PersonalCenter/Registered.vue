<template>
    <div class="registered">
        <div>
            <div class="box_left">
                <div class="templateTask" v-if="!showForm">用户信息注册</div>
                <div class="templateTask" v-else>请拖入你要添加的选项</div>
                <template v-if="showForm">
                    <vuedraggable
                        v-model="showTask"
                        group="people"
                        style="width: 500px;min-height:300px;border: 1px solid black;padding: 10px;margin-left: 30px;">
                        <div v-for="(item,key) in showTask" :key="key" style="margin-bottom: 5px;" disabled="false">
                            <el-card shadow="hover" disabled="false" @dblclick.native.capture="showChangeRight(item)">
                                <div style="margin-bottom: 5px;">{{item.label}}</div>
                            </el-card>
                        </div>
                    </vuedraggable>
                </template>
                <template v-else>
                     <el-form :model="formArr" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width: 500px;">
                        <template v-for="(item, index) in Object.keys(formArr)">
                            <el-form-item v-if="formArr[item].type === 'select'" :label="formArr[item].label" :prop="formArr[item].prop" :key="index">
                                <el-select v-model="formArr[item].value" placeholder="请选择" style="width: 100%;">
                                    <el-option
                                        v-for="sitem in formArr[item].options"
                                        :key="sitem.value"
                                        :label="sitem.label"
                                        :value="sitem.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item v-else-if="formArr[item].type === 'datePicker'" :label="formArr[item].label" :prop="formArr[item].prop" :key="index">
                                <el-date-picker type="date" placeholder="选择日期" v-model="formArr[item].value" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                            <el-form-item v-else-if="formArr[item].prop === 'password'" :label="formArr[item].label" :prop="formArr[item].prop" :key="index">
                                <el-input v-model="formArr[item].value" show-password></el-input>
                            </el-form-item>
                            <el-form-item v-else :label="formArr[item].label" :prop="formArr[item].prop" :key="index">
                                <el-input v-model="formArr[item].value"></el-input>
                            </el-form-item>
                        </template>
                    </el-form>
                </template>
                <div class="footer-addshop">
                    <el-button type="primary" v-show="!showForm" class="submitbtn-footer" @click="submitForm()">提交</el-button>
                </div>
            </div>
            <div class="box_right">
                <div class="title-warp">
                    <div class="templateTask-choose">可选择选项</div>
                    <div class="btn-wrap">
                        <el-button type="primary" @click="editForm">添加</el-button>
                        <el-button type="success" @click="complete">完成</el-button>
                    </div>
                </div>
                <vuedraggable
                    :group="{ name: 'people' }"
                    v-model="rightTask"
                    style="width: 400px; border: 1px solid black;padding: 10px;">
                    <div v-for="(item,key) in rightTask" :key="key" style="margin-bottom: 5px;">
                        <el-card shadow="hover">
                            <div style="margin-bottom: 5px;">{{item.label}}</div>
                        </el-card>
                    </div>
                </vuedraggable>
            </div>
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
                userName: {
                    id: 0,
                    label: '姓名',
                    prop: 'userName',
                    value: '',
                    type: 'input'
                },
                name: {
                    id: 1,
                    label: '用户名',
                    prop: 'name',
                    value: '',
                    type: 'input'
                },
                password: {
                    id: 2,
                    label: '密码',
                    prop: 'password',
                    value: '',
                    type: 'input'
                },
                identify: {
                    id: 3,
                    label: '身份',
                    prop: 'identify',
                    value: '',
                    type: 'select',
                    options: [
                        {
                            value: '0',
                            label: '管理员'
                        },
                        {
                            value: '1',
                            label: '超级管理员'
                        }
                    ]
                }
            },
            showTask: [ // 左边显示的组件
                // {
                //     id: 1,
                //     value: 'leftOne',
                //     name: 'Lone',
                //     label: '左一'
                // }
            ],
            rightTask: [ // 右边显示组件,
                {
                    id: 4,
                    value: '',
                    name: 'gender',
                    label: '性别',
                    type: 'select',
                    options: [
                        {
                            value: '0',
                            label: '女'
                        },
                        {
                            value: '1',
                            label: '男'
                        }
                    ]
                },
                {
                    id: 5,
                    value: '',
                    name: 'age',
                    label: '年龄',
                    type: 'input'
                },
                {
                    id: 6,
                    value: '',
                    name: 'entryTime',
                    label: '入职时间',
                    type: 'datePicker'
                },
                {
                    id: 7,
                    value: '',
                    name: 'birthday',
                    label: '出生年月',
                    type: 'datePicker'
                },
                {
                    id: 8,
                    value: '',
                    name: 'tel',
                    label: '电话',
                    type: 'input'
                },
                {
                    id: 9,
                    value: '',
                    name: 'subordinateDepart',
                    label: '所属部门',
                    type: 'select',
                    options: [
                        {
                            value: '0',
                            label: '信息研发'
                        },
                        {
                            value: '1',
                            label: '大数据'
                        },
                        {
                            value: '2',
                            label: '行政部'
                        },
                        {
                            value: '3',
                            label: '财务部'
                        }
                    ]
                }
            ],
            showForm: false,
            editable: true,
            isDragging: false,
            delayedDragging: false,
            rules: {
                userName: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                    // { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                    // { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
                ],
                identify: [
                    { required: true, message: '请选择身份', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        editForm () {
            this.showForm = true
        },
        complete () { // 完成按钮
            this.showTask.forEach(item => {
                console.log(item.options)
                if (item.options) {
                    this.$set(this.formArr, item.name, { label: item.label, prop: item.name, value: item.value, type: item.type, options: item.options })
                } else {
                    this.$set(this.formArr, item.name, { label: item.label, prop: item.name, value: item.value, type: item.type })
                }
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
            let formKey = Object.keys(this.formArr)
            let formData = {}
            formKey.map(item => {
                formData[item] = this.formArr[item].value
            })
            console.log(formData)
            // this.$refs['ruleForm'].validate((valid) => { // 这个检测无效
            //     if (valid) {
            //         alert('submit!')
            //     } else {
            //         console.log('error submit!!')
            //         return false
            //     }
            // })
            // 注册接口
            this.$ajax({
                type: 'userRegister',
                data: {
                    ...formData
                },
                methods: 'post'
            }).then(res => {
                if (res.data.success) {
                    this.$message({
                        message: '注册成功',
                        type: 'success',
                        duration: 1000
                    })
                    this.$router.back()
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.registered {
    text-align: left;
}
.box_left {
    margin-right: 100px;
    margin-left: 50px;
    width: 600px;
}
.box_right {
    position: absolute;
    right: 30px;
    top: 80px;
}
.title-warp {
    display: flex;
}
.templateTask-choose {
    // margin-bottom: 5px;
    margin-right: 15px;
    line-height: 32px;
}
.btn-wrap {
    margin-bottom: 5px;
}
.templateTask {
    text-align: center;
    font-size: 30px;
    line-height: 55px;
}
.footer-addshop {
    width: 300px;
    margin: 0 auto;
}
.submitbtn-footer {
    width: 100%;
}
</style>
