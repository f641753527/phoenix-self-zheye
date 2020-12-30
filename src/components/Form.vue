<template>
  <form>
    <slot></slot>
    <div class="submit--conatiner" @click.prevent="submit">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang='ts'>
import { defineComponent, onUnmounted } from 'vue'
import bus from '@/utils/eventBus'

type validateFunc = () => boolean

export default defineComponent({
  emits: {
    formsubmit: (payload: { isValide: boolean }) => {
      if (payload.isValide === undefined || typeof payload.isValide !== 'boolean') {
        return false
      }
      return true
    }
  },
  setup (props, context) {
    let validateFuncArray: validateFunc[] = []

    const submit = () => {
      const res = validateFuncArray.every(cb => cb())
      context.emit('formsubmit', { isValide: res })
    }
    const callback = (cb?: validateFunc) => {
      cb && validateFuncArray.push(cb)
    }

    bus.on('form-item-create', callback)

    onUnmounted(() => {
      bus.off('form-item-create', callback)
      validateFuncArray = []
    })

    return {
      submit
    }
  }
})
</script>
