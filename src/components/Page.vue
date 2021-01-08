<template>
  <div id="page">
    <p>{{ info }}</p>
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
    // 没有该页面则跳转404
    this.greet();
  },
  methods: {
    greet: function (event) {
      // `this` 在方法里指当前 Vue 实例
      // `event` 是原生 DOM 事件
      getSomeOne({pageName:this.pageName})
        .then(response =>
          {
            console.log("getSomeOne:",response.data)
            this.info = response.data
          }
        )
        .catch(function (error) { // 请求失败处理
          console.log("fcherror",error);
        });
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html, body { padding: 0px; margin: 0px; width: 100%; height: 100%; }
#page { margin: 0 auto; padding-top:45%;text-align:center;width: 100%; height: 55%;}
p{margin: 0 auto;text-align:left;font-size:300%;font-family:KaiTi;max-width:80%;color:#909399;min-height:50%}
#btn {margin:40% auto;padding: 10px;font-size:400%;}
</style>
