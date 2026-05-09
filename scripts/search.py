#!/usr/bin/env python3
"""
vault 全文搜尋工具
用法：python scripts/search.py <關鍵字> [--dir wiki|output|raw]
"""

import sys
import os
import re
import argparse
from pathlib import Path

VAULT = Path(__file__).parent.parent

def search(keyword: str, search_dir: str = "wiki") -> list[dict]:
    target = VAULT / search_dir
    results = []
    pattern = re.compile(re.escape(keyword), re.IGNORECASE)

    for path in sorted(target.rglob("*.md")):
        if path.name.startswith("_template"):
            continue
        try:
            lines = path.read_text(encoding="utf-8").splitlines()
        except Exception:
            continue

        hits = []
        for i, line in enumerate(lines):
            if pattern.search(line):
                start = max(0, i - 1)
                end = min(len(lines), i + 2)
                context = "\n".join(lines[start:end])
                hits.append({"line": i + 1, "context": context})

        if hits:
            results.append({
                "file": str(path.relative_to(VAULT)),
                "hits": hits
            })

    return results


def main():
    parser = argparse.ArgumentParser(description="Vault 全文搜尋")
    parser.add_argument("keyword", help="搜尋關鍵字")
    parser.add_argument("--dir", default="wiki", choices=["wiki", "output", "raw", "all"],
                        help="搜尋範圍（預設：wiki）")
    args = parser.parse_args()

    dirs = ["wiki", "output", "raw"] if args.dir == "all" else [args.dir]
    all_results = []
    for d in dirs:
        all_results.extend(search(args.keyword, d))

    if not all_results:
        print(f"找不到「{args.keyword}」的相關內容")
        return

    print(f"\n搜尋「{args.keyword}」— 共 {len(all_results)} 個檔案命中\n")
    print("=" * 60)
    for r in all_results:
        print(f"\n📄 {r['file']}")
        for h in r["hits"]:
            print(f"   行 {h['line']}:")
            for line in h["context"].splitlines():
                print(f"      {line}")


if __name__ == "__main__":
    main()
