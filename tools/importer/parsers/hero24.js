/* global WebImporter */
export default function parse(element, { document }) {
  // Hero (hero24) block: 1 column, 3 rows
  const headerRow = ['Hero (hero24)'];

  // Row 2: Background image (optional, none in HTML, so leave empty)
  const bgImageRow = [''];

  // Row 3: Heading and CTA
  const subscribeDiv = element.querySelector('.subscribe');
  let contentElements = [];
  if (subscribeDiv) {
    // Heading
    const heading = subscribeDiv.querySelector('.subscribe__heading');
    if (heading) {
      contentElements.push(heading);
    }
    // CTA Button
    const ctaBtn = subscribeDiv.querySelector('.subscribe__btn');
    if (ctaBtn) {
      contentElements.push(ctaBtn);
    }
  }
  const contentRow = [contentElements];

  // Assemble table
  const cells = [
    headerRow,
    bgImageRow,
    contentRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
