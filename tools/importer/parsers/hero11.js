/* global WebImporter */
export default function parse(element, { document }) {
  // Hero (hero11) block: 1 column, 3 rows
  // 1st row: block name
  // 2nd row: background image (optional, none in this HTML)
  // 3rd row: heading, subheading, CTA (only heading present)

  // Header row
  const headerRow = ['Hero (hero11)'];

  // Background image row (none in this case)
  const bgRow = [''];

  // Content row: extract the heading (h1)
  let headingEl = null;
  // Defensive: look for h1 inside any children
  const h1 = element.querySelector('h1');
  if (h1) {
    headingEl = h1;
  } else {
    // fallback: look for strong/other heading
    const strong = element.querySelector('strong');
    if (strong) headingEl = strong;
  }
  // Only heading is present, no subheading or CTA
  const contentRow = [headingEl ? headingEl : ''];

  // Compose table
  const cells = [
    headerRow,
    bgRow,
    contentRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
