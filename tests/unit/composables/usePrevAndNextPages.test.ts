import { ref } from "vue";

import usePrevAndNextPages from "@/composables/usePrevAndNextPages";

describe("usePrevAndNextPages", () => {
  it("calculates page before the current one", () => {
    const currentPage = ref(3);
    const maxPage = ref(4);
    const { prevPage } = usePrevAndNextPages(currentPage, maxPage);

    expect(prevPage.value).toBe(2);
  });

  describe("when current page is the first page", () => {
    it("does not provide previous page", () => {
      const currentPage = ref(1);
      const maxPage = ref(4);
      const { prevPage } = usePrevAndNextPages(currentPage, maxPage);

      expect(prevPage.value).toBeUndefined();
    });
  });

  it("calculates page after current one", () => {
    const currentPage = ref(3);
    const maxPage = ref(4);
    const { nextPage } = usePrevAndNextPages(currentPage, maxPage);

    expect(nextPage.value).toBe(4);
  });

  describe("when current page is the last page", () => {
    it("does not provide next page", () => {
      const currentPage = ref(4);
      const maxPage = ref(4);
      const { nextPage } = usePrevAndNextPages(currentPage, maxPage);

      expect(nextPage.value).toBeUndefined();
    });
  });
});
