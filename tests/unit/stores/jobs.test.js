import { createPinia, setActivePinia } from "pinia";

import axios from "axios";

import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

vi.mock("axios");

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("stores job listings", () => {
    const store = useJobsStore();
    expect(store.jobs).toEqual([]);
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("FETCH_JOBS", () => {
    it("makes API request and stores received jobs", async () => {
      axios.get.mockResolvedValue({ data: ["Job 1", "Job 2"] });
      const store = useJobsStore();
      await store.FETCH_JOBS();
      expect(store.jobs).toEqual(["Job 1", "Job 2"]);
    });
  });

  describe("getters", () => {
    beforeEach(() => {
      setActivePinia(createPinia());
    });

    describe("UNIQUE_ORGANIZATIONS", () => {
      it("finds unique organizations", () => {
        const store = useJobsStore();
        store.jobs = [
          { organization: "Google" },
          { organization: "Amazon" },
          { organization: "Google" },
        ];

        const result = store.UNIQUE_ORGANIZATIONS;

        expect(result).toEqual(new Set(["Google", "Amazon"]));
      });
    });

    describe("UNIQUE_JOB_TYPES", () => {
      it("finds unique job types", () => {
        const store = useJobsStore();
        store.jobs = [
          { jobType: "Full-time" },
          { jobType: "Part-time" },
          { jobType: "Full-time" },
        ];
        const result = store.UNIQUE_JOB_TYPES;

        expect(result).toEqual(new Set(["Full-time", "Part-time"]));
      });
    });

    describe("FILTERED_JOBS_BY_ORGANIZATIONS", () => {
      it("identifies jobs that are associated with the given organizations", () => {
        const userStore = useUserStore();
        userStore.selectedOrganizations = ["Google", "Amazon"];

        const jobStore = useJobsStore();
        jobStore.jobs = [
          { id: 1, organization: "Google" },
          { id: 2, organization: "Amazon" },
          { id: 3, organization: "Google" },
          { id: 4, organization: "Microsoft" },
        ];

        expect(jobStore.FILTERED_JOBS_BY_ORGANIZATIONS).toEqual([
          { id: 1, organization: "Google" },
          { id: 2, organization: "Amazon" },
          { id: 3, organization: "Google" },
        ]);
      });

      describe("when the user has not selected any organizations", () => {
        it("returns all jobs", () => {
          const userStore = useUserStore();
          userStore.selectedOrganizations = [];

          const jobStore = useJobsStore();
          jobStore.jobs = [
            { id: 1, organization: "Google" },
            { id: 2, organization: "Amazon" },
            { id: 4, organization: "Microsoft" },
          ];

          expect(jobStore.FILTERED_JOBS_BY_ORGANIZATIONS).toEqual([
            { id: 1, organization: "Google" },
            { id: 2, organization: "Amazon" },
            { id: 4, organization: "Microsoft" },
          ]);
        });
      });
    });

    describe("FILTERED_JOBS_BY_JOB_TYPES", () => {
      it("identifies jobs that are associated with the given job types", () => {
        const userStore = useUserStore();
        userStore.selectedJobTypes = ["Full-time", "Part-time"];

        const jobStore = useJobsStore();
        jobStore.jobs = [
          { jobType: "Part-time" },
          { jobType: "Temporary" },
          { jobType: "Part-time" },
          { jobType: "Full-time" },
        ];

        expect(jobStore.FILTERED_JOBS_BY_JOB_TYPES).toEqual([
          { jobType: "Part-time" },
          { jobType: "Part-time" },
          { jobType: "Full-time" },
        ]);
      });
    });

    describe("when the user has not selected any job types", () => {
      it("returns all jobs", () => {
        const jobStore = useJobsStore();
        jobStore.jobs = [
          { jobType: "Part-time" },
          { jobType: "Temporary" },
          { jobType: "Part-time" },
          { jobType: "Full-time" },
        ];

        const userStore = useUserStore();
        userStore.selectedJobTypes = [];

        expect(jobStore.FILTERED_JOBS_BY_JOB_TYPES).toEqual([
          { jobType: "Part-time" },
          { jobType: "Temporary" },
          { jobType: "Part-time" },
          { jobType: "Full-time" },
        ]);
      });
    });
  });
});
