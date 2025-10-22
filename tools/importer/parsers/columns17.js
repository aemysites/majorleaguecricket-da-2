/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Columns block
  const headerRow = ['Columns (columns17)'];

  // Defensive: Get immediate children
  const children = Array.from(element.querySelectorAll(':scope > div'));

  // Find teamA, vs, teamB containers
  const teamA = children.find(child => child.classList.contains('teamA'));
  const vs = children.find(child => child.classList.contains('vs'));
  const teamB = children.find(child => child.classList.contains('teamB'));

  // Helper to extract team info (name, logo, short name)
  function extractTeamInfo(teamEl, order = 'left') {
    if (!teamEl) return '';
    const nameScore = teamEl.querySelector('.namescore');
    const teamNameFull = nameScore && nameScore.querySelector('.teamnamefull');
    const teamNameShort = nameScore && nameScore.querySelector('.teamnameshort');
    const teamLogo = teamEl.querySelector('.teamlogo img');
    // Compose: name + short + logo (left) or logo + name + short (right)
    const frag = document.createElement('div');
    frag.style.display = 'flex';
    frag.style.alignItems = 'center';
    if (order === 'left') {
      if (teamNameFull) frag.append(teamNameFull);
      if (teamNameShort) frag.append(teamNameShort);
      if (teamLogo) frag.append(teamLogo);
    } else {
      if (teamLogo) frag.append(teamLogo);
      if (teamNameFull) frag.append(teamNameFull);
      if (teamNameShort) frag.append(teamNameShort);
    }
    return frag;
  }

  // Left column: WASHINGTON FREEDOM + WF + logo
  const leftCol = extractTeamInfo(teamA, 'left');

  // Center column: Vs text
  let centerCol = '';
  if (vs) {
    const vsSpan = vs.querySelector('span');
    if (vsSpan) centerCol = vsSpan;
    else centerCol = vs.textContent;
  }

  // Right column: TEXAS SUPER KINGS + TSK + logo
  const rightCol = extractTeamInfo(teamB, 'right');

  // Compose table rows
  const rows = [
    headerRow,
    [leftCol, centerCol, rightCol]
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
