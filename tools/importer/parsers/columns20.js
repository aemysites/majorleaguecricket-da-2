/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate child by class
  function getChildByClass(parent, className) {
    return Array.from(parent.children).find((el) => el.classList && el.classList.contains(className));
  }

  // 1. Find the banner heading
  const bannerContainer = element.querySelector('.banner__videoscontainer');
  let bannerHeading = '';
  if (bannerContainer) {
    const h1 = bannerContainer.querySelector('h1');
    if (h1 && h1.textContent.trim()) {
      bannerHeading = h1.cloneNode(true);
    }
  }

  // 2. Find the main wrapper for the two columns
  const main = element.querySelector('main');
  if (!main) return;
  const wrapper = main.querySelector('.wrapper');
  if (!wrapper) return;
  const videosWrapper = wrapper.querySelector('.videos__wrapper');
  if (!videosWrapper) return;
  const topSec = videosWrapper.querySelector('.videos__topsec');
  if (!topSec) return;

  // 3. Get left and right column elements
  const leftCol = getChildByClass(topSec, 'videos__left');
  const rightCol = getChildByClass(topSec, 'videos__right');

  // Defensive: If either column is missing, fallback to empty div
  const leftContent = leftCol || document.createElement('div');
  const rightContent = rightCol || document.createElement('div');

  // 4. Build table rows
  const headerRow = ['Columns block (columns20)'];
  const columnsRow = [leftContent, rightContent];

  // 5. Create the table and replace
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Insert banner heading above the table if present
  if (bannerHeading) {
    element.parentNode.insertBefore(bannerHeading, element);
  }

  element.replaceWith(table);
}
