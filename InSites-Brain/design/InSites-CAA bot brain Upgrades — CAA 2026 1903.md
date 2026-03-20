# Bot-Brain Upgrades — CAA 2026

**Date:** 2026-03-05 | **Status:** Approved, ready for implementation

---

---
<div dir="rtl">
# גרסה עברית — שדרוגי Bot-Brain לסדנת CAA 2026

**תאריך:** 2026-03-05 | **עדכון אחרון:** 2026-03-19 | **סטטוס:** בביצוע — שבוע אחרון לפני הסדנה

---

## מה עובד טוב — לא לגעת

מבנה 7 שלבים, מסגרות CSR ו-DQR, מפתח סימון גלובלי, אפקט הקשר, מנדט ראיות, זרימת Read-Collection כ-workflow נפרד.

---

# א. עדיפות גבוהה (חובה לסדנה)

## א1. סנכרון KG — HTML/React ✅

KG עובד כ-HTML בקלוד ובג׳מיני. ב-GPT נדרש React. הספק הישן הוחלף.

**סטטוס:** ✅ בוצע

## א2. התאמה לקהל ארכאולוגי ✅

שלב 0 — רשימת בדיקה לחומר ארכאולוגי (דוחות חפירה, שכבות, ממצאים, GIS, תמונות שטח). שלב 1 — ציר זמן שמזהה שכבות סטרטיגרפיות. שפת פלט מותאמת ל-CAA. בוצע ב-v3 (ARM).

**סטטוס:** ✅ בוצע

## א3. שורת סטטוס ✅ | כותרת ביסוס — ויתור

שורת סטטוס בסוף כל תשובה — בוצע ב-v5. כותרת ביסוס (Grounding Header N/M/K) — לא יושם ב-InSites-CAA.md הנוכחי. ייתכן שוויתרנו על הרכיב הזה.

**סטטוס:** ✅ חלקי — שורת סטטוס בוצעה, כותרת ביסוס לא

## א4. דשבורד / דוח מסכם כארטיפקט ⏳

הנחיה בשלב 6 לייצור ארטיפקט מסכם. פרוטוטייפ קיים (Dashboard-skill-generate.md + Single-Dashboard-example.html). דורש כיוונון סופי.

**סטטוס:** ⏳ פרוטוטייפ — דורש סגירה

## א5. פידבק ואיכות שיחה — 3 שכבות

**שכבה 1 — מעקב מיקרו-פידבק.** הבוט מתעד תיקוני משתמש בכל שלב. מוצגים בשלב 6 כ-"תובנות תהליך". **⏳ בתהליך — 19-20.3.**

**שכבה 2 — דופק איכות בסוף שלב.** קיים בפרומפט. דורש: משמעת חשובה — לוודא שהבוט שואל את השאלה באופן עקבי, ועדכון פורמט סופי עם עקרונות LIM.

**שכבה 3 — ארטיפקט סיכום תהליך.** פרוטוטייפ ראשוני מוצלח: שילוב ניתוח HITL ושלוש שאלות רפלקציה למשתמש בשלב 6. שייך למשימת שכבה 1 — השלמה יחד איתה.

**סטטוס:** שכבה 1 ⏳ בתהליך | שכבה 2 ⏳ | שכבה 3 ⏳ פרוטוטייפ ראשוני

---

# ב. עדיפות בינונית

## ב1. מפת ציטוט מקורות בשלב 6

טבלה שמראה אילו מקורות שימשו בכל שלב. שקיפות + יכולת ביקורת. יבוצע רק בסגירת ה-Bot-Brain הסופית.

**סטטוס:** ☐ אחרי סגירת Bot-Brain

## ב2. שדרוג Read-Collection ⏳

MA-RC v2 קיים עם extraction מובנה, דשבורד collection, וייצוא JSON. פרוטוטייפ עובד (Kinneret Sites, EAC11).

**סטטוס:** ⏳ פרוטוטייפ קיים

## ב3. ייצוג תוצרים — כל שלב כיחידה

מנגנון לשמירה/ייצוא/שיתוף של שלבים בודדים. קשור ל-"ההערכה היא הדאטאסט". חשוב — לא ברור אם יספיק זמן.

**סטטוס:** ☐ אם יספיק זמן

## ב4. שילוב MCP

הנחיה ב-Bot-Brain לכלים חיצוניים. רק אם ישאר זמן פיתוח והכל מוכן לסדנה.

**סטטוס:** ☐ רק אם ישאר זמן

---

# ג. עדיפויות נוספות

## ג1. הערת הוצאה מהניתוח בשלב 2

**סטטוס:** ☐ אחרי הסדנה

## ג2. ארכיטקטורת ריבוי סוכנים

**סטטוס:** ☐ אחרי הסדנה

## ג3. אפקט הקשר דו-כיווני ב-KG ⬆️ עדיפות גבוהה

**הועלה לעדיפות גבוהה.** חלק מהמימוש קיים בפרומפט (Context Effect בשלבים 1-2). צריך לוודא שזה בא לידי ביטוי גם ב-KG — קשתות dashed, יחסי `frames`/`reframes`.

**סטטוס:** ⏳ חלקי — לוודא ביצוע מלא גם ב-KG

## ג4. פיצ׳רים מאתר מלווה כפיצ׳רים בבוט

חלק בוצע. כדאי מאוד לבצע — במסגרת MA-RA.

**סטטוס:** ⏳ חלקי — להשלים דרך MA-RA

---

# שבוע אחרון — 19-31.3

| פריט | סטטוס | עדיפות השבוע |
| --- | --- | --- |
| א5 שכבה 1 — מיקרו-פידבק | ⏳ בתהליך | **חובה 19-20.3** |
| א5 שכבה 2 — דופק איכות | ⏳ משמעת + LIM | גבוהה |
| א5 שכבה 3 — ארטיפקט סיכום | ⏳ פרוטוטייפ ראשוני (HITL + 3 שאלות רפלקציה) | גבוהה |
| ג3 — אפקט הקשר ב-KG | ⏳ לוודא | גבוהה |
| א4 — דשבורד סגירה | ⏳ | בינונית |
| ג4 — פיצ׳רים דרך MA-RA | ⏳ | בינונית |
| ב1 — מפת ציטוט | ☐ | בסגירת Bot-Brain |
| ב3 — שלב כיחידה | ☐ | אם יספיק |
| ריצה יבשה מלאה | ☐ | **חובה לפני 31.3** |
| תצורות fallback | ☐ | חובה |
| תיקוני בוט אחרונים | ☐ | חובה |

# יומן החלטות

- דשבורד (א4): הצעה חובה, ביצוע אופציונלי
- כותרת ביסוס (א3): ויתור — שורת סטטוס מספיקה
- החלטה ארכיטקטונית ב3: בהמתנה
- פידבק (א5): שכבות 1-2 חוצות-פלטפורמות דרך הנחיות; שכבה 3 = ארטיפקט (קלוד/ג׳מיני) או JSON (GPT/דיפסיק)
- ג3 אפקט הקשר: הועלה לעדיפות גבוהה (2026-03-19)
- ג4 אתר מלווה → בוט: להשלים דרך MA-RA
- </div>
---
## What works well — don't touch

Core structure (7 stages), CSR & DQR frameworks, Global Notation Key, Context Effect, Evidence Mandate, Read-Collection as separate workflow.

---

# A. High Priority (must-have for workshop)

## A1. KG → React sync

Bot-Brain-en still contains old HTML template. Replace with React spec matching SKILL-KG (already built as v2.1).

**Effort:** Low | **Status:** ☐

## A2. Archaeological audience adaptation

Stage 0 — checklist for archaeological material (excavation reports, strata, finds, GIS, field photos). Stage 1 — Timeline recognizes stratigraphic layers. Output language suited to CAA.

**Effort:** Low-medium | **Status:** ☐

## A3. Status line + Grounding Header

Status line at end of every response. Grounding Header N/M/K at end of each completed stage. Stage 1 = fixed ✅, Stages 2-5 = dynamic. Based on Ferreira et al. 2025.

**Effort:** Medium | **Status:** ☐

## A4. Dashboard / summary report artifact

Instruction in Stage 6 to generate summary artifact — dashboard pulling data from all stages. Mandatory offer, optional execution. Tested in Gemini.

**Effort:** Medium | **Status:** ☐

## A5. Feedback & dialogue quality — 3 layers

**Layer 1 — Micro-feedback tracking.** Bot logs corrections during each stage. Displayed in Stage 6 as Process Insights.

**Layer 2 — Stage-end quality pulse.** One short question about the process at end of each stage. Rotates between stages.

**Layer 3 — Session debrief artifact.** End of Stage 6: Process Report about the conversation itself. Stages completed, corrections, sourced/inferred/uncertain ratio, quality pulse responses.

Cross-platform: Layers 1-2 = prompt instructions. Layer 3 = artifact or JSON export.

**Effort:** Medium | **Status:** ☐

---

# B. Medium Priority (high value if time permits)

## B1. Source citation map in Stage 6

Table showing which sources were used per stage. Transparency + audit.

**Effort:** Low | **Status:** ☐

## B2. Read-Collection — minimal upgrade

Add 2-3 analysis recipes as conversation starters (value distribution, gap analysis, comparison matrix).

**Effort:** Low | **Status:** ☐

## B3. Output representation — each stage as a unit

Mechanism to save/export/share individual stages. Per-stage artifacts, JSON export, structured output. Tied to "The Assessment is the Dataset."

**Effort:** Medium-high (requires architectural decision) | **Status:** ☐

## B4. MCP integration

Bot-Brain instruction for external tools (Wikidata, ARACHNE, tDAR). For workshop = pre-scripted demo.

**Effort:** Medium | **Status:** ☐

---

# C. Low Priority for Workshop (important for research)

**C1.** Exclusion note in Stage 2 | ☐

**C2.** Multi-agent architecture | ☐

**C3.** Bidirectional Context Effect in KG | ☐

**C4.** Companion site features as bot features | ☐

---

# Implementation — Priority Order

| # | Item | Effort | Workshop Impact | Week |
| --- | --- | --- | --- | --- |
| :---: | ------ | :------: | :------: | :----: |
| 1 | A1. KG → React sync | Low | High | 1 |
| 2 | A2. Archaeological adaptation | Low-Med | High | 1 |
| 3 | B1. Source citation map (Stage 6) | Low | Medium | 1 |
| 4 | A3. Status + Grounding Header | Medium | High | 1 |
| 5 | A5. Feedback layers 1-2 (micro-feedback + quality pulse) | Medium | High | 1 |
| 6 | A4. Dashboard / summary artifact | Medium | High | 1.5 |
| 7 | A5. Feedback layer 3 (session debrief artifact) | Medium | High | 1.5 |
| 8 | B2. Read-Collection minimal upgrade | Low | Medium | 1.5 |
| 9 | B3. Output representation (each stage as unit) | Med-High | Med-High | Post |
| 10 | C1. Exclusion note (Stage 2) | Low | Low | Post |
| 11+ | B4 MCP, C2 Multi-agent, C3 Context Effect, C4 Companion | — | — | Post |

# Weekly Schedule

| Week | Focus | Items |
| --- | --- | --- |
| :----: | ------- | ------- |
| 1 (→12.3) | Foundation + instructions | A1, A2, B1, A3, A5 layers 1-2 — prompts, instructions, cross-platform |
| 1.5 (→15.3) | Artifacts | A4, A5 layer 3, B2 — full artifact prototype |
| 2 (→21.3) | Experiences — bot in action | Test bot in Write scenario (flow, pacing, stops); design Read experience at bot level; cross-platform testing of upgraded bot; fine-tune based on hands-on use |
| 3–4 (→31.3) | Workshop integration | Adapt workshop site to new bot features; bot in full dry-run scenario; fallback configurations per platform; final bot fixes |

# Decision log

- Dashboard (A4): mandatory offer, optional execution
- Grounding Header threshold: 50% sourced = ✅, below = ⚠️ (open question)
- B3 architectural decision: pending
- Feedback (A5): layers 1-2 cross-platform via instructions; layer 3 = artifact (Claude/Gemini) or JSON (GPT/DeepSeek)
