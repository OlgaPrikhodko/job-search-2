import usePrevAndNextPages from "@/composables/usePrevAndNextPages";

describe("usePrevAndNextPages", () => {
  it("calculates page before the current one", () => {
    const currentPage = { value: 3 };
    const maxPage = { value: 4 };
    const { prevPage } = usePrevAndNextPages(currentPage, maxPage);

    expect(prevPage.value).toBe(2);
  });

  describe("when current page is the first page", () => {
    it("does not provide previous page", () => {
      const currentPage = { value: 1 };
      const maxPage = { value: 4 };
      const { prevPage } = usePrevAndNextPages(currentPage, maxPage);

      expect(prevPage.value).toBeUndefined();
    });
  });

  it("calculates page after current one", () => {
    const currentPage = { value: 3 };
    const maxPage = { value: 4 };
    const { nextPage } = usePrevAndNextPages(currentPage, maxPage);

    expect(nextPage.value).toBe(4);
  });

  describe("when current page is the last page", () => {
    it("does not provide next page", () => {
      const currentPage = { value: 4 };
      const maxPage = { value: 4 };
      const { nextPage } = usePrevAndNextPages(currentPage, maxPage);

      expect(nextPage.value).toBeUndefined();
    });
  });
});
