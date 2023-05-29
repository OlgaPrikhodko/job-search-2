import { render, screen } from "@testing-library/vue";
import type { Mock } from "vitest";
import axios from "axios";

import SpotLight from "@/components/JobSearch/SpotLight.vue";

vi.mock("axios");
const axiosGetMock = axios.get as Mock;

describe("SpotLight", () => {
  const mockSpotlightResponse = (spotlight = {}) => {
    axiosGetMock.mockResolvedValue({
      data: [
        {
          id: 1,
          title: "Title",
          description: "Description",
          img: "Image",
          ...spotlight,
        },
      ],
    });
  };

  it("provides image to parent component", async () => {
    const spotlight = { img: "Some image" };
    mockSpotlightResponse(spotlight);

    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
           <h1>{{ slotProps.img }}</h1>
        </template>`,
      },
    });
    const text = await screen.findByText("Some image");
    expect(text).toBeInTheDocument();
  });

  it("provides title to parent component", async () => {
    const spotlight = { title: "Some title" };
    mockSpotlightResponse(spotlight);

    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
           <h1>{{ slotProps.title }}</h1>
        </template>`,
      },
    });
    const text = await screen.findByText("Some title");
    expect(text).toBeInTheDocument();
  });

  it("provides description to parent component", async () => {
    const spotlight = { description: "Some description" };
    mockSpotlightResponse(spotlight);

    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
           <h1>{{ slotProps.description }}</h1>
        </template>`,
      },
    });
    const text = await screen.findByText("Some description");
    expect(text).toBeInTheDocument();
  });
});
