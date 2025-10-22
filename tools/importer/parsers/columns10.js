/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only parse if this looks like a teaminfo-result block
  if (!element.classList.contains('teaminfo-result')) return;

  // Helper to extract team info from a teamA/teamB element
  function extractTeamInfo(teamEl) {
    // Team name (full)
    const nameFull = teamEl.querySelector('.teamnamefull');
    // Team name (short)
    const nameShort = teamEl.querySelector('.teamnameshort');
    // Team logo
    const logoDiv = teamEl.querySelector('.teamlogo');
    const logoImg = logoDiv ? logoDiv.querySelector('img') : null;
    // Score and overs
    const runs = teamEl.querySelector('.runs');
    const overs = teamEl.querySelector('.overs');
    // Compose block: nameFull, nameShort, score, overs, logo
    const container = document.createElement('div');
    if (nameFull) container.appendChild(nameFull);
    if (nameShort) container.appendChild(nameShort);
    if (runs) container.appendChild(runs);
    if (overs) container.appendChild(overs);
    if (logoImg) container.appendChild(logoImg);
    return container;
  }

  // Find teamA and teamB
  const teamA = element.querySelector('.teamA');
  const teamB = element.querySelector('.teamB');
  // Find the 'Vs' separator
  const vsEl = element.querySelector('.vs');

  // Defensive: If any required part is missing, skip
  if (!teamA || !teamB || !vsEl) return;

  // Compose table rows
  const headerRow = ['Columns block (columns10)'];
  // Second row: left team, center 'Vs', right team
  const row = [
    extractTeamInfo(teamA),
    vsEl,
    extractTeamInfo(teamB)
  ];

  const cells = [headerRow, row];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
