# Polish log

Screenshots were taken in the app's browser at 1440x900 (the skill's polish.py needs
Python Playwright, which is not installed).

## Round 1 — direction drafts, 16 Nov 2026

dir-1 Front page
1. Cover artwork keeps its cream ground on a cool grey page. Left for now: recolouring the
   generated covers belongs to the build, once a direction is chosen.
2. Rail thumbnails were unreadable at 104px. Fixed by using the simplified thumb covers.
3. Department row below the fold is three similar lists. Middle column changed to images.

dir-2 Transactions
1. Fig. 2 was taller than the column of text beside it. Fixed: figures cropped to 16:9.
2. Columns end unevenly at some widths. Left: balancing depends on final content.
3. Justified text needs hyphenation to avoid rivers. Fixed: hyphens on, off in references.

dir-3 The issue
1. Traces cross the outlined second line of the nameplate. Kept: the name stays legible
   and the overlap is what makes it a cover.
2. Contents numerals are years, which repeat (23, 23). Left for your call.
3. Phone: nav trimmed to two links, cover lines stack.

Not run: design_lint check/compare (same Playwright dependency). The three drafts were
compared by eye: different skeletons, different temperatures.
