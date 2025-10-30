/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns10)'];

  // Defensive: Get all immediate children (teamA, vs, teamB)
  const children = Array.from(element.querySelectorAll(':scope > div'));

  // Find teamA, vs, teamB
  const teamA = children.find((el) => el.classList.contains('teamA'));
  const vs = children.find((el) => el.classList.contains('vs'));
  const teamB = children.find((el) => el.classList.contains('teamB'));

  // Helper to extract team info block, now includes short name
  function extractTeamBlock(teamEl) {
    if (!teamEl) return '';
    // Get logo
    const logoDiv = teamEl.querySelector('.teamlogo');
    const logoImg = logoDiv ? logoDiv.querySelector('img') : null;
    // Get namescore
    const namescoreDiv = teamEl.querySelector('.namescore');
    // Compose block: name, short name, logo, score, overs
    const frag = document.createElement('div');
    if (namescoreDiv) {
      // Team name
      const nameFull = namescoreDiv.querySelector('.teamnamefull');
      if (nameFull) frag.appendChild(nameFull.cloneNode(true));
      // Team short name
      const nameShort = namescoreDiv.querySelector('.teamnameshort');
      if (nameShort) frag.appendChild(nameShort.cloneNode(true));
    }
    // Logo
    if (logoImg) frag.appendChild(logoImg.cloneNode(true));
    if (namescoreDiv) {
      // Score block
      const teamscore = namescoreDiv.querySelector('.teamscore');
      if (teamscore) {
        const runs = teamscore.querySelector('.runs');
        const overs = teamscore.querySelector('.overs');
        if (runs) frag.appendChild(runs.cloneNode(true));
        if (overs) frag.appendChild(overs.cloneNode(true));
      }
    }
    return frag;
  }

  // Extract 'Vs' text
  let vsContent = '';
  if (vs) {
    const vsSpan = vs.querySelector('span');
    if (vsSpan) {
      vsContent = document.createElement('div');
      vsContent.appendChild(vsSpan.cloneNode(true));
    }
  }

  // Compose table rows
  const row = [
    extractTeamBlock(teamA),
    vsContent,
    extractTeamBlock(teamB)
  ];

  // Build table
  const cells = [headerRow, row];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
