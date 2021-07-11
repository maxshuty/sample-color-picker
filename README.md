# Color Picker
Learn about native web components by building a simple color picker app.

My goal with this was too make a reusable color picker that is totally independent of other color pickers. A user should be able to add more color pickers dynamically by pressing a button. Finally, I wanted this to be accessible. With all of that in mind, this is the solution that I came up with.

## Bonus challenge
Take this repo and make the colors dynamic where a user can pass in any valid list of CSS colors for each component!

Want to go farther? Capture the selected color for any given component and store it in a key value list where the key is the id of the color picker. The value is the color.

Want even more? Instead of storing just one color selection above, store an array of all colors selected by any given color picker.
```
[{ "colorPicker1": ["red", "blue", "green", ...] }, { "colorPicker2": ["red", "blue", "green", ...] }]
```

## Demo
View the demo [**here**](https://codepen.io/maxshuty/pen/MWyBrKB).
