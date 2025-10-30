/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Columns block (columns13)'];

  // Find the main columns in the footer
  const container = element.querySelector('.footer__container');
  if (!container) return;

  // Get all columns (should be 4)
  const columns = Array.from(container.children);

  // Defensive: Only keep columns that have content
  const contentColumns = columns.filter(col => col.textContent.trim() || col.querySelector('img'));

  // For each column, gather its content
  const cells = contentColumns.map(col => {
    // First column: logo, addresses, copyright
    if (col.classList.contains('footer__column--1')) {
      const parts = [];
      // Logo
      const logo = col.querySelector('.footer__logo');
      if (logo) parts.push(logo);
      // Address blocks
      const addressSec = col.querySelector('.footer__addresssec');
      if (addressSec) {
        // Reference the address section (preserves both addresses)
        parts.push(addressSec);
      }
      // Copyright (may be outside address section)
      const copyright = col.querySelector('.footer__copy');
      if (copyright) parts.push(copyright);
      return parts;
    }
    // Other columns: title, links, social icons (only last column)
    const colParts = [];
    const title = col.querySelector('.footer__column--title');
    if (title) colParts.push(title);
    const links = col.querySelector('.footer__column--links');
    if (links) colParts.push(links);
    const social = col.querySelector('.footer__social');
    if (social) colParts.push(social);
    return colParts;
  });

  // Build the block table: header row, then one row with all columns
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cells
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
