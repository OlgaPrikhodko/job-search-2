<template>
  <div
    class="border-brand-gray-1 flex w-96 flex-col border-r border-solid bg-white p-4"
  >
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <ActionButton
            text="Clear Filters"
            type="secondary"
            @click="CLEAR_USER_JOB_FILTER_SELECTIONS"
          ></ActionButton>
        </div>
      </div>

      <CollapsibleAccordion header="Degrees">
        <JobFiltersSidebarCheckboxGroup
          header="Degrees"
          :unique-values="UNIQUE_DEGREES"
          :action="userStore.ADD_SELECTED_DEGREES"
        />
      </CollapsibleAccordion>

      <CollapsibleAccordion header="Job Types">
        <JobFiltersSidebarCheckboxGroup
          :unique-values="UNIQUE_JOB_TYPES"
          :action="userStore.ADD_SELECTED_JOB_TYPES"
        />
      </CollapsibleAccordion>

      <CollapsibleAccordion header="Organizations">
        <JobFiltersSidebarCheckboxGroup
          :unique-values="UNIQUE_ORGANIZATIONS"
          :action="userStore.ADD_SELECTED_ORGANIZATIONS"
        />
      </CollapsibleAccordion>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import ActionButton from "@/components/Shared/ActionButton.vue";
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";
import JobFiltersSidebarCheckboxGroup from "./JobFiltersSidebarCheckboxGroup.vue";

import { useDegreesStore } from "@/stores/degrees";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const jobsStore = useJobsStore();
const degreeStore = useDegreesStore();

const UNIQUE_JOB_TYPES = computed(() => jobsStore.UNIQUE_JOB_TYPES);
const UNIQUE_ORGANIZATIONS = computed(() => jobsStore.UNIQUE_ORGANIZATIONS);
const UNIQUE_DEGREES = computed(() => degreeStore.UNIQUE_DEGREES);

const CLEAR_USER_JOB_FILTER_SELECTIONS =
  userStore.CLEAR_USER_JOB_FILTER_SELECTIONS;
</script>
