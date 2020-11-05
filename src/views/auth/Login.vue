<template>
  <div>
    <form>
      <FormItem :rules='rules' v-model="state.email"></FormItem>
      <p>{{ state.email }}</p>
      <button type="submit" class="btn btn-primary">Submit</button>
    </Form>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive } from 'vue'
import FormItem from '@/components/FormItem.vue'
import { validateEmail } from '@/utils/validation'
import RuleProps from '@/beans/ValidationRule'

export default defineComponent({
  components: { FormItem },
  setup () {
    const state = reactive({
      email: ''
    })
    const rules: RuleProps[] = [
      { type: 'required', message: 'email 地址不能为空' },
      { type: 'custom', validate: (value: string) => validateEmail.test(value), message: 'email地址格式错误' }
    ]
    return {
      rules, state
    }
  }
})
</script>
