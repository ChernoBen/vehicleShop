<template>
  <div id="app">
    <!------NAVBAR---->
    <b-navbar toggleable type="dark" variant="dark">
      <b-navbar-brand href="#">
        <router-link to="/">Home</router-link>
      </b-navbar-brand>
      <div>
        <div v-if="show == false">
          <b-navbar-brand href="#">
            <router-link to="/login">Login</router-link>
          </b-navbar-brand>
          <b-navbar-brand href="#">
            <router-link to="/register">Cadastrar</router-link>
          </b-navbar-brand>
          <b-navbar-brand href="#">
            <router-link to="/vehicles">Vehicles</router-link>
          </b-navbar-brand>
          <b-navbar-brand href="#">
            <router-link to="/sales">Vendas</router-link>
          </b-navbar-brand>
        </div>
        <div v-else>
          <b-navbar-brand>
            <b-button pill variant="danger" @click="logout"> Sair </b-button>
          </b-navbar-brand>
        </div>
      </div>
    </b-navbar>
    <p></p>
    <router-view />
  </div>
</template>
<script>
export default {
  created() {
    this.show = localStorage.token ? true : false;
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    logout() {
      console.log("----->", this.show);
      console.log(localStorage.getItem("token"));
      localStorage.removeItem("token");
      this.show = true;
      this.$router.go(0);
      this.$router.push({ name: "Login" });
      // this.$forceUpdate()
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
