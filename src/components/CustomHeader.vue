<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <a class="navbar-brand" href="#">专栏</a>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item"><a href="#" @click="login" class="btn btn-outline-light my-2">登陆</a></li>
      <li class="list-inline-item"><a href="#" class="btn btn-outline-light my-2">注册</a></li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <Dropdown :title="`你好 ${user.name}`">
        <DropdownItem>新建文章</DropdownItem>
        <DropdownItem :disabled="true">profile</DropdownItem>
        <DropdownItem>logout</DropdownItem>
      </Dropdown>
    </ul>
  </nav>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'
import User from '../beans/User'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'

export default defineComponent({
  name: 'custom-header',
  components: { Dropdown, DropdownItem },
  props: {
    user: {
      type: Object as PropType<User>,
      required: true
    }
  },
  setup () {
    const router = useRouter()
    const login = () => {
      router.push('/auth')
    }
    return { login }
  }
})
</script>
