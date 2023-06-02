<template>
  <div class="mt-2">
    <input
      v-model.lazy.trim="skillsSearchTerm"
      type="text"
      class="border-brand-gray-1 h-12 w-full rounded border border-solid text-base shadow-gray"
    />
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/user";
import { computed } from "vue";

const userStore = useUserStore();

const skillsSearchTerm = computed({
  get() {
    return userStore.skillsSearchTerm;
  },
  set(value) {
    userStore.UPDATE_SKILLS_SEARCH_TERM(value);
  },
});
</script>
