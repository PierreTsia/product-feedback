<script setup lang="ts">
import type { ComputedRef } from '@vue/reactivity'
import type { ValidationFn } from '~/composables/inputValidation'
import { useInputValidation } from '~/composables/inputValidation'

const { data } = await useFetch('/api/pageview')
const name = ref('')
const email = ref('')

const { hasMinLength, hasMaxLength, isEmail } = useInputValidation()

const minNameInputRule = (arg: string) => hasMinLength(arg, 5)
</script>

<template>
  <div class="flex flex-wrap w-full p-4">
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
  </div>
</template>
