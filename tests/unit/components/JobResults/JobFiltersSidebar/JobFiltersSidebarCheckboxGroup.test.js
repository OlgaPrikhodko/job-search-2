import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import { useRouter } from "vue-router";
vi.mock("vue-router");

import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";

describe("JobFiltersSidebarCheckboxGroup", () => {
  const createProps = (props = {}) => ({
    header: "Value Header",
    uniqueValues: ["Value 1", "Value 2"],
    action: vi.fn(),
    ...props,
  });

  const renderJobFiltersSidebarCheckboxGroup = (props) => {
    render(JobFiltersSidebarCheckboxGroup, {
      props: { ...props },
      global: {
        stubs: { FontAwesomeIcon: true },
      },
    });
  };

  it("renders unique list of values", async () => {
    const props = createProps({
      header: "Job Types",
      uniqueValues: new Set(["Full-time", "Part-time"]),
    });
    renderJobFiltersSidebarCheckboxGroup(props);

    const button = screen.getByRole("button", { name: /job types/i });
    await userEvent.click(button);

    const filterList = screen.getAllByRole("listitem");
    const values = filterList.map((node) => node.textContent);

    expect(values).toEqual(["Full-time", "Part-time"]);
  });

  describe("when user clicks checkbox", () => {
    it("it communicates that user has selected checkbox for value", async () => {
      useRouter.mockReturnValue({ push: vi.fn() });

      const action = vi.fn();
      const props = createProps({
        header: "Job Types",
        uniqueValues: new Set(["Full-time", "Part-time"]),
        action,
      });
      renderJobFiltersSidebarCheckboxGroup(props);

      const button = screen.getByRole("button", { name: /job types/i });
      await userEvent.click(button);
      const checkbox = screen.getByRole("checkbox", { name: /full-time/i });
      await userEvent.click(checkbox);

      expect(action).toHaveBeenCalledWith(["Full-time"]);
    });

    it("navigates user to job results page to see fresh batch of filtered jobs", async () => {
      const push = vi.fn();
      useRouter.mockReturnValue({ push });

      const props = createProps({
        header: "Job Types",
        uniqueValues: new Set(["Full-time", "Part-time"]),
      });
      renderJobFiltersSidebarCheckboxGroup(props);

      const button = screen.getByRole("button", { name: /job types/i });
      await userEvent.click(button);
      const checkbox = screen.getByRole("checkbox", { name: /full-time/i });
      await userEvent.click(checkbox);

      expect(push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
