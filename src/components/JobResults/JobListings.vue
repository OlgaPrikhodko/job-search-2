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

<script setup>
import { useRoute } from "vue-router";
import { computed, onMounted } from "vue";

import JobListing from "@/components/JobResults/JobListing.vue";

import { useJobsStore } from "@/stores/jobs";

const route = useRoute();

const currentPage = computed(() => {
  return Number.parseInt(route.query.page || 1);
});

const prevPage = computed(() => {
  const prevPage = currentPage.value - 1;
  const firstPage = 1;
  return prevPage >= firstPage ? prevPage : undefined;
});

const jobsStore = useJobsStore();

const FILTERED_JOBS = computed(() => jobsStore.FILTERED_JOBS);

const lastPage = computed(() => Math.ceil(FILTERED_JOBS.value.length / 10));

const nextPage = computed(() => {
  const nextPage = currentPage.value + 1;
  return nextPage <= lastPage.value ? nextPage : undefined;
});

const displayedJobs = computed(() => {
  const pageNumber = currentPage.value;
  const firstJobIndex = (pageNumber - 1) * 10;
  const lastJobIndex = pageNumber * 10;
  return FILTERED_JOBS.value.slice(firstJobIndex, lastJobIndex);
});

onMounted(jobsStore.FETCH_JOBS);
</script>
