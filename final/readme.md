# Task 6 — Making the App Interactive

## Overview

This task builds directly on Task 5. By now your page renders the task list and summary counts from the `taskList` array, and the "Add Task" modal opens and closes. In this task, you'll make the app actually **work**: adding tasks, updating their status, deleting them, and filtering what's shown.

Everything in this task revolves around one idea: **`taskList` is your single source of truth.** Every action a user takes should update `taskList` first, and then re-run your rendering logic from Task 5 so the screen reflects the new state. You should not be manually patching the DOM in little pieces — update the data, then re-render.

## Your tasks

### 1. Handle the "Add Task" form submission

The form (`#add-task-form`) already exists in the modal, with three inputs:

- `#task-title-input`
- `#task-deadline-input`
- `#task-description-input`

When the form is submitted:

- Prevent the default page reload.
- Read the values out of the three inputs.
- Build a new task object (matching the shape used in `taskList`: `title`, `deadline`, `description`, `status`) and push it into `taskList`. New tasks should start as **In Progress** (`status: 0`).
- Close the modal.
- Clear the form inputs so they're empty the next time the modal is opened.
- Re-render the task list and the summary counts so the new task appears immediately, with no page refresh.

### 2. Implement "Mark As Completed" and "Delete"

These buttons exist on each task card (conditionally, per Task 5), but right now they don't do anything.

- **Mark As Completed**: clicking this should update that specific task's `status` to `1` (Completed) in `taskList`, then re-render the task list and summary counts.
- **Delete**: clicking this should update that specific task's `status` to `2` (Deleted) in `taskList` — note that in this app, "deleting" is a soft delete, it changes status rather than removing the object from the array — then re-render.

The tricky part here is knowing **which** task in the array a given button belongs to. Think about how you'll connect a button click back to the correct object in `taskList`. A couple of approaches worth considering:

- Give each task a unique `id` when it's created (you'll need to add this to new tasks, and to your sample data from Task 5), and store that id on the card/button (e.g. as a `data-id` attribute) so you can look it up.
- Use event delegation on the task list container, rather than attaching a fresh listener to every single button every time you render.

Either is fine — just make sure it still works correctly after the list re-renders.

### 3. Implement sidebar filtering

The sidebar (`.sidebar-menu`) has four items: **All Tasks**, **In Progress**, **Completed**, **Deleted**. Right now "All Tasks" is hard-coded as `.selected` and the others do nothing.

Make it so that:

- Clicking a sidebar item filters the task list to show only tasks matching that status (or all tasks, for "All Tasks").
- The clicked item gets the `.selected` class, and it's removed from whichever item had it before.
- The summary counts at the top should **always** reflect the totals across all of `taskList`, regardless of which filter is active — only the task list itself should change.

Think back to your render function from Task 5: can you adapt it to accept "which tasks to show" as an input, rather than always assuming it should render every task in `taskList`?

### 4. Keep everything in sync

Once you've built all of the above, double check this flow works end-to-end without a page refresh at any point:

1. Add a new task → it appears In Progress, and the "In Progress" summary count goes up by 1.
2. Filter to "In Progress" → your new task is visible there.
3. Mark it as completed → it disappears from the "In Progress" filter view, the "Completed" count goes up by 1, and the "In Progress" count goes down by 1.
4. Switch the filter to "Completed" → it's there, with only a Delete button showing (per Task 5's rules).
5. Delete it → it disappears from the "Completed" filter view, and the "Deleted" count goes up by 1.
6. Switch the filter to "Deleted" → it's there, with no action buttons.
7. Switch back to "All Tasks" → everything is visible again.

## Acceptance criteria

- [ ] Submitting the Add Task form adds a new In Progress task to `taskList`, closes the modal, clears the form, and updates the visible list and summary without a page refresh.
- [ ] "Mark As Completed" changes only the clicked task's status, and re-renders correctly.
- [ ] "Delete" changes only the clicked task's status to Deleted, and re-renders correctly.
- [ ] Clicking each sidebar item filters the visible task list correctly and visually marks itself as `.selected`.
- [ ] The summary counts always reflect the full `taskList`, independent of the active filter.
- [ ] No part of this task requires (or causes) a page refresh.

## Things to think about

- Where does "which filter is currently active" live? It needs to survive across re-renders, so a plain local variable inside a function probably won't cut it — consider a variable scoped outside your render function.
- If you find yourself writing nearly the same loop in two different places (e.g. once for rendering, once for filtering), that's a sign you can combine them — filter the array first, then hand the result to your existing render function from Task 5.
- What happens if a user tries to mark a _deleted_ task as completed, or delete an already-deleted task? Should that even be possible given your Task 5 button rules? Worth double-checking your conditional rendering still holds up here.
