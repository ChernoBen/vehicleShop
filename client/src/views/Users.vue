<template>
  <div>
    <b-table striped hover :items="items"></b-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      request: {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      },
      items: null,
    };
  },
  created() {
    this.$forceUpdate()
    axios
      .get("http://localhost:3000/users", this.request)
      .then((response) => {
        console.log(response.data.response);
        this.items = response.data.response;
        this.$forceUpdate();
        
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>