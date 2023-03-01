# griddy-startpage
- Simple customizible startpage in **grid layout** style ⚒️
- With 6 diffrent themes and 5 options to customize

![Snímek obrazovky_2023-02-27_17-31-12](https://user-images.githubusercontent.com/89579269/221627883-48f35ff3-396c-484e-add7-3ee7f8916457.png)

## default themes
- *screenshot from the first version*

![Snímek obrazovky_2023-02-27_18-02-44](https://user-images.githubusercontent.com/89579269/221630296-122072ab-2df3-457d-9635-6c2269abb043.png)

# How to customize:

## customizing font 
- click on edit icon, then select `customCss`, there add
```css
@import "https://unpkg.com/@fontsource/<YOURFONT>@latest/index.css";

:root {
   --font: "<YOURFONT>", monospace;
}
```
- example for **Iosevka** font:
```css
@import "https://unpkg.com/@fontsource/iosevka@latest/index.css";

:root {
   --font: "iosevka", monospace;
}
```

## customizing variables 
- click on edit icon, then select `customCss`, there add
```css
:root {
  --nameOfTheVariable: VALUE;
}
```
- you will find all the variables inside `variables.css`, then just customize the variables in `customCss` 

## same goes with custom css
- just click on edit icon, then select `customCss`, there add
```css
/* some custom css here */
```

## custom background image
- click on the edit icon, here select `customCss`, there add
```css
:root {
   --background-url: url("https://example.com/path/to/image.png"); 
   /* default one is */
   --background-url: url("./assets/wal1.jpg");
}
```

# Pictures

![Snímek obrazovky_2023-02-27_18-16-47](https://user-images.githubusercontent.com/89579269/222229712-f73ea77c-2683-4ba8-aa75-9e136eb07844.png)
![Snímek obrazovky_2023-03-01_19-12-02](https://user-images.githubusercontent.com/89579269/222229979-72b5e943-56d4-42c4-b892-a725a40129ca.png)
![Snímek obrazovky_2023-03-01_19-22-40](https://user-images.githubusercontent.com/89579269/222230011-fe864bcf-3548-4f71-9ea2-160efcb68b0c.png)

