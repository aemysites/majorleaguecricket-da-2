/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get direct children by class name
  function getDirectChildByClass(parent, className) {
    return Array.from(parent.children).find((el) => el.classList.contains(className));
  }

  // 1. Find the main wrapper for columns (footer__container)
  const container = element.querySelector('.footer__container');
  if (!container) return;

  // 2. Get all direct children with class footer__column (including --1 variant)
  const columns = Array.from(container.children).filter((el) => el.classList.contains('footer__column') || el.classList.contains('footer__column--1'));

  // Defensive: If first column is not found, fallback to first child
  let col1 = columns[0] || container.children[0];
  let col2 = columns[1] || container.children[1];
  let col3 = columns[2] || container.children[2];
  let col4 = columns[3] || container.children[3];

  // 3. Prepare content for each column
  // --- Column 1: Logo, addresses, copyright
  const col1Content = [];
  // Logo
  const logoRow = getDirectChildByClass(col1, 'footer__logorow');
  if (logoRow) {
    // Logo image
    const logoImg = logoRow.querySelector('img');
    if (logoImg) col1Content.push(logoImg);
    // Addresses
    const addressSec = logoRow.querySelector('.footer__addresssec');
    if (addressSec) {
      // Get both address blocks
      const addresses = addressSec.querySelectorAll('.footer__address');
      addresses.forEach(addr => col1Content.push(addr));
    }
  }
  // Copyright (outside logo row)
  const copyright = col1.querySelector('.footer__copy');
  if (copyright) col1Content.push(copyright);

  // --- Column 2: Teams
  const col2Content = [];
  // Title
  const col2Title = col2.querySelector('.footer__column--title');
  if (col2Title) col2Content.push(col2Title);
  // Links
  const col2Links = col2.querySelector('.footer__column--links');
  if (col2Links) col2Content.push(col2Links);

  // --- Column 3: Site Map
  const col3Content = [];
  const col3Title = col3.querySelector('.footer__column--title');
  if (col3Title) col3Content.push(col3Title);
  const col3Links = col3.querySelector('.footer__column--links');
  if (col3Links) col3Content.push(col3Links);

  // --- Column 4: About + Social
  const col4Content = [];
  const col4Title = col4.querySelector('.footer__column--title');
  if (col4Title) col4Content.push(col4Title);
  const col4Links = col4.querySelector('.footer__column--links');
  if (col4Links) col4Content.push(col4Links);
  // Social icons
  const social = col4.querySelector('.footer__social');
  if (social) col4Content.push(social);

  // 4. Build table rows
  const headerRow = ['Columns block (columns6)'];
  const contentRow = [col1Content, col2Content, col3Content, col4Content];

  // 5. Create and replace
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
