import { Mock } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import axios from "axios";

import { useDegreesStore } from "@/stores/degrees";

vi.mock("axios");
const axiosGetMock = axios.get as Mock;

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("stores all degrees that jobs may require", () => {
    const store = useDegreesStore();
    expect(store.degrees).toEqual([]);
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("FETCH_DEGREES", () => {
    it("makes API request and stores received jobs", async () => {
      axiosGetMock.mockResolvedValue({
        data: [{ id: 1, degree: "Bachelor's" }],
      });
      const store = useDegreesStore();
      await store.FETCH_DEGREES();
      expect(store.degrees).toEqual([{ id: 1, degree: "Bachelor's" }]);
    });
  });
});

describe("getters", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("UNIQUE_DEGREES", () => {
    it("finds unique degreesfrom collection of degrees", () => {
      const store = useDegreesStore();
      store.degrees = [
        { id: 1, degree: "Associate" },
        { id: 2, degree: "Bachelor's" },
      ];

      const result = store.UNIQUE_DEGREES;
      expect(result).toEqual(["Associate", "Bachelor's"]);
    });
  });
});
