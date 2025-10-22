/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Columns block (columns2)
  const headerRow = ['Columns block (columns2)'];

  // Defensive: get all direct children (should be teamA, vs, teamB)
  const children = Array.from(element.children);

  // Find teamA, vs, teamB blocks
  const teamA = children.find((el) => el.classList.contains('teamA'));
  const vs = children.find((el) => el.classList.contains('vs'));
  const teamB = children.find((el) => el.classList.contains('teamB'));

  // Helper to extract the full team block content (name, score, logo)
  function extractTeamBlock(teamEl) {
    if (!teamEl) return '';
    // We'll collect the name/score and logo blocks
    const blocks = [];
    // Name/score
    const nameScore = teamEl.querySelector('.namescore');
    if (nameScore) blocks.push(nameScore);
    // Logo
    const logo = teamEl.querySelector('.teamlogo');
    if (logo) blocks.push(logo);
    return blocks;
  }

  // Helper to extract the VS block (center cell)
  function extractVsBlock(vsEl) {
    if (!vsEl) return '';
    return vsEl;
  }

  // Compose the columns row: [teamA, vs, teamB]
  const columnsRow = [
    extractTeamBlock(teamA),
    extractVsBlock(vs),
    extractTeamBlock(teamB)
  ];

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
