<template>
    <div class="Record_No">
      <img src="http://localhost:5000/static/beian.png" alt="备案图片">
      <a href="http://beian.miit.gov.cn" target="_blank">备案号：蜀ICP备20014777号</a>
    </div>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style scoped>
    .Record_No{
    width: 100%;
    font-size: 13px;
    text-align: center;
    padding: 20px 0;
    background: #5d5d5d;
  }
  .Record_No img{
    width: 20px;
    height: 20px;
    position: relative;
    top: 2px;
    font-family: Microsoft YaHei;
    margin-right: 5px;
  }
  .Record_No a {
    color: #959799;
  }
  .Record_No a:hover{
    color: #ffffff;
  }
</style>