<template>
    <div class="m-content">
        <h3>欢 迎 来 到 简 易 博 客</h3>
        <div class="block">
            <el-avatar :size="100" :src="user.avatar"></el-avatar>
            <div class="name">{{user.username}}</div>
        </div>
        <div class="maction">
            <span>
                <el-link type="warning" href="/blogs">主页</el-link>
            </span>
            <el-divider direction="vertical"></el-divider>
            <span>
                <el-link type="success" href="/blog/add">发表博客</el-link>
            </span>
            <el-divider direction="vertical"></el-divider>
            <span v-show="!hasLogin">
                <el-link type="primary"  href="/login">登录</el-link>
            </span>
            <span v-show="hasLogin">
                <el-link type="danger" @click="logout">退出</el-link>
            </span>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Header',
    data() {
        return {
            user:{
                username:'请先登录',
                avatar:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
            },
            hasLogin: false
        }
    },
    created(){
        let userinfo = this.$store.getters.getUser
        if (userinfo) {
            this.user = typeof userinfo == 'string' ? JSON.parse(userinfo) : userinfo
            this.hasLogin = true
        }
        let session = window.sessionStorage
        let local = window.localStorage
        if (!session.hasOwnProperty('userinfo') && local.hasOwnProperty('token')) {
            this.post_userinfo()
        }
    },
    methods:{
        post_userinfo(){
            let token = window.localStorage.getItem('token')
            this.$axios.post('/api/',{ token }).then(res=>{
                let { userinfo } = res.data
                this.$store.commit('SET_USERINFO',userinfo)
                this.user = userinfo
                this.hasLogin =true
            })
        },
        logout () {
            this.$axios({
                url:'/api/layout',
                method:'get',
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }).then( res => {
                this.$store.commit('REMOVE_INFO')
                this.$router.push('/login')
            })
        }
    }
}
</script>

<style scoped>
    .name{
        color: #f1f2f6;
        padding: 10px 0;
    }
    .m-content{
        width: 100%;
        margin: 0 auto;
        text-align: center;
    }
    .maction{
        padding-bottom: 15px;
    }
    h3 {
        color: #f1f2f6;
        font-size: 25px;
        height: 80px;
        line-height: 80px;
    }
    .el-link{
        font-size: 15px;
    }
</style>