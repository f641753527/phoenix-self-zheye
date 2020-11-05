<template>
  <Topic :topics='topicList'/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import axios from 'axios'
import Topic from '../components/Topic.vue'

export default defineComponent({
  name: 'App',
  components: {
    Topic
  },
  setup () {
    const topicList = ref([])
    const getTopics = async () => {
      const response = await axios.get('/api/topic/list')
      const list = response.data.data
      topicList.value = list
    }
    getTopics()
    return {
      topicList
    }
  }
})
</script>

<style>
</style>
