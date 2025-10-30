/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards12) block parsing for team cards
  const headerRow = ['Cards (cards12)'];
  const rows = [headerRow];

  // Find the parent container for all cards
  // There are two .team__cards divs, the second contains all the cards
  const cardsContainers = element.querySelectorAll('.team__cards');
  let cardsContainer = null;
  if (cardsContainers.length > 1) {
    cardsContainer = cardsContainers[1];
  } else if (cardsContainers.length === 1) {
    cardsContainer = cardsContainers[0];
  }
  if (!cardsContainer) return;

  // Each card is an anchor containing a div and an img
  const cardAnchors = Array.from(cardsContainer.querySelectorAll('a.team__anchor'));

  cardAnchors.forEach((anchor) => {
    // Get the team card div and logo img
    const cardDiv = anchor.querySelector('.team__card');
    const logoImg = cardDiv ? cardDiv.querySelector('img.team__card--logo') : null;
    // Defensive: If no image, skip this card
    if (!logoImg) return;

    // Team name: Prefer the image alt attribute (since it's visually prominent in screenshot)
    const teamName = logoImg.getAttribute('alt') || '';
    // Title as heading
    const titleEl = document.createElement('strong');
    titleEl.textContent = teamName;

    // If the anchor has an href, make the team name a link
    let textContent;
    if (anchor.getAttribute('href')) {
      const link = document.createElement('a');
      link.href = anchor.href;
      link.appendChild(titleEl);
      textContent = link;
    } else {
      textContent = titleEl;
    }

    // --- FIX: Add all visible text from the card (if any) below the title ---
    // Sometimes the team name may be present as text in the card div (not just the alt)
    // Collect all text nodes from cardDiv except those inside the img
    let extraText = '';
    // Get all text nodes directly under cardDiv
    cardDiv.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const t = node.textContent.trim();
        if (t && t !== teamName) extraText += (extraText ? '\n' : '') + t;
      }
    });
    // If extra text found, add as paragraph
    if (extraText) {
      const desc = document.createElement('p');
      desc.textContent = extraText;
      // Compose cell: [title/link, description]
      const cell = document.createElement('div');
      cell.appendChild(textContent);
      cell.appendChild(desc);
      textContent = cell;
    }

    // Each row: [image, text]
    rows.push([logoImg, textContent]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the block
  element.replaceWith(block);
}
