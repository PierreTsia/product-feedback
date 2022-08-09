<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useFeedbackStore } from '~/store/feedback.store'

const feedbackStore = useFeedbackStore()
const { feedbacks } = storeToRefs(feedbackStore)

const categories = [
  'Most Upvotes',
  'Least Upvotes',
  'Most Comments',
  'Least Comments',
].map((name, i) => ({ id: i, name }))

const selectedCategory = ref(categories[0])
const setSelectedCategory = (
  category: { id: number; name: string },
  toggleDropDown: () => void
) => {
  selectedCategory.value = category
  toggleDropDown()
}
</script>

<template>
  <aside
    class="w-full bg-yankee-blue py-4 px-6 rounded-lg text-white flex justify-start items-baseline">
    <img
      class="hidden md:inline-block w-6 h-6 mr-2"
      src="/assets/suggestions/icon-suggestions.svg"
      alt="icon suggestions" />

    <span class="text-xl font-bold mr-8">{{ feedbacks.length }} Suggestions</span>

    <span class="ml-4"> Sort By:</span>

    <DropDown>
      <template #activator="{ activatorProps }">
        <div
          class="w-200px center-between appearance-none rounded py-3 px-3 leading-tight focus:outline-none focus:shadow-outline mr-2 w-full text-white"
          :class="{ 'border border-royal-blue': activatorProps.isVisible }">
          <span class="font-bold">{{ selectedCategory.name }}</span>
          <img
            class="w-3 inline-block ml-2"
            src="/assets/shared/icon-arrow-down.svg"
            alt="icon arrow down" />
        </div>
      </template>

      <template #content="{ content }">
        <div class="flex flex-col w-255px rounded-lg shadow-xl bg-white">
          <ul class="flex flex-col w-full text-dark-blue-gray text-16px">
            <li
              v-for="category in categories"
              :key="category.id"
              class="inline-flex items-center justify-between hover:text-russian-violet w-full px-2 py-3 cursor-pointer text-left border-b-0.5 border-gray-200 last:border-b-none"
              @click="setSelectedCategory(category, content.toggle)">
              <span>{{ category.name }}</span>
              <img
                v-show="selectedCategory.id === category.id"
                class="w-3 inline-block"
                src="/assets/shared/icon-check.svg"
                alt="icon arrow down" />
            </li>
          </ul>
        </div>
      </template>
    </DropDown>

    <button
      class="btn btn-primary ml-auto"
      @click="$router.push('/create-feedback')">
      <img
        class="w-3 h-3 inline-block"
        src="/assets/shared/icon-plus.svg"
        alt="icon suggestions" />
      Add Feedback
    </button>
  </aside>
</template>
