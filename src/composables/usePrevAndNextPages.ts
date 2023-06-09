import { type Ref, computed } from "vue";

const usePrevAndNextPages = (
  currentPage: Ref<number>,
  maxPage: Ref<number>
) => {
  const prevPage = computed(() => {
    const prevPage = currentPage.value - 1;
    const firstPage = 1;
    return prevPage >= firstPage ? prevPage : undefined;
  });

  const nextPage = computed(() => {
    const nextPage = currentPage.value + 1;
    return nextPage <= maxPage.value ? nextPage : undefined;
  });

  return { prevPage, nextPage };
};

export default usePrevAndNextPages;
