/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate child columns
  function getFooterColumns(wrapper) {
    // Find all direct children with class 'footer__column' inside the main wrapper
    return Array.from(wrapper.querySelectorAll(':scope > .footer__column, :scope > .footer__column--1'));
  }

  // Find the main wrapper containing columns
  const wrapper = element.querySelector('.footer__container');
  if (!wrapper) return;

  // Get all columns (there are 4 visually)
  const columns = getFooterColumns(wrapper);
  if (columns.length === 0) return;

  // Header row
  const headerRow = ['Columns block (columns22)'];

  // Build the second row: each cell is a column's content
  // For robustness, reference the entire column element for each cell
  const contentRow = columns.map((col) => col);

  // Create the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
