<template>
  <div class="home">
    <h1>{{ msg }}</h1>
    <h2>简单引导</h2>
    <p>
      1. 功能非常简单，有脑就行
    </p>
    <p>
      2. 如果不行，那就是程序有bug
    </p>
  </div>
</template>

<script>
  console.log("其实已经执行了： HelloWorld")
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  margin: 20px 30px;
}
p {
  margin: 20px 40px;
}
a {
  color: #42b983;
}
</style>
