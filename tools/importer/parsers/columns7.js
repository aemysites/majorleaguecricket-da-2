/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row must match target block name exactly
  const headerRow = ['Columns block (columns7)'];

  // Helper to extract column content
  function extractColumnContent(colEl) {
    const frag = document.createDocumentFragment();
    // Heading: could be div or h3
    const heading = colEl.querySelector('.sponsors__heading, h3.sponsors__heading');
    if (heading) {
      // preserve heading level and formatting
      const headingClone = document.createElement(heading.tagName.toLowerCase());
      headingClone.textContent = heading.textContent.trim();
      frag.appendChild(headingClone);
    }
    // All sponsor containers/images
    const containers = colEl.querySelectorAll('.sponsors__container');
    containers.forEach(container => {
      // Each container may have an anchor with an image
      const anchor = container.querySelector('a[href]');
      if (anchor) {
        // Reference the anchor directly
        frag.appendChild(anchor);
      }
    });
    // If there are nested containers (e.g., .sponsors_Signature)
    const nested = colEl.querySelectorAll('.sponsors_Signature .sponsors__container');
    nested.forEach(container => {
      const anchor = container.querySelector('a[href]');
      if (anchor) {
        frag.appendChild(anchor);
      }
    });
    return frag;
  }

  // Gather the three columns in order
  const columns = [];
  const autoPartner = element.querySelector('.offPartner');
  const signPartner = element.querySelector('.signPartner');
  const apparelPartner = element.querySelector('.sponsors-3');

  // Defensive: Only push if present
  if (autoPartner) columns.push(extractColumnContent(autoPartner));
  if (signPartner) columns.push(extractColumnContent(signPartner));
  if (apparelPartner) columns.push(extractColumnContent(apparelPartner));

  // Edge case: If any column is missing, fill with empty cell
  while (columns.length < 3) {
    columns.push(document.createElement('div'));
  }

  // Table rows: header, then columns
  const rows = [headerRow, columns];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
