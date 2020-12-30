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

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

export default {
  setup () {
    const route = useRoute()

    const topicId = +route.params.id

    const topic = ref({})
    const getTopics = async () => {
      const { data: topicsRes } = await axios.get('/api/topic/list')
      const topicList = topicsRes.data
      topic.value = topicList.find(v => v.id === topicId)
    }

    const posts = ref([])
    const getPosts = async () => {
      const { data: postsRes } = await axios.get('/api/post/list')
      const postList = postsRes.data
      posts.value = postList.filter(v => v.topicId === topicId)
    }
    getTopics()
    getPosts()
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
