<template>
  <div class="topic--container">
    <div class="topic--info">
      <img :src="topic.avatar" class="topic--image rounded-circle border border-light">
      <div class="right">
        <h1 class="topic--title">{{topic.title}}</h1>
        <p class="topic--description">{{topic.description}}</p>
      </div>
    </div>
    <div class="post--list">
      <div v-for="post in posts" :key="post.id" class="post--item border">
        <h5 class="post--title">{{post.title}}</h5>
        <div class="post--info">
          <img :src="post.image" class="post--image">
          <p class="post--desc">{{post.content}}</p>
        </div>
        <p class="post--date">{{post.created}}</p>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import StoreProps from '@/beans/Store'

export default {
  setup () {
    const store = useStore<StoreProps>()
    const route = useRoute()
    const topicId = +route.params.id
    const refresh = !route.query.refresh

    const topic = computed(() => store.getters.getTopicById(topicId))

    const posts = computed(() => store.getters.getPostsByTid(topicId))

    const getPosts = async () => {
      await store.dispatch('getPosts')
    }
    refresh && getPosts()
    return { topic, posts }
  }
}
</script>

<style lang="css" scoped>
p{
  margin-bottom: 0;
}
  .topic--container{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .topic--info, .post--info{
    display: flex;
    align-items: center;
  }
  .post--image, .topic--image{
    margin-right: 30px;
  }
  .post--item{
    margin: 30px 0;
    padding: 15px;
    border-radius: 6px;
    max-width: 800px;
  }
  .post--date{
    margin-top: 20px;
  }
</style>
