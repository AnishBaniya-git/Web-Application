# State and interactivity

## Step 1: Add a checkbox input in `App.jsx` to filter only urgent tasks

- In the `App.jsx` file add a checkbox with label above the `TaskContainer` component

```JSX
<div>
    <input type="checkbox" checked={false} id="urgent-filter" />
    <label htmlFor="urgent-filter">Filter Urgent</label>
</div>
```

## Step 2: Add state to control weather to filter or not

- Add an import to `useState` in App.jsx

```JSX
import { useState } from "react";
```

- Add a state using `useState` hook to control weather to filter only urgent or not

- Initialize the state to `false`

```JSX
const [filterUrgent, setFilterUrgent] = useState(false);
```

## Step 3: Add event listener to change the value of state when user checks/unchecks

- Add a function named `toggleUrgentFilter` in `App` component

- In the function call `setFilterUrgent` function to toggle the value i.e. if true should set false, if false set true.

```JSX
const toggleFilter = () => {
    // This sets the state opposite to the previous value
    setFilterUrgent((prev) => !prev);
};
```

- Set the `onChange` prop of the checkbox input to `toggleFilter`

```JSX
<input
    type="checkbox"
    checked={false}
    id="urgent-filter"
    onChange={toggleFilter}
/>
```

- Connect the value of the `filterUrgent` state with the checkbox input `checked` prop

```JSX
<input
    type="checkbox"
    checked={filterUrgent}
    id="urgent-filter"
    onChange={toggleFilter}
/>
```

- Check to see if the checkbox works properly

## Step 4: Use the state to filter the tasks

- Use `array.filter()` function to filter the tasks when `filterUrgent` state is `true`/`checked` and stored the new array in a `filteredTasks` variable

```JSX
// Filtered tasks is set to all the tasks
let filteredTasks = tasks;

// If filterUrgenet state is true then filteredTasks contains only tasks with isUrgent true
if (filterUrgent) {
    filteredTasks = tasks.filter((x) => x.isUrgent);
}
```

- Instead of passing `tasks` into the prop of `TaskContainer`, pass the new `filteredTasks`

- Test the app, it should now filter the tasks when the checkbox is checked

## Final code for App.jsx

```JSX
import { useState } from "react";
import PageTitle from "./components/PageTitle/PageTitle";
import TaskContainer from "./components/TaskContainer/TaskContainer";
function App() {
  const [filterUrgent, setFilterUrgent] = useState(false);
  const containerTitle = "Tasks Due Today";
  const tasks = [
    { time: "9:00 AM", text: "Get eggs", isUrgent: true },
    { time: "9:05 AM", text: "Clean your room", isUrgent: false },
    { time: "10:00 AM", text: "Complete task 1", isUrgent: false },
    { time: "4:00 PM", text: "Go for a walk", isUrgent: true },
  ];

  const toggleFilter = () => {
    // This sets the state opposite to the previous value
    setFilterUrgent((prev) => !prev);
  };

  // Filtered tasks is set to all the tasks
  let filteredTasks = tasks;

  // If filterUrgenet state is true then filteredTasks contains only tasks with isUrgent true
  if (filterUrgent) {
    filteredTasks = tasks.filter((x) => x.isUrgent);
  }

  return (
    <>
      <PageTitle />
      <div>
        <input
          type="checkbox"
          checked={filterUrgent}
          id="urgent-filter"
          onChange={toggleFilter}
        />
        <label htmlFor="urgent-filter">Filter Urgent</label>
      </div>
      <TaskContainer containerTitle={containerTitle} tasks={filteredTasks} />
    </>
  );
}

export default App;
```
