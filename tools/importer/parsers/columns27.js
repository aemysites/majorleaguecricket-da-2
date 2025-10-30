/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns27)'];

  // Defensive: Get the main columns container
  // The source HTML has a top-level <div class="news">
  const newsContainer = element.querySelector(':scope > div.news');
  if (!newsContainer) return;

  // The two main columns are .news__left and .news__right
  const leftCol = newsContainer.querySelector(':scope > .news__topsec > .news__left');
  const rightCol = newsContainer.querySelector(':scope > .news__topsec > .news__right');

  // Defensive: If either column is missing, abort
  if (!leftCol || !rightCol) return;

  // For the left column, include the entire leftCol block
  // For the right column, include the entire rightCol block
  // This ensures we preserve all content, images, links, and structure

  // Second row: left and right columns as cells
  const secondRow = [leftCol, rightCol];

  // Build the table
  const cells = [headerRow, secondRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
