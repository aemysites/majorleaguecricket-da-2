/* global WebImporter */
export default function parse(element, { document }) {
  // Get the columns from the footer
  const columns = Array.from(element.querySelectorAll('.footer__container > .footer__column'));

  // Defensive: fallback if structure changes
  if (columns.length < 4) return;

  // --- Column 1: Logo, addresses, copyright ---
  const col1 = columns[0];
  const logoRow = col1.querySelector('.footer__logorow');
  const logoImg = logoRow ? logoRow.querySelector('img') : null;
  const addressSec = logoRow ? logoRow.querySelector('.footer__addresssec') : null;
  const addresses = addressSec ? Array.from(addressSec.children) : [];
  const copyright = col1.querySelector('.footer__copy');
  // Compose column 1 cell
  const col1Cell = [];
  if (logoImg) col1Cell.push(logoImg);
  addresses.forEach(addr => col1Cell.push(addr));
  if (copyright) col1Cell.push(copyright);

  // --- Column 2: Teams ---
  const col2 = columns[1];
  const col2Cell = [];
  const col2Title = col2.querySelector('.footer__column--title');
  if (col2Title) col2Cell.push(col2Title);
  const col2Links = col2.querySelector('.footer__column--links');
  if (col2Links) col2Cell.push(col2Links);

  // --- Column 3: Site Map ---
  const col3 = columns[2];
  const col3Cell = [];
  const col3Title = col3.querySelector('.footer__column--title');
  if (col3Title) col3Cell.push(col3Title);
  const col3Links = col3.querySelector('.footer__column--links');
  if (col3Links) col3Cell.push(col3Links);

  // --- Column 4: About + Social ---
  const col4 = columns[3];
  const col4Cell = [];
  const col4Title = col4.querySelector('.footer__column--title');
  if (col4Title) col4Cell.push(col4Title);
  const col4Links = col4.querySelector('.footer__column--links');
  if (col4Links) col4Cell.push(col4Links);
  const social = col4.querySelector('.footer__social');
  if (social) col4Cell.push(social);

  // Table header
  const headerRow = ['Columns block (columns3)'];
  // Table content row
  const contentRow = [col1Cell, col2Cell, col3Cell, col4Cell];

  // Create table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
