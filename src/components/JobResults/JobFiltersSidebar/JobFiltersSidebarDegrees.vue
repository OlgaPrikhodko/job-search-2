<template>
  <JobFiltersSidebarCheckboxGroup
    :unique-values="UNIQUE_DEGREES"
    :action="userStore.ADD_SELECTED_DEGREES"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

import JobFiltersSidebarCheckboxGroup from "./JobFiltersSidebarCheckboxGroup.vue";

import { useDegreesStore } from "@/stores/degrees";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const degreeStore = useDegreesStore();

const UNIQUE_DEGREES = computed(() => degreeStore.UNIQUE_DEGREES);
</script>
