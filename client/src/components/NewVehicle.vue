<template>
  <b-container class="bv-example-row">
    <b-row>
      <div>
          <b-form>
            <b-form-group
              id="input-group-1"
              label="Modelo:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="form.model"
                type="text"
                placeholder="Modelo"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Marca:" label-for="input-2">
              <b-form-input
                v-model="form.brand"
                type="text"
                placeholder="Marca"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-3" label="Ano:" label-for="input-3">
              <b-form-input
                v-model="form.year"
                type="text"
                placeholder="Ano"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-4" label="Placa:" label-for="input-4">
              <b-form-input
                v-model="form.licensePlate"
                type="text"
                placeholder="Placa"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-5" label="Cor:" label-for="input-5">
              <b-form-input
                v-model="form.color"
                type="text"
                placeholder="Cor"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-6" label="Chassis:" label-for="input-6">
              <b-form-input
                v-model="form.chassis"
                type="text"
                placeholder="Chassis"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-7" label="Preço:" label-for="input-7">
              <b-form-input
                v-model="form.price"
                type="number"
                placeholder="Preco"
                required
              ></b-form-input>
            </b-form-group>
            <hr>
            <button class="button is-primary is-rounded" @click="submit"
              >Registrar</button
            >
            <hr />
          </b-form>
        </div>
    </b-row>
  </b-container>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        model: "aaskdçlsd",
        brand: "asdlksdlkjlsd",
        year: "asdkjlksjdlkjsd",
        licensePlate: "asçdlkçskd",
        color: "qewweqew",
        chassis: "qwewewe",
        price: 123456,
      },
      url: "/app/vehicle",
    };
  },
  methods: {
    submit() {
      axios
        .post(this.url, this.form)
        .then((res) => {
          console.log(res.body);
          localStorage.setItem("cadastro", false)
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>