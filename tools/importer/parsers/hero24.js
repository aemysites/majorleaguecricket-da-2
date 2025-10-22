/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero24)'];

  // 2. Background image row (no image in source HTML)
  const bgImageRow = [''];

  // 3. Content row: heading and CTA button
  const container = element.querySelector('.subscribe');
  if (!container) return;

  // Find heading (h2)
  const heading = container.querySelector('h2');
  // Find button (CTA)
  const button = container.querySelector('button');

  // Compose content cell
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (button) contentCell.push(document.createElement('br'), button);

  // Compose table rows
  const rows = [
    headerRow,
    bgImageRow,
    [contentCell]
  ];

  // Create block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
