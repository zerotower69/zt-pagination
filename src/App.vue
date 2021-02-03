<template>
  <div id="app" class="blue-theme">
    <div>当前页数 {{ current }}</div>
    <zt-pagination
      :total="total"
      :current="current"
      @changeCurrent="changeCurrent"
      height="40px"
      width="40px"
    ></zt-pagination>
    <br/>
  </div>
</template>

<script>
// import ztPagination from './components/zt-pagination.vue';
export default {
  // components: { ztPagination },
  name: "app",
  data() {
    return {
      total: 100,
      current: 1,
    };
  },
  methods: {
    changeCurrent(val) {
      this.current = val;
    },
    changeTheme(){
      /*更换主题函数*/
      const dom=window.document.getElementById("app");
      dom.className="light-theme";
    }
  },
};
</script>

<style scoped="" lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
  .color-picker{
    display: inline-flex;
    width:200px;
    height:400px;
  }
  .picker-item{
    margin-right: 20px;
    cursor: pointer;
  }
</style>
