<template>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
    <input
      type="text" class="form-control" :class="{ 'is-invalid': emailRef.hasError }" id="exampleInputEmail1"
      :value="emailRef.value"
      @blur="validtor"
      @input="feildInput"
    >
    <div class="form-text invalid-feedback" v-if="emailRef.hasError">{{emailRef.errMsg}}</div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, reactive } from 'vue'
import RuleProps from '@/beans/ValidationRule'

const FormItem = defineComponent({
  props: {
    rules: {
      type: Array as PropType<RuleProps[]>
    },
    modelValue: String
  },
  setup (props, context) {
    const emailRef = reactive({
      value: '',
      hasError: false,
      errMsg: ''
    })

    const validtor = () => {
      if (!props.rules) return
      const allPassed = props.rules.every(v => {
        emailRef.errMsg = v.message
        let passed = true
        switch (v.type) {
          case 'required' :
            passed = emailRef.value !== ''
            break
          case 'custom' :
            if (v.validate) {
              passed = v.validate(emailRef.value)
            }
            break
          default :
            break
        }
        return passed
      })
      emailRef.hasError = !allPassed
    }

    const feildInput = (ev: KeyboardEvent) => {
      const inputValue = (ev.target as HTMLInputElement).value
      emailRef.value = inputValue
      context.emit('update:modelValue', inputValue)
    }

    return {
      emailRef, validtor, feildInput
    }
  }
})

export default FormItem
</script>
