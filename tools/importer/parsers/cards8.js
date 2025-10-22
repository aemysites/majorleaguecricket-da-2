/* global WebImporter */
export default function parse(element, { document }) {
  // Create header row
  const rows = [['Cards (cards8)']];

  // Find the cards container
  const cardsContainer = element.querySelector('.statsfull__type--statscards');
  if (!cardsContainer) return;
  const cardEls = Array.from(cardsContainer.querySelectorAll('.statsfull__type--statscard'));
  if (!cardEls.length) return;

  cardEls.forEach(cardEl => {
    // Image
    const img = cardEl.querySelector('img');
    // Compose text cell
    const textCell = document.createElement('div');

    // Player name (title)
    const playerNameP = cardEl.querySelector('.statsfull__type--statscard-playername');
    if (playerNameP) {
      // Get player name only (not team abbreviation)
      let playerName = '';
      // The first text node before <br> is the player name
      for (let node of playerNameP.childNodes) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          playerName = node.textContent.trim();
          break;
        }
      }
      if (playerName) {
        const h3 = document.createElement('h3');
        h3.textContent = playerName;
        textCell.appendChild(h3);
      }
    }

    // Team abbreviation (from span in playerNameP or .hide-mbl)
    let teamAbbr = '';
    const teamSpan = playerNameP ? playerNameP.querySelector('span') : null;
    if (teamSpan) {
      teamAbbr = teamSpan.textContent.trim();
    } else {
      const teamNameP = cardEl.querySelector('.statsfull__type--statscard-teamname.hide-mbl');
      if (teamNameP) {
        teamAbbr = teamNameP.textContent.trim();
      }
    }
    if (teamAbbr) {
      const teamDiv = document.createElement('div');
      teamDiv.textContent = teamAbbr;
      teamDiv.style.fontWeight = 'bold';
      textCell.appendChild(teamDiv);
    }

    // Rank and runs
    const pointsSec = cardEl.querySelector('.statsfull__type--statscard-pointssec');
    if (pointsSec) {
      const rankP = pointsSec.querySelector('.statsfull__type--statscard-no');
      const runsP = pointsSec.querySelector('.statsfull__type--statscard-pointsval');
      if (rankP && runsP) {
        const statsDiv = document.createElement('div');
        statsDiv.style.marginTop = '0.5em';
        statsDiv.textContent = `${rankP.textContent.trim()} | ${runsP.textContent.trim()}`;
        textCell.appendChild(statsDiv);
      }
    }

    rows.push([img, textCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}
