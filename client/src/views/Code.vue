<template>
<b-container >
  <!-- Content here -->
   <div>
    <b-form inline>
      <label class="sr-only" for="inline-form-input-username"
        >Codigo de verificação</label
      >
      <b-input-group prepend="Codigo" class="mb-2 mr-sm-2 mb-sm-0">
        <b-form-input
          type="text"
          id="inline-form-input-username"
          placeholder="Codigo de verificação"
          v-model="token"
        ></b-form-input>
      </b-input-group>
      <p></p>
      <label class="sr-only" for="inline-form-input-username">Nova senha</label>
      <b-input-group prepend="Senha" class="mb-2 mr-sm-2 mb-sm-0">
        <b-form-input
          type="password"
          id="inline-form-input-username"
          placeholder="Nova senha  "
          v-model="password"
        ></b-form-input>
      </b-input-group>

      <b-button @click="recoverPass" variant="primary">Salvar</b-button>
    </b-form>
  </div>
</b-container>
 
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      url: "http://localhost:3000/changePass",
      form: {
        token: "",
        password: "",
      },
    };
  },
  methods: {
    recoverPass() {
      axios
        .post(this.url, { token: this.token,password:this.password })
        .then((response) => {
          console.log(response);
          alert(
            JSON.stringify(
              "Senha alterada com sucesso!"
            )
          );
          this.$router.push({ name: "Login" });
        })
        .catch((error) => {
          console.log(error);
          alert(JSON.stringify(error));
        });
    },
  },
};
</script>
