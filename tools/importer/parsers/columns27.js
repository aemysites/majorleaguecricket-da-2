/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the specified block name for the header row
  const headerRow = ['Columns block (columns27)'];

  // Defensive selectors for the two main columns
  // Left column: main news article
  const leftColumn = element.querySelector('.news__left');
  // Right column: latest news sidebar
  const rightColumn = element.querySelector('.news__right');

  // If not found, fallback to first two direct children
  let leftContent = leftColumn;
  let rightContent = rightColumn;
  if (!leftContent || !rightContent) {
    const children = element.querySelectorAll(':scope > div > div');
    leftContent = children[0] || null;
    rightContent = children[1] || null;
  }

  // Build the table rows
  const rows = [headerRow];

  // Second row: two columns, left and right
  const secondRow = [];
  if (leftContent) secondRow.push(leftContent);
  else secondRow.push('');
  if (rightContent) secondRow.push(rightContent);
  else secondRow.push('');
  rows.push(secondRow);

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
