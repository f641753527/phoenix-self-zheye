<template>
  <button @click="newPost" type="submit" class="btn btn-primary">新建文章</button>
  <Topic :topics='topicList'/>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import StoreProps from '@/beans/Store'
import Topic from '../components/Topic.vue'

export default defineComponent({
  name: 'App',
  components: {
    Topic
  },
  setup () {
    const router = useRouter()
    const store = useStore<StoreProps>()
    const topicList = computed(() => store.state.topics)

    const getTopics = async () => {
      await store.dispatch('getTopics')
    }
    getTopics()

    const newPost = () => {
      router.push('/create-post')
    }
    return {
      topicList, newPost
    }
  }
})
</script>

<style>
</style>
