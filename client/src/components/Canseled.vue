<template>
  <div>
    <br />
    <table class="table">
      <thead>
        <tr>
          <th><abbr title="ID">ID</abbr></th>
          <th><abbr title="ID-Venda">ID-Venda</abbr></th>
          <th><abbr title="veiculo">Veículo</abbr></th>
          <th><abbr title="vendedor">Vendedor</abbr></th>
          <th><abbr title="preco">Preço</abbr></th>
          <th><abbr title="Data">Data</abbr></th>
          <th><abbr title="Comissao">Comissão</abbr></th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th><abbr title="ID">ID</abbr></th>
          <th><abbr title="ID-Venda">ID-Venda</abbr></th>
          <th><abbr title="veiculo">Veículo</abbr></th>
          <th><abbr title="vendedor">Vendedor</abbr></th>
          <th><abbr title="preco">Preço</abbr></th>
          <th><abbr title="Data">Data</abbr></th>
          <th><abbr title="Comissao">Comissão</abbr></th>
        </tr>
      </tfoot>
      <tbody v-for="item in caceled" :key="item._id">
        <tr>
          <th>{{ item._id }}</th>
          <th>{{ item.saleId }}</th>
          <td>{{ item.vehicleId }}</td>
          <td>{{ item.seller }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.commission }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";
//import NewVehicle from "./NewVehicle.vue";
export default {
  components: {
    //NewVehicle,
  },
  created: async function () {
    await axios
      .get(this.url)
      .then((res) => {
        this.canceled = res.body;
        console.log(res.body);
        this.vehicles = res.body;
        localStorage.setItem("cadastro", this.adicionar);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data() {
    return {
      url: "/api/caceled",
      canceled:[],
      adicionar: false,
      sellerStatus: false,
    };
  },
  methods: {
    register: function () {
      if (this.adicionar == false) {
        this.adicionar = true;
      } else {
        this.adicionar = false;
      }
    },
    sellerSelect: function () {
      if (this.sellerStatus == false) {
        this.sellerStatus = true;
      } else {
        this.sellerStatus = false;
      }
    },
    confirm: function (vehicleId, sellerId) {
      console.log(vehicleId, sellerId);
    },
  },
};
</script>