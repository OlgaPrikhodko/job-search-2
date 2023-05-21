import { createPinia, setActivePinia } from "pinia";

import { useUserStore } from "@/stores/user";

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("keeps track if user is logged in", () => {
    const store = useUserStore();
    expect(store.isLoggedIn).toBeFalsy();
  });

  it("stores organizations that the user would like to filter jobs by", () => {
    const store = useUserStore();
    expect(store.selectedOrganizations).toEqual([]);
  });

  it("stores job types that the user would like to filter jobs by", () => {
    const store = useUserStore();
    expect(store.selectedJobTypes).toEqual([]);
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("loginUser", () => {
    it("logs user in", () => {
      const store = useUserStore();
      store.loginUser();
      expect(store.isLoggedIn).toBeTruthy();
    });
  });

  describe("ADD_SELECTED_ORGANIZATIONS", () => {
    it("updates organizations the user has chosen to filter jobs by", () => {
      const store = useUserStore();
      store.ADD_SELECTED_ORGANIZATIONS(["Google", "Amazon"]);
      expect(store.selectedOrganizations).toEqual(["Google", "Amazon"]);
    });
  });

  describe("ADD_SELECTED_JOB_TYPES", () => {
    it("updates job types the user has chosen to filter jobs by", () => {
      const store = useUserStore();
      store.ADD_SELECTED_JOB_TYPES(["Full-time", "Part-time"]);
      expect(store.selectedJobTypes).toEqual(["Full-time", "Part-time"]);
    });
  });
});
