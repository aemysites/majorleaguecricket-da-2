/* global WebImporter */
export default function parse(element, { document }) {
  // Hero (hero14) block: 1 column, 3 rows
  // Row 1: block name
  // Row 2: background image (none in HTML, so leave empty)
  // Row 3: headline, subheading, CTA (only headline present)

  // Find the headline (h1)
  let headline = element.querySelector('h1');
  // Defensive: if not found, fallback to any heading
  if (!headline) {
    headline = element.querySelector('h2, h3, h4, h5, h6');
  }

  // Build the table rows
  const headerRow = ['Hero (hero14)'];
  const backgroundRow = ['']; // No image in HTML, leave empty
  const contentRow = [headline ? headline : ''];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    backgroundRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
