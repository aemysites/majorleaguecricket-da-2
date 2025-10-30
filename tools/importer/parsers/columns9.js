/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Columns (columns9)'];

  // Extract the banner heading (MLC News)
  let bannerHeading = '';
  const bannerH1 = element.querySelector('.banner__h1--news');
  if (bannerH1) {
    bannerHeading = bannerH1.textContent.trim();
  }

  // --- COLUMN 1: Left (Image) ---
  let leftColContent = '';
  const newsTopSec = element.querySelector('.news__topsec');
  if (newsTopSec) {
    const leftDiv = newsTopSec.querySelector('.news__left');
    if (leftDiv) {
      const img = leftDiv.querySelector('img');
      if (img) leftColContent = img;
    }
  }

  // --- COLUMN 2: Right (Heading) ---
  let rightColContent = '';
  if (newsTopSec) {
    const rightDiv = newsTopSec.querySelector('.news__right');
    if (rightDiv) {
      const heading = rightDiv.querySelector('.news__right--heading');
      if (heading) rightColContent = heading;
    }
  }

  // Compose the table rows
  const cells = [
    headerRow,
    [bannerHeading], // Banner heading as its own row (single cell)
    [leftColContent, rightColContent]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
