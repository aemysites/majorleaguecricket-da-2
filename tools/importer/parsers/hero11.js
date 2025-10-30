/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row: must match block name exactly
  const headerRow = ['Hero (hero11)'];

  // Row 2: Background image (optional)
  // No <img> in HTML, screenshot shows only decorative background
  // Leave empty string for background image cell
  const backgroundRow = [''];

  // Row 3: Title (Heading), Subheading, CTA (none present)
  // Extract heading from the source HTML
  let heading = element.querySelector('h1, h2, h3');
  if (!heading) {
    // Fallback: find text in .banner__teamname
    const possibleHeading = element.querySelector('.banner__teamname');
    if (possibleHeading && possibleHeading.textContent.trim()) {
      heading = document.createElement('h1');
      heading.textContent = possibleHeading.textContent.trim();
    }
  }
  // Only heading present, no subheading or CTA
  // Reference the heading element directly if found
  const contentRow = [heading ? heading : ''];

  // Compose table
  const cells = [
    headerRow,
    backgroundRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
