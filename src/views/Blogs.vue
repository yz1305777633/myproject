<template>
    <div class="mcontaner">
        <el-container>
            <el-header height>
                <Header></Header>
            </el-header>
            <el-main>
                <div class="block">
                    <el-timeline v-for="item in blogs" :style="{width: fullWidth < 700?'100%':'60%'}" :key="item.id">
                        <el-timeline-item color="#fff" :timestamp="item.created" placement="top">
                            <el-card>
                                <h4>
                                    <router-link  :to="{name: 'BlogDetail',params: {blogId: item._id}}">
                                        {{ item.title }}
                                    </router-link>
                                </h4>
                                <el-divider></el-divider>
                                <p>{{ item.description }}</p>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>
                </div>
                <!-- 分页 -->
                <el-pagination class="mpage"
                    :current-page="currentPage" 
                    :page-size="pageSize" 
                    :pager-count="5"
                    hide-on-single-page
                    @current-change="page" 
                    background 
                    layout="prev, pager, next" 
                    :total="total">
                </el-pagination>
            </el-main>
            <el-footer>
                <Footer></Footer>     
            </el-footer>
        </el-container>
    </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
export default {
    name: 'Blogs',
    components: { Header,Footer },
    data() {
        return {
            blogs: {},
            fullWidth: document.documentElement.clientWidth,
            currentPage: 1,
            total: 0,
            pageSize:5
        }
    },
    created () {
        this.page(1)
    },
    mounted(){
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
        async page(currentPage) {
            let resData = await this.$axios({
                url:`/api/blogs?currentPage=${currentPage}`,
                method: 'get'
            })
            this.blogs = resData.data.records
            this.currentPage = resData.data.current
            this.total = resData.data.total
            this.pageSize = resData.data.size
        }
    }
}
</script>

<style scoped>
    .mcontaner{
        width: 100%;
        height: 100vh;
    }
    .el-container{
        background: url(../assets/b2.jpg) no-repeat;
        background-size: cover;
        height: 100%;
    }
    .el-header,.el-footer{
        padding: 0;
    }
    .mpage{
        margin: 0 auto;
        text-align: center;
    }
    .el-pagination{
        padding-bottom: 15px;
    }
    .el-timeline{
        margin: 0 auto;
        padding: 20px 0;
    }
    .beijing{
        position: fixed;
        z-index: -1;
        width: 100%;
        height: 100%;
    }
    .el-timeline-item /deep/ .el-timeline-item__timestamp{
        color: white;
    }
    .block h4{
        font-size: 16px;
        text-align: center;
    }
    .block h4 a{
        color: #718093;
        font-weight: 600;
        text-decoration: none;
    }
    .block h4 a:hover{
        color: #0097e6;
        text-decoration: underline;
    }
</style>