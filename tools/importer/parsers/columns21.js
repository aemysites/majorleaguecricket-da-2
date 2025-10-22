/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main footer container (the columns)
  const footerContainer = element.querySelector('.footer__container');
  if (!footerContainer) return;

  // Get all direct column divs inside the container
  const columns = Array.from(footerContainer.querySelectorAll(':scope > .footer__column, :scope > .footer__column--1'));
  if (!columns.length) return;

  // Helper to clone and clean a column
  function cleanColumn(col) {
    // Clone the node so we don't mutate the original
    const clone = col.cloneNode(true);
    // Remove all attributes from all descendants
    clone.querySelectorAll('*').forEach((el) => {
      el.removeAttribute('_ngcontent-foq-c9');
      el.removeAttribute('_ngcontent-foq-c11');
      el.removeAttribute('_nghost-foq-c9');
      el.removeAttribute('data-hlx-imp-color');
      // Only remove class if it is empty
      if (el.className === '') {
        el.removeAttribute('class');
      }
    });
    // Remove attributes from the root node
    clone.removeAttribute('_ngcontent-foq-c9');
    clone.removeAttribute('_ngcontent-foq-c11');
    clone.removeAttribute('_nghost-foq-c9');
    clone.removeAttribute('data-hlx-imp-color');
    if (clone.className === '') {
      clone.removeAttribute('class');
    }
    return clone;
  }

  // Build the header row
  const headerRow = ['Columns block (columns21)'];

  // Build the columns row: each cell is the cleaned content of a column
  const columnsRow = columns.map(cleanColumn);

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
