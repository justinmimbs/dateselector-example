# dateselector-example

Example usage of a `DateSelector` component for React.

The `DateSelector` component displays a familiar calendar for selecting a date, but allows a user to select the year, month, and day of the month independently. This allows for quick selection of a date without changing modes or stepping through month calendars one at a time.

![dateselector.png](./screenshots/dateselector.png?raw=true)

The `DateSelector` component can be used directly, or through the `DateSelectorDropdown` component.

```jsx
<DateSelector
  min={new Date(2012, 3, 1)}
  max={new Date(2019, 8, 30)}
  selected={new Date(2016, 0, 8)}
  onChange={handleChange}
/>
```

The `DateSelectorDropdown` component displays a button which invokes a `DateSelector` when clicked. However, the button component it uses must be specified in its props. A `DateSelectorDropdownButton` component is provided in this example, or you may specify your own. The button component will receive two props: `isOpen` and `date`, the current selected date.

```jsx
<DateSelectorDropdown
  ButtonComponent={DateSelectorDropdownButton}
  min={new Date(2012, 3, 1)}
  max={new Date(2019, 8, 30)}
  selected={new Date(2016, 0, 8)}
  onChange={handleChange}
/>
```

http://justinmimbs.com/examples/dateselector
