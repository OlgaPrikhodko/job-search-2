<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <JobListing v-for="job in displayedJobs" :key="job.id" :job="job" />
    </ol>

    <div class="mx-auto mt-8">
      <div class="flex flex-row flex-nowrap">
        <p class="flex-grow text-sm">Page {{ currentPage }}</p>

        <div class="flex items-center justify-center">
          <router-link
            v-if="prevPage"
            role="link"
            :to="{ name: 'JobResults', query: { page: prevPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
          >
            Previous
          </router-link>
        </div>
        <router-link
          v-if="nextPage"
          role="link"
          :to="{ name: 'JobResults', query: { page: nextPage } }"
          class="mx-3 text-sm font-semibold text-brand-blue-1"
        >
          Next
        </router-link>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { computed, onMounted } from "vue";

import JobListing from "@/components/JobResults/JobListing.vue";

import { useJobsStore } from "@/stores/jobs";
import usePrevAndNextPages from "@/composables/usePrevAndNextPages";

const route = useRoute();

const currentPage = computed(() => {
  return Number.parseInt((route.query.page as string) || "1");
});

const jobsStore = useJobsStore();
onMounted(jobsStore.FETCH_JOBS);

const FILTERED_JOBS = computed(() => jobsStore.FILTERED_JOBS);
const maxPage = computed(() => Math.ceil(FILTERED_JOBS.value.length / 10));

const { prevPage, nextPage } = usePrevAndNextPages(currentPage, maxPage);

const displayedJobs = computed(() => {
  const pageNumber = currentPage.value;
  const firstJobIndex = (pageNumber - 1) * 10;
  const lastJobIndex = pageNumber * 10;
  return FILTERED_JOBS.value.slice(firstJobIndex, lastJobIndex);
});
</script>
