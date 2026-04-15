# LightControl App — Regression & Performance Audit Report
**Date:** April 14, 2026  
**File:** `index.html` (~4,600 lines, single-file PWA)  
**Result:** 0 syntax errors · 9 bugs fixed · All 8 audit areas passed

---

## Bugs Fixed

### 1. `pHolidays` index regression *(breaking)*
**Area:** Preset rendering  
**Problem:** Adding Memorial Day and Labor Day to the `pHolidays` array shifted the `'other'` entry from index 6 to index 8. Two hardcoded `pHolidays[6]` fallbacks in `renderPresetFilterBar()` and `renderPresetList()` now pointed to `'seasons'` instead of `'other'`. Any preset saved with an unrecognized tag would be labeled "Seasons."  
**Fix:** Replaced both `pHolidays[6]` with `pHolidays.find(x => x.id === 'other')`.

---

### 2. `activatePreset` never sent to WLED *(breaking)*
**Area:** Preset library  
**Problem:** Tapping "Activate" on a saved preset updated the zones UI and the Now Playing display but never called `wledSend()`. Lights didn't change on the controller.  
**Fix:** Added `if (wled.active) pushZonesToWLED()` at the end of `activatePreset()`. `pushZonesToWLED()` already existed for the save flow — it was simply missing from activation.

---

### 3. Duplicate `id="dl-strand"` *(minor DOM issue)*
**Area:** Down Lights screen  
**Problem:** Two elements shared `id="dl-strand"`. The second was a hidden leftover `<div style="display:none">` that was never used. Duplicate IDs are invalid HTML and could cause unpredictable behavior in DOM queries.  
**Fix:** Removed the hidden duplicate element entirely.

---

### 4. Dead `home-preset-count` references *(dead code)*
**Area:** Presets  
**Problem:** `doSave()` and `deletePreset()` both called `document.getElementById('home-preset-count')`. This element doesn't exist in the HTML. The code was null-safe so it didn't crash, but it was unnecessary noise.  
**Fix:** Removed both dead reference blocks from both functions.

---

### 5. Stale "4th of July" text after rename *(visual bug)*
**Area:** UI copy  
**Problem:** Three places still said "4th of July" after the holiday was renamed to "USA Holidays":
- Preset menu card subtitle: *"Christmas, Halloween, 4th of July and more"*
- `calHolidays` array `name` field
- Section comment above `JULY4_PAYLOADS`  

**Fix:** Updated all three to reflect "USA Holidays."

---

### 6. Preset menu holiday count stale *(display bug)*
**Area:** Preset menu  
**Problem:** The Holidays card showed `<span class="pmc-count">9</span>`. There are now 11 holidays (Valentine's, St. Patrick's, Easter, Memorial Day, USA Holidays, Labor Day, Halloween, Thanksgiving, Hanukkah, Christmas, New Year's).  
**Fix:** Updated badge to `11`.

---

### 7. Status dot stays green when disconnected *(visual bug)*
**Area:** Home screen connection indicator  
**Problem:** `updateConnectionBadge()` correctly updated the text content of `wled-badge` with a colored `●` character, but never updated the CSS `.status-dot` element (`status-dot-indicator`). That dot always showed green regardless of connection state.  
**Fix:** `updateConnectionBadge()` now updates `status-dot-indicator`'s background color — green when connected, warning-amber when polling fails, danger-red when no controller is configured. Also removes the pulse animation when offline.

---

### 8. Memorial Day and Labor Day missing from calendar *(feature gap)*
**Area:** Schedule / Calendar  
**Problem:** The new Memorial Day and Labor Day holidays appeared correctly in the Holiday grid and Autopilot zones, but were absent from `calHolidays` — the array used to mark dates on the Schedule screen. Valentine's Day and St. Patrick's Day were also missing.  
**Fix:** Added all four to `calHolidays` with appropriate months/days and holiday links so they appear as marked days on the calendar.

---

### 9. Pattern sub-label font sizes too small on mobile *(UX)*
**Area:** Mobile UX  
**Problem:** Pattern row sub-labels ("Tap to activate", "Activates when holiday opens"), zone LED/color info in group mode, team detail effect descriptions, and the downlight hex label were all `font-size: 10px` — difficult to read on small screens.  
**Fix:** Bumped each of these to `font-size: 11px`. Decorative badges ("DEFAULT" pill, category chips, section micro-labels) intentionally kept at 10px.

---

## Audit Area Summary

| Area | Status | Notes |
|------|--------|-------|
| Holiday system — date ranges, zones, overlaps | ✅ Pass | Christmas/Hanukkah overlap is intentional (Christmas listed first for priority). 211 days have no active zone — autopilot fallback handles this correctly. |
| Autopilot — all 3 modes, fallback, palette | ✅ Pass | Smart Holiday, Playlist, and Random modes all wired correctly. Fallback select is restored from localStorage. `generateRandomLook(false)` correctly returns preview without applying. |
| Presets — save, delete, filter, activation | ✅ Pass (1 bug fixed) | `activatePreset` now sends to WLED. Category save flow covers all 11 holidays and 4 seasons. Filter bar dynamically built from used tags only. |
| Defaults system — holiday, season, sync badge | ✅ Pass | `setDefaultPattern`, `setSeasonDefault`, `setTeamDefault` all mirror the same pattern correctly. `syncBootDefaultToController` properly 3-step syncs (activate → psave → cfg). Badge auto-hides after 8s when synced. |
| WLED connection, LED setup, GPIO persistence | ✅ Pass | `updateGPIOField` now auto-saves locally on every change (fixed in prior session). `getLEDCount` has 3-tier fallback (live → localStorage → gpioOutputs sum → 100). `togglePower` override correctly restores last config. |
| Holiday rendering, calendar, quick-save overlay | ✅ Pass (1 bug fixed) | `initHolidays()` renders all 11 holidays from the `holidays[]` array. `openQuickSave` guards against saving when nothing is playing. Calendar updated with all holidays. |
| Mobile UX | ✅ Pass (1 bug fixed) | No fonts below 10px. Critical readability text bumped to 11px. Scroll areas use `vh` units. All interactive controls meet minimum touch target size. |
| Final syntax check | ✅ Pass | 0 errors in both JS blocks. |

---

## No Action Needed

- **Christmas/Hanukkah zone overlap** — Intentional. `getActiveHoliday()` iterates `holidays[]` in order and returns the first match; Christmas is listed before Hanukkah.
- **211 uncovered days** — Autopilot's "Between holidays" fallback (Random / Playlist / Off) is the designed behavior for these days.
- **`doSave` saves zone colors only** — Correct for the zone-based Create Your Own flow. Quick-save uses `nowPlayingColors` for single-color captures from any context.
- **`effect-cat` pill at 10px** — Tertiary UI pill badge; intentionally small.
