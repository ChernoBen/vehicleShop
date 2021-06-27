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
              label="Nome:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="form.name"
                type="text"
                placeholder="Insira um nome"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-1"
              label="Endereço de E-mail:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                placeholder="Insira um email"
                required
              ></b-form-input>
            </b-form-group>
            <label for="text-password">Senha:</label>
            <b-form-input
              v-model="form.password"
              type="password"
              id="text-password"
              aria-describedby="password-help-block"
            ></b-form-input>
            <b-form-text id="password-help-block">
              A senha deve possuir mais que 6 caracteres.
            </b-form-text>
            <b-button variant="primary" @click="register">Cadastrar</b-button>
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
      url: "/api/user",
      form: {
        name:"",
        email: "",
        password: ""
      },
      error: null,
    };
  },
  methods: {
    register() {
      axios
        .post(this.url, {
          name:this.form.name,
          email: this.form.email,
          password: this.form.password,
        })
        .then((response) => {
          console.log(response);
          this.$router.push({ name: "Login" });
        })
        .catch((error) => {
          let msgErro = error.response.data.message;
          this.error = msgErro;
          alert(JSON.stringify(this.error));
        });
    }
  },
};
</script>
