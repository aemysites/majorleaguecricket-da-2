/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards13) block parser for team cards
  // 1. Find the card containers (some may be empty)
  const cardContainers = Array.from(element.querySelectorAll('.team__cards')).filter(c => c.children.length > 0);
  // Use the first non-empty container with actual cards
  const cardsParent = cardContainers[0];
  if (!cardsParent) {
    // No cards found, do nothing
    element.replaceWith(document.createTextNode(''));
    return;
  }
  // 2. Get all card anchors (each is a card)
  const cardAnchors = Array.from(cardsParent.querySelectorAll('.team__anchor'));

  // 3. Build table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards13)']);

  cardAnchors.forEach(anchor => {
    // Each anchor contains a card div with an image
    const cardDiv = anchor.querySelector('.team__card');
    const img = cardDiv.querySelector('img');
    // Defensive: get alt text for team name
    const teamName = img.getAttribute('alt') || '';
    // Compose the text cell: use the full alt text as a heading
    const heading = document.createElement('strong');
    heading.textContent = teamName;
    // If the anchor has a href, add it as a call-to-action link below the heading
    let textCell;
    if (anchor.href) {
      const cta = document.createElement('a');
      cta.href = anchor.href;
      cta.textContent = 'View team';
      // Compose cell with heading and CTA
      textCell = document.createElement('div');
      textCell.appendChild(heading);
      textCell.appendChild(document.createElement('br'));
      textCell.appendChild(cta);
    } else {
      textCell = heading;
    }
    // Compose the row: [image, text]
    rows.push([img, textCell]);
  });

  // 4. Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // 5. Replace the original element
  element.replaceWith(block);
}
