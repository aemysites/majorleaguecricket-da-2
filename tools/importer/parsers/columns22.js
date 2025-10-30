/* global WebImporter */
export default function parse(element, { document }) {
  // Columns block header row
  const headerRow = ['Columns block (columns22)'];

  // Find the main footer columns container
  const container = element.querySelector('.footer__container');
  if (!container) return;

  // Get all columns (should be 4)
  const columns = Array.from(container.children);
  if (columns.length === 0) return;

  // For each column, extract only the inner content (not the outer column div)
  // This means: for each column, create a fragment containing all its children
  const secondRow = columns.map(col => {
    const frag = document.createDocumentFragment();
    Array.from(col.childNodes).forEach(child => frag.appendChild(child.cloneNode(true)));
    return frag;
  });

  // Create the table for the Columns block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
