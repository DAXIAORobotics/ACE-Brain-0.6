"use strict";
(() => {
  const content = window.ACE_CONTENT;
  if (!content) return;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  // Section navigation and reading progress.
  const navLinks = $$(".section-nav a");
  const sections = navLinks.map(link => $(link.getAttribute("href")));
  const menu = $("#menu-toggle");
  function closeMenu() {
    $("#section-nav").classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", "Open section navigation");
  }
  menu.addEventListener("click", () => {
    const open = $("#section-nav").classList.toggle("open");
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-label", open ? "Close section navigation" : "Open section navigation");
  });
  navLinks.forEach(link => {
    link.setAttribute("aria-label", link.textContent.trim());
    link.addEventListener("click", closeMenu);
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menu.focus();
    }
  });
  let scheduled = false;
  function updateProgress() {
    const max = document.documentElement.scrollHeight - innerHeight;
    $("#reading-progress").style.width = `${max > 0 ? scrollY / max * 100 : 0}%`;
    let active = sections[0];
    sections.forEach(section => {
      if (section.getBoundingClientRect().top < innerHeight * .35) active = section;
    });
    navLinks.forEach(link => {
      const selected = link.hash === `#${active.id}`;
      link.classList.toggle("active", selected);
      if (selected) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    scheduled = false;
  }
  addEventListener("scroll", () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateProgress); }
  }, { passive: true });
  addEventListener("resize", updateProgress);
  updateProgress();

  // A fixed, explicitly labelled comparison of selected models.
  const chartNames = ["ACE-Brain-0.6", "GPT-6 Astra", "Embodied-R1.5-8B", "Claude Opus 5.5", "Qwen3.5-9B"];
  const benchmarks = content.benchmarks;
  function renderChart() {
    const metric = Number($("#benchmark-select").value);
    const chart = $("#comparison-chart");
    chart.replaceChildren();
    $("#chart-title").textContent = metric === 7 ? "Seven-benchmark average" : benchmarks[metric];
    const models = chartNames.map(name => content.models.find(model => model.name === name))
      .sort((a, b) => b.scores[metric] - a.scores[metric]);
    models.forEach(model => {
      const row = element("div", `bar-row ${model.group === "Ours" ? "ours" : model.name === "GPT-6 Astra" ? "astra" : model.name === "Qwen3.5-9B" ? "base" : ""}`);
      const track = element("div", "bar-track");
      track.setAttribute("aria-hidden", "true");
      const bar = element("div", "bar-fill");
      bar.style.setProperty("--value", `${model.scores[metric]}%`);
      track.append(bar);
      row.append(element("span", "bar-name", model.name), track, element("span", "bar-value", model.scores[metric].toFixed(2)));
      chart.append(row);
    });
    $("#chart-note").textContent = metric === 7
      ? "Avg-7 is the unweighted mean of the seven public benchmark scores. RobotGrounding is excluded."
      : `${benchmarks[metric]} uses its benchmark-specific metric. All bars share a 0–100 scale. The complete comparison is in the table below.`;
  }
  $("#benchmark-select").addEventListener("change", renderChart);
  renderChart();

  // Accessible evaluation tabs: click, arrows, Home, and End.
  const tabs = $$("[role=tab]");
  function selectTab(tab, focus = false) {
    tabs.forEach(item => {
      const active = item === tab;
      item.setAttribute("aria-selected", String(active));
      item.tabIndex = active ? 0 : -1;
      $(`#${item.getAttribute("aria-controls")}`).hidden = !active;
    });
    if (focus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectTab(tab));
    tab.addEventListener("keydown", event => {
      let next;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft") next = (index + tabs.length - 1) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); selectTab(tabs[next], true); }
    });
  });

  let modelFilter = "all", sortColumn = 7, sortAscending = false;
  const maxima = benchmarks.map((_, i) => Math.max(...content.models.map(model => model.scores[i])));
  const tableHead = element("tr");
  const nameHeader = element("th", "", "Model");
  nameHeader.scope = "col";
  tableHead.append(nameHeader);
  benchmarks.forEach((name, i) => {
    const header = element("th");
    header.scope = "col";
    const button = element("button", "", name);
    button.type = "button";
    button.dataset.column = i;
    button.addEventListener("click", () => {
      sortAscending = sortColumn === i ? !sortAscending : false;
      sortColumn = i;
      renderTable();
    });
    header.append(button);
    tableHead.append(header);
  });
  $("#results-head").append(tableHead);
  function renderTable() {
    const models = content.models.filter(model => modelFilter === "all" ||
      (modelFilter === "closed" ? model.group === "Closed" : model.group !== "Closed"));
    models.sort((a, b) => (sortAscending ? 1 : -1) * (a.scores[sortColumn] - b.scores[sortColumn]));
    $("#results-body").replaceChildren();
    models.forEach(model => {
      const row = element("tr", model.group === "Ours" ? "ours" : "");
      const name = element("th", "", model.name);
      name.scope = "row";
      name.append(element("span", "model-category", model.group === "Ours" ? "Ours · 9B" : model.group));
      row.append(name);
      model.scores.forEach((value, i) => {
        const cell = element("td", i === 7 ? "avg" : "", value.toFixed(2));
        if (value === maxima[i]) cell.classList.add("best");
        row.append(cell);
      });
      $("#results-body").append(row);
    });
    $$("#results-head button").forEach((button, i) => {
      const active = i === sortColumn;
      button.textContent = benchmarks[i] + (active ? sortAscending ? " ↑" : " ↓" : "");
      button.parentElement.setAttribute("aria-sort", active ? sortAscending ? "ascending" : "descending" : "none");
      button.setAttribute("aria-label", `Sort by ${benchmarks[i]}, ${active && !sortAscending ? "ascending" : "descending"}`);
    });
  }
  $$("[data-filter]").forEach(button => button.addEventListener("click", () => {
    modelFilter = button.dataset.filter;
    $$("[data-filter]").forEach(item => item.setAttribute("aria-pressed", String(item === button)));
    renderTable();
  }));
  renderTable();

  // The gallery displays benchmark references, never simulated inference.
  const examples = content.examples;
  let currentIndex = 6;
  const groups = [...new Set(examples.map(example => example.group))];
  groups.forEach(group => {
    const button = element("button", "", group);
    button.type = "button";
    button.dataset.group = group;
    button.addEventListener("click", () => {
      currentIndex = examples.findIndex(example => example.group === group);
      renderExample();
    });
    $(".gallery-groups").append(button);
  });
  examples.forEach((example, index) => {
    const option = element("option", "", `${String(index + 1).padStart(2, "0")} · ${example.title}`);
    option.value = index;
    $("#example-select").append(option);
  });
  const svgNS = "http://www.w3.org/2000/svg";
  function svgNode(tag, attrs) {
    const node = document.createElementNS(svgNS, tag);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
    return node;
  }
  function renderExample() {
    const example = examples[currentIndex], answer = example.answer;
    $("#example-position").textContent = `${currentIndex + 1} / ${examples.length}`;
    $("#example-select").value = currentIndex;
    $("#example-title").textContent = example.title;
    $("#example-question").textContent = example.question;
    $$("[data-group]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.group === example.group)));
    $("#answer-label").textContent = "REFERENCE ANNOTATION";
    if (answer.exists === false) $("#example-answer").textContent = "none";
    else if (answer.yn) $("#example-answer").textContent = answer.yn;
    else if (example.id === "count_number") $("#example-answer").textContent = String(answer.count);
    else {
      $("#answer-label").textContent = example.id === "ref_box" ? "REFERENCE BOX · [0, 1000]" : "VALID TARGET BOXES · [0, 1000]";
      $("#example-answer").textContent = JSON.stringify(answer.boxes);
    }
    const visual = $("#example-visual");
    visual.replaceChildren();
    visual.classList.toggle("cross-view", example.images.length === 2);
    example.images.forEach((path, index) => {
      const scene = element("figure", "scene"), frame = element("div", "scene-frame");
      const img = element("img");
      img.src = path;
      img.alt = `${example.title}: ${example.images.length === 2 ? index === 0 ? "source camera with object marked in red" : "target camera" : "robot camera observation"}`;
      frame.append(img);
      // Coordinates remain in the original, uncropped image frame.
      if (index === example.images.length - 1) {
        const overlay = svgNode("svg", { viewBox: "0 0 1000 1000", preserveAspectRatio: "none", class: "scene-overlay", "aria-hidden": "true" });
        (answer.boxes || []).forEach(([x1, y1, x2, y2], i) => {
          overlay.append(svgNode("rect", { x: x1, y: y1, width: x2 - x1, height: y2 - y1, rx: 2 }));
          if ((answer.boxes || []).length > 1) {
            const label = svgNode("text", { x: x1 + 8, y: y1 + 32 });
            label.textContent = i + 1;
            overlay.append(label);
          }
        });
        example.contextBoxes.forEach(([x1, y1, x2, y2]) => {
          overlay.append(svgNode("rect", { x: x1, y: y1, width: x2 - x1, height: y2 - y1, class: "context" }));
        });
        overlay.style.display = $("#show-annotations").checked ? "" : "none";
        frame.append(overlay);
      }
      const caption = example.images.length === 2
        ? index === 0 ? "Image 1 · source camera (red marker in source image)" : "Image 2 · target camera"
        : answer.yn ? "Original benchmark frame · spatial references in cyan"
        : answer.exists === false ? "Original benchmark frame · requested target is absent"
        : "Original benchmark frame · reference boxes in violet";
      scene.append(frame, element("figcaption", "", caption));
      visual.append(scene);
    });
  }
  $("#example-select").addEventListener("change", event => { currentIndex = Number(event.target.value); renderExample(); });
  $("#example-next").addEventListener("click", () => { currentIndex = (currentIndex + 1) % examples.length; renderExample(); });
  $("#example-prev").addEventListener("click", () => { currentIndex = (currentIndex + examples.length - 1) % examples.length; renderExample(); });
  $("#show-annotations").addEventListener("change", event => $$(".scene-overlay").forEach(overlay => { overlay.style.display = event.target.checked ? "" : "none"; }));
  renderExample();

  // Native modal dialog provides keyboard focus containment and Escape.
  const dialog = $("#figure-dialog");
  let figureTrigger;
  $$("[data-figure]").forEach(button => button.addEventListener("click", () => {
    figureTrigger = button;
    const source = $("img", button);
    $("#dialog-img").src = source.src;
    $("#dialog-img").alt = source.alt;
    $("#dialog-title").textContent = button.getAttribute("aria-label").replace(/^Enlarge (the )?/i, "");
    $("#dialog-original").href = `assets/figures/${button.dataset.figure}.pdf`;
    dialog.showModal();
    document.body.style.overflow = "hidden";
  }));
  $("#dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener("close", () => {
    document.body.style.overflow = "";
    figureTrigger?.focus({ preventScroll: true });
  });
  $("#copy-citation").addEventListener("click", async () => {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText($("#bibtex").textContent);
      $("#copy-status").textContent = "BibTeX copied.";
    } catch {
      const range = document.createRange();
      range.selectNodeContents($("#bibtex"));
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      $("#copy-status").textContent = "Citation selected. Press Ctrl+C (or ⌘C on Mac) to copy.";
    }
  });

  // Release links are opt-in. Empty configuration never creates a dead CTA.
  $$("[data-resource]").forEach(card => {
    const url = window.ACE_CONFIG?.links?.[card.dataset.resource];
    if (!url) return;
    let parsed;
    try { parsed = new URL(url, document.baseURI); } catch { return; }
    if (!["https:", "http:"].includes(parsed.protocol)) return;
    const link = element("a", card.className);
    link.href = parsed.href; link.target = "_blank"; link.rel = "noopener";
    link.append(...card.childNodes);
    $(".resource-status", link).textContent = "View resource ↗";
    card.replaceWith(link);
  });
})();
