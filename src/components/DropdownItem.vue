<template>
  <li>
    <a class="dropdown-item" :class="{ 'disabled': disabled }" href="#">
      <slot></slot>
    </a>
  </li>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'dropdownItem',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
})
</script>
