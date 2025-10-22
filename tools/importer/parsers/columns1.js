/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only parse if this looks like a match header block
  if (!element.classList.contains('matchheader')) return;

  // Header row for the block
  const headerRow = ['Columns block (columns1)'];

  // Get the match info and venue
  const matchInfoDiv = element.querySelector('.matchinfo');
  const venueDiv = element.querySelector('.matchvenue');

  // Defensive: Make sure required elements exist
  if (!matchInfoDiv || !venueDiv) return;

  // Get the <ul> and its <li>s
  const ul = matchInfoDiv.querySelector('ul');
  if (!ul) return;
  const lis = ul.querySelectorAll('li');

  // Defensive: Expecting at least 2 <li>s
  if (lis.length < 2) return;

  // Create first column: Match number (bold)
  const matchNo = document.createElement('span');
  matchNo.style.fontWeight = 'bold';
  matchNo.textContent = lis[0].textContent.trim();

  // Second column: Date/time (date/time in red)
  const dateTime = document.createElement('span');
  // We'll make the entire date/time red
  dateTime.style.color = 'red';
  dateTime.textContent = lis[1].textContent.trim();

  // Third column: Venue (bold, right aligned)
  const venue = document.createElement('span');
  venue.style.fontWeight = 'bold';
  venue.style.float = 'right';
  venue.textContent = venueDiv.textContent.trim();

  // Build the row
  const row = [matchNo, dateTime, venue];

  // Create the table
  const cells = [headerRow, row];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
