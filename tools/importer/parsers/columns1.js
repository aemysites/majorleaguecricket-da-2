/* global WebImporter */
export default function parse(element, { document }) {
  // Only parse if this looks like a match header block
  if (!element.classList.contains('matchheader')) return;

  // Find the match info (number and date/time)
  const matchInfoDiv = Array.from(element.children).find(child => child.classList.contains('matchinfo'));
  // Find the venue
  const venueDiv = Array.from(element.children).find(child => child.classList.contains('matchvenue'));

  if (!matchInfoDiv || !venueDiv) return;

  // Get the <ul> inside matchinfo
  const ul = matchInfoDiv.querySelector('ul');
  if (!ul) return;
  const lis = ul.querySelectorAll('li');
  if (lis.length < 2) return;

  // Extract plain text for each cell
  const matchNoText = lis[0].textContent.trim();
  const dateTimeText = lis[1].textContent.trim();
  const venueText = venueDiv.textContent.trim();

  // Table header row
  const headerRow = ['Columns block (columns1)'];
  // Table content row: three columns of plain text
  const contentRow = [matchNoText, dateTimeText, venueText];

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block
  element.replaceWith(block);
}
