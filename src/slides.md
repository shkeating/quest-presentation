# Expanding WCAG Success Criteria Testing Coverage with Browser-Native SLMs
![nano-a11y-auditor logo](img/logo-light-text.png)

**Shauna Keating**
<br>
Supervisor: Vanessa Maike
<br>
Human Computer Interaction Masters Program
<br>
SUNY Oswego Dept of Computer Science

---

## Automated Accessibility Testing
* Automated tools provide excellent baseline coverage.
* Engine examples: axe-core (powers Lighthouse, Accessibility Insights for Web).
* Catches ~57% of total issue instances (16 of 50 WCAG 2.1 AA criteria).
* Leaves 43% of issues to resource-intensive manual testing.

<small>source: [Deque Automated Accessibility Testing Coverage Report (Deque 2025)](https://www.deque.com/automated-accessibility-coverage-report/)</small>

---

## The LLM Trade-off
Recent studies prove Large Language Models (LLMs) can close this gap. In 2025, multiple studies were published showing promising reuslts in expanding uaotmated testing using flagship LLMs such as GPT 4o and Claude Sonnet, which used APIs to query the LLMs against public web page content.

<small>source: [Enhancing Web Accessibility (He, Huq, & Malek, 2025)](https://seal.ics.uci.edu/projects/GenA11y/index.html) <br> [RoboWCAG (Sheitanov 2025)](https://trepo.tuni.fi/handle/10024/231152)</small>

---

## LLM tradeoffs

* High financial cost for API credits.
* Massive context windows exhaust limits quickly.
* **Data Privacy:** Transmits proprietary/secure page data to external cloud servers.
* Only available for websites that are live and public - not containing PII - even if you don't care about security there is no way for these tools to access your site

<small>source: [Enhancing Web Accessibility (He, Huq, & Malek, 2025)](https://seal.ics.uci.edu/projects/GenA11y/index.html); 
<br>
[RoboWCAG (Sheitanov 2025)](https://trepo.tuni.fi/handle/10024/231152)</small>

---

## LLM tradeoffs

Just because we **can** use the biggest model possible to do **everything**... should we? There are scenarios where the cybersecurity and token usage limits are not viable. 

---

## SLMs: Small Language Models
* Shifting from massive, general LLMs to specialized **Small Language Models (SLMs)**, compact AI systems with fewer parameters.
* Google Chrome has the experimental built-in **Gemini Nano** model, which is 2GB and is hosted entirely on the user's machine. Not fully released yet, but an easy avenue to access SLMs that need browser context.
* Model comes to the data, data never leaves the network.
* Free to use, no token limits or money needed to use

<small>source: [Small Language Models are the Future of Agentic AI (Belcak et al. 2025)](https://research.nvidia.com/labs/lpr/slm-agents/), [Google Chrome: Built in AI APIs](https://developer.chrome.com/docs/ai/built-in-apis)</small>

---

## Introducing nano-a11y-auditor
A browser extension combining axe-core with on-device SLMs, and data optimization and metrics in line with accessibility industry standards.

![Active Test Run of nano-a11y-auditor](img/active-test-run.png)

---
## Introducing nano-a11y-auditor
### My goals

1. Not use AI for absolutely everything; axe does a great job testing for what it can test for - many of the tools I looked at used AI prompting for things easily determined with the basic scripts in axe-core
2. Extend this capability with AI tools, and deliver the right context via js extraction, to make is possible to use a smaller model, and still get accurate results.
3. Provide a user-friendly interface, and deliver easy to understand result metrics that other automated accessibility tools don't 
4. Data compatibility with industry standard WCAG EM report tool. This allows the user to test for remaining criteria, and clearly see whats left to do, or even hand it off to someone with more accessibility experience to get assistance.

---

## What's under the hood
Instead of AI doing everything, delegate appropriately:
1. **[axe-core](https://github.com/dequelabs/axe-core):** Fast, reliable code-level syntax evaluation.
2. **On-Device AI Layer:**
   * **[Prompt API (Gemini Nano)](https://github.com/webmachinelearning/prompt-api):** Evaluates semantic context (e.g., identifying vague link text).
   * **[Language Detector API](https://developer.mozilla.org/en-US/docs/Web/API/Translator_and_Language_Detector_APIs):** Cross-references the coded `lang` attribute against the actual text.
   * **[Summarizer API](https://developer.mozilla.org/en-US/docs/Web/API/Summarizer):** Condenses DOM context for more efficient evaluation.
3. **[Chrome Debugger API](https://developer.chrome.com/docs/extensions/reference/api/debugger):** Validates layout, reflow, and dynamic viewports.
4. **[Shape Detector API](https://developer.chrome.com/docs/capabilities/shape-detection):** Assists with multimodal and visual structure checks.

<small>source: [Built-in AI APIs (Klepper 2024)](https://developer.chrome.com/docs/ai/built-in-apis)</small>
<small> note: These APIS are experimental and in varying statuses. For example, Prompt API is currently in Origin Trial, meaning it is not in Chrome today by default. I worked with the experimental flags in Chrome and have the info on how to do this yourself in the [nano-a11y-auditor readme](https://github.com/shkeating/nano-a11y-audit). </small>

---

## System Architecture

* **Phase 1: Static** (axe + text Nano rules)
* **Phase 2: Visual** (Screenshots + Multimodal Nano)
* **Phase 3: Destructive** (High-contrast, zoom manipulations)

---

## Experimental Design
Evaluating what my tool can uncover vs aXe alone (control) vs. GenA11y flagship tool study's datasets that we had "answer keys" for to reliably check for % of issues captured

1. **GDS Tool Audit:** Baseline coverage & semantic reasoning.
2. **Deque Mars Site:** Dynamic behavior & realistic "trap" data.

<small>source: [GDS Tool Audit (alphagov, 2017)](https://github.com/alphagov/accessibility-tool-audit); [Destination Mars (Deque Systems, 2025)](https://dequeuniversity.com/demo/mars/)</small>

---

## Results: Baseline Coverage
nano-a11y-auditor doubled the barrier detection rate of axe alone, successfully identifying semantic issues like Vague Link Text the static scripts in axe can't make a call on alone.

![Recall rates on GDS Accessibility Tool Audit page](img/recall-rates-gds-page.png)

---

## Results: Dynamic Behavior
State-of-the-art LLM AI tools achieve ~87.6% recall. By combining axe with the Chrome Debugger, our SLM hybrid approached this benchmark securely (84.6%) in initial tests.

![Comparative Recall Rates](img/comparitive-recall-rates.png)

<small>source: [Enhancing Web Accessibility (He, Huq, & Malek, 2025)](https://seal.ics.uci.edu/projects/GenA11y/index.html)</small>

---

## Key findings
Axe struggles with criteria requiring viewport manipulation.
* **Reflow (1.4.10) & Resize Text (1.4.4):** 
  * axe recall: 0% 
  * nano-a11y-auditor recall: 100%

Axe partially tests for some criteria, nano-a11y audit in some cases made it so we could get a better picture
* Deterministic linters pass technically valid but functionally exclusionary code. 
* The Nano model acts as a proxy to flag context-based failures. 
* For some criteria, the tool I built was able to "finish the job" on some criteria it cannot check for fully on its own (ex: it can check if an image has alt text, not if its outright wrong)

---

## Test Run Duration Comparison
* Consistent execution times locally.
* Eliminated eternal API call latency.
* **100% On-Device Processing:** Zero sensitive data sent to the cloud.

![Test Run Duration](img/test-run-duration.png)

<small>source: [Honey, I shrunk the AI (McConnon, 2025)](https://www.ibm.com/think/insights/slm-edge-computing)</small>

---

## Live Demo: nano-a11y-auditor

<iframe width="560" height="315" src="https://www.youtube.com/embed/diKByXDk7t4?si=62T1Y2hKwltIrCHO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

---

## Conclusion
* AI should **wrap** static tools, not replace them.
* High system recall is achievable without the computational overhead of sending every DOM node to an LLM.
* SLMs in the browser provide a secure, cost-effective path forward for expanding automated accessibility testing in more scenarios.

---

## The Future of Accessibility Testing
* **Human accessibility specialists are not going away;** our expertise is more critical than ever.
* AI expands our foundation, acting as a much stronger **"first alert system."**
* It encourages teams to come to us for testing *while* they are still building, instead of right before they ship.
* **Proactive > Reactive:** Remediation is expensive work, and avoiding it entirely is the ultimate goal.

---

## Thank You / Q&A

Shauna Keating
skeating@oswego.edu <br>
**Project Repository:** [github.com/shkeating/nano-a11y-audit](https://github.com/shkeating/nano-a11y-audit)