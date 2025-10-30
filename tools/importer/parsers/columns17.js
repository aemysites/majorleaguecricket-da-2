/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get immediate children
  const children = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Expecting three main children: teamA, vs, teamB
  const teamA = children.find((c) => c.classList.contains('teamA'));
  const vs = children.find((c) => c.classList.contains('vs'));
  const teamB = children.find((c) => c.classList.contains('teamB'));

  // --- Left Column (Team A) ---
  let leftCell = document.createElement('div');
  if (teamA) {
    // Get team name (full and short)
    const nameFull = teamA.querySelector('.teamnamefull');
    const nameShort = teamA.querySelector('.teamnameshort');
    // Get logo
    const logo = teamA.querySelector('.teamlogo img');
    // Compose cell: name above logo, include all text
    if (nameFull) {
      const nameDiv = document.createElement('div');
      nameDiv.textContent = nameFull.textContent.trim();
      leftCell.appendChild(nameDiv);
    }
    if (nameShort) {
      const shortDiv = document.createElement('div');
      shortDiv.textContent = nameShort.textContent.trim();
      leftCell.appendChild(shortDiv);
    }
    if (logo) leftCell.appendChild(logo.cloneNode(true));
  }

  // --- Middle Column (Vs) ---
  let middleCell = document.createElement('div');
  if (vs) {
    middleCell.textContent = vs.textContent.trim();
    middleCell.style.textAlign = 'center';
  }

  // --- Right Column (Team B) ---
  let rightCell = document.createElement('div');
  if (teamB) {
    // Get logo
    const logo = teamB.querySelector('.teamlogo img');
    // Get team name (full and short)
    const nameFull = teamB.querySelector('.teamnamefull');
    const nameShort = teamB.querySelector('.teamnameshort');
    // Compose cell: logo above name, include all text
    if (logo) rightCell.appendChild(logo.cloneNode(true));
    if (nameFull) {
      const nameDiv = document.createElement('div');
      nameDiv.textContent = nameFull.textContent.trim();
      rightCell.appendChild(nameDiv);
    }
    if (nameShort) {
      const shortDiv = document.createElement('div');
      shortDiv.textContent = nameShort.textContent.trim();
      rightCell.appendChild(shortDiv);
    }
  }

  // Table rows
  const headerRow = ['Columns block (columns17)'];
  const columnsRow = [leftCell, middleCell, rightCell];

  // Create block table
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace element
  element.replaceWith(block);
}
