/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main stats table block
  const statsTableBlock = element.querySelector('.statsfull__type');
  if (!statsTableBlock) return;

  // Always use the correct block header
  const headerRow = ['Table (striped, bordered, tableStripedBordered8)'];

  // Extract filter dropdowns and their visible text
  const dropdowns = Array.from(statsTableBlock.querySelectorAll('.statsfull__type--dropdowncontainer, .statsfull__type--dropdowncontainer-players'));
  const filterRow = [
    dropdowns.map(drop => {
      const label = drop.querySelector('.filter-label');
      const select = drop.querySelector('select');
      let options = [];
      if (select) {
        options = Array.from(select.options).map(opt => opt.textContent.trim()).filter(Boolean);
      }
      return [label ? label.textContent.trim() : '', ...options].filter(Boolean).join(' | ');
    }).filter(Boolean).join(' || ')
  ];

  // Extract stat cards (top 5 players)
  const statCardsContainer = statsTableBlock.querySelector('.statsfull__type--statscards');
  const statCardsRow = [
    statCardsContainer ? Array.from(statCardsContainer.querySelectorAll('.statsfull__type--statscard')).map(card => {
      const name = card.querySelector('.statsfull__type--statscard-playername');
      const team = card.querySelector('.statsfull__type--statscard-teamname.hide-mbl');
      const runs = card.querySelector('.statsfull__type--statscard-pointsval');
      const pos = card.querySelector('.statsfull__type--statscard-no');
      return [pos?.textContent.trim(), name?.textContent.replace(/\s+/g, ' ').trim(), team?.textContent.trim(), runs?.textContent.replace(/\s+/g, ' ').trim()].filter(Boolean).join(' | ');
    }).join(' || ') : ''
  ];

  // Extract sidebar navigation (Batting/Bowling Leaders and stat categories)
  const sidebar = element.querySelector('.statsfull__wrapper--right');
  const sidebarRow = [
    sidebar ? Array.from(sidebar.querySelectorAll('h2, h3, .statsfull__panel--link')).map(el => el.textContent.trim()).filter(Boolean).join(' | ') : ''
  ];

  // Extract the main stats table (tabular data)
  const statsTable = statsTableBlock.querySelector('.statsfull__type--table');
  let tableRows = [];
  if (statsTable) {
    const trs = Array.from(statsTable.querySelectorAll('tr'));
    for (const tr of trs) {
      const cells = Array.from(tr.children).map(td => td.textContent.trim());
      tableRows.push(cells);
    }
  }

  // Compose the final table
  const cells = [
    headerRow,
    filterRow,
    statCardsRow,
    sidebarRow,
    ...tableRows
  ];

  // Create the block table and replace the element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
