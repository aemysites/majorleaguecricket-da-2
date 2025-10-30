/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required header row
  const headerRow = ['Columns block (columns5)'];

  // TeamA info (name, short name, score, overs)
  const teamA = element.querySelector('.teamA');
  let teamAInfo;
  if (teamA) {
    const namescore = teamA.querySelector('.namescore');
    const frag = document.createDocumentFragment();
    if (namescore) {
      // Full name
      const teamNameFull = namescore.querySelector('.teamnamefull');
      if (teamNameFull) frag.appendChild(teamNameFull.cloneNode(true));
      // Short name
      const teamNameShort = namescore.querySelector('.teamnameshort');
      if (teamNameShort) {
        frag.appendChild(document.createElement('br'));
        frag.appendChild(teamNameShort.cloneNode(true));
      }
      // Score (runs)
      const runs = namescore.querySelector('.runs');
      if (runs) {
        frag.appendChild(document.createElement('br'));
        const strong = document.createElement('strong');
        strong.textContent = runs.textContent.trim();
        frag.appendChild(strong);
      }
      // Overs
      const overs = namescore.querySelector('.overs');
      if (overs) {
        frag.appendChild(document.createElement('br'));
        const small = document.createElement('small');
        small.textContent = overs.textContent.trim();
        frag.appendChild(small);
      }
    }
    teamAInfo = frag;
  }

  // TeamA logo
  let teamALogo;
  if (teamA) {
    const logo = teamA.querySelector('.teamlogo img');
    if (logo) teamALogo = logo;
  }

  // Vs separator (center cell)
  let vsCell;
  const vsDiv = element.querySelector('.vs');
  if (vsDiv) {
    vsCell = document.createElement('span');
    vsCell.textContent = vsDiv.textContent.trim();
  }

  // TeamB logo
  const teamB = element.querySelector('.teamB');
  let teamBLogo;
  if (teamB) {
    const logo = teamB.querySelector('.teamlogo img');
    if (logo) teamBLogo = logo;
  }

  // TeamB info (name, short name, score, overs)
  let teamBInfo;
  if (teamB) {
    const namescore = teamB.querySelector('.namescore');
    const frag = document.createDocumentFragment();
    if (namescore) {
      // Full name
      const teamNameFull = namescore.querySelector('.teamnamefull');
      if (teamNameFull) frag.appendChild(teamNameFull.cloneNode(true));
      // Short name
      const teamNameShort = namescore.querySelector('.teamnameshort');
      if (teamNameShort) {
        frag.appendChild(document.createElement('br'));
        frag.appendChild(teamNameShort.cloneNode(true));
      }
      // Score (runs)
      const runs = namescore.querySelector('.runs');
      if (runs) {
        frag.appendChild(document.createElement('br'));
        const strong = document.createElement('strong');
        strong.textContent = runs.textContent.trim();
        frag.appendChild(strong);
      }
      // Overs
      const overs = namescore.querySelector('.overs');
      if (overs) {
        frag.appendChild(document.createElement('br'));
        const small = document.createElement('small');
        small.textContent = overs.textContent.trim();
        frag.appendChild(small);
      }
    }
    teamBInfo = frag;
  }

  // Build the columns row
  const columnsRow = [teamAInfo, teamALogo, vsCell, teamBLogo, teamBInfo];

  // Table structure: header, then one row with five columns
  const cells = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
