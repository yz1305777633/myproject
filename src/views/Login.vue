<template>
    <div class="b-img">
        <el-container>
            <el-header height="auto">
                <img class="logo" src="../assets/logo.jpg" alt="" srcset="">
                <transition name="el-fade-in-linear">
                    <div class="Politelanguage">Welcome To My Blog!</div>
                </transition>
            </el-header>
            <el-main>
                <el-form :model="ruleForm" :rules="rules" hide-required-asterisk ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item class="itemi" label="用户名：" prop="username">
                        <el-input v-model.trim="ruleForm.username" maxlength="16" clearable placeholder="请输入您的用户名"></el-input>
                    </el-form-item>
                    <el-form-item class="itemi" label="密码：" prop="password">
                        <el-input type="password" v-model.trim="ruleForm.password" maxlength="16" clearable placeholder="请输入您的用户密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">登 录</el-button>
                        <el-button @click="isRegister = true">注册</el-button>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>
        <Footer></Footer>
        <!-- 注册模态框 -->
        <el-dialog
          title="请注册"
          center
          :width="fullWidth > '375' ? '50%': '360px'"
          :visible.sync="isRegister"
          :before-close="dialogBeforeClose">
          <el-form :model="register" hide-required-asterisk label-width="100px" :rules="rulesR" class="regist" ref="registerRef">
            <el-form-item label="用户名：" prop="username">
                  <el-input v-model.trim="register.username" maxlength="16" clearable placeholder="用户名由英文字母或数字构成"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="password">
                <el-input type="password" v-model.trim="register.password" maxlength="16" clearable placeholder="由数字、英文字母或者下划线点组成的字符串"></el-input>
            </el-form-item>
            <el-form-item label="确认密码：" prop="rpassword">
                <el-input type="password" v-model.trim="register.rpassword" maxlength="16" clearable placeholder="请再次确认您的用户密码"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button @click="isRegister = false">取 消</el-button>
            <el-button type="primary" @click="registerSub('registerRef')">注 册</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
      return {
        fullWidth: document.documentElement.clientWidth,
        ruleForm: {
          username: '',
          password:''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 4, max: 16, message: '长度在 4 到 15 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 4, max: 16, message: '长度在 4 到 15 个字符', trigger: 'blur' }
          ]
        },
        register: {
          username: '',
          password: '',
          rpassword: ''
        },
        rulesR: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 4, max: 16, message: '长度在 4 到 15 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 4, max: 16, message: '长度在 4 到 15 个字符', trigger: 'blur' }
          ],
          rpassword: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 4, max: 16, message: '长度在 4 到 15 个字符', trigger: 'blur' }
          ]
        },
        isRegister: false
      }
    },
    mounted() {
      window.onresize = () => {
        return (() => {
          window.fullWidth = document.documentElement.clientWidth
          this.fullWidth = window.fullWidth
        })()
      }
    },
    watch: {
      /* 监听*/
      fullWidth(val) {
        if (!this.timer) {
          this.fullWidth = val
          this.timer = true
          let that = this
          setTimeout(function() {
            that.timer = false
          }, 400)
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let { username,password } = this.ruleForm
            let resData = await this.$axios({
                url:'/api/login',
                method:'post',
                data:{ username,password }
            })
            let { status,userinfo } = resData.data
            // 检测登录状态
            if (status == 200) {
              const jwt = resData.headers['authorization']
              this.$store.commit('SET_TOKEN',jwt)
              this.$store.commit('SET_USERINFO',userinfo)
              this.$router.push('/blogs')
              this.$message({
                message: '登陆成功！',
                type: 'success'
              });
            }
            this.resetForm(formName)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      dialogBeforeClose(){
        this.isRegister = false
      },
      registerSub(formName){
        this.$refs[formName].validate(async (valid) => {
          if (!valid) return alert('注册失败！')
          let { password, rpassword, username } = this.register
          if (password != rpassword) {
            this.$message.waring('两次密码输入不相同！')
          }else {
            let res = await this.$axios.post('/api/register',{ password,username })
            this.resetForm(formName)
            this.$message.success(res.data.msg)
          }
        })
      }
    }
}
</script>

<style scoped>
    .b-img{
        width: 100%;
        height: 100%;
        background-image: url(../assets/bg.jpg);
        background-size: cover;
        background-repeat: no-repeat;
    }
    .el-header {
        background-color: rgba(0, 0, 0,.1);
        color: #333;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 15px 0;
    }
    .itemi /deep/.el-form-item__label{
        color: #ffffff;
    }
    .Politelanguage{
        margin-top: 15px;
        color: #ffffff;
        font-family:Consolas, 'Lucida Console', monospace;
        font-size: 28px;
        font-weight: 600;
        letter-spacing: 1px;
    }
    .el-main {
        color: #333;
        text-align: center;
        line-height: 160px;
    }
    body > .el-container {
        margin-bottom: 40px;
    }
    .logo{
        max-width: 100px;
        max-height: 100px;
        border-radius: 50%;
    }
    .demo-ruleForm{
        max-width: 500px;
        margin: 20px auto;
        background: rgba(0, 0, 0, 0.4);
        padding: 30px 25px 10px 0;
        border-radius: 10px;
        box-shadow: 0 0 5px 2px rgb(233, 233, 233);
    }
    .regist{
      max-width: 400px;
      margin: 0 auto;
    }
</style>