<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    open: boolean
    duration?: number
  }>(),
  {
    open: false,
    duration: 250,
  }
)

const inner = ref(null)

const getContentHeight = () => {
  if (!inner.value) {
    return 10
  }
  const innerEl = inner?.value as HTMLElement
  return innerEl?.getBoundingClientRect()?.height ?? 10
}

const setHeight = (height: number | 'auto', el: HTMLElement) => {
  el.style.height = typeof height === 'number' ? `${height}px` : height
}

const onEnter = (el: HTMLElement) => {
  setHeight(getContentHeight(), el)
}

const onAfterEnter = (el: HTMLElement) => {
  setHeight('auto', el)
}

const onBeforeLeave = (el: HTMLElement) => {
  setHeight(getContentHeight(), el)
}

const wrapperStyle = computed(() => ({
  transitionDuration: `${props.duration}ms`,
}))

const onLeave = (el: HTMLElement) => {
  // prevent the transition out to break
  // eslint-disable-next-line no-unused-expressions
  el.scrollHeight
  setHeight(0, el)
}
</script>

<template>
  <transition
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @before-leave="onBeforeLeave"
    @leave="onLeave">
    <div
      v-show="open"
      ref="wrapper"
      class="expander"
      :class="{ 'overflow-hidden': !open }"
      :style="wrapperStyle">
      <div ref="inner" class="expander__inner">
        <slot />
      </div>
    </div>
  </transition>
</template>

<style scoped>
.expander {
  @apply transition-height h-0;
  transition-timing-function: ease;
}
.expander__inner {
  @apply table w-full;
}
</style>
