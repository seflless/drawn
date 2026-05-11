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
        How readers <span class="annotate-highlighted">learn from notes</span> <span class="annotate-underlined">in the margin</span>
      </h1>

      <p class="lede">
        A good annotation does more than <span class="annotate-boxed">decorate a page</span>.
        It slows the reader down at the exact moment a sentence deserves a
        <span class="annotate-circled">second look</span>.
      </p>

      <p>
        When students study an essay, they
        <span class="annotate-highlighted">rarely move</span> in a straight line
        from the first word to the last. They <span class="annotate-underlined">circle claims</span>,
        underline the <span class="annotate-boxed">evidence</span>, and leave small arguments
        with the author in the margin. The page becomes a record of attention
        rather than a <span class="annotate-crossed-off">passive block of text</span>.
      </p>

      <p>
        This demo treats that familiar habit as an <span class="annotate-boxed">interface pattern</span>.
        The browser still renders <span class="annotate-underlined">ordinary HTML</span>, but the
        marks arrive like a professor reading with a red pen:
        <span class="annotate-circled">find the thesis</span>, question the weak parts,
        and make the <span class="annotate-highlighted">strongest ideas</span> easier to return to.
      </p>

      <section class="paper-note">
        <h2>1. Mark the <span class="annotate-underlined">claim</span> before the evidence</h2>
        <p>
          Readers need a <span class="annotate-boxed">clear place</span> to begin. In a draft,
          that usually means identifying the sentence that makes the piece accountable:
          good notes turn attention into a <span class="annotate-highlighted">visible trail</span>.
          Once the claim is visible, the rest of the paragraph can be
          <span class="annotate-circled">judged against it</span>.
        </p>
        <p>
          A teacher might underline the next sentence and ask whether it actually
          <span class="annotate-underlined">supports the claim</span>. A designer might use
          the same motion to guide someone through a <span class="annotate-boxed">product tour</span>
          without adding <span class="annotate-crossed-off">another panel or tooltip</span>.
        </p>
      </section>

      <section class="paper-note">
        <h2>2. Use friction where the draft gets <span class="annotate-circled">vague</span></h2>
        <p>
          The easiest <span class="annotate-underlined">sentences to ignore</span> are often
          the ones most in need of review: "this improves engagement,"
          <span class="annotate-boxed">"users love it,"</span> or
          <span class="annotate-crossed-off">the experience is simply better</span>.
          Crossing out that kind of phrase creates useful friction. It says the
          idea may be right, but the writing has not <span class="annotate-circled">earned it yet</span>.
        </p>
        <p>
          The same <span class="annotate-highlighted">visual language</span> works for studying.
          A reader can mark the line where an author jumps from
          <span class="annotate-underlined">observation to conclusion</span>, then return later
          with a <span class="annotate-circled">sharper question</span>.
        </p>
      </section>

      <aside class="margin-callout annotate-bracketed">
        The most useful marks are not always the loudest marks.
        Brackets are good for paragraphs that need to be
        reconsidered as a whole.
      </aside>

      <section class="paper-note">
        <h2>3. Box terms that need <span class="annotate-boxed">definition</span></h2>
        <p>
          Some words <span class="annotate-underlined">carry more weight</span> than the sentence admits.
          If a post says a system is <span class="annotate-boxed">agentic</span>, the reader
          deserves to know whether that means <span class="annotate-highlighted">autonomous planning</span>,
          tool use, background work, or merely a <span class="annotate-crossed-off">conversational wrapper</span>
          around a form.
        </p>
        <p>
          A quick box makes the term feel <span class="annotate-circled">pending</span>.
          It is a compact way to say: <span class="annotate-underlined">define this</span>
          before asking the reader to build on it.
        </p>
      </section>

      <section class="paper-note">
        <h2>4. Let emphasis arrive with the <span class="annotate-underlined">scroll</span></h2>
        <p>
          If every mark appears on page load, the annotations become a
          <span class="annotate-crossed-off">screenshot</span>. If each mark starts as the
          relevant passage <span class="annotate-highlighted">scrolls into view</span>, the page
          feels like it is being read <span class="annotate-circled">in real time</span>. That timing makes
          the effect <span class="annotate-underlined">part of the explanation</span>,
          not just a layer on top of it.
        </p>
        <p>
          This is the behavior the prototype should preserve as it grows into a
          <span class="annotate-boxed">component collection</span>: effects should be attachable
          to <span class="annotate-underlined">real content</span> and triggered by reading position,
          interaction, or an <span class="annotate-circled">explicit sequence</span>.
        </p>
      </section>

      <section class="paper-note">
        <h2>5. Show revision as a <span class="annotate-highlighted">visible act</span></h2>
        <p>
          A marked-up page can be more honest than a
          <span class="annotate-crossed-off">polished final version</span>. It can show where
          an <span class="annotate-boxed">editor paused</span>, where a student noticed a pattern,
          and where the <span class="annotate-underlined">argument changed direction</span>.
          The goal is not to imitate paper for its own sake; the goal is to
          <span class="annotate-circled">make attention visible</span>.
        </p>
        <p>
          That is why a simple phrase like
          <span class="annotate-struck">obviously true</span> benefits from a strike.
          The mark gives the writer a <span class="annotate-highlighted">concrete next step</span>:
          replace <span class="annotate-crossed-off">certainty</span> with
          <span class="annotate-underlined">evidence</span>.
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

type QueuedAnnotation = {
  element: HTMLElement;
  annotation: RoughAnnotation;
  duration: number;
  order: number;
  status: "pending" | "waiting" | "drawing" | "shown";
  visible: boolean;
};

const strokeWidth = 3;
const drawSettleMs = 90;
const annotationPauseMinMs = 50;
const annotationPauseMaxMs = 200;
const readingZoneTopInsetPx = 120;
const readingZoneBottomInsetPx = 180;

const annotationTargets: AnnotationTarget[] = [
  {
    selector: ".annotate-circled",
    config: {
      type: "circle",
      color: RedPen,
      multiline: true,
      strokeWidth,
      padding: 5,
      iterations: 2,
      animationDuration: 550,
    },
  },
  {
    selector: ".annotate-highlighted",
    config: {
      type: "highlight",
      color: YellowMarker,
      multiline: true,
      iterations: 1,
      padding: 0,
      animationDuration: 650,
    },
  },
  {
    selector: ".annotate-crossed-off",
    config: {
      type: "crossed-off",
      color: RedPen,
      multiline: true,
      strokeWidth,
      padding: 4,
      iterations: 2,
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
      multiline: true,
      strokeWidth,
      padding: 0,
      iterations: 2,
      animationDuration: 400,
    },
  },
  {
    selector: ".annotate-underlined",
    config: {
      type: "underline",
      color: RedPen,
      multiline: true,
      strokeWidth,
      padding: 2,
      iterations: 2,
      animationDuration: 450,
    },
  },
  {
    selector: ".annotate-struck",
    config: {
      type: "strike-through",
      color: RedPen,
      multiline: true,
      strokeWidth,
      padding: 2,
      iterations: 2,
      animationDuration: 450,
    },
  },
];

function buildAnnotations(): QueuedAnnotation[] {
  const annotationSelector = annotationTargets
    .map(({ selector }) => selector)
    .join(",");

  return [...app.querySelectorAll<HTMLElement>(annotationSelector)].map(
    (element, order) => {
      const target = annotationTargets.find(({ selector }) =>
        element.matches(selector),
      );

      if (!target) {
        throw new Error("Missing annotation config for target element.");
      }

      const { config } = target;
      const annotation = annotate(element, config);

      // Add the annotation type to the generated svg so we can style different
      // annotation types differently.
      if (element.previousElementSibling) {
        element.previousElementSibling.setAttribute(
          "data-annotation-type",
          config.type,
        );
      }

      return {
        element,
        annotation,
        duration: Number(config.animationDuration) || 0,
        order,
        status: "pending",
        visible: false,
      };
    },
  );
}

function isInReadingZone(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  return (
    rect.bottom > readingZoneTopInsetPx &&
    rect.top < viewportHeight - readingZoneBottomInsetPx
  );
}

function wait(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function randomAnnotationPause() {
  return (
    annotationPauseMinMs +
    Math.random() * (annotationPauseMaxMs - annotationPauseMinMs)
  );
}

function showAnnotationsWhenVisible(annotations: QueuedAnnotation[]) {
  let activeAnnotation: QueuedAnnotation | undefined;

  async function processQueue() {
    if (activeAnnotation) {
      return;
    }

    const nextAnnotation = annotations
      .filter(
        (candidate) =>
          candidate.status === "pending" &&
          candidate.visible &&
          isInReadingZone(candidate.element),
      )
      .sort((a, b) => a.order - b.order)[0];

    if (!nextAnnotation) {
      return;
    }

    activeAnnotation = nextAnnotation;
    nextAnnotation.status = "waiting";
    await wait(randomAnnotationPause());

    if (!nextAnnotation.visible || !isInReadingZone(nextAnnotation.element)) {
      nextAnnotation.status = "pending";
      activeAnnotation = undefined;
      processQueue();
      return;
    }

    nextAnnotation.status = "drawing";
    nextAnnotation.annotation.show();

    await wait(nextAnnotation.duration + drawSettleMs);

    nextAnnotation.status = "shown";
    observer.unobserve(nextAnnotation.element);
    activeAnnotation = undefined;
    processQueue();
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const match = annotations.find(
          ({ element }) => element === entry.target,
        );

        if (!match || match.status === "shown") {
          return;
        }

        match.visible = entry.isIntersecting;
      });

      processQueue();
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  annotations.forEach(({ element }) => observer.observe(element));
  processQueue();
}

async function onLoad() {
  await document.fonts.ready;

  showAnnotationsWhenVisible(buildAnnotations());
}

document.addEventListener("DOMContentLoaded", onLoad);
