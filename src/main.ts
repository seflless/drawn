import "./style.css";
import { annotate } from "rough-notation";
import type {
  RoughAnnotation,
  RoughAnnotationConfig,
} from "rough-notation/lib/model";

const app = document.getElementById("app")!;

app.innerHTML = `
  <main class="article-shell">
    <article class="article">
      <!--
      <p class="eyebrow">Draft markup demo</p> -->
      <h1>
        How readers learn from notes in the margin
      </h1>

      <p class="lede">
        A good annotation does more than decorate a page. It slows the reader down
        at the exact moment a sentence deserves a second look.
      </p>

      <p>
        When students study an essay, they rarely move in a straight line from the
        first word to the last. They circle claims, underline the evidence, and
        leave small arguments with the author in the margin. The page becomes a
        record of attention rather than a passive block of text.
      </p>

      <p>
        This demo treats that familiar habit as an interface pattern. The browser
        still renders ordinary HTML, but the marks arrive like a professor reading
        with a red pen: <span class="annotate-circled">find the thesis</span>,
        question the weak parts, and make the strongest ideas easier to return to.
      </p>

      <section class="paper-note">
        <h2>1. Mark the claim before the evidence</h2>
        <p>
          Readers need a clear place to begin. In a draft, that usually means
          identifying the sentence that makes the piece accountable:
          <span class="annotate-highlighted">good notes turn attention into a visible trail</span>.
          Once the claim is visible, the rest of the paragraph can be judged against it.
        </p>
        <p>
          A teacher might underline the next sentence and ask whether it actually
          supports the claim. A designer might use the same motion to guide someone
          through a product tour without adding another panel or tooltip.
        </p>
      </section>

      <section class="paper-note">
        <h2>2. Use friction where the draft gets vague</h2>
        <p>
          The easiest sentences to ignore are often the ones most in need of review:
          "this improves engagement," "users love it," or
          <span class="annotate-crossed-off">the experience is simply better</span>.
          Crossing out that kind of phrase creates useful friction. It says the
          idea may be right, but the writing has not earned it yet.
        </p>
        <p>
          The same visual language works for studying. A reader can mark the line
          where an author jumps from observation to conclusion, then return later
          with a sharper question.
        </p>
      </section>

      <aside class="margin-callout annotate-bracketed">
        The most useful marks are not always the loudest marks. Brackets are good
        for paragraphs that need to be reconsidered as a whole.
      </aside>

      <section class="paper-note">
        <h2>3. Box terms that need definition</h2>
        <p>
          Some words carry more weight than the sentence admits. If a post says a
          system is <span class="annotate-boxed">agentic</span>, the reader deserves
          to know whether that means autonomous planning, tool use, background work,
          or merely a conversational wrapper around a form.
        </p>
        <p>
          A quick box makes the term feel pending. It is a compact way to say:
          define this before asking the reader to build on it.
        </p>
      </section>

      <section class="paper-note">
        <h2>4. Let emphasis arrive with the scroll</h2>
        <p>
          If every mark appears on page load, the annotations become a screenshot.
          If each mark starts as the relevant passage scrolls into view, the page
          feels like it is being read in real time. That timing makes
          <span class="annotate-underlined">the effect part of the explanation</span>,
          not just a layer on top of it.
        </p>
        <p>
          This is the behavior the prototype should preserve as it grows into a
          component collection: effects should be attachable to real content and
          triggered by reading position, interaction, or an explicit sequence.
        </p>
      </section>

      <section class="paper-note">
        <h2>5. Show revision as a visible act</h2>
        <p>
          A marked-up page can be more honest than a polished final version. It can
          show where an editor paused, where a student noticed a pattern, and where
          the argument changed direction. The goal is not to imitate paper for its
          own sake; the goal is to make attention visible.
        </p>
        <p>
          That is why a simple phrase like
          <span class="annotate-struck">obviously true</span> benefits from a strike.
          The mark gives the writer a concrete next step: replace certainty with
          evidence.
        </p>
      </section>
    </article>
  </main>
`;

const RedPen = "rgba(219, 28, 28,0.8)";
const YellowMarker = "rgba(255, 232, 28, 0.61)";

type AnnotationTarget = {
  selector: string;
  config: RoughAnnotationConfig;
};

const strokeWidth = 6;

const annotationTargets: AnnotationTarget[] = [
  {
    selector: ".annotate-circled",
    config: {
      type: "circle",
      color: RedPen,
      strokeWidth,
      padding: 5,
      iterations: 1,
      animationDuration: 550,
    },
  },
  {
    selector: ".annotate-highlighted",
    config: {
      type: "highlight",
      color: YellowMarker,
      iterations: 1,
      animationDuration: 650,
    },
  },
  {
    selector: ".annotate-crossed-off",
    config: {
      type: "crossed-off",
      color: RedPen,
      strokeWidth,
      padding: 4,
      iterations: 1,
      animationDuration: 450,
    },
  },
  {
    selector: ".annotate-bracketed",
    config: {
      type: "bracket",
      color: RedPen,
      strokeWidth,
      padding: 8,
      iterations: 1,
      animationDuration: 650,
      brackets: ["left", "right"],
    },
  },
  {
    selector: ".annotate-boxed",
    config: {
      type: "box",
      color: RedPen,
      strokeWidth,
      padding: 5,
      iterations: 1,
      animationDuration: 400,
    },
  },
  {
    selector: ".annotate-underlined",
    config: {
      type: "underline",
      color: RedPen,
      strokeWidth,
      padding: 4,
      iterations: 2,
      animationDuration: 450,
    },
  },
  {
    selector: ".annotate-struck",
    config: {
      type: "strike-through",
      color: RedPen,
      strokeWidth,
      padding: 2,
      iterations: 1,
      animationDuration: 450,
    },
  },
];

function buildAnnotations() {
  return annotationTargets.flatMap(({ selector, config }) =>
    [...app.querySelectorAll<HTMLElement>(selector)].map((element) => {
      const annotation = annotate(element, config);

      // Add the annotation type to the generated svg so we can style different types
      // annotations differently.
      if (element.previousElementSibling) {
        element.previousElementSibling.setAttribute(
          "data-annotation-type",
          config.type,
        );
      }

      return {
        element,
        annotation,
      };
    }),
  );
}

function showAnnotationsWhenVisible(
  annotations: Array<{ element: HTMLElement; annotation: RoughAnnotation }>,
) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const match = annotations.find(
          ({ element }) => element === entry.target,
        );
        match?.annotation.show();
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.55,
      rootMargin: "0px 0px -12% 0px",
    },
  );

  annotations.forEach(({ element }) => observer.observe(element));
}

async function onLoad() {
  await document.fonts.ready;

  showAnnotationsWhenVisible(buildAnnotations());
}

document.addEventListener("DOMContentLoaded", onLoad);
