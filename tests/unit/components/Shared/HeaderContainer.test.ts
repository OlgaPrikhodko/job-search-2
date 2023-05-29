import { render, screen } from "@testing-library/vue";

import HeaderComponent from "@/components/Shared/HeaderContainer.vue";

describe("HeaderComponent", () => {
  it("allows parent component to provide title content", () => {
    render(HeaderComponent, {
      slots: {
        title: "<h1>My Title</h1>",
      },
    });

    expect(screen.getByText("My Title")).toBeInTheDocument();
  });

  it("allows parent component to provide subtitle content", () => {
    render(HeaderComponent, {
      slots: {
        subtitle: "<h2>My Subtitle</h2>",
      },
    });

    expect(screen.getByText("My Subtitle")).toBeInTheDocument();
  });
});
