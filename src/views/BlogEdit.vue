<template>
    <div>
        <Header></Header>
        <div class="m-content">
            <el-form :model="ruleForm" :rules="rules" hide-required-asterisk ref="ruleForm" label-width="60px" class="demo-ruleForm">
                <el-form-item label="标题：" prop="title">
                    <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="摘要：" prop="description">
                    <el-input type="textarea" v-model="ruleForm.description"></el-input>
                </el-form-item>
                <el-form-item label="内容：" prop="content">
                    <mavon-editor ref="md" :codeStyle="codeStyle" :toolbars="toolbars" :ishljs = "true" @imgAdd="handleEditorImgAdd" @imgDel="handleEditorImgDel" v-model="ruleForm.content"></mavon-editor>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即发布</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header';

export default {
    name: 'BlogEdit',
    components: { Header },
    data() {
        return {
            codeStyle: 'qtcreator_dark',
            toolbars: {
                bold: true, // 粗体
                italic: true, // 斜体
                header: true, // 标题
                underline: true, // 下划线
                strikethrough: true, // 中划线
                mark: true, // 标记
                superscript: true, // 上角标
                subscript: true, // 下角标
                quote: true, // 引用
                ol: true, // 有序列表
                ul: true, // 无序列表
                link: true, // 链接
                imagelink: true, // 图片链接
                code: true, // code
                table: true, // 表格
                fullscreen: true, // 全屏编辑
                readmodel: true, // 沉浸式阅读
                htmlcode: true, // 展示html源码
                help: true, // 帮助
                /* 1.3.5 */
                undo: true, // 上一步
                redo: true, // 下一步
                trash: true, // 清空
                save: true, // 保存（触发events中的save事件）
                /* 1.4.2 */
                navigation: true, // 导航目录
                /* 2.1.8 */
                alignleft: true, // 左对齐
                aligncenter: true, // 居中
                alignright: true, // 右对齐
                /* 2.2.1 */
                subfield: true, // 单双栏模式
                preview: true, // 预览
            },
            ruleForm: {
                id:'',
                title: '',
                description: '',
                content:''
            },
            rules: {
                title: [
                    { required: true, message: '请输入标题', trigger: 'blur' },
                    { min: 3, max: 30, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                description: [
                    { required: true, message: '请输入摘要', trigger: 'change' },
                    { max: 300,message: '最大长度为300个字符！', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '请输入内容', trigger: 'change' }
                ]
            },
            img_file: {}
        }
    },
    created () {
        const blogId = this.$route.params.blogId
        if (blogId) {
            this.$axios({
                url: `/api/blog/${blogId}`,
                method: 'get'
            }).then(res => {
                const blog = res.data
                this.ruleForm.id = blog.id
                this.ruleForm.title = blog.title
                this.ruleForm.description = blog.description
                this.ruleForm.content = blog.content
            })
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                if (this.img_file.length > 0) {
                    this.up()
                }else{
                    this.upForm()
                }
            } else {
                this.$message({
                    message: '提交失败，请您重试！',
                    type: 'warning'
                })
                return false;
            }
            });
        },
        async upForm(){
            let ruleForm = this.ruleForm
            let resData = await this.$axios({
                url: '/api/blog/edit',
                method: 'post',
                headers: { 'Authorization': localStorage.getItem('token') },
                data: ruleForm 
            })
            if (resData.data.status == 200) {
                this.$alert('操作成功', '标题名称', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$router.push('/blogs')
                    }
                });
            }
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleEditorImgAdd (pos, $file) {
            this.img_file[pos] = $file;   
        },
        async up() {
            let { title,description,content } = this.ruleForm
            let isUp = [ title,description,content ].some(item => {
                return item == ''
            })
            if (isUp) {
               return
            }
            var formdata = new FormData();
            for(var _img in this.img_file){
                formdata.append(_img, this.img_file[_img]);
            }
            let res = await this.$axios({
                url: '/api/uploadimg',
                method: 'post',
                data: formdata,
                headers: { 'Content-Type': 'multipart/form-data'},
            })
            let _res = res.data.urlList;
                // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
            for (var img in _res) {
                this.$refs.md.$img2Url(_res[img][0], _res[img][1]);
            }
            this.upForm()
        },
        handleEditorImgDel (pos) {
            delete this.img_file[pos];
        }
    }
}
</script>

<style scoped>
    .m-content{
        max-width: 960px;
        margin: 0 auto;
        text-align: center;
    }
</style>