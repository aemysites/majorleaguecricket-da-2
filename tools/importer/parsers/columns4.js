/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get direct child by class
  function getDirectChildByClass(parent, className) {
    return Array.from(parent.children).find((el) => el.classList && el.classList.contains(className));
  }

  // Find the main footer wrapper
  const wrapper = element.querySelector('.wrapper');
  if (!wrapper) return;
  const container = getDirectChildByClass(wrapper, 'footer__container');
  if (!container) return;

  // Get all column elements in order
  const columns = Array.from(container.children).filter((el) => el.classList && el.classList.contains('footer__column'));

  // Defensive: Ensure we have 4 columns (as per screenshot and HTML)
  const colCount = 4;
  let normalizedColumns = columns.slice(0, colCount);
  if (normalizedColumns.length < colCount) {
    for (let i = normalizedColumns.length; i < colCount; i++) {
      const emptyDiv = document.createElement('div');
      normalizedColumns.push(emptyDiv);
    }
  }

  // Block header row: MUST match target block name exactly
  const headerRow = ['Columns block (columns4)'];
  // Content row: reference actual column elements
  const contentRow = normalizedColumns;

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
