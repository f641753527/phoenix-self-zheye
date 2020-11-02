<template>
  <CustomHeader :user="userInfo"/>
  <div class="container">
    <Topic :topics='topicList'/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Topic from './components/Topic.vue'
import CustomHeader from './components/CustomHeader.vue'

export default defineComponent({
  name: 'App',
  components: {
    Topic,
    CustomHeader
  },
  setup () {
    const topicList = ref([])
    const getTopics = async () => {
      const response = await axios.get('/api/topic/list')
      const list = response.data.data
      topicList.value = list
    }
    getTopics()

    const userInfo = ref({ isLogin: false, name: '', id: 0 })
    const getUser = async () => {
      const response = await axios.get('/api/user/profile')
      userInfo.value = response.data.data
    }
    getUser()
    return {
      topicList, userInfo
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
