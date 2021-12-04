<template>
    <a-card :title="post.title" class="card">
        <p class="created">{{ created }}</p>
        <p class="text">{{ post.text }}</p>
        <img v-if="post.image" class='post-image'
            :alt="post.title"
            :src="post.image"
            />
        <p>
            <router-link class="author" :to="authorLink">{{ post.author.name }}</router-link>
        </p>
    </a-card>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, ref } from 'vue'
import { PostDto } from '../api'
import moment from 'moment';

export default defineComponent({
    name: 'Post',
    props: {
        post: {
            type: Object as PropType<PostDto>,
            required: true,
        }
    },
    setup(props) {
        const created = computed(() => {
            return moment(props.post.created).format('dddd, MMMM Do YYYY, HH:mm:ss')
        })
        const authorLink = ref(`/profile/${props.post.author.id}`)
        return { 
            created,
            authorLink
        }
    }
})
</script>

<style scoped>

.post-image {
    max-width: 400px;
    height: auto;
}

p {
    font-weight: 400;
    font-family: 'Roboto';
}

.card {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

.text {
    font-size: 13px;
    line-height: 19px;
    color: rgb(0,0,0);
}

.created {
    color: rgb(129,140,153);
    font-size: 12.5px;
    line-height: 14px;
}

.author {
    color: rgb(42, 88, 133);
    font-size: 12.5px;
    font-weight: 500;
    line-height: 17px;
}


</style>
