<template>
  <div>
    <div class="buttons">
      <button class="button is-primary is-rounded" @click="register">+</button>
    </div>
    <div v-show="adicionar == true">
      <NewVehicle />
    </div>
    <br />
    <table class="table">
      <thead>
        <tr>
          <th><abbr title="ID">ID</abbr></th>
          <th>Modelo</th>
          <th><abbr title="Marca">Marca</abbr></th>
          <th><abbr title="Ano">Ano</abbr></th>
          <th><abbr title="Cor">Cor</abbr></th>
          <th><abbr title="Placa">Placa</abbr></th>
          <th><abbr title="Chassis">Chassis</abbr></th>
          <th><abbr title="Preço">Preço</abbr></th>
          <th>-</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th><abbr title="ID">ID</abbr></th>
          <th>Modelo</th>
          <th><abbr title="Marca">Marca</abbr></th>
          <th><abbr title="Ano">Ano</abbr></th>
          <th><abbr title="Cor">Cor</abbr></th>
          <th><abbr title="Placa">Placa</abbr></th>
          <th><abbr title="Chassis">Chassis</abbr></th>
          <th><abbr title="Preço">Preço</abbr></th>
          <th>Comprar</th>
        </tr>
      </tfoot>
      <tbody v-for="item in vehicles" :key="item._id">
        <tr>
          <th>{{ item._id }}</th>
          <td>{{ item.model }}</td>
          <td>{{ item.brand }}</td>
          <td>{{ item.year }}</td>
          <td>{{ item.brand }}</td>
          <td>{{ item.color }}</td>
          <td>{{ item.licensePlate }}</td>
          <td>{{ item.price }},00 R$</td>
          <br />
          <td class="button is-primary" @click="sellerSelect">Faturar</td>
          <br />
          <dir v-show="sellerStatus == true">
            <div>
              <b-dropdown id="dropdown-1" text="Vendedor" class="m-md-2" >
                <div v-for="seller in sellers" :key="seller._id">
                <b-dropdown-item @click="confirm(item_id,seller._id)">{{seller.name}}</b-dropdown-item>
                </div>
              </b-dropdown>
            </div>
          </dir>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";
import NewVehicle from "./NewVehicle.vue";
export default {
  components: {
    NewVehicle,
  },
  created: async function () {
    await axios
      .get(this.url)
      .then((res) => {
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
      url: "localhost:3000/vehicle",
      vehicles: [
        {
          _id: "lksjdlsj",
          model: "asldkdsk",
          brand: "kdslkjsd",
          color: "kadhkjds",
          licensePlate: "asçdsklçksd",
          price: 30000,
        },
      ],
      sellers:[
        {
          name:"Antonio"
        },
        {
          name:"Luiz"
        }
      ],
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
    confirm:function(vehicleId,sellerId){
      console.log(vehicleId,sellerId);
      alert("Gostaria de confirmar e faturar?")
      this.$router.push({ name: "Sales" });
    }
  },
};
</script>