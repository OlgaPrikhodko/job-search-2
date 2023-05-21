import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import JobFiltersSidebarJobTypes from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue";

describe("JobFiltersSidebarJobTypes", () => {
  const renderJobFiltersSidebarJobTypes = () => {
    const pinia = createTestingPinia();

    const userStore = useUserStore();
    const jobStore = useJobsStore();

    render(JobFiltersSidebarJobTypes, {
      global: {
        plugins: [pinia],
        stubs: { FontAwesomeIcon: true },
      },
    });

    return { jobStore, userStore };
  };

  it("renders unique list of job types from jobs", async () => {
    const { jobStore } = renderJobFiltersSidebarJobTypes();

    jobStore.UNIQUE_JOB_TYPES = new Set(["Full-time", "Part-time"]);

    const button = screen.getByRole("button", { name: /job types/i });
    await userEvent.click(button);

    const filterList = screen.getAllByRole("listitem");
    const jobTypes = filterList.map((node) => node.textContent);

    expect(jobTypes).toEqual(["Full-time", "Part-time"]);
  });

  it("it communicates that user has selected checkbox for job types", async () => {
    const { jobStore, userStore } = renderJobFiltersSidebarJobTypes();

    jobStore.UNIQUE_JOB_TYPES = new Set(["Full-time", "Part-time"]);

    const button = screen.getByRole("button", { name: /job types/i });
    await userEvent.click(button);

    const checkbox = screen.getByRole("checkbox", { name: /full-time/i });
    await userEvent.click(checkbox);

    expect(userStore.ADD_SELECTED_JOB_TYPES).toHaveBeenCalledWith([
      "Full-time",
    ]);
  });
});
