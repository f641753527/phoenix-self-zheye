<template>
  <div class="mb-3">
    <label :for="label" class="form-label">{{ label }}</label>
    <input
      type="text" class="form-control" :class="{ 'is-invalid': emailRef.hasError }" :id="label"
      :value="emailRef.value"
      @blur="validtor"
      @input="feildInput"
      v-bind="$attrs"
    >
    <div class="form-text invalid-feedback" v-if="emailRef.hasError">{{emailRef.errMsg}}</div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, PropType, reactive } from 'vue'
import RuleProps from '@/beans/ValidationRule'
import bus from '@/utils/eventBus'

const FormItem = defineComponent({
  inheritAttrs: false,
  props: {
    label: {
      type: String
    },
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
      if (!props.rules) return true
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
      return allPassed
    }

    const feildInput = (ev: KeyboardEvent) => {
      const inputValue = (ev.target as HTMLInputElement).value
      emailRef.value = inputValue
      context.emit('update:modelValue', inputValue)
    }

    onMounted(() => {
      bus.emit('form-item-create', validtor)
    })
    return {
      emailRef, validtor, feildInput
    }
  }
})

export default FormItem
</script>
