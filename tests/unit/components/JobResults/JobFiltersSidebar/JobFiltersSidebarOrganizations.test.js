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

    const $router = { push: vi.fn() };

    render(JobFiltersSidebarOrganizations, {
      global: {
        plugins: [pinia],
        mocks: { $router },
        stubs: { FontAwesomeIcon: true },
      },
    });

    return { jobStore, userStore, $router };
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

  describe("when the user clicks checkbox", () => {
    it("communicates that user has selected checkbox for organizations", async () => {
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

    it("navigates user to job results page to see fresh batch of filtered jobs", async () => {
      const { jobStore, $router } = renderJobFiltersSidebarOrganizations();

      jobStore.UNIQUE_ORGANIZATIONS = new Set(["Google", "Amazon"]);

      const button = screen.getByRole("button", { name: /organizations/i });
      await userEvent.click(button);

      const checkbox = screen.getByRole("checkbox", { name: /amazon/i });
      await userEvent.click(checkbox);

      expect($router.push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
