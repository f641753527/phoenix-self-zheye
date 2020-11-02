<template>
  <div class="dropdown" ref="dropdownRef">
    <li class="list-inline-item"><a href="#" class="btn btn-outline-light my-2" @click.prevent="toggleDropDown">{{ title }}</a></li>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton" :style="{ display: 'block' }" v-if="dropDownOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, watch } from 'vue'
import clickOutside from '../hooks/clickOutside'

export default defineComponent({
  name: 'Dropdown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    const dropDownOpen = ref(false)
    const dropdownRef = ref<null | HTMLElement>(null)
    const isClickOutside = clickOutside(dropdownRef)
    const toggleDropDown = () => {
      dropDownOpen.value = !dropDownOpen.value
    }
    watch(isClickOutside, () => {
      if (isClickOutside.value) dropDownOpen.value = false
    })
    return {
      dropDownOpen, toggleDropDown, dropdownRef
    }
  }
})
</script>
