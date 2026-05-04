import "./style.css";
import { annotate } from "rough-notation";

const app = document.getElementById("app")!;

app.innerHTML = `
  <h1>Hello <span class="circled">world</span></h1>

      <p>This is <span class="underlined">underlined</span> text</p>
      <p>This is <span class="highlighted">highlighted</span> text</p>
      <p>This has a <span class="boxed">boxed</span> word</p>
      <p>This is <span class="struck">struck through</span> text</p>
      <p>This is <span class="crossed-off">crossed off</span> text</p>
      <p class="bracket-block">
        Bracket annotations suit a short line or paragraph; this one uses brackets
        on the left and right.
      </p>
      <h2>Font Test</h2>
      <p class="recursive">Proportional: WwWWiw il1IL</p>
      <p class="recursive-mono">Mono: WwWWiw il1IL</p>

      <p class="recursive">Proportional: Tomorrow, we'll go to the park at 5:00pm.</p>
      <p class="recursive-mono">Mono: Tomorrow, we'll go to the park at 5:00pm.</p>
`;

const RedPen = "rgb(219, 28, 28)";
const YellowMarker = "rgba(255, 232, 28, 0.61)";

async function onLoad() {
  await document.fonts.ready;

  const circled = annotate(app.querySelector(".circled")!, {
    type: "circle",
    color: RedPen,
    strokeWidth: 3,
    padding: 5,
    iterations: 1,
    animationDuration: 400,
  });

  circled.show();

  const underlined = annotate(app.querySelector(".underlined")!, {
    type: "underline",
    color: RedPen,
    strokeWidth: 3,
    padding: 5,
    iterations: 3,
    animationDuration: 200,
  });

  underlined.show();

  const highlighted = annotate(app.querySelector(".highlighted")!, {
    type: "highlight",
    color: YellowMarker,
    // strokeWidth: 6,
    // padding: 20,
    iterations: 1,
    animationDuration: 200,
  });

  highlighted.show();

  const boxed = annotate(app.querySelector(".boxed")!, {
    type: "box",
    color: RedPen,
    strokeWidth: 3,
    padding: 5,
    iterations: 1,
    animationDuration: 250,
  });

  boxed.show();

  const struck = annotate(app.querySelector(".struck")!, {
    type: "strike-through",
    color: RedPen,
    strokeWidth: 3,
    padding: 2,
    iterations: 1,
    animationDuration: 300,
  });

  struck.show();

  const crossedOff = annotate(app.querySelector(".crossed-off")!, {
    type: "crossed-off",
    color: RedPen,
    strokeWidth: 3,
    padding: 4,
    iterations: 1,
    animationDuration: 250,
  });

  crossedOff.show();

  const bracketed = annotate(app.querySelector(".bracket-block")!, {
    type: "bracket",
    color: RedPen,
    strokeWidth: 3,
    padding: 4,
    iterations: 1,
    animationDuration: 400,
    brackets: ["left", "right"],
  });

  bracketed.show();
}

document.addEventListener("DOMContentLoaded", onLoad);
