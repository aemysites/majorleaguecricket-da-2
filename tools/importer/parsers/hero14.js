/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row for Hero (hero14)
  const headerRow = ['Hero (hero14)'];

  // Defensive: Find the main heading (h1) inside the block
  let heading = element.querySelector('h1');
  // If not found, fallback to h2, h3, or strong text
  if (!heading) {
    heading = element.querySelector('h2, h3, strong');
  }

  // Row 2: Background image (none in this HTML)
  // Screenshot shows a decorative background, but no <img> in HTML
  // Leave cell empty as per block description if no image
  const bgImageRow = [''];

  // Row 3: Content (heading, subheading, CTA)
  // Only heading present in this case
  const contentRow = [heading ? heading : ''];

  // Compose the table
  const cells = [
    headerRow,
    bgImageRow,
    contentRow,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
