/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by class
  function getChildByClass(parent, className) {
    return Array.from(parent.children).find((el) => el.classList && el.classList.contains(className));
  }

  // Find the banner heading (MLC News)
  let bannerHeading = '';
  const bannerH1 = element.querySelector('.banner__h1--news');
  if (bannerH1 && bannerH1.textContent.trim()) {
    bannerHeading = bannerH1.cloneNode(true);
  }

  // Find the main wrapper for the columns block
  const wrapper = element.querySelector('.wrapper');
  if (!wrapper) return;

  // Find the two main columns: left and right
  const newsTopSec = wrapper.querySelector('.news__topsec');
  if (!newsTopSec) return;

  // Left column: image and supporting content
  const leftCol = getChildByClass(newsTopSec, 'news__left');
  // Right column: heading and news links
  const rightCol = getChildByClass(newsTopSec, 'news__right');

  // --- Left column content ---
  let leftContent = [];
  if (leftCol) {
    // Find the banner image
    const img = leftCol.querySelector('img');
    if (img) leftContent.push(img.cloneNode(true));
  }

  // --- Right column content ---
  let rightContent = [];
  if (rightCol) {
    // Heading
    const heading = rightCol.querySelector('.news__right--heading');
    if (heading && heading.textContent.trim()) {
      rightContent.push(heading.cloneNode(true));
    }
  }

  // --- Dropdown/select at bottom right ---
  const selectDiv = wrapper.querySelector('.news-season-div');
  if (selectDiv) {
    const select = selectDiv.querySelector('select');
    if (select) {
      rightContent.push(select.cloneNode(true));
    }
  }

  // Table structure
  const headerRow = ['Columns block (columns9)'];
  // The columns row should be the second row (left, right)
  // Banner heading should be included as its own row above columns
  const cells = [headerRow];
  if (bannerHeading) {
    cells.push([bannerHeading]);
  }
  cells.push([leftContent, rightContent]);

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
