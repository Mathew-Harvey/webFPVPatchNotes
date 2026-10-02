# Review 1 A

Reader check for chapter 1 only. A must-fix is a reader who gets stuck, cannot tell the order, cannot find the fly link, or cannot read a page.

## What I looked at

The book is `docs/index.html`. Chapter data is the `CHAPTERS` array: cover, page 1, page 2, page 3, title "The gate".

Chrome screenshots in `C:\Users\mathe\AppData\Local\Temp\webfpv-book\`: `desktop-cover.png`, `desktop-spread.png`, `desktop-spread-curl.png`, `desktop-end.png`, `desktop-text.png`, `desktop-still.png`, `phone-cover.png`, `phone-p1.png`, `phone-p2.png`, `phone-p3.png`.

I used the Playwright walk as given and did not run it again. Cover loads. A drag opens to "The gate, page 1 and page 2". A spread drag lands on page 3. ArrowRight, Home, End, ArrowLeft, and Contents work. Read as text shows transcripts and Escape leaves it. No horizontal overflow at 1440x900 or 390x844. Every figure has alt and a transcript. The FLY link is `https://webfpv.org/sim/` and a click opened that URL. A phone swipe from page 1 landed on page 2. Reduced motion starts as Motion off and still turns the page.

## What works

The cover is readable on desktop and phone. It says WEBFPV, shows a mint gate at 10 m, and says andAgainFPV. The status line says "The gate, cover". Back, Next, Contents, Read as text, Motion, and Sound are on screen.

On the phone the book is one page at a time. The status line says page 1, then page 2, then page 3. The corner numbers 1, 2, and 3 are readable. Inside a page the panels go top to bottom. On page 2 the lower pair goes left to right: the horizon tips, then the balloon "Too fast."

That sequence can be read. The gate starts small. The approach gets lower and faster. The line misses. The horizon tips. The quad is on the grass. "Too fast." Page 3 shows the gate again, the word Next, and a mint FLY button. The same FLY button is on the desktop end shot, in the panel labelled Next. The page data sends it to `https://webfpv.org/sim/`.

Read as text puts the transcripts in the panels in large type. Motion off still shows the same spread. The walk already covered keys, Contents, swipe, and no overflow. Page 3 is the last page. The empty panel says the next chapter is not drawn, and FLY is the way out. The reader is not sent into a blank chapter.

## Must-fixes

On a wide screen the reader cannot tell which page comes first.

The open spread puts page 1 on the right and page 2 on the left. Page 1 is the approach (far gate, then closer, then low and fast). Page 2 is the miss, the tipped horizon, and "Too fast." The line under the book says "The gate, page 1 and page 2" and does not say which side is which. The corner numbers that would say so are clipped. In `desktop-spread.png`, `desktop-text.png`, and the same spread in `desktop-still.png`, only a few colored pixels of those numbers remain on the panel border. They are not digits a person can read. Phone numbers are fine. Desktop numbers are not.

Someone who starts on the left, which is the usual English order, reads the miss and "Too fast." before the approach. Nothing on the spread says to read the right page first. Text mode has the same layout: the left page says the line misses, and the right page says the gate is a small opening ahead.

## Notes

The end shot clips the corner 3 the same way. The status line already says "The gate, page 3", and the facing sheet is blank, so the order on that view is still clear. The blank sheet is only an empty page, not a missing chapter.

On the phone, the bottom panel of page 1 cuts the speed and height text ("30 k", "0.3 m above the g"). The gate and the 10 m mark stay in frame, so the panel still reads as a low approach. The desktop bottom panel crops that same readout at the right edge.

Faint HUD words show through the gate glow on the cover. The alt text already says the weight label shows through. The title and the 10 m gate still read.

Page 3 reprints the first panel of page 1. Next to Next and FLY, it reads as an invitation. A reader can still wonder, for a moment, if the flight started again.

The miss on page 2 is clearer in the transcript ("The line misses.") than in the picture, which is mostly field, a marker, and 5 m. The "Too fast." balloon carries the page.

`desktop-spread-curl.png` is mid-turn. The status line still says page 1 and page 2 while the Next page is already on the right. The settled end shot is labelled page 3. That is not a stuck page.
