/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main wrapper that contains all columns
  const wrapper = element.querySelector('.footer__container');
  if (!wrapper) return;

  // Get all column elements (including the first logo/address column)
  const columns = Array.from(wrapper.children).filter(col =>
    col.classList.contains('footer__column') || col.classList.contains('footer__column--1')
  );
  if (!columns.length) return;

  // Helper to clean up extraneous attributes from a node
  function cleanNode(node) {
    // Remove Angular and data-hlx-imp-color attributes
    if (node.nodeType === 1) {
      node.removeAttribute('_ngcontent-hva-c9');
      node.removeAttribute('_ngcontent-hva-c11');
      node.removeAttribute('data-hlx-imp-color');
      node.removeAttribute('class');
    }
    // Recursively clean children
    Array.from(node.childNodes).forEach(cleanNode);
    return node;
  }

  // Build the cells for the second row (one cell per column)
  const secondRow = columns.map((col) => cleanNode(col.cloneNode(true)));

  // Create the table rows
  const rows = [
    ['Columns block (columns21)'], // Header row
    secondRow,
  ];

  // Replace the original element with the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
