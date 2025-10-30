/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns16)'];

  // Defensive: Get all immediate children that are filter groups
  const filterGroups = Array.from(element.children).filter(child => child.classList.contains('dropdown-group'));

  // Each filter group will be a column in the second row
  // Each filter group contains a label and a dropdown
  const columnsRow = filterGroups.map(group => group);

  // Build the table
  const cells = [
    headerRow,
    columnsRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
