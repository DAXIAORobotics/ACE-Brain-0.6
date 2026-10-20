// Browser geometry regression check. Run on the RobotGrounding section after
// selecting an example and loading its image. This reads the rendered DOM only.
function checkGroundingLayout() {
  const card = document.querySelector(".example-browser").getBoundingClientRect();
  const question = document.querySelector(".example-question");
  const questionRange = document.createRange();
  questionRange.selectNodeContents(question);
  const answer = document.querySelector(".answer-block").getBoundingClientRect();
  const questionAnswerGap = answer.top - questionRange.getBoundingClientRect().bottom;
  const failures = [];

  const nav = document.querySelector(".section-nav");
  const navStyle = getComputedStyle(nav);
  const navigationOverlapsCard = innerWidth > 640 && navStyle.display !== "none" &&
    [...nav.querySelectorAll("a")].some(link => {
      const bounds = link.getBoundingClientRect();
      return bounds.right > card.left && bounds.left < card.right &&
        bounds.bottom > card.top && bounds.top < card.bottom;
    });
  if (navigationOverlapsCard) failures.push("Navigation overlaps the example card");
  if (questionAnswerGap > 64) failures.push("Question-to-answer blank exceeds 64px");
  if (document.documentElement.scrollWidth > innerWidth) {
    failures.push("Page overflows horizontally");
  }

  const frames = [...document.querySelectorAll(".scene-frame")];
  const targetOverlay = frames.at(-1)?.querySelector(".scene-overlay");
  if (document.querySelector("#show-annotations").checked && !targetOverlay) {
    failures.push("Target annotation overlay is missing");
  }
  const answerText = document.querySelector("#example-answer").textContent.trim();
  if (answerText.startsWith("[") && targetOverlay) {
    const boxes = JSON.parse(answerText);
    if (targetOverlay.querySelectorAll("rect").length < boxes.length) {
      failures.push("Reference annotation boxes are missing");
    }
  }
  let maxAnnotationError = 0;
  for (const frame of frames) {
    const image = frame.querySelector("img");
    if (!image.complete || !image.naturalWidth) {
      failures.push("Example image is not loaded");
      continue;
    }
    const overlay = frame.querySelector(".scene-overlay");
    if (!overlay || getComputedStyle(overlay).display === "none") continue;

    // Compare SVG coordinates with actual image pixels, including any
    // object-fit letterboxing. The annotations use independent 0–1000 axes.
    const imageBounds = image.getBoundingClientRect();
    const scale = Math.min(
      imageBounds.width / image.naturalWidth,
      imageBounds.height / image.naturalHeight
    );
    const width = image.naturalWidth * scale;
    const height = image.naturalHeight * scale;
    const left = imageBounds.left + (imageBounds.width - width) / 2;
    const top = imageBounds.top + (imageBounds.height - height) / 2;
    for (const box of overlay.querySelectorAll("rect")) {
      const x = Number(box.getAttribute("x"));
      const y = Number(box.getAttribute("y"));
      const bounds = box.getBoundingClientRect();
      const corners = [
        [x, y, bounds.left, bounds.top],
        [x + Number(box.getAttribute("width")), y + Number(box.getAttribute("height")),
          bounds.right, bounds.bottom]
      ];
      for (const [cx, cy, actualX, actualY] of corners) {
        maxAnnotationError = Math.max(
          maxAnnotationError,
          Math.abs(actualX - (left + width * cx / 1000)),
          Math.abs(actualY - (top + height * cy / 1000))
        );
      }
    }
  }
  if (maxAnnotationError > 2) failures.push("Annotation does not align with image pixels");

  const result = {
    viewport: innerWidth,
    example: document.querySelector("#example-title").textContent,
    cardHeight: Math.round(card.height),
    questionAnswerGap: Math.round(questionAnswerGap),
    navigationOverlapsCard,
    maxAnnotationError: Number(maxAnnotationError.toFixed(2)),
    failures
  };
  if (failures.length) throw new Error(JSON.stringify(result));
  return result;
}
