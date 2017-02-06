# jQuery Before/After Plugin

This is a simple plugin to create a before/after image that responds to mouse movement as well as touch movements.

Like this:

![Before/After](assets/img/before_after.gif?raw=True)

### Requirements

jQuery 1.8+

### Setup

Include both `jquery.beforeafter.min.js` and `jquery.beforeafter.min.css` in your project file

Use the following markup in the HTML:

```
    <div class="g-before-after" id="example1">
        <img src="img_before.png" data-aftersrc="img_after.png">
    </div>
```

The important bit is the `src` and `data-aftersrc` properties of the `<img>` tag, and the class `g-before-after` on the container div.

Then, call this function in your JavaScript:

```
    $('#example1').beforeafter();
```

### Options

| Option           | Type    | Default | Description                                                                         |
|------------------|---------|---------|-------------------------------------------------------------------------------------|
| touch            | Boolean | true    | Enable or Disable touch events (for mobile).                                        |
| message          | String  | "Slide" | Message to show in the middle of the divider.                                       |
| hide_message     | Boolean | true    | Hides the message when mouse enters the area. Message will be shown again on reset. |
| reset            | Boolean | true    | Resets the divider to the middle when mouse leaves the area.                        |
| reset_delay      | Integer | 3000    | Delay, in miliseconds before triggering the reset (if reset above is true).         |
| drag_horizontal  | Boolean | true    | true to drag left and right. false to drag top and bottom.                          |
| split_horizontal | Boolean | true    | true to split left and right. false to split top and bottom.                        |


### More example uses

Vertical split and vertical drag:

```
  $('#example1').beforeafter({drag_horizontal: false, split_horizontal: false});
```

Horizontal split and vertical drag:

```
  $('#example1').beforeafter({drag_horizontal: false, split_horizontal: true});
```

### Notes

This plugin is a quick put-together. Therefore it is not optimized nor it is performant. Feel free to submit improvements!
