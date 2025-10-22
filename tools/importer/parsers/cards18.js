/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards18) block: 2 columns, first row is header, each subsequent row is [image(s), text content]
  const headerRow = ['Cards (cards18)'];
  const rows = [headerRow];

  // Find all card elements (videos__video)
  const cardEls = element.querySelectorAll('.videos__video');

  cardEls.forEach(cardEl => {
    // Image cell: include both the thumbnail and the play icon
    const images = [];
    const thumbImg = cardEl.querySelector('.videos__thumbnailsec--thumbnail');
    if (thumbImg) images.push(thumbImg);
    const playIconImg = cardEl.querySelector('.videos__playicon');
    if (playIconImg) images.push(playIconImg);
    const imageCell = images.length === 1 ? images[0] : images;

    // Text content: date and title
    const desc = cardEl.querySelector('.videos__desc');
    let textCell = '';
    if (desc) {
      const dateEl = desc.querySelector('.videos__desc-date');
      const titleEl = desc.querySelector('.videos__desc-title');
      const textFragments = [];
      if (dateEl) {
        const dateDiv = document.createElement('div');
        dateDiv.textContent = dateEl.textContent.trim();
        textFragments.push(dateDiv);
      }
      if (titleEl) {
        const titleDiv = document.createElement('div');
        const strong = document.createElement('strong');
        strong.textContent = titleEl.textContent.trim();
        titleDiv.appendChild(strong);
        textFragments.push(titleDiv);
      }
      textCell = textFragments;
    }

    rows.push([imageCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
