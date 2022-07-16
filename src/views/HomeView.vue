<template>
  <HelloWorld />
          <v-text-field
            v-model="first"
            label="First Name"
            variant="outlined"
            shaped
          ></v-text-field>
</template>

<script>
import { defineComponent } from 'vue';

// Components
import HelloWorld from '../components/HelloWorld.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    HelloWorld,
  },
});
</script>
