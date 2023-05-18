import { screen, render } from "@testing-library/vue";

import userEvent from "@testing-library/user-event";

import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

describe("CollapsibleAccordion", () => {
  const renderCollapsibleAccordion = (config = {}) => {
    render(CollapsibleAccordion, {
      props: { header: "My category" },
      slots: { default: "<h3>My nested child</h3>" },
      global: { stubs: { FontAwesomeIcon: true } },
      ...config,
    });
  };

  it("renders child component", async () => {
    const props = { header: "My" };
    const slots = { default: "<h3>My nested child</h3>" };

    const config = { props, slots };
    renderCollapsibleAccordion(config);
    screen.debug();
    expect(screen.queryByText("My nested child")).not.toBeInTheDocument();
    const button = screen.getByRole("button", { name: /my/i });
    await userEvent.click(button);
    expect(screen.getByText("My nested child")).toBeInTheDocument();
  });

  describe("when parend does not provide custom child content", () => {
    it("renders default content", async () => {
      const props = { header: "My category" };
      const slots = {};
      const config = { props, slots };
      renderCollapsibleAccordion(config);

      const button = screen.getByRole("button");
      await userEvent.click(button);

      expect(
        screen.getByText("Somebody forget to populate me")
      ).toBeInTheDocument();
    });
  });
});
