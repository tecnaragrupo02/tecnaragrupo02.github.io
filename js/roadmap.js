(() => {
  'use strict';

  const root = document.getElementById('timeline');
  const empty = document.getElementById('roadmap-empty');
  const entries = Array.isArray(window.ROADMAP) ? window.ROADMAP : [];

  // Only allow http(s) links, so a bad value can't become a javascript: URL.
  const safeUrl = url => {
    try {
      const u = new URL(url);
      return u.protocol === 'https:' || u.protocol === 'http:' ? u.href : null;
    } catch (_) { return null; }
  };

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  const formatDate = iso => {
    const d = new Date(iso + 'T00:00:00');
    return isNaN(d) ? iso : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  function projectCard(p) {
    const card = el('div', 'project');
    card.append(el('h4', '', p.name || 'Untitled project'));
    if (p.description) card.append(el('p', '', p.description));

    const href = p.repo && safeUrl(p.repo);
    if (href) {
      const a = el('a', 'repo-link', 'View on GitHub →');
      a.href = href;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      card.append(a);
    } else {
      card.append(el('span', 'badge-private', 'Private'));
    }
    return card;
  }

  entries
    .slice()
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
    .forEach(entry => {
      const item = el('li', 'step');
      item.append(el('time', 'step-date', formatDate(entry.date)));
      item.append(el('h3', '', entry.title || 'Untitled'));
      if (entry.notes) item.append(el('p', 'step-notes', entry.notes));

      const projects = Array.isArray(entry.projects) ? entry.projects : [];
      if (projects.length) {
        const wrap = el('div', 'projects');
        projects.forEach(p => wrap.append(projectCard(p)));
        item.append(wrap);
      }
      root.append(item);
    });

  empty.hidden = entries.length > 0;
})();
