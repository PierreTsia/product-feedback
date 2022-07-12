<script setup lang="ts">
import { useInputValidation } from '~/composables/inputValidation'

const { data } = await useFetch('/api/pageview')
const name = ref('')
const email = ref('')

const categories = ['Feature', 'Ui', 'Ux', 'Enhancement', 'Bug'].map(
  (name, i) => ({ id: i, name }),
)

const selectedCategory = ref(categories[0])
const setSelectedCategory = (
  category: { id: number; name: string },
  toggleDropDown: () => void,
) => {
  selectedCategory.value = category
  toggleDropDown()
}

const { hasMinLength, hasMaxLength, isEmail } = useInputValidation()

const minNameInputRule = (arg: string) => hasMinLength(arg, 5)
</script>

<template>
  <div class="flex flex-wrap w-full p-4 bg-white">
    <div class="w-10/10 inline-flex justify-center my-2">
      <button class="btn btn-primary mr-2">
        Primary
      </button>

      <button class="btn btn-secondary mr-2">
        Secondary
      </button>
      <button class="btn btn-accent mr-2">
        Accent
      </button>

      <button class="btn btn-danger mr-2">
        Danger
      </button>
    </div>
    <div class="w-10/10 inline-flex justify-center my-2">
      <button class="tag mr-2">
        Ux
      </button>
      <button class="tag tag-active mr-2">
        Active
      </button>
    </div>

    <div class="w-10/10 inline-flex justify-center my-2">
      <div class="w-3/10 mx-auto flex gap-2">
        <div class="w-1/2">
          <TextInput
            class="w-1/3"
            :model-value="name"
            :rules="[minNameInputRule, hasMaxLength]"
            placeholder="Min / max length"
            @update:model-value="(v) => (name = v)"
          />
        </div>
        <div class="w-1/2">
          <TextInput
            :model-value="email"
            :rules="[isEmail]"
            placeholder="email"
            @update:model-value="(v) => (email = v)"
          />
        </div>
      </div>
    </div>
    <div class="w-10/10 inline-flex justify-center my-2 mt-14">
      <DropDown>
        <template #activator="{ activatorProps }">
          <div
            class="w-250px inline-flex items-center justify-between appearance-none bg-ghost-white rounded py-2 px-3 text-east-bay-blue text-sm mb-3 leading-tight focus:outline-none focus:shadow-outline mr-2 w-full"
            :class="{ 'border border-royal-blue': activatorProps.isVisible }"
          >
            <span>{{ selectedCategory.name }}</span>
            <img
              class="w-3 inline-block"
              src="/assets/shared/icon-arrow-down.svg"
              alt="icon arrow down"
            >
          </div>
        </template>

        <template #content="{ content }">
          <div class="flex flex-col w-255px rounded-lg shadow-xl bg-white">
            <ul class="flex flex-col w-full text-dark-blue-gray text-16px">
              <li
                v-for="category in categories"
                :key="category.id"
                class="inline-flex items-center justify-between hover:text-russian-violet w-full px-2 py-3 cursor-pointer text-left border-b-0.5 border-gray-200 last:border-b-none"
                @click="setSelectedCategory(category, content.toggle)"
              >
                <span>{{ category.name }}</span>
                <img
                  v-show="selectedCategory.id === category.id"
                  class="w-3 inline-block"
                  src="/assets/shared/icon-check.svg"
                  alt="icon arrow down"
                >
              </li>
            </ul>
          </div>
        </template>
      </DropDown>
    </div>
  </div>
</template>
