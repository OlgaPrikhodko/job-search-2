import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import JobFiltersSidebarOrganizations from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue";

describe("JobFiltersSidebarOrganizations", () => {
  const renderJobFiltersSidebarOrganizations = () => {
    const pinia = createTestingPinia();

    const userStore = useUserStore();
    const jobStore = useJobsStore();

    render(JobFiltersSidebarOrganizations, {
      global: {
        plugins: [pinia],
        stubs: { FontAwesomeIcon: true },
      },
    });

    return { jobStore, userStore };
  };

  it("renders unique list of organizations from jobs", async () => {
    const { jobStore } = renderJobFiltersSidebarOrganizations();

    jobStore.UNIQUE_ORGANIZATIONS = new Set(["Google", "Amazon"]);

    const button = screen.getByRole("button", { name: /organizations/i });
    await userEvent.click(button);

    const filterList = screen.getAllByRole("listitem");
    const organizations = filterList.map((node) => node.textContent);

    expect(organizations).toEqual(["Google", "Amazon"]);
  });

  it("it communicates that user has selected checkbox for organizations", async () => {
    const { jobStore, userStore } = renderJobFiltersSidebarOrganizations();

    jobStore.UNIQUE_ORGANIZATIONS = new Set(["Google", "Amazon"]);

    const button = screen.getByRole("button", { name: /organizations/i });
    await userEvent.click(button);

    const checkbox = screen.getByRole("checkbox", { name: /amazon/i });
    await userEvent.click(checkbox);

    expect(userStore.ADD_SELECTED_ORGANIZATIONS).toHaveBeenCalledWith([
      "Amazon",
    ]);
  });
});
