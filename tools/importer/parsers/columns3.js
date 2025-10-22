/* global WebImporter */
export default function parse(element, { document }) {
  // Find the footer element
  const footer = element.querySelector('footer');
  if (!footer) {
    // Defensive fallback: if no footer, just wrap the element
    const block = WebImporter.DOMUtils.createTable([
      ['Columns (columns3)'],
      [element]
    ], document);
    element.replaceWith(block);
    return;
  }

  // Get columns: logo/addresses, teams, site map, about
  const col1 = footer.querySelector('.footer__column--1');
  const cols = footer.querySelectorAll('.footer__column');
  // Defensive: ensure we have all columns
  if (!col1 || cols.length < 3) {
    const block = WebImporter.DOMUtils.createTable([
      ['Columns (columns3)'],
      [footer]
    ], document);
    element.replaceWith(block);
    return;
  }

  // Compose column content for maximum text coverage
  // Column 1: logo, addresses, copyright
  const col1Content = document.createElement('div');
  // Logo
  const logo = col1.querySelector('.footer__logo');
  if (logo) col1Content.appendChild(logo.cloneNode(true));
  // Addresses
  const addressSec = col1.querySelector('.footer__addresssec');
  if (addressSec) col1Content.appendChild(addressSec.cloneNode(true));
  // Copyright
  const copyright = col1.querySelector('.footer__copy');
  if (copyright) col1Content.appendChild(copyright.cloneNode(true));

  // Column 2: Teams
  const col2 = cols[0];
  const col2Content = document.createElement('div');
  const col2Title = col2.querySelector('.footer__column--title');
  if (col2Title) col2Content.appendChild(col2Title.cloneNode(true));
  const col2Links = col2.querySelector('.footer__column--links');
  if (col2Links) col2Content.appendChild(col2Links.cloneNode(true));

  // Column 3: Site Map
  const col3 = cols[1];
  const col3Content = document.createElement('div');
  const col3Title = col3.querySelector('.footer__column--title');
  if (col3Title) col3Content.appendChild(col3Title.cloneNode(true));
  const col3Links = col3.querySelector('.footer__column--links');
  if (col3Links) col3Content.appendChild(col3Links.cloneNode(true));

  // Column 4: About + Minor League Cricket + social
  const col4 = cols[2];
  const col4Content = document.createElement('div');
  const col4Title = col4.querySelector('.footer__column--title');
  if (col4Title) col4Content.appendChild(col4Title.cloneNode(true));
  const col4Links = col4.querySelector('.footer__column--links');
  if (col4Links) col4Content.appendChild(col4Links.cloneNode(true));
  // Minor League Cricket link (may be outside .footer__column--links)
  const mlcLink = col4.querySelector('a[href*="minorleaguecricket"]');
  if (mlcLink && (!col4Links || !col4Links.contains(mlcLink))) col4Content.appendChild(mlcLink.cloneNode(true));
  // Social icons
  const social = col4.querySelector('.footer__social');
  if (social) col4Content.appendChild(social.cloneNode(true));

  // Compose table rows
  const headerRow = ['Columns (columns3)'];
  const columnsRow = [col1Content, col2Content, col3Content, col4Content];
  const rows = [headerRow, columnsRow];

  // Create and replace block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
