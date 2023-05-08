import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import MainNav from "@/components/MainNav.vue";

describe("MainNav", () => {
  const renderMainNav = () => {
    render(MainNav, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
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

      let profileImage = screen.queryByRole("img", {
        name: /user profile image/i,
      });

      expect(profileImage).not.toBeInTheDocument();

      const loginButton = screen.getByRole("button", {
        name: /sign in/i,
      });
      await userEvent.click(loginButton);

      profileImage = screen.getByRole("img", {
        name: /User profile image/i,
      });

      expect(profileImage).toBeInTheDocument();
    });
  });
});
