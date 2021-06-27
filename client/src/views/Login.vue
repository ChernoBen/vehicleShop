<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col></b-col>
      <b-col
        ><!--center-->
        <div>
          <b-form>
            <b-form-group
              id="input-group-1"
              label="E-mail:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                placeholder="Email"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Senha:" label-for="input-2">
              <b-form-input
                v-model="form.password"
                type="password"
                id="text-password"
                aria-describedby="password-help-block"
                placeholder="Senha"
                required
              ></b-form-input>
            </b-form-group>
            <b-button pill variant="primary" @click="login">logar</b-button>
            <hr />
            <div>
              <b-button pill variant="danger" @click="register"
                >Registrar</b-button
              >
              <b-button pill variant="info" @click="recover"
                >Recuperar senha</b-button
              >
            </div>
          </b-form>
        </div>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      url: "/api/login",
      error: "Email ou senha incorretos",
      form: {
        email: "",
        password: "",
        token: "",
      },
    };
  },
  methods: {
    login() {
      axios
        .post(this.url, {
          email: this.form.email,
          password: this.form.password,
        })
        .then((response) => {
          console.log(response.data.token);
          this.form.token = response.data.token;
          localStorage.setItem("token", response.data.token);
          this.$forceUpdate();
          this.$router.push({ name: "Home" });
          this.$router.go(0);
        })
        .catch((error) => {
          console.log(error);
          alert(JSON.stringify(this.error));
        });
    },
    register() {
      this.$router.push({ name: "Register" });
    },
    recover() {
      this.$router.push({ name: "Recover" });
    },
  },
};
</script>
