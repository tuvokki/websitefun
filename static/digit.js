import * as PIXI from './pixi.mjs';

const AppRoot = document.body.getElementsByClassName("app_root")[0]
const AppControls = document.body.getElementsByClassName("app_controls")[0]

const app = new PIXI.Application(
    { autoStart: false, resizeTo: AppRoot }
);

AppRoot.appendChild(app.view);
globalThis.__PIXI_APP__ = app;

const spritesheet = await PIXI.Assets.load('https://pixijs.com/assets/spritesheet/0123456789.json')
// create an array to store the textures
const textures = [];
let i;

for (i = 0; i < 10; i++)
{
    const framekey = `0123456789 ${i}.ase`;
    const texture = PIXI.Texture.from(framekey);
    const time = spritesheet.data.frames[framekey].duration;

    textures.push({ texture, time });
}

const scaling = 4;

// create a slow AnimatedSprite
const slow = new PIXI.Sprite(textures[show_digit].texture);

slow.anchor.set(0.5);
slow.scale.set(scaling);

slow.x = (app.screen.width - slow.width) / 2;
slow.y = app.screen.height / 2;

app.stage.addChild(slow);

// start animating
app.start();
// adjust the container to fit nicely
AppRoot.classList.add("compact")
AppControls.classList.add("compact")
