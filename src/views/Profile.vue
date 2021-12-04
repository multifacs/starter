<template>
  <div class="content">
    <a-row>
      <a-col :span="8">
        <a-card style="width: 240px">
            <template #cover>
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            </template>
            <a-card-meta v-if="$store.state?.currentUser?.nickname" :title="$store.state?.currentUser?.nickname"/>
            <a-skeleton v-else/>
          </a-card>
        </a-col>
      <a-col :span="16" v-if="$store.state?.currentUser?.status">
        {{ $store.state.currentUser.status }}
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import store from "@/store/index";
import { defineComponent, onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";



export default defineComponent({
  name: "Profile",
  components: {},
  setup() {
    const router = useRouter();
    const route = useRoute();

    const user = ref("");

    user.value = Array.isArray(route.params.id)? route.params.id[0]: route.params.id;

    onMounted(() => store.dispatch("fetchOtherProfileInfo", route.params.id))

    watch(
      () => route.params.id,
      async (newId) => {
        const id = Array.isArray(newId)? newId[0]: newId
        try {
          if (id) {
            await store.dispatch("fetchOtherProfileInfo", id);
            user.value = store.state!.currentUser!.userId!;
          }
        }
        catch (e) {
          console.error(e)
          alert(e)
        }
      }
    );
  },
});
</script>

<style>
.content {
  margin: 50px auto;
  width: 70%;
}
</style>
