/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns16)'];

  // Defensive: Get all immediate child .dropdown-group elements (each is a column)
  const columnElements = Array.from(element.querySelectorAll(':scope > .dropdown-group'));

  // If no columns found, fallback to all direct children
  const columns = columnElements.length ? columnElements : Array.from(element.children);

  // Each column: include the label and dropdown together in a fragment
  const columnCells = columns.map(col => {
    // Find the label and the select
    const label = col.querySelector('h5, .filter-label');
    const select = col.querySelector('select');
    // Create a fragment to hold both
    const frag = document.createDocumentFragment();
    if (label) frag.appendChild(label);
    if (select) frag.appendChild(select);
    return frag;
  });

  // Build the table rows
  const rows = [headerRow, columnCells];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
