import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

import { useJobsStore } from "@/stores/jobs";

import JobListings from "@/components/JobResults/JobListings.vue";

describe("JobListings", () => {
  const createRoute = (queryParams) => ({
    query: { page: "5", ...queryParams },
  });

  const renderJobListings = ($route) => {
    const pinia = createTestingPinia();
    render(JobListings, {
      global: {
        plugins: [pinia],
        mocks: { $route },
        stubs: { RouterLink: RouterLinkStub },
      },
    });
  };

  it("fetches jobs", () => {
    const $route = createRoute();
    renderJobListings($route);

    const jobsStore = useJobsStore();

    expect(jobsStore.FETCH_JOBS).toHaveBeenCalled();
  });

  it("displays maximum of 10 jobs", async () => {
    const queryParams = { page: "1" };
    const $route = createRoute(queryParams);
    renderJobListings($route);

    const jobsStore = useJobsStore();
    jobsStore.jobs = Array(15).fill({});

    const jobListings = await screen.findAllByRole("listitem");
    expect(jobListings).toHaveLength(10);
  });

  describe("when params exlude page number", () => {
    it("displays page number 1", () => {
      const queryParams = { page: undefined };
      const $route = createRoute(queryParams);
      renderJobListings($route);

      expect(screen.getByText("Page 1")).toBeInTheDocument();
    });
  });

  describe("when params include page number", () => {
    it("displays page number", () => {
      const queryParams = { page: "5" };
      const $route = createRoute(queryParams);
      renderJobListings($route);

      expect(screen.getByText("Page 5")).toBeInTheDocument();
    });
  });

  describe("when user is on the first page", () => {
    it("does not show the link to the previous page", async () => {
      const queryParams = { page: "1" };
      const $route = createRoute(queryParams);
      renderJobListings($route);

      const jobsStore = useJobsStore();
      jobsStore.jobs = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", { name: /previous/i });
      expect(previousLink).not.toBeInTheDocument();
    });

    it("shows link to the next page", async () => {
      const queryParams = { page: "1" };
      const $route = createRoute(queryParams);
      renderJobListings($route);

      const jobsStore = useJobsStore();
      jobsStore.jobs = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", { name: /next/i });
      expect(nextLink).toBeInTheDocument();
    });
  });

  describe("when the user on the last page", () => {
    it("does not shows the link to next page", async () => {
      const queryParams = { page: "2" };
      const $route = createRoute(queryParams);
      renderJobListings($route);

      const jobsStore = useJobsStore();
      jobsStore.jobs = Array(15).fill({});

      await screen.findAllByRole("listitem");

      const nextLink = screen.queryByRole("link", { name: /next/i });
      expect(nextLink).not.toBeInTheDocument();
    });

    it("shows the link to previous page", async () => {
      const queryParams = { page: "2" };
      const $route = createRoute(queryParams);
      renderJobListings($route);

      const jobsStore = useJobsStore();
      jobsStore.jobs = Array(15).fill({});

      await screen.findAllByRole("listitem");

      const nextLink = screen.queryByRole("link", { name: /previous/i });
      expect(nextLink).toBeInTheDocument();
    });
  });
});
