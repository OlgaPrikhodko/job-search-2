import type { Mock } from "vitest";
import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { useJobsStore } from "@/stores/jobs";
import { useRoute } from "vue-router";

import JobListings from "@/components/JobResults/JobListings.vue";
import { useDegreesStore } from "@/stores/degrees";

vi.mock("vue-router");
const useRouteMock = useRoute as Mock;

describe("JobListings", () => {
  const renderJobListings = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    const degreesStore = useDegreesStore();
    // @ts-expect-error : Getter is read only
    jobsStore.FILTERED_JOBS = Array(15).fill({});

    render(JobListings, {
      global: {
        plugins: [pinia],
        stubs: { RouterLink: RouterLinkStub },
      },
    });

    return { jobsStore, degreesStore };
  };

  it("fetches jobs", () => {
    useRouteMock.mockReturnValue({ query: {} });
    const { jobsStore } = renderJobListings();

    expect(jobsStore.FETCH_JOBS).toHaveBeenCalled();
  });

  it("fetches degrees", () => {
    useRouteMock.mockReturnValue({ query: {} });
    const { degreesStore } = renderJobListings();

    expect(degreesStore.FETCH_DEGREES).toHaveBeenCalled();
  });

  it("displays maximum of 10 jobs", async () => {
    useRouteMock.mockReturnValue({ query: {} });
    const { jobsStore } = renderJobListings();

    // @ts-expect-error : Getter is read only
    jobsStore.FILTERED_JOBS = Array(15).fill({});

    const jobListings = await screen.findAllByRole("listitem");
    expect(jobListings).toHaveLength(10);
  });

  describe("when params exlude page number", () => {
    it("displays page number 1", () => {
      useRouteMock.mockReturnValue({ query: {} });
      renderJobListings();

      expect(screen.getByText("Page 1")).toBeInTheDocument();
    });
  });

  describe("when params include page number", () => {
    it("displays page number", () => {
      useRouteMock.mockReturnValue({ query: { page: "5" } });
      renderJobListings();

      expect(screen.getByText("Page 5")).toBeInTheDocument();
    });
  });

  describe("when user is on the first page", () => {
    it("does not show the link to the previous page", async () => {
      useRouteMock.mockReturnValue({ query: {} });

      const { jobsStore } = renderJobListings();
      // @ts-expect-error : Getter is read only
      jobsStore.FILTERED_JOBS = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", { name: /previous/i });

      expect(previousLink).not.toBeInTheDocument();
    });

    it("shows link to the next page", async () => {
      useRouteMock.mockReturnValue({ query: {} });
      const { jobsStore } = renderJobListings();

      // @ts-expect-error : Getter is read only
      jobsStore.FILTERED_JOBS = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", { name: /next/i });

      expect(nextLink).toBeInTheDocument();
    });
  });

  describe("when the user on the last page", () => {
    it("does not shows the link to next page", async () => {
      useRouteMock.mockReturnValue({ query: { page: "2" } });
      const { jobsStore } = renderJobListings();

      // @ts-expect-error : Getter is read only
      jobsStore.FILTERED_JOBS = Array(15).fill({});

      await screen.findAllByRole("listitem");

      const nextLink = screen.queryByRole("link", { name: /next/i });

      expect(nextLink).not.toBeInTheDocument();
    });

    it("shows the link to previous page", async () => {
      useRouteMock.mockReturnValue({ query: { page: "2" } });
      const { jobsStore } = renderJobListings();

      // @ts-expect-error : Getter is read only
      jobsStore.FILTERED_JOBS = Array(15).fill({});

      await screen.findAllByRole("listitem");

      const nextLink = screen.queryByRole("link", { name: /previous/i });

      expect(nextLink).toBeInTheDocument();
    });
  });
});
