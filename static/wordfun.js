import * as PIXI from './pixi.mjs';

const AppRoot = document.body.getElementsByClassName("app_root")[0]

let app = new PIXI.Application(
    {background: '#ffffff', resizeTo: AppRoot}
);
// const app = new PIXI.Application({background: '#1099bb', resizeTo: window});
globalThis.__PIXI_APP__ = app;
AppRoot.appendChild(app.view);

// Label showing scene graph hierarchy
const label = new PIXI.Text('What\'s my name?', {fill: '#000000'});
label.position = {x: 10, y: 10};
app.stage.addChild(label);

// Helper function to create a block of color with a letter
const letters = [];
const dark_colors = {
    "Eerie black": "#151b12",
    "Ebony": "#5d5f4d",
    "Black olive": "#1d271a",
    "Black bean": "#36190e",
    "Dark green": "#182513",
    "Black olive 2": "#404138",
}
const reddish_colors = {
    "Chocolate cosmos": "#590d22",
    "Claret": "#800f2f",
    "Amaranth purple": "#a4133c",
    "Rose red": "#c9184a",
    "Bright pink (Crayola)": "#ff4d6d",
    "Bright pink (Crayola) 2": "#ff758f",
    "Salmon pink": "#ff8fa3",
    "Cherry blossom pink": "#ffb3c1",
    "Pink": "#ffccd5",
    "Lavender blush": "#fff0f3",
}
const light_colors = {
    "Deep Sky Blue": "#01befe",
    "School bus yellow": "#ffdd00",
    "Orange (wheel)": "#ff7d00",
    "Rose": "#ff006d",
    "Spring bud": "#adff02",
    "Electric violet": "#8f00ff",
}

const style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fill: ['#ffffff', '#ffff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 2,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
});

// const richText = new PIXI.Text('Rich text with a lot of options and across multiple lines', style);

function addLetter(letter, parent, color, pos) {
    const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    bg.width = 100;
    bg.height = 100;
    bg.tint = color;

    const text = new PIXI.Text(letter, style);
    text.anchor.set(0.5);
    text.position = {x: 50, y: 50};

    const container = new PIXI.Container();
    container.position = pos;
    container.visible = false;
    container.addChild(bg, text);
    parent.addChild(container);

    letters.push(container);
    return container;
}

function getColor(idx, theme = "Dark") {
    if (theme === "Light")
        return light_colors[Object.keys(light_colors)[idx]]
    if (theme === "Red")
        return reddish_colors[Object.keys(reddish_colors)[idx]]
    return dark_colors[Object.keys(dark_colors)[idx]]
}

const print_string = "Wouter";
let parent = app.stage;
let start_pos = {x: 10, y: 100};
let pos = {x: 10, y: 100};
for (let letter in print_string) {
    if (letter > 0) {
        pos.x = start_pos.x + (100 * letter)
        pos.y = 100
    }
    console.log(`Print ${print_string[letter]} on x(${pos.x})`)
    addLetter(print_string[letter], parent, getColor(letter, "Light"), {x: pos.x, y: pos.y})
}

// Display them over time, in order
let elapsed = 0;
let prolapsed = 0.0;
let reverse = false;
app.ticker.add((delta) => {
    prolapsed += delta / 60.0;
    elapsed = Math.abs(Math.floor(prolapsed))
    if (!reverse && elapsed >= letters.length) {
        console.log("Going in reverse!")
        reverse = true;
    }
    if (reverse && elapsed >= (letters.length * 2)) {
        elapsed = 0
        prolapsed = 0.0
        reverse = false
    }

    if (!reverse) {
        for (let i = 0; i < letters.length; i++) {
            const letter_visible = elapsed >= i
            console.log(`Set letter ${print_string[i]} to ${letter_visible} after ${prolapsed}`)
            letters[i].visible = letter_visible;
        }
    } else {
        for (let i = 0; i < letters.length; i++) {
            const letter_visible = elapsed <= (i + 5)
            console.log(`Set letter ${print_string[i]} to ${letter_visible} after ${prolapsed}`)
            letters[i].visible = letter_visible;
        }
    }
});
