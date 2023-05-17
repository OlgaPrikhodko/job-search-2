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
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("logginUser", () => {
    it("logs user in", () => {
      const store = useUserStore();
      store.loginUser();
      expect(store.isLoggedIn).toBeTruthy();
    });
  });
});
