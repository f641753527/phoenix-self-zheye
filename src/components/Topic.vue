<template>
  <div class="row">
    <div v-for="(item, i) in topics" :key="i" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img :src="computeAvatar(item.avatar)" class="rounded-circle border border-light w-25 my-3">
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text text-left">{{ item.description }}</p>
          <a href="#" class="btn btn-outline-primary">进入专栏</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import Topic from '../beans/Topic'

export default defineComponent({
  props: {
    topics: {
      type: Array as PropType<Topic[]>,
      required: true
    }
  },
  setup () {
    const computeAvatar = (avatar: string) => !avatar ? require('@/assets/column.jpg') : avatar
    return {
      computeAvatar
    }
  }
})
</script>
