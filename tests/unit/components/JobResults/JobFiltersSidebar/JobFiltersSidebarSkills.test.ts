import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import { useUserStore } from "@/stores/user";

import JobFiltersSidebarSkills from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarSkills.vue";

describe("JobFiltersSidebarSkills", () => {
  const renderJobFiltersSidebarSkills = () => {
    const pinia = createTestingPinia();

    const userStore = useUserStore();

    render(JobFiltersSidebarSkills, {
      global: {
        plugins: [pinia],
      },
    });

    return { userStore };
  };

  it("populates search input from store", async () => {
    const { userStore } = renderJobFiltersSidebarSkills();
    userStore.skillsSearchTerm = "vue";

    const input = await screen.findByRole<HTMLInputElement>("textbox");
    expect(input.value).toBe("vue");
  });

  it("writes user input to store", async () => {
    const { userStore } = renderJobFiltersSidebarSkills();
    userStore.skillsSearchTerm = "";

    const input = screen.getByRole<HTMLInputElement>("textbox");
    await userEvent.type(input, "v");
    await userEvent.click(document.body);

    expect(userStore.UPDATE_SKILLS_SEARCH_TERM).toHaveBeenCalledWith("v");
  });
});
