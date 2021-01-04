import { createStore } from 'vuex'
import axios from 'axios'
import StoreProps from '@/beans/Store'
import cacheSessionStorage from './cache'
import User from '@/beans/User'
import Topic from '@/beans/Topic'
import Post from '@/beans/Post'

export default createStore<StoreProps>({
  getters: {
    user: state => state.user,
    getTopicById: state => (id: number) => state.topics.find(v => v.id === id),
    getPostsByTid: state => (tid: number) => state.posts.filter(post => post.topicId === tid)
  },
  state: {
    user: cacheSessionStorage.get<User>('user', {
      isLogin: true,
      topicId: 1
    }),
    topics: cacheSessionStorage.get<Topic[]>('topics', []),
    posts: cacheSessionStorage.get<Post[]>('posts', [])
  },
  mutations: {
    LOGIN (state, { name, topicId }) {
      const newUser = { ...state.user, name, isLogin: true, topicId }
      state.user = newUser
      cacheSessionStorage.set<User>('user', newUser)
    },
    SET_TOPICS (state, list) {
      state.topics = list
      cacheSessionStorage.set<Topic[]>('topics', list)
    },
    SET_POSTS (state, list) {
      state.posts = list
      cacheSessionStorage.set<Post[]>('posts', list)
    },
    ADD_POST (state, newPost) {
      state.posts.push(newPost)
    }
  },
  actions: {
    login ({ commit }) {
      return axios('/api/user/login', { method: 'POST' }).then((res) => {
        const user = res.data.data
        commit('LOGIN', user)
        return true
      }).catch(() => {
        return false
      })
    },
    getTopics ({ commit }) {
      axios.get('/api/topic/list').then((res) => {
        const list = res.data.data
        commit('SET_TOPICS', list)
      })
    },
    getPosts ({ commit }) {
      return axios.get('/api/post/list').then((res) => {
        const list = res.data.data
        commit('SET_POSTS', list)
        return list
      })
    },
    addPost ({ commit }, newPost) {
      return axios.post('/api/post/add', {
        method: 'POST',
        data: newPost
      }).then((res) => {
        const post = {
          ...res.data.data,
          id: new Date().getTime(),
          title: newPost.title,
          content: newPost.content,
          created: new Date().toLocaleDateString(),
          topicId: newPost.topicId
        }
        commit('ADD_POST', post)
        return post
      })
    }
  }
})
