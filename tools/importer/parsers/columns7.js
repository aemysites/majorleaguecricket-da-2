/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get all top-level sponsor columns
  const columns = [];
  // Defensive: Only select direct children that are columns
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  columnDivs.forEach((colDiv) => {
    // Each column: find heading and all sponsor containers
    let heading = null;
    // Try h3 first, then div with heading class
    heading = colDiv.querySelector('h3, .sponsors__heading');
    // Gather all sponsor containers (may be nested)
    const sponsorContainers = Array.from(colDiv.querySelectorAll('.sponsors__container'));
    // Compose column content
    const cellContent = [];
    if (heading) cellContent.push(heading);
    // For each sponsor container, add its content (usually <a><img></a>)
    sponsorContainers.forEach((container) => {
      // If container is an <a>, use it directly
      if (container.tagName === 'A') {
        cellContent.push(container);
      } else {
        // Otherwise, get all links/images inside
        const links = Array.from(container.querySelectorAll('a'));
        if (links.length) {
          cellContent.push(...links);
        } else {
          // Fallback: images directly
          const imgs = Array.from(container.querySelectorAll('img'));
          cellContent.push(...imgs);
        }
      }
    });
    columns.push(cellContent);
  });

  // Table rows
  const headerRow = ['Columns block (columns7)'];
  const contentRow = columns;

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace element
  element.replaceWith(table);
}
