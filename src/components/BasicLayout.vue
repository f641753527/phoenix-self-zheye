<template>
  <CustomHeader :user="userInfo"/>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import axios from 'axios'
import CustomHeader from '../components/CustomHeader.vue'

export default defineComponent({
  components: {
    CustomHeader
  },
  setup () {
    const userInfo = ref({ isLogin: false, name: '', id: 0 })
    const getUser = async () => {
      const response = await axios.get('/api/user/profile')
      userInfo.value = response.data.data
    }
    getUser()
    return {
      userInfo
    }
  }
})
</script>

<style>

</style>
