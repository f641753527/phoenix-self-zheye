import { Ref, ref, onMounted, onUnmounted } from 'vue'

export default function clickOutside (nodeRef: Ref<null | HTMLElement>) {
  const isClickOutside = ref(true)
  const handler = (ev: MouseEvent) => {
    if (nodeRef.value && !nodeRef.value.contains(ev.target as HTMLElement)) {
      isClickOutside.value = true
      return
    }
    isClickOutside.value = false
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
  return isClickOutside
}
