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

<script>
import { mapActions, mapState } from "pinia";
import JobListing from "@/components/JobResults/JobListing.vue";

import { useJobsStore, FETCH_JOBS } from "@/stores/jobs";

export default {
  name: "JobListings",
  components: { JobListing },

  computed: {
    currentPage() {
      return Number.parseInt(this.$route.query.page || 1);
    },
    prevPage() {
      const prevPage = this.currentPage - 1;
      const firstPage = 1;
      return prevPage >= firstPage ? prevPage : undefined;
    },
    ...mapState(useJobsStore, {
      jobs: "jobs",
      lastPage() {
        return Math.ceil(this.jobs.length / 10);
      },
      nextPage() {
        const nextPage = this.currentPage + 1;
        return nextPage <= this.lastPage ? nextPage : undefined;
      },
      displayedJobs() {
        const pageNumber = this.currentPage;
        const firstJobIndex = (pageNumber - 1) * 10;
        const lastJobIndex = pageNumber * 10;
        return this.jobs.slice(firstJobIndex, lastJobIndex);
      },
    }),
  },
  async mounted() {
    this.FETCH_JOBS();
  },
  methods: {
    ...mapActions(useJobsStore, [FETCH_JOBS]),
  },
};
</script>
