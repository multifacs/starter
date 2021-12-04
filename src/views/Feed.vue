<template>
  <div class="content">
    <a-row type="flex" justify="center" v-if="$store.state.authorized">
      <a-button type="primary" shape="circle" size="large" @click="showModal">
        <template #icon>
          <PlusOutlined />
        </template>
      </a-button>
      <a-modal
        v-model:visible="visible"
        title="Add a new post"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
      >
        <a-form
          ref="formRef"
          :model="formState"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          :rules="rules"
        >
          <a-form-item label="Title" name="title">
            <a-input v-model:value="formState.title" />
          </a-form-item>
          <a-form-item label="Text" name="text">
            <a-textarea v-model:value="formState.text" :rows="3" />
          </a-form-item>
          <a-form-item label="Image" name="image">
            <a-input v-model:value="formState.image" />
          </a-form-item>
        </a-form>
      </a-modal>
    </a-row>
    <a-list item-layout="horizontal" :data-source="$store.state.posts">
      <template #renderItem="{ item }">
        <a-list-item>
          <Post :post="item" v-bind:key="item.id" />
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script lang="ts">
import store from "@/store/index";
import { PlusOutlined } from "@ant-design/icons-vue";
import { defineComponent, ref, toRaw, reactive, UnwrapRef } from "vue";
import Post from "@/components/Post.vue";

interface FormStatePost {
  title: string;
  text: string;
  image: string;
}

export default defineComponent({
  components: {
    Post,
    PlusOutlined,
  },
  setup() {
    const formRef = ref();
    const modalText = ref<string>("Content of the modal");
    const visible = ref<boolean>(false);
    const confirmLoading = ref<boolean>(false);

    const showModal = () => {
      visible.value = true;
    };
    const onSubmit = () => {
      store.dispatch("post", formState);
    };
    const handleOk = () => {
      formRef.value
        .validate()
        .then(() => {
          confirmLoading.value = true;
          setTimeout(() => {
            visible.value = false;
            confirmLoading.value = false;
            onSubmit();
          }, 1000);
          console.log("values", formState, toRaw(formState));
        })
        .catch((error: any) => {
          console.log("error", error);
        });
    };
    const formState: UnwrapRef<FormStatePost> = reactive({
      title: "",
      text: "",
      image: "",
    });

    const rules = {
      title: [
        {
          required: true,
          message: "Please input title",
          trigger: "blur",
        },
        {
          min: 3,
          max: 20,
          message: "Length should be 3 to 20",
          trigger: "blur",
        },
      ],
      text: [
        {
          required: true,
          message: "Please input text",
          trigger: "blur",
        },
        { min: 3, message: "Length should be 3 and up", trigger: "blur" },
      ],
      image: [
        {
          required: false,
          message: "Please input url",
          trigger: "blur",
        },
      ],
    };

    return {
      formRef,
      modalText,
      visible,
      confirmLoading,
      showModal,
      handleOk,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      formState,
      onSubmit,
      rules,
    };
  },
});
</script>

<style scoped>
ul {
  list-style: none;
}
</style>
