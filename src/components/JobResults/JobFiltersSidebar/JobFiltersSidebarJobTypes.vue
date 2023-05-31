<template>
  <JobFiltersSidebarCheckboxGroup
    :unique-values="UNIQUE_JOB_TYPES"
    :action="userStore.ADD_SELECTED_JOB_TYPES"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

import JobFiltersSidebarCheckboxGroup from "./JobFiltersSidebarCheckboxGroup.vue";

import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const jobsStore = useJobsStore();

const UNIQUE_JOB_TYPES = computed(() => jobsStore.UNIQUE_JOB_TYPES);
</script>
