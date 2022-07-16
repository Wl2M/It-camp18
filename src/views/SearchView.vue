<template>
  <div class="search">
    <v-text-field v-model="input"></v-text-field>
    <div>
      <v-card v-for="name in filteredList" :key="name.name" class="card">
        <p>name : {{ name.name }}</p>
        <p>home : {{ name.home }}</p>
      </v-card>
      <v-card class="item error" v-if="input && !filteredList.length">
        <p>No results found!</p>
      </v-card>
    </div>
  </div>
</template>

<script>
import { firestore } from "../config/firebase";

export default {
  data() {
    return {
      names: [],
      input: "",
    };
  },
  firestore: {
    names: firestore.collection("Name"),
  },
  computed: {
    filteredList() {
      return this.names.filter((name) => {
        return name.name.toLowerCase().includes(this.input.toLowerCase());
      });
    },
  },
};
</script>

<style scoped>
.search {
  margin: 30px;
}
.card {
  margin-top: 15px;
  padding: 15px;
  font-size: 20px;
}
</style>
