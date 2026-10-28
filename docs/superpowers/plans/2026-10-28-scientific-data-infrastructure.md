# Scientific data infrastructure editorial implementation

> **For agentic workers:** Use superpowers:executing-plans. The user approved the recommended naming and full bilingual direction, and existing authorization covers publication.

**Goal:** Adopt Scientific Data / 科学数据 in navigation and Scientific Data Infrastructure / 科学数据基础设施 as the page positioning, with cohesive, natural bilingual copy across the homepage and data page.

**Approved copy:** Hero: “将科学探索的过程，转化为智能的学习经验。” / “The work of discovery, made learnable.” Core advantage: “研究问题的提出者，也是训练任务的构建者。” / “Built by the researchers behind the questions.” Support this with problem formulation, executable research workflows, and scientific verification.

**Scope:** Editorial labels, headings, intro, three core principles, four offering descriptions, related-research and contact copy. Preserve the actual question excerpts, equations, language controls, scientific results, team details, partnership evidence and delivery figures. Retain upstream change `812f1c8` using 圆盘. Adjust the principle layout to three columns on desktop, one on mobile.

**Style:** Explain the work in ordinary scientific and engineering language. Use independent natural English wording with the same meaning as Chinese. Avoid unsupported performance, exclusivity or platform claims. Infrastructure refers specifically to data, executable environments and verification systems. Do not quote or copy the marketing of the websites researched in the prior turn.

- [x] Apply the accepted names and rewrite the supporting copy in both languages.
- [x] Update existing checks to the new labels/layout, inspect previews, run lint/build/browser verification and focused review.
- [x] Commit, push, deploy and verify the public pages.

## Local verification

- Lint, production build and all 7 content checks passed; all 25 browser tests passed.
- After final wording and heading-wrap adjustments, the build/content checks and four targeted responsive/accessibility tests passed.
- Desktop English/Chinese, mobile Chinese, homepage entry and three-column principle previews inspected. The Chinese hero stays on its intended two lines at 320px.
- Focused review requested one wording correction: “long-form” could mean answer length. Replaced it with sustained, multi-step scientific reasoning. No factual or functional blockers reported.
- Obsolete Data Business / 数据业务 labels and superseded headlines are absent from active site content.

## Published verification

- Editorial implementation: `a3e5bdf`; Chinese heading clause layout: `30c7c62`.
- Concurrent upstream `58168fa` renamed the Chinese RSI offering to 科学递归自我改进 and was fast-forwarded without discarding it. Its successful deployment includes all of this work: https://github.com/LightRayAI/website/actions/runs/40755129384
- Both language homepages and data pages returned HTTP 200 with the accepted Scientific Data labels, infrastructure positioning, hero, three principles and four prompt-only examples. Upstream 圆盘 and RSI wording are present.
- Live independent-card language and keyboard/mobile tests passed.
- Final documentation update does not alter the deployed site.
