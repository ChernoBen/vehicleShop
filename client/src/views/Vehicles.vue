<template>
<div>
  <br>
  <h1>Estoque</h1>
  <hr>
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
                    <VehiclesList />
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
import VehiclesList from "../components/VehicleList.vue";
export default {
  components: {
    VehiclesList,
  },
};
</script>


