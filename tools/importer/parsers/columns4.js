/* global WebImporter */
export default function parse(element, { document }) {
  // Get the columns (should be 4)
  const columns = Array.from(element.querySelectorAll(':scope > footer > div > div > div'));

  // Defensive fallback if columns not found
  if (!columns.length) {
    // Try to find columns by class
    const fallback = Array.from(element.querySelectorAll('.footer__column'));
    if (fallback.length) {
      columns.push(...fallback);
    }
  }

  // There must be 4 columns for columns4
  while (columns.length < 4) {
    columns.push(document.createElement('div'));
  }

  // --- Column 1: Logo, addresses, copyright ---
  const col1 = columns[0];
  const col1Content = [];
  if (col1) {
    const logo = col1.querySelector('.footer__logo');
    if (logo) col1Content.push(logo);
    const addresses = col1.querySelector('.footer__addresssec');
    if (addresses) col1Content.push(addresses);
    const copyright = col1.querySelector('.footer__copy');
    if (copyright) col1Content.push(copyright);
  }

  // --- Column 2: Teams heading ---
  const col2 = columns[1];
  const col2Content = [];
  if (col2) {
    const teamsTitle = col2.querySelector('.footer__column--title');
    if (teamsTitle) col2Content.push(teamsTitle);
    // Always include the links container, even if empty
    const teamsLinks = col2.querySelector('.footer__column--links');
    if (teamsLinks) col2Content.push(teamsLinks);
  }

  // --- Column 3: Site Map heading ---
  const col3 = columns[2];
  const col3Content = [];
  if (col3) {
    const siteMapTitle = col3.querySelector('.footer__column--title');
    if (siteMapTitle) col3Content.push(siteMapTitle);
    // Always include the links container, even if empty
    const siteMapLinks = col3.querySelector('.footer__column--links');
    if (siteMapLinks) col3Content.push(siteMapLinks);
  }

  // --- Column 4: About heading, links, social icons ---
  const col4 = columns[3];
  const col4Content = [];
  if (col4) {
    const aboutTitle = col4.querySelector('.footer__column--title');
    if (aboutTitle) col4Content.push(aboutTitle);
    const aboutLinks = col4.querySelector('.footer__column--links');
    if (aboutLinks) col4Content.push(aboutLinks);
    const social = col4.querySelector('.footer__social');
    if (social) col4Content.push(social);
  }

  // Compose table rows
  const headerRow = ['Columns block (columns4)'];
  const contentRow = [col1Content, col2Content, col3Content, col4Content];

  // Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace element
  element.replaceWith(table);
}
