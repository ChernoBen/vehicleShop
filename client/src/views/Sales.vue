<template>
  <div>
      <h1>Vendas</h1>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
        <div>
          <b-card no-body class="overflow-hidden">
            <b-row no-gutters>
              <b-col md="6">
                <!---content --->
                <div class="column is-half is-offset-one-quarter">
                  <div>
                    <SalesList />
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-card>
        </div>
      </b-col>
    </b-row>
  </b-container>
  <br><hr>
  <h1>Canceladas</h1>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
        <div>
          <b-card no-body class="overflow-hidden">
            <b-row no-gutters>
              <b-col md="6">
                <!---content --->
                <div class="column is-half is-offset-one-quarter">
                  <div>
                    <Canceled />
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-card>
        </div>
      </b-col>
    </b-row>
  </b-container>
  </div>  
</template>
<script>
import SalesList from "../components/SalesList.vue";
import Canceled from "../components/Canseled.vue";
export default {
  components: {
    SalesList,
    Canceled
  },
};
</script>