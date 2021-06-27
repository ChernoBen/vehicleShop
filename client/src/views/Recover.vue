<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col></b-col>
      <b-col
        ><!--center-->
        <div>
          <div>
            <b-form-group
              id="fieldset-horizontal"
              label-cols-sm="4"
              label-cols-lg="3"
              content-cols-sm
              content-cols-lg="7"
              description="Seu e-mail aqui."
              
              label-for="input-horizontal"
            >
              <b-form-input
                v-model="email"
                id="input-horizontal"
              ></b-form-input>
            </b-form-group>
          </div>
          <div>
            <b-button variant="outline-primary" @click="recoverPass"
              >Enviar</b-button
            >
          </div>
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
      url: "http://localhost:3000/recover",
      email: "",
    };
  },
  methods: {
    recoverPass() {
      axios
        .post(this.url, { email: this.email })
        .then((response) => {
          console.log(response);
          alert(
            JSON.stringify(
              `Um codigo de recuperação foi enviado para o email:${this.email}`
            )
          );
          this.$router.push({ name: "Code" });
        })
        .catch((error) => {
          console.log(error);
          alert(JSON.stringify("Insira um email válido"));
        });
    },
  },
};
</script>
