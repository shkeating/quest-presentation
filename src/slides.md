# Expanding WCAG Success Criteria Testing Coverage with Browser-Native SLMs
![nano-a11y-auditor logo](img/logo-light-text.png)

**Shauna Keating** & Vanessa Maike\
Department of Computer Science \
State University of New York at Oswego\
Oswego, NY, USA\
*2nd IEEE International Workshop on Intelligent Tools for Accessibility (ITA)*

---

## The Automation Ceiling & The LLM Trade-off

* **The Baseline:** Deterministic tools (like axe-core) catch ~57% of issues, leaving 43% to manual testing.
* **The LLM Solution:** Flagship models (GPT-4o, Claude Sonnet) can close this gap, but introduce critical trade-offs:
  * High financial costs for API credits and massive context windows.
  * **Data Privacy:** Transmits proprietary/secure DOM data to external cloud servers.
  * Incompatible with local development environments or authenticated states containing PII.

<small>Sources: Deque Automated Accessibility Testing Coverage Report (2025); Enhancing Web Accessibility (He, Huq, & Malek, 2025); RoboWCAG (Sheitanov 2025)</small>

---

## Introducing nano-a11y-auditor

A hybrid browser extension combining deterministic static analysis with on-device Small Language Models (SLMs).

![bg right:40% 90%](img/active-test-run.png)


---
## Introducing nano-a11y-auditor

A hybrid browser extension combining deterministic static analysis with on-device Small Language Models (SLMs).

* **Gemini Nano Integration:** Utilizes Chrome's built-in, 2GB local model. 
* **Zero Data Egress:** The model comes to the data. Secure, authenticated DOM context never leaves the local network.
* **WCAG-EM Compatible:** Designed to output data compatible with industry-standard reporting tools to keep humans in the loop.

---

## Under the Hood: Smart Delegation
Instead of using AI for everything, the architecture delegates tasks to the most efficient engine:

1. **[axe-core](https://github.com/dequelabs/axe-core):** Fast, reliable code-level syntax evaluation.
2. **On-Device AI Layer:**
   * **Prompt API:** Evaluates semantic context (e.g., vague link text).
   * **Language Detector API:** Validates coded `lang` attributes against rendered text.
   * **Summarizer API:** Condenses DOM context for efficient evaluation.
3. **[Chrome Debugger API](https://developer.chrome.com/docs/extensions/reference/api/debugger):** Validates layout, reflow, and dynamic viewports.

<small>Note: Built-in Chrome AI APIs currently require experimental flags to run locally.</small>

---

## Execution Architecture

To ensure stability, the extension executes in three isolated phases:

* **Phase 1: Static** (axe-core + text-based Nano rules run in parallel)
* **Phase 2: Visual** (Screenshots + Multimodal Nano for shape/structure checks)
* **Phase 3: Destructive** (Invasive layout simulations like high-contrast or zoom manipulations are run last to protect the DOM)

---

## Experimental Results

Evaluated against the GDS Tool Audit and the Deque Mars Site.

* **Baseline Coverage:** Doubled the barrier detection rate of axe alone, identifying semantic issues (like Vague Link Text) that static scripts miss.
* **Dynamic Behavior:** Achieved an **84.6% recall**, approaching the ~87.6% recall of state-of-the-art LLMs, but operating entirely on-device.
* **Viewport Manipulation:** Achieved a **100% recall** on Reflow (1.4.10) and Resize Text (1.4.4) using the Chrome Debugger, where axe alone returns 0%.
* **Speed:** Eliminated external API latency, resulting in highly consistent local execution times.

---

## Demo: nano-a11y-audit

<iframe width="720" height="405" src="https://www.youtube.com/embed/diKByXDk7t4?si=62T1Y2hKwltIrCHO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

---

## The Future of Accessibility Testing

* **AI should wrap static tools, not replace them.** High system recall is achievable without the computational overhead of sending every DOM node to an LLM, or using artificial intelligence when other technology can accomplish the same outcome with higher efficiency.
* **Human specialists are not going away.** Our expertise is more critical than ever.
* AI can expand our accessibility testing foundation, acting as a powerful **"first alert system"** integrating into our automated testing step.
* It encourages teams to test more often and while *while* they build, shifting the industry from reactive remediation to proactive inclusion.

---

## Thank You / Q&A

**Shauna Keating**, Trusted Tester, CPACC
skeating@oswego.edu 

**Project Repository:** 
[github.com/shkeating/nano-a11y-audit](https://github.com/shkeating/nano-a11y-audit)