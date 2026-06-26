# Task: Refactor CSS to Use Custom Properties (Variables)

## Background

You've been given a stylesheet for a task-tracker dashboard (sidebar, task cards, buttons, dropdown menu). It works fine, but every color is hardcoded as a literal value `(hex or hsl())` and repeated across multiple rules. If the design team asked you to rebrand the app tomorrow: swap the primary color, lighten the background — you'd have to hunt down and edit the same value in a dozen places, and risk missing one.

Your job is to fix that by introducing CSS custom properties (variables).

## Your Task

1. Audit the stylesheet. Go through every rule and find color values that repeat or are clearly related (e.g. a color and its :hover variant).

2. Define variables in :root. Create a set of custom properties at the top of the file (:root { --name: value; }) that capture each distinct color role.

3. Replace every literal value with var(--your-variable-name).

4. Name variables semantically, not literally. Name them after their role in the design, not their appearance — --accent-color, not --brown. Reason: the role stays the same even if the actual color changes later.

5. Look for derived relationships. Some colors are just lighter/darker versions of the same hue (check the hover states). Decide whether to give these their own variable (e.g. --accent-dark) or compute them — your call, but be consistent.

## Requirements

- [ ] No color literal (#hex, hsl(), rgba(),etc.) should remain inside a selector — only inside the :root block.

- [ ] Every variable name should describe purpose (e.g. --text-on-primary, --card-background-color), not the raw color.
- [ ] The page must look visually identical to the original after your changes — this is a refactor, not a redesign.
- [ ] At least one variable should reference another variable's value (e.g. --background-color: var(--secondary-color);) to demonstrate variable composition.
