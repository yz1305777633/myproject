<template>
    <div class="mm">
        <Header></Header>
        <div class="mblog">
            <span>{{ blog.title }}</span>
            <el-button type="primary" v-if="ownBlog" @click="$router.push({name:'BlogAdd',params:{ blogId: blog.id}})" round size="small" icon="el-icon-edit">编辑</el-button>
            <el-divider></el-divider>
            <div class="markdown-body" v-html="blog.content"></div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header';
import 'github-markdown-css/github-markdown.css'

export default {
    name: 'BlogDetail',
    components: { Header },
    data() {
        return {
            blog: {
                id: '',
                title: 'moren',
                content: 'nierong'
            },
            ownBlog: false
        }
    },
    created() {
        const blogId = this.$route.params.blogId
        if (blogId) {
            this.$axios({
                url: `/api/blog/${blogId}`,
                method: 'get'
            }).then(res => {
                const blog = res.data
                var MarkdownIt = require('markdown-it');
                var md = new MarkdownIt()
                this.blog.id = blog.id
                this.blog.title = blog.title
                this.blog.content = md.render(blog.content)
                let userinfo = this.$store.getters.getUser
                userinfo = typeof userinfo == 'string' ? JSON.parse(userinfo) : userinfo
                this.ownBlog = (blog.userId == userinfo.id)
            })
        }
    },
    methods: {

    }
}
</script>

<style scoped>
    .mblog{
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
        width: 90%;
        min-height: 712px;
        margin: 0 auto;
        padding: 20px 15px;
    }
    span{
        font-size: 20px;
        font-weight: bold;
        display: block;
        padding-bottom: 5px;
    }
    .mm{
        padding-bottom: 20px;
    }
</style>