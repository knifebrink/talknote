<template>
  <div id="page">
    <p class="page_show">{{ info }}</p>
    <el-button id="btn" v-on:click="greet" type="success" round>再来一句</el-button>
  </div>
</template>

<script>
import {getSomeOne, hasPageByName} from "@/api/page";
export default {
  name: 'page',
  data () {
    return {
      info: null,
      pageName:""
    }
  },
  mounted () {
    console.log("page:"+"mounted")

  },
  // mounted () {
  //   axios
  //           .get('/saying/getSomeOne')
  //           .then(response => (this.info = response.data))
  // .catch(function (error) { // 请求失败处理
  //     console.log(error);
  //   });
  // }
  created() {
    let title = "一句话";
    this.pageName = this.$route.params.pageName;
    // 没有该页面则跳转404
    hasPageByName({pageName:this.pageName}).then(
      response => {
        if(response.data==="noPage"){// 不存在页面
          this.$router.push({path: '/404'})
        }else{
          if(title)
            title = response.data;
        }
      }
    ).catch(function (error) { // 请求失败处理
        console.log(error);
      });
    document.title=title;

    this.greet();
  },
  methods: {
    greet: function (event) {
      // `this` 在方法里指当前 Vue 实例
      // `event` 是原生 DOM 事件
      getSomeOne({pageName:this.pageName})
        .then(response =>
          {
            this.info = response.data
          }
        )
        .catch(function (error) { // 请求失败处理
          console.log("fcherror",error);
        });
    },
    logHeight:function (){

      let page = document.getElementById("page");
      let baba = document.getElementById("app");
      let babaStr = ' baba:';
      if(baba){
        babaStr = baba.offsetWidth+"_"+baba.offsetHeight
      }
      console.log(baba)
      this.info ="body:" + document.body.offsetWidth
        +"_"+document.body.offsetHeight
        +" page:" + document.getElementById("page").offsetWidth
        +"_"+document.getElementById("page").offsetHeight
        +" other:"+window.getComputedStyle(document.getElementById("page"),null).paddingTop
        +"aaaa:"+babaStr

    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--我的手机  字体默认是16px 高度是1800多px -->
<!--只有加载到这个component才会渲染html等-->
<style>
html, body { padding: 0px; margin: 0px; width: 100%; height: 100%; }
#app { width: 100%; height: 100%;}
#page { margin: 0 auto; padding-top:45%;text-align:center;width: 100%; height: 55%; box-sizing: content-box}
p.page_show{margin: 0 auto;text-align:left;font-size:300%;font-family:KaiTi;max-width:80%;color:#909399;min-height:50%;}
#btn {margin:40% auto;padding: 10px;font-size:400%;}
</style>
