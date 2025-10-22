/* global WebImporter */
export default function parse(element, { document }) {
  // Columns block header row
  const headerRow = ['Columns block (columns12)'];

  // Find the main footer container
  const footerContainer = element.querySelector('.footer__container') || element;

  // Get all columns in order (leftmost column may have a special class)
  const columns = Array.from(footerContainer.querySelectorAll(':scope > .footer__column, :scope > .footer__column--1'));

  // Defensive fallback: if no columns found, use all direct child divs
  const columnDivs = columns.length ? columns : Array.from(footerContainer.querySelectorAll(':scope > div'));

  // Build the second row: each cell is the content of one column, without outer .footer__column wrappers
  const secondRow = columnDivs.map((col) => {
    // Leftmost column: logo, addresses, copyright
    if (col.classList.contains('footer__column--1')) {
      const cellContent = [];
      const logo = col.querySelector('.footer__logo');
      if (logo) cellContent.push(logo);
      // Addresses: can be grouped or individual
      const addressSec = col.querySelector('.footer__addresssec');
      if (addressSec) {
        Array.from(addressSec.children).forEach(addr => cellContent.push(addr));
      } else {
        // Fallback: individual address blocks
        Array.from(col.querySelectorAll('.footer__address')).forEach(addr => cellContent.push(addr));
      }
      const copyright = col.querySelector('.footer__copy');
      if (copyright) cellContent.push(copyright);
      return cellContent;
    }
    // For other columns, extract only the inner content (not the outer .footer__column wrapper)
    const content = [];
    // Section heading
    const heading = col.querySelector('.footer__column--title');
    if (heading) content.push(heading);
    // Navigation links
    const links = col.querySelector('.footer__column--links');
    if (links) {
      Array.from(links.children).forEach(link => content.push(link));
    }
    // Social media and Minor League Cricket link (for last column)
    const social = col.querySelector('.footer__social');
    if (social) {
      Array.from(social.children).forEach(child => content.push(child));
    }
    // Minor League Cricket link (may be outside .footer__social)
    const mlcLink = Array.from(col.querySelectorAll('a')).find(a => a.textContent.trim().toLowerCase().includes('minor league cricket'));
    if (mlcLink && !content.includes(mlcLink)) content.push(mlcLink);
    return content;
  });

  // Create the table
  const cells = [headerRow, secondRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
