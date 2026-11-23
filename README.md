# Tecnara Grupo 02

A static website about AI development, hosted on GitHub Pages at
`https://tecnaragrupo02.github.io`.

There is no build step and no dependencies: plain HTML, CSS and vanilla JavaScript.

## Pages

| Page | File | What it is |
|------|------|------------|
| Home | `index.html` | Landing page with the group's focus areas, stack and a link to the GitHub account. |
| Tasks | `tasks.html` | Simple task manager (add, complete, delete, filter, clear completed). |
| Road to Rome | `roadmap.html` | Timeline of what we do in class: small projects, their definitions and links to the code. |

## Project structure

```
.
├── index.html
├── tasks.html
├── roadmap.html
├── css/
│   ├── styles.css        # shared theme, nav, buttons, cards, footer
│   ├── tasks.css         # task manager styles
│   └── roadmap.css       # timeline styles
└── js/
    ├── tasks.js          # task manager logic
    ├── roadmap-data.js   # roadmap content (edit this one)
    └── roadmap.js        # renders the roadmap from the data
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Task manager

- Tasks are stored in the browser's `localStorage` under the key `tecnara.tasks.v1`.
- Each visitor has their own list. Nothing is shared or sent to a server, because the site is static.
- The first visit starts with 3 example tasks.
- To reset the list, run this in the browser console and reload:

  ```js
  localStorage.removeItem('tecnara.tasks.v1')
  ```

## Adding to Road to Rome

Edit `js/roadmap-data.js` and add an entry at the top of the `window.ROADMAP` array:

```js
{
  date: '2026-11-23',            // YYYY-MM-DD
  title: 'Intro to Git',
  notes: 'Optional text about the class.',
  projects: [
    {
      name: 'Hello Repo',
      description: 'What the project is, in a sentence or two.',
      repo: 'https://github.com/tecnaragrupo02/hello-repo'  // omit while private
    }
  ]
}
```

- Entries are sorted by date, newest first.
- A project without `repo` shows a "Private" badge. Add the link when the repository goes public.
- Only `http` and `https` links are accepted.
- Remember to delete the "Example entry" placeholder.

## Deploying

Push to `main`. GitHub Pages rebuilds the site automatically, usually within a minute or two.
If a change doesn't show up, do a hard refresh (Ctrl+Shift+R).

## Links

- GitHub account: https://github.com/tecnaragrupo02
