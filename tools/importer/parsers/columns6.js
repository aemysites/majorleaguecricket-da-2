/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for columns block
  const headerRow = ['Columns block (columns6)'];

  // Find the main footer container
  const footerContainer = element.querySelector('.footer__container');
  if (!footerContainer) return;

  // Get all immediate column divs
  const columns = Array.from(footerContainer.children);

  // 1. Logo + addresses + copyright
  const col1 = document.createElement('div');
  {
    const logoRow = columns[0].querySelector('.footer__logorow');
    if (logoRow) col1.appendChild(logoRow);
    // Copyright
    const copyright = columns[0].querySelector('.footer__copy');
    if (copyright) col1.appendChild(copyright);
  }

  // 2. Teams
  const col2 = document.createElement('div');
  {
    const title = columns[1].querySelector('.footer__column--title');
    if (title) col2.appendChild(title);
    const links = columns[1].querySelector('.footer__column--links');
    if (links) col2.appendChild(links);
  }

  // 3. Site Map
  const col3 = document.createElement('div');
  {
    const title = columns[2].querySelector('.footer__column--title');
    if (title) col3.appendChild(title);
    const links = columns[2].querySelector('.footer__column--links');
    if (links) col3.appendChild(links);
  }

  // 4. About (About links only)
  const col4 = document.createElement('div');
  {
    const title = columns[3].querySelector('.footer__column--title');
    if (title) col4.appendChild(title);
    const links = columns[3].querySelector('.footer__column--links');
    if (links) col4.appendChild(links);
  }

  // 5. Social icons (from About column)
  const col5 = document.createElement('div');
  {
    const social = columns[3].querySelector('.footer__social');
    if (social) col5.appendChild(social);
  }

  // 6. Empty column for layout balance
  const col6 = document.createElement('div');

  // Build the table rows: six columns, last is empty for layout
  const cells = [
    headerRow,
    [col1, col2, col3, col4, col5, col6],
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
