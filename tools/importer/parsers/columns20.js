/* global WebImporter */
export default function parse(element, { document }) {
  // Find banner heading (MLC Videos)
  let bannerHeading = '';
  const bannerDiv = element.querySelector('.videosbanner');
  if (bannerDiv) {
    const h1 = bannerDiv.querySelector('h1');
    if (h1) bannerHeading = h1.textContent.trim();
  }

  // Find the select field (dropdown)
  let selectField = null;
  const selectDiv = element.querySelector('.news-season-div');
  if (selectDiv) {
    const select = selectDiv.querySelector('select');
    if (select) selectField = select.cloneNode(true);
  }

  // Find the main two-column section
  let leftColumn = null;
  let rightColumn = null;
  const mainDiv = element.querySelector('main');
  if (mainDiv) {
    const wrapperDiv = mainDiv.querySelector('.wrapper');
    if (wrapperDiv) {
      const videosWrapper = wrapperDiv.querySelector('.videos__wrapper');
      if (videosWrapper) {
        const topSec = videosWrapper.querySelector('.videos__topsec');
        if (topSec) {
          // Left column: video thumbnail area
          const left = topSec.querySelector('.videos__left');
          if (left) leftColumn = left.cloneNode(true);
          // Right column: latest videos area
          const right = topSec.querySelector('.videos__right');
          if (right) rightColumn = right.cloneNode(true);
        }
      }
    }
  }

  // Defensive fallback: if columns not found, use empty divs
  if (!leftColumn) leftColumn = document.createElement('div');
  if (!rightColumn) rightColumn = document.createElement('div');

  // Build table rows
  const headerRow = ['Columns (columns20)'];
  // Second row: banner heading and select field in first and second columns
  const bannerRow = [bannerHeading, selectField || ''];
  // Third row: two columns, left and right
  const columnsRow = [leftColumn, rightColumn];

  // Create the block table
  const cells = [headerRow, bannerRow, columnsRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
