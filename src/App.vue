<template>
  <div id="nav">
    <Nav />
  </div>

  <router-view />
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from "vue";
import Nav from "@/components/Nav.vue";
import store from "@/store/index";

export default defineComponent({
  components: {
    Nav,
  },
  setup() {
    function startPooling() {
      return setInterval(() => store.dispatch("updatePostsAction"), 5000);
    }

    const interval = startPooling();

    onUnmounted(() => {
      clearInterval(interval)
    })

    return {
      
    }
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
