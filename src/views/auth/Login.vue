<template>
  <div>
    <Form @formsubmit="formSubmit">
      <FormItem :rules='rulesEmail' v-model="state.email" label="邮箱" placeholder="请输入邮箱"></FormItem>
      <FormItem :rules='rulesPwd' v-model="state.pwd" label="密码" type="password" placeholder="请输入密码"></FormItem>
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
import Form from '@/components/Form.vue'
import FormItem from '@/components/FormItem.vue'
import { validateEmail } from '@/utils/validation'
import RuleProps from '@/beans/ValidationRule'

export default defineComponent({
  components: { Form, FormItem },
  setup () {
    const router = useRouter()
    const store = useStore()
    const state = reactive({
      email: '',
      pwd: ''
    })
    const rulesEmail: RuleProps[] = [
      { type: 'required', message: 'email 地址不能为空' },
      { type: 'custom', validate: (value: string) => validateEmail.test(value), message: 'email地址格式错误' }
    ]
    const rulesPwd: RuleProps[] = [
      { type: 'required', message: 'password 不能为空' },
      { type: 'custom', validate: (value: string) => value.length > 5, message: '密码不少于6位' }
    ]
    const formSubmit = async (plyload: { isValide: boolean }) => {
      if (!plyload.isValide) return
      const res = await store.dispatch('login')
      if (!res) return
      router.push('/home')
    }
    return {
      rulesEmail, rulesPwd, state, formSubmit
    }
  }
})
</script>
