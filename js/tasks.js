(() => {
  'use strict';

  const STORAGE_KEY = 'tecnara.tasks.v1';

  // Starter tasks, shown the first time someone opens the page.
  const SEED = [
    { id: 1, text: 'Train a small image classifier with PyTorch', done: false },
    { id: 2, text: 'Build a chatbot prototype using an LLM API', done: false },
    { id: 3, text: 'Write a README for the AI projects repo', done: true },
  ];

  const els = {
    form: document.getElementById('task-form'),
    input: document.getElementById('task-input'),
    list: document.getElementById('task-list'),
    counter: document.getElementById('counter'),
    empty: document.getElementById('empty'),
    clear: document.getElementById('clear-done'),
    filters: document.querySelectorAll('[data-filter]'),
  };

  let filter = 'all';
  let tasks = load();

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (_) { /* storage blocked or corrupted: fall back to seed */ }
    return SEED.map(t => ({ ...t }));
  }

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); } catch (_) {}
  }

  function nextId() {
    return tasks.reduce((max, t) => Math.max(max, t.id), 0) + 1;
  }

  function visible() {
    if (filter === 'active') return tasks.filter(t => !t.done);
    if (filter === 'done') return tasks.filter(t => t.done);
    return tasks;
  }

  function render() {
    els.list.replaceChildren();

    for (const task of visible()) {
      const li = document.createElement('li');
      li.className = 'task' + (task.done ? ' done' : '');
      li.dataset.id = task.id;

      const check = document.createElement('input');
      check.type = 'checkbox';
      check.checked = task.done;
      check.id = 'task-' + task.id;

      const label = document.createElement('label');
      label.htmlFor = check.id;
      label.textContent = task.text; // textContent: no HTML injection

      const del = document.createElement('button');
      del.type = 'button';
      del.className = 'del';
      del.setAttribute('aria-label', 'Delete task: ' + task.text);
      del.textContent = '✕';

      li.append(check, label, del);
      els.list.append(li);
    }

    const left = tasks.filter(t => !t.done).length;
    els.counter.textContent = `${left} task${left === 1 ? '' : 's'} left`;
    els.empty.hidden = visible().length > 0;
    els.clear.hidden = !tasks.some(t => t.done);
    els.filters.forEach(b => b.classList.toggle('active', b.dataset.filter === filter));
  }

  els.form.addEventListener('submit', e => {
    e.preventDefault();
    const text = els.input.value.trim();
    if (!text) return;
    tasks.push({ id: nextId(), text, done: false });
    els.input.value = '';
    save();
    render();
  });

  // One listener for the whole list (event delegation).
  els.list.addEventListener('click', e => {
    const li = e.target.closest('.task');
    if (!li) return;
    const id = Number(li.dataset.id);

    if (e.target.classList.contains('del')) {
      tasks = tasks.filter(t => t.id !== id);
    } else if (e.target.type === 'checkbox') {
      const task = tasks.find(t => t.id === id);
      if (task) task.done = e.target.checked;
    } else {
      return;
    }
    save();
    render();
  });

  els.clear.addEventListener('click', () => {
    tasks = tasks.filter(t => !t.done);
    save();
    render();
  });

  els.filters.forEach(btn => btn.addEventListener('click', () => {
    filter = btn.dataset.filter;
    render();
  }));

  render();
})();
