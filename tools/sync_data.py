"""Regenerate browser data and CSV from content.json using Python's standard library."""
from pathlib import Path
import csv
import json

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "assets" / "data"
content = json.loads((DATA / "content.json").read_text(encoding="utf-8"))

for model in content["models"]:
    values = model["scores"]
    if len(values) != len(content["benchmarks"]):
        raise ValueError(f"Wrong score count: {model['name']}")
    if abs(sum(values[:7]) / 7 - values[7]) >= 0.011:
        raise ValueError(f"Avg-7 does not match the seven public scores: {model['name']}")

for example in content["examples"]:
    for image in example["images"]:
        resolved = (ROOT / image).resolve()
        if not resolved.is_relative_to(ROOT) or not resolved.is_file():
            raise ValueError(f"Missing or invalid image: {image}")
    for box in example["answer"].get("boxes", []) + example.get("contextBoxes", []):
        x1, y1, x2, y2 = box
        if not (0 <= x1 < x2 <= 1000 and 0 <= y1 < y2 <= 1000):
            raise ValueError(f"Invalid reference box: {example['id']}")

(DATA / "content.js").write_text(
    "window.ACE_CONTENT = " + json.dumps(content, indent=2) + ";\n",
    encoding="utf-8",
)
with (DATA / "benchmarks.csv").open("w", newline="", encoding="utf-8") as stream:
    writer = csv.writer(stream, lineterminator="\n")
    writer.writerow(["Model", "Group"] + content["benchmarks"])
    for model in content["models"]:
        writer.writerow([model["name"], model["group"]] + model["scores"])

print(f"Updated content.js and benchmarks.csv: {len(content['models'])} models, "
      f"{len(content['examples'])} examples.")
