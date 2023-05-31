<template>
  <JobFiltersSidebarCheckboxGroup
    :unique-values="UNIQUE_ORGANIZATIONS"
    :action="userStore.ADD_SELECTED_ORGANIZATIONS"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

import JobFiltersSidebarCheckboxGroup from "./JobFiltersSidebarCheckboxGroup.vue";

import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const jobsStore = useJobsStore();

const UNIQUE_ORGANIZATIONS = computed(() => jobsStore.UNIQUE_ORGANIZATIONS);
</script>
