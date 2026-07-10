const categoryFilter = document.querySelector("[data-category-filter]");

if (categoryFilter) {
  const filterButtons = [...categoryFilter.querySelectorAll("[data-category]")];
  const postCards = [...document.querySelectorAll("[data-post-category]")];
  const filterStatus = categoryFilter.querySelector("[data-filter-status]");

  const showCategory = (category) => {
    let visibleCount = 0;

    postCards.forEach((card) => {
      const shouldShow = category === "all" || card.dataset.postCategory === category;
      card.hidden = !shouldShow;

      if (shouldShow) visibleCount += 1;
    });

    filterButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.category === category));
    });

    filterStatus.textContent = category === "all"
      ? `전체 글 ${visibleCount}개`
      : `${category} 글 ${visibleCount}개`;
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => showCategory(button.dataset.category));
  });

  categoryFilter.hidden = false;
}
