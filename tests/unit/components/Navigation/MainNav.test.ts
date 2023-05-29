import type { Mock } from "vitest";

import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";
import { useRoute } from "vue-router";

import { RouterLinkStub } from "@vue/test-utils";

import { useUserStore } from "@/stores/user";
import MainNav from "@/components/Navigation/MainNav.vue";

vi.mock("vue-router");
const useRouteMock = useRoute as Mock;

describe("MainNav", () => {
  const renderMainNav = () => {
    const pinia = createTestingPinia();
    useRouteMock.mockReturnValue({ name: "Home" });

    render(MainNav, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub,
        },
      },
    });
  };

  it("displays company name", () => {
    renderMainNav();
    const companyName = screen.getByText("Bobo Careers");
    expect(companyName).toBeInTheDocument();
  });

  it("displays menu items for navigation", () => {
    renderMainNav();
    const navMenuItems = screen.getAllByRole("listitem");
    const navMenuTexts = navMenuItems.map((menuItem) => menuItem.textContent);
    expect(navMenuTexts).toEqual([
      "Teams",
      "Location",
      "Life at Bobo Corp",
      "How we hire",
      "Students",
      "Jobs",
    ]);
  });

  describe("when the user logs in", () => {
    it("displays sign in button for unlogined user", async () => {
      renderMainNav();

      const loginButton = screen.getByRole("button", {
        name: /sign in/i,
      });

      expect(loginButton).toBeInTheDocument();
    });

    it("displays user profile picture", async () => {
      renderMainNav();
      const userStore = useUserStore();

      let profileImage = screen.queryByRole("img", {
        name: /user profile image/i,
      });

      expect(profileImage).not.toBeInTheDocument();

      const loginButton = screen.getByRole("button", {
        name: /sign in/i,
      });
      userStore.isLoggedIn = true;
      await userEvent.click(loginButton);

      profileImage = screen.getByRole("img", {
        name: /User profile image/i,
      });

      expect(profileImage).toBeInTheDocument();
    });
  });
});
