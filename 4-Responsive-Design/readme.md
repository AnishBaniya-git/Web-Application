# Making the Todo List Responsive

You already know flexbox and grid — this task is about applying media queries
to adapt the existing layout for smaller screens. As with the previous
exercise, you need to figure out the right selectors and values yourself.

Target two breakpoints:

- **Tablet**: max-width 1024px
- **Mobile**: max-width 640px

## Task 1: Collapse the sidebar on tablet

### Requirements

- At tablet width and below, `.root-container` should stop using a 2-column
  grid and stack into a single column instead.
- The sidebar (`.sidebar` / `aside`) should no longer take up a fixed
  fraction of the width — it should sit above `<main>` and only be as tall
  as its content needs (not `min-height: 100vh`).
- The fixed footer from the earlier exercise should not overlap page content
  at this width — make sure it doesn't cover the sidebar menu or task cards.

### Hints

- `grid-template-columns: 1fr 4fr` is the line you need to override inside
  a media query.
- `min-height: 100vh` on `aside` was fine for a sidebar sitting next to
  content, but doesn't make sense once it stacks on top.
- Think about whether `.page-footer` should stay `position: fixed` on
  smaller screens, or whether reverting it to `static` is more appropriate
  once the sidebar isn't a tall fixed column anymore.

## Task 2: Turn the sidebar menu into a horizontal nav on tablet/mobile

### Requirements

- `.sidebar-menu` currently lists items vertically. At tablet width and
  below, lay the menu items out horizontally instead.
- Items should wrap to a new line rather than overflowing or shrinking the
  text unreadably on narrow screens.

### Hints

- `.sidebar-menu` is already a `<menu>` element — you can turn it into a
  flex container without touching the HTML.
- `flex-wrap` is your friend here.

## Task 3: Make the task cards a single column on mobile

### Requirements

- `.task-list` currently uses `grid-template-columns: auto auto auto`
  (3 columns). At tablet width, reduce this to 2 columns. At mobile width,
  reduce it to 1 column.
- Task cards should never become so narrow that the title, date, and
  buttons in the footer wrap awkwardly or overlap.

### Hints

- This is a single property to override per breakpoint:
  `grid-template-columns`.
- Check `.task-card footer` — at narrow widths, do the two buttons
  (`Mark As Completed` / `Delete`) still fit comfortably side by side, or
  should they stack?

## Task 4: Make the summary cards wrap on mobile

### Requirements

- `#summary-container` uses `display: flex` with three cards that
  `flex-grow`. On mobile, this can squeeze each card too narrow to read.
- At mobile width, the three summary cards should stack vertically (or wrap
  to multiple rows) instead of squeezing into one row.

### Hints

- You don't need to remove `display: flex` — `flex-direction` or
  `flex-wrap` can solve this with one extra line.

---

### How to check your work

Resize your browser window (or use dev tools' device toolbar) and pass
through both breakpoints slowly. At each breakpoint, confirm:

1. No horizontal scrollbar appears.
2. No text or buttons overlap.
3. The fixed footer never covers content you need to read or click.
