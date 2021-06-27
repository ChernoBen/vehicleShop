<template>
  <div>
    <br />
    <table class="table">
      <thead>
        <tr>
          <th><abbr title="ID">ID</abbr></th>
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
          <th><abbr title="veiculo">Veículo</abbr></th>
          <th><abbr title="vendedor">Vendedor</abbr></th>
          <th><abbr title="preco">Preço</abbr></th>
          <th><abbr title="Data">Data</abbr></th>
          <th><abbr title="Comissao">Comissão</abbr></th>
        </tr>
      </tfoot>
      <tbody v-for="item in sales" :key="item._id">
        <tr>
          <th>{{ item._id }}</th>
          <td>{{ item.vehicleId }}</td>
          <td>{{ item.seller }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.commission }}</td>
          <br>
          <td class="button is-danger" @click="cancel(item._id)">Canelar</td>
          <br/>
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
    
    await axios.get(this.urlSale)
      .then(res=>{
        this.sales = res.body;
      })
      .catch(error=>{
        console.log(error);
      }); 
  },
  data() {
    return {
      urlSale:"/app/sales",
      sales:[],
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
    cancel: function (id) {
      alert(id);
    },
    confirm:function(vehicleId,sellerId){
      console.log(vehicleId,sellerId);
    }
  },
};
</script>