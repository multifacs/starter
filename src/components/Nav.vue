<template>
  <div style="border: 1px solid rgb(235, 237, 240)">
    <a-page-header
      title="VK.ru"
      sub-title="Best social network ever"
      @back="goBack"
      :ghost="false"
    >
      <template #footer>
        <a-tabs v-model:activeKey="activeKey" @tabClick="goTo">
          <a-tab-pane key="1" tab="Feed" />
          <a-tab-pane key="2" tab="Profile" />
        </a-tabs>
      </template>
      <template #extra>
        <div v-if="$store.state.authorized">
          <a-avatar>UR</a-avatar>
          <a-button @click="logout" type="link"> Logout </a-button>
        </div>
        <div v-else>
          <a-button
            type="primary"
            @click="modal1Visible = true"
            style="margin-right: 10px"
          >
            Register
          </a-button>
          <a-modal
            v-model:visible="modal1Visible"
            title="Registration"
            @ok="onSubmit"
          >
            <a-form
              ref="formRef"
              :rules="rules"
              :model="formStateReg"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
            >
              <a-form-item label="Username" name="username">
                <a-input v-model:value="formStateReg.username" />
              </a-form-item>
              <a-form-item label="Password" name="password">
                <a-input-password v-model:value="formStateReg.password" />
              </a-form-item>
            </a-form>
          </a-modal>
          <a-button @click="login"> Login </a-button>
        </div>
      </template>
    </a-page-header>
  </div>
</template>

<script lang="ts">
import { useRouter, useRoute } from "vue-router";
import store from "@/store/index";
import { defineComponent, ref, reactive, toRaw, computed, watch } from "vue";
import type { UnwrapRef } from "vue";
import type { FormProps } from "ant-design-vue";
import { FormStateReg } from "../store/models";
import { keycloak } from "@/keycloak";

interface FormStateLogin {
  user: string;
  password: string;
}

export default defineComponent({
  name: "Nav",
  setup() {
    const formRef = ref();
    const router = useRouter();
    const route = useRoute();
    const activeKey = ref("0");

    if (route.name == 'Feed') {
      activeKey.value = '1'
    } else {
      activeKey.value = '2'
    }

    const user = ref("");
    user.value = route.params.id as string; //ТРУДНО ОТЛОВИМЫЙ БАГ

    const modal1Visible = ref<boolean>(false);
    const modal2Visible = ref<boolean>(false);

    const formStateReg: UnwrapRef<FormStateReg> = reactive({
      username: "",
      password: "",
    });

    watch(
      () => route.name,
      async (name) => {
        if (name == "Feed") {
          activeKey.value = "1";
        }
        if (name == "Profile") {
          activeKey.value = "2";
        }
      }
    );

    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          console.log("submit!", formStateReg);
          store.dispatch("register", formStateReg);
          modal1Visible.value = false;
        })
        .catch((error: any) => {
          console.log("error", error);
        });
    };

    const formStateLogin: UnwrapRef<FormStateLogin> = reactive({
      user: "",
      password: "",
    });
    const handleFinish: FormProps["onFinish"] = (values) => {
      console.log(values, formStateLogin);
    };
    const handleFinishFailed: FormProps["onFinishFailed"] = (errors) => {
      console.log(errors);
    };
    const goBack = () => {
      router.push("/");
    };
    const goToFeed = () => {
      router.push("/feed");
      activeKey.value = "1";
    };
    const selfLink = computed(() =>
      store.state.userId ? `/profile/${store.state.userId}` : null
    );
    const goToProfile = () => {
      router.push(selfLink.value!);
      activeKey.value = "2";
    };
    const login = () => {
      keycloak.login();
    };
    const logout = () => {
      keycloak.logout();
    };
    const isMineProfile = computed(
      () => route.name == "Profile" && store.state.userId == route.params.id
    );
    const rules = {
      username: [
        {
          required: true,
          message: "Please input username",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "Please input password",
          trigger: "blur",
        },
      ],
    };
    const goTo = () => {
      if (activeKey.value == "1" && route.name == "Feed") {
        goToProfile();
      }
      if (activeKey.value == "2" && route.name == "Profile") {
        goToFeed();
      }
    };
    return {
      isMineProfile,
      selfLink,
      goBack,
      goToFeed,
      goToProfile,
      login,
      logout,
      modal1Visible,
      modal2Visible,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      formStateReg,
      onSubmit,
      formStateLogin,
      handleFinish,
      handleFinishFailed,
      user,
      rules,
      formRef,
      activeKey,
      goTo,
    };
  },
});
</script>

<style></style>
