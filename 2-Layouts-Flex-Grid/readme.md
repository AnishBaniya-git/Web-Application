# Task Description: Refactoring Layouts using CSS Grid and Flexbox

## Objective

Your goal is to transition the layout architecture of our task management application from traditional spacing and block rendering into a modern, flexible layout system. You will refactor `style.css` by filling in four specific placeholders (STEP_1 through STEP_4) using CSS Grid and Flexbox rules. Search for `STEP_1` for the place where to add the

## Refactoring Steps

### Step 1: Aligning the Main Header

1. Search for `STEP_1` in the style.css for the place where to make the change
2. **Requirement**: The main header contains elements (like the page title and add button) that currently sit stacked.
   - Turn this header into a flex container.
   - Elements inside should be aligned perfectly in the center vertically
   - Element should be spaced out evenly so the title pushes to the far left and actions push to the far right.

### Step 2: Manage Spacing in the sidebar

1. Search for `STEP_2` in the style.css for the place where to make the change
2. **Requirement**: The navigation sidebar needs a clean structural distribution.
   - Turn .sidebar into a vertical flex container.
   - The items inside should spread out so that top navigation menus stick to the top and the footer is pushed completely to the bottom.

### Step 3: Designing the Summary Dashboard Banner

1. Search for `STEP_3.1` in the style.css for the place where to make the change
2. **Requirement**: The navigation sidebar needs a clean structural distribution.
   - Turn the summary card container into a flex box to prevent them from stacking
   - Search for `STEP_3.2` and change the summary card, so that they expland to fill all the available space

### Step 4: Building the task card grid layout

1. Search for `STEP_4` in the style.css for the place where to make the change
2. **Requirement** : Individual task items need to be arranged neatly across the main viewport.
   - Implement a 3-column CSS Grid layout on the task list container.
   - The grid should automatically generate three columns of equal sizing to elegantly house the underlying .`task-card` elements side by side.
