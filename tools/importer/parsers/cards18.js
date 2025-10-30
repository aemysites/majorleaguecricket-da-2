/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards18) block parsing
  // 1. Header row
  const headerRow = ['Cards (cards18)'];

  // 2. Find all card elements (specific selector for this structure)
  const cardElements = element.querySelectorAll('.videos__video');

  // 3. Build rows for each card
  const rows = Array.from(cardElements).map(card => {
    // --- Image cell ---
    // Get both the main thumbnail image and play icon overlay
    const thumbnailSec = card.querySelector('.videos__thumbnailsec');
    let thumbnailImg = thumbnailSec ? thumbnailSec.querySelector('img.videos__thumbnailsec--thumbnail') : null;
    let playIconImg = thumbnailSec ? thumbnailSec.querySelector('img.videos__playicon') : null;
    // Defensive: fallback to first/second img if not found
    if (!thumbnailImg && thumbnailSec) {
      thumbnailImg = thumbnailSec.querySelector('img');
    }
    // Compose image cell with both images (if present)
    const imageCell = document.createElement('div');
    if (thumbnailImg) imageCell.appendChild(thumbnailImg.cloneNode(true));
    if (playIconImg) imageCell.appendChild(playIconImg.cloneNode(true));

    // --- Text cell ---
    const desc = card.querySelector('.videos__desc');
    // Date
    const dateP = desc ? desc.querySelector('.videos__desc-date') : null;
    // Title
    const titleP = desc ? desc.querySelector('.videos__desc-title') : null;
    // Compose text cell: date (small), then title (bold)
    const textCell = document.createElement('div');
    if (dateP) {
      const dateDiv = document.createElement('div');
      dateDiv.textContent = dateP.textContent.trim();
      dateDiv.style.fontSize = 'smaller';
      textCell.appendChild(dateDiv);
    }
    if (titleP) {
      const titleDiv = document.createElement('div');
      titleDiv.textContent = titleP.textContent.trim();
      titleDiv.style.fontWeight = 'bold';
      textCell.appendChild(titleDiv);
    }
    // --- Row: [images, text] ---
    return [imageCell, textCell];
  });

  // 4. Compose table
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // 5. Replace original element
  element.replaceWith(block);
}
