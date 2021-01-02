<template>
  <div>
    <Form @formsubmit="formSubmit">
      <FormItem :rules='rulesTitle' v-model="state.title" label="title" placeholder="请输入title"></FormItem>
      <FormItem :rules='rulesContent' v-model="state.content" label="content" placeholder="请输入content"
        inputType='textarea' rows='10'></FormItem>
      <template #submit>
        <span class="btn btn-danger">Submit</span>
      </template>
    </Form>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import StoreProps from '@/beans/Store'
import Form from '@/components/Form.vue'
import FormItem from '@/components/FormItem.vue'
import RuleProps from '@/beans/ValidationRule'

export default defineComponent({
  components: { Form, FormItem },
  setup () {
    const router = useRouter()
    const store = useStore<StoreProps>()
    const state = reactive({
      title: '',
      content: ''
    })
    const rulesTitle: RuleProps[] = [
      { type: 'required', message: 'title 地址不能为空' }
    ]
    const rulesContent: RuleProps[] = [
      { type: 'required', message: 'password 不能为空' }
    ]
    const formSubmit = async (plyload: { isValide: boolean }) => {
      if (!plyload.isValide) return
      const { topicId } = store.state.user
      await store.dispatch('addPost', {
        title: state.title,
        content: state.content,
        topicId: topicId
      })
      router.push(`/columns/${topicId}?refresh=123`)
    }
    return {
      rulesTitle, rulesContent, state, formSubmit
    }
  }
})
</script>
