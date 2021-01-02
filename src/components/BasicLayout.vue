<template>
  <CustomHeader :user="userInfo"/>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import StoreProps from '@/beans/Store'
import CustomHeader from '../components/CustomHeader.vue'

export default defineComponent({
  components: {
    CustomHeader
  },
  setup () {
    const store = useStore<StoreProps>()
    const userInfo = computed(() => store.getters.user)
    return {
      userInfo
    }
  }
})
</script>

<style>

</style>
