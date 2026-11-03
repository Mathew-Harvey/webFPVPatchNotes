/*
 * chapters.js: the book. Every chapter is one object in CHAPTERS, appended.
 *
 * A page is 1000 units wide and 1414 tall (docs/layout.js). Its panels are
 * cut by `layout`, a tree of cuts, and named in `panels` in reading order.
 * Its words are in `words`, in reading order too, each placed in page units
 * and tied to the panel it reads with by `in`, so a screen reader meets a
 * panel's picture and then its words.
 *
 *   panel   id, art (a picture under assets/chapters/, without @1x.webp),
 *           alt, focus (where the picture is held, as x and y per cent),
 *           bleed ('tblr', the sides that run off the paper), fill (ink or
 *           paper, for a panel with no picture), look ('negative' for an
 *           impact frame), fx (lines drawn over the picture, below)
 *   fx      focus: lines converging on at [x, y], a share of the panel box,
 *           clear of an ellipse r across; speed: streaks along angle a in
 *           degrees; both still, never animated, and held off any box in
 *           off ([x, y, w, h] in page units) that has to be read
 *   words   cap     a narration box, typeset, top left at x, y, w wide
 *           note    the same box under a dated tag, for a line quoted from
 *                   the patch notes. Any box may give yb, its bottom edge,
 *                   in place of y, to grow upward
 *           say     a balloon centred on x, y, w wide, tail to [x, y]
 *           think   a thought balloon, the same, its bubbles to tail
 *           tag     a label in a box, the front door's eyebrow
 *           letter  lettered words in the simulator's hand: runs of
 *                   [text, colour], size in units, rot in degrees, max the
 *                   widest the word may run, in units, on any machine
 *           fly     the one link out, to the simulator
 *
 * Words are Mat's, from the interview of 2 October 2026 (STORY.md), or the
 * public patch notes, quoted under their date. STORYBOARD.md has the source
 * of every line. Nothing here is a claim the sources do not make.
 *
 * This file is part of the WebFPV comic. Copyright 2026 Mathew Harvey
 * (andAgainFPV). Licensed under CC BY-ND 4.0, see LICENSE.
 */
(function (root) {
  'use strict';

  var CHAPTERS = [
    {
      id: 'c1',
      n: 1,
      title: 'Fly decent',
      date: '2 October 2026',
      sources: [
        'Interview with Mat, andAgainFPV, 2 October 2026 (STORY.md)',
        'Patch notes, webfpv.org/notes, 22 August to 2 October 2026',
        'WebFPV simulator, shot through its own renderer; course WCMRC Round 5 and RaceGOW Season 5 Track 1',
        'Commits 2f3a98c and 983521b (11 August 2026) and 17f0f76 (13 August 2026)'
      ],
      pages: [
        {
          id: 'c1-cover',
          label: 'Cover',
          tone: 'paper',
          layout: ['h', 0.7, 0.022, 'hero', ['v', 1 / 3, 0.03, 'w1', ['v', 0.5, -0.03, 'w2', 'w3']]],
          panels: [
            {
              id: 'hero',
              art: 'c1/cover-hero',
              alt: 'A five inch quad flies low over a blank page, banked into a turn, its X shaped shadow printed in dots on the paper below it. Lines converge on it from the edges of the panel.',
              fx: [{ k: 'focus', at: [0.7, 0.68], r: [0.26, 0.2], n: 110, off: [[56, 300, 580, 330]] }]
            },
            {
              id: 'w1',
              art: 'c1/cover-w1',
              alt: 'A mint race gate on a grass field, in colour.',
              link: 'c1-p1'
            },
            {
              id: 'w2',
              art: 'c1/cover-w2',
              alt: 'The track builder, seen from above: a course drawn as a gold line through numbered gates.',
              link: 'c1-p9'
            },
            {
              id: 'w3',
              art: 'c1/cover-w3',
              alt: 'A small indoor room with pink walls and pipe gates, built for a whoop.',
              link: 'c1-p11'
            }
          ],
          words: [
            { k: 'tag', x: 74, y: 80, t: 'Chapter 01', in: 'hero' },
            { k: 'letter', x: 74, y: 290, size: 176, anchor: 'start', max: 680, runs: [['WEB', 'cream'], ['FPV', 'sakura']], in: 'hero' },
            { k: 'letter', x: 84, y: 420, size: 96, anchor: 'start', max: 560, runs: [['FLY DECENT', 'mint']], in: 'hero' },
            { k: 'head', x: 76, y: 470, w: 520, t: 'How a browser sim got built, in the words of the pilot who built it.', in: 'hero' },
            { k: 'sub', x: 76, y: 600, w: 420, t: 'andAgainFPV', in: 'hero' },
            { k: 'tag', x: 76, y: 680, t: 'New: Chapter 08, Two new worlds', in: 'hero' },
            { k: 'tag', x: 66, y: 1002, t: 'The gate', in: 'w1' },
            { k: 'letter', x: 60, y: 1342, size: 44, anchor: 'start', max: 246, runs: [['THE QUESTION', 'mint']], in: 'w1' },
            { k: 'tag', x: 372, y: 1024, t: 'The builder', in: 'w2' },
            { k: 'letter', x: 352, y: 1342, size: 44, anchor: 'start', max: 270, runs: [['THEIR GAME', 'sakura']], in: 'w2' },
            { k: 'tag', x: 700, y: 1044, t: 'The room', in: 'w3' },
            { k: 'letter', x: 690, y: 1342, size: 44, anchor: 'start', max: 250, runs: [['THE FEEL', 'cream']], in: 'w3' }
          ]
        },
        {
          id: 'c1-p1',
          label: 'Off the pad',
          tone: 'paper',
          layout: ['h', 0.3, 0, 'a', ['h', 0.56, 0.03, ['v', 0.42, 0.06, 'b', 'c'], 'd']],
          panels: [
            {
              id: 'a',
              art: 'c1/p1-a',
              bleed: 'tlr',
              alt: 'First person view from the start pad of a grass race field. A mint gate stands small at the far end of the grass, trees behind it.'
            },
            {
              id: 'b',
              art: 'c1/p1-b',
              alt: 'Low and close, a five inch quad lifts off its launch stand, the props a blur.',
              fx: [{ k: 'speed', a: -90, n: 26, clear: [0.5, 0.5, 0.3] }]
            },
            {
              id: 'c',
              art: 'c1/p1-c',
              alt: 'First person view, nose down and fast. The gate is closer, and the grass streams past.',
              fx: [{ k: 'focus', at: [0.52, 0.5], r: [0.22, 0.2], n: 110 }]
            },
            {
              id: 'd',
              art: 'c1/p1-d',
              bleed: 'blr',
              alt: 'From the side, the quad streaks low over the grass toward the mint gate.',
              fx: [{ k: 'speed', a: 182, n: 44, clear: [0.5, 0.45, 0.16] }]
            }
          ],
          words: [
            { k: 'letter', x: 230, y: 900, size: 92, rot: -12, max: 360, runs: [['VRRRM', 'mint']], in: 'b' },
            { k: 'letter', x: 690, y: 1290, size: 104, rot: -5, max: 480, runs: [['FSHOOM', 'sakura']], in: 'd' }
          ]
        },
        {
          id: 'c1-p2',
          label: 'Too fast',
          tone: 'paper',
          layout: ['h', 0.43, -0.03, 'a', ['h', 0.5, 0.025, ['v', 0.54, -0.06, 'b', 'c'], 'd']],
          panels: [
            {
              id: 'a',
              art: 'c1/p2-a',
              bleed: 'tlr',
              alt: 'First person view. The gate is suddenly huge, and the quad is not lined up with it: the left post is coming straight at the camera.',
              fx: [{ k: 'focus', at: [0.42, 0.52], r: [0.18, 0.2], n: 140 }]
            },
            {
              id: 'b',
              art: 'c1/p2-b',
              look: 'negative',
              alt: 'The impact, printed in negative: the quad strikes the gate post.'
            },
            {
              id: 'c',
              art: 'c1/p2-c',
              alt: 'The quad tumbles through the air upside down, props still turning.',
              fx: [{ k: 'speed', a: 210, n: 30, clear: [0.5, 0.5, 0.26] }]
            },
            {
              id: 'd',
              art: 'c1/p2-d',
              alt: 'First person view from the grass. The world is tilted, and the gate stands a long way off.'
            }
          ],
          words: [
            { k: 'letter', x: 300, y: 870, size: 140, rot: -9, max: 440, runs: [['KRAK!', 'amber']], in: 'b' },
            { k: 'say', x: 760, y: 1150, w: 210, t: 'Too fast.', tail: [870, 1300], in: 'd' }
          ]
        },
        {
          id: 'c1-p3',
          label: 'Fly decent',
          tone: 'paper',
          layout: null,
          panels: [
            {
              id: 'a',
              quad: [35, 35, 965, 35, 965, 1379, 35, 1379],
              art: 'c1/p3',
              alt: 'On a blank page, the quad sits where it came down, drawn in ink, its shadow in dots.',
              fx: [{ k: 'focus', at: [0.5, 0.62], r: [0.18, 0.12], n: 150 }]
            }
          ],
          words: [
            { k: 'tag', x: 74, y: 80, t: 'Chapter 01', in: 'a' },
            { k: 'letter', x: 500, y: 330, size: 150, max: 760, runs: [['FLY DECENT', 'cream']], in: 'a' },
            { k: 'cap', x: 74, y: 1230, w: 470, t: 'Mat. andAgainFPV. A pilot since 2020.', in: 'a' }
          ]
        },
        {
          id: 'c1-p4',
          label: 'The question',
          tone: 'paper',
          layout: ['h', 0.3, 0, 'a', ['h', 0.71, 0.025, 'b', 'c']],
          panels: [
            {
              id: 'a',
              art: 'c1/p4-a',
              alt: 'Drawn in ink on paper: a flat ground, a horizon, and one small quad on it. Nothing else yet.'
            },
            {
              id: 'b',
              art: 'c1/p4-b',
              alt: 'Closer, the quad at rest on the blank ground, its shadow in dots.',
              fx: [{ k: 'focus', at: [0.375, 0.725], r: [0.24, 0.14], n: 90 }]
            },
            {
              id: 'c',
              art: 'c1/p4-c',
              alt: 'Very close on the quad\'s nose: the camera, a small lens in its cage, looking straight out of the page.'
            }
          ],
          words: [
            { k: 'cap', x: 70, y: 70, w: 380, t: 'It started as curiosity.', in: 'a' },
            { k: 'think', x: 640, y: 610, w: 470, t: 'Could I compile Betaflight and put it in a virtual world, in a browser, and fly decent?', tail: [430, 880], in: 'b' }
          ]
        },
        {
          id: 'c1-p5',
          label: 'Yes',
          tone: 'paper',
          layout: ['h', 0.26, 0, 'a', ['h', 0.36, 0.03, 'b', 'c']],
          panels: [
            {
              id: 'a',
              art: 'c1/p5-a',
              alt: 'The simulator\'s firmware bench, in its orange and grey. Its banner reads Betaflight 4.5.1, WASM.'
            },
            {
              id: 'b',
              art: 'c1/p5-b',
              alt: 'Low on the blank ground, the props spin up.',
              fx: [{ k: 'speed', a: 180, n: 30, clear: [0.55, 0.55, 0.22] }]
            },
            {
              id: 'c',
              art: 'c1/p5-c',
              bleed: 'blr',
              alt: 'From below, the quad climbs off the ground into a blank sky.',
              fx: [{ k: 'focus', at: [0.68, 0.29], r: [0.16, 0.14], n: 160 }]
            }
          ],
          words: [
            { k: 'cap', x: 70, y: 245, w: 600, t: 'Betaflight 4.5.1, compiled to WebAssembly. The PID loop runs at 1 kHz.', in: 'a' },
            { k: 'letter', x: 730, y: 640, size: 84, rot: -7, runs: [['WHUMMM', 'cream']], in: 'b' },
            { k: 'letter', x: 420, y: 1250, size: 310, rot: -6, rim: true, max: 700, runs: [['YES.', 'cream']], in: 'c' },
            { k: 'tag', x: 70, y: 1330, t: '11 August 2026', in: 'c' }
          ]
        },
        {
          id: 'c1-p6',
          label: 'A project',
          tone: 'paper',
          layout: ['h', 0.42, 0.03, 'a', 'b'],
          panels: [
            {
              id: 'a',
              art: 'c1/p6-a',
              alt: 'In ink, the quad races low across the blank ground, streaks behind it.',
              fx: [{ k: 'speed', a: 175, n: 40, clear: [0.5, 0.5, 0.2] }]
            },
            {
              id: 'b',
              art: 'c1/p6-b',
              bleed: 'blr',
              alt: 'In colour now: the quad climbs over a whole race field, trees, gates and sky.'
            }
          ],
          words: [
            { k: 'cap', x: 70, y: 70, w: 560, t: 'Soon as I realised the answer was yes, I decided to see how far we could go.', in: 'a' },
            { k: 'cap', x: 520, y: 1230, w: 400, t: 'It was then a project.', in: 'b' }
          ]
        },
        {
          id: 'c1-p7',
          label: 'For me',
          tone: 'paper',
          layout: ['h', 0.5, 0.035, 'a', ['v', 0.48, 0.05, 'b', 'c']],
          panels: [
            {
              id: 'a',
              art: 'c1/p7-a',
              bleed: 'tlr',
              alt: 'The quad hangs calmly over the grass beside a gate, level, in no hurry.'
            },
            {
              id: 'b',
              art: 'c1/p7-b',
              alt: 'First person view, level and slow. The gate comes in clean, right in the middle.'
            },
            {
              id: 'c',
              art: 'c1/p7-c',
              alt: 'From behind, the quad slips through the gate with room to spare.'
            }
          ],
          words: [
            { k: 'cap', x: 70, y: 70, w: 360, t: 'First it was for me.', in: 'a' },
            { k: 'cap', x: 70, y: 750, w: 360, t: 'I wanted a sim that was super easy to fly in.', in: 'b' },
            { k: 'cap', x: 520, y: 1238, w: 390, t: 'For my kids, and for me.', in: 'c' }
          ]
        },
        {
          id: 'c1-p8',
          label: 'For anyone',
          tone: 'paper',
          layout: ['h', 0.36, 0, 'a', ['h', 0.55, -0.03, 'b', 'c']],
          panels: [
            {
              id: 'a',
              art: 'c1/p8-a',
              alt: 'The simulator\'s title screen, open in a browser: five inch racing, whoop racing, freestyle and the builder.'
            },
            {
              id: 'b',
              art: 'c1/p8-b',
              alt: 'First person view through a mint gate, the field wide open beyond it.',
              fx: [{ k: 'focus', at: [0.5, 0.52], r: [0.24, 0.24], n: 100 }]
            },
            {
              id: 'c',
              fill: 'ink',
              alt: 'A black panel with lettering.'
            }
          ],
          words: [
            { k: 'cap', x: 70, y: 70, w: 620, t: 'Then I realised that most school kids have no money, and usually can\'t install stuff on their computers, so they have no sim to fly in.', in: 'a' },
            { k: 'cap', x: 70, y: 560, w: 560, t: 'Then I wanted it to be accessible for all the people that could not buy a paid sim, or what not.', in: 'b' },
            { k: 'letter', x: 500, y: 1160, size: 76, rot: -3, runs: [['FREE. NO INSTALL.', 'mint']], in: 'c' },
            { k: 'letter', x: 500, y: 1250, size: 76, rot: -3, runs: [['NO ACCOUNT.', 'mint']], in: 'c' },
            { k: 'sub', x: 160, y: 1300, w: 680, t: 'A tab, and the controller already on your desk.', tone: 'night', center: true, in: 'c' }
          ]
        },
        {
          id: 'c1-p9',
          label: 'Their game',
          tone: 'paper',
          layout: ['h', 0.6, 0.02, 'a', ['h', 0.7, -0.015, 'b', 'c']],
          panels: [
            {
              id: 'a',
              art: 'c1/p9-a',
              bleed: 'tlr',
              alt: 'The track builder, from above: a whole course drawn as a gold racing line through numbered gates on a dark grid.'
            },
            {
              id: 'b',
              art: 'c1/p9-b',
              alt: 'The builder\'s palette: gate, flagged gate, wall, double stack, dive gate, hurdle, flag and more.'
            },
            {
              id: 'c',
              art: 'c1/p9-c',
              alt: 'The builder\'s footer measures the course: length 491 metres, 25 passes on 14 pieces, the lap closes, and 21 warnings. Under it, the keys: wheel to zoom, click to select, drag to move.'
            }
          ],
          words: [
            { k: 'cap', x: 70, y: 70, w: 520, t: 'The part I\'m proudest of is the map and track building system.', in: 'a' },
            { k: 'tag', x: 70, y: 196, t: '13 August 2026', in: 'a' }
          ]
        },
        {
          id: 'c1-p10',
          label: 'Their game, flown',
          tone: 'paper',
          layout: ['h', 0.52, -0.03, 'a', ['v', 0.5, 0.045, 'b', 'c']],
          panels: [
            {
              id: 'a',
              art: 'c1/p10-a',
              bleed: 'tlr',
              alt: 'First person view over the dive gate, a frame lying nearly flat in the air, the grass far below through it.',
              fx: [{ k: 'focus', at: [0.5, 0.56], r: [0.2, 0.2], n: 130 }]
            },
            {
              id: 'b',
              art: 'c1/p10-b',
              alt: 'The quad threads a stack of two gates, one above the other.'
            },
            {
              id: 'c',
              art: 'c1/p10-c',
              alt: 'The freestyle town: a street of small houses, wires overhead, blossom on the trees.',
              fx: [{ k: 'speed', a: 200, n: 26, clear: [0.5, 0.45, 0.24] }]
            }
          ],
          words: [
            { k: 'cap', x: 70, y: 70, w: 460, t: 'So people could create their own game.', in: 'a' },
            { k: 'note', x: 506, y: 1180, w: 400, d: 'Notes · 1 September', t: 'Freestyle is the town.', in: 'c' }
          ]
        },
        {
          id: 'c1-p11',
          label: 'The feel',
          tone: 'paper',
          layout: ['h', 0.38, 0, 'a', ['h', 0.56, 0.03, ['v', 0.5, -0.05, 'b', 'c'], 'd']],
          panels: [
            {
              id: 'a',
              art: 'c1/p11-a',
              bleed: 'tlr',
              alt: 'A whoop room: pink walls, a green band, light panels in the ceiling, and pipe gates on the floor.'
            },
            {
              id: 'b',
              art: 'c1/p11-b',
              alt: 'Close on the whoop, a tiny ducted quad, as it threads the lit start gate in the room.'
            },
            {
              id: 'c',
              art: 'c1/p11-c',
              alt: 'First person view in the room, a mint lit gate dead ahead.'
            },
            {
              id: 'd',
              fill: 'ink',
              alt: 'A black panel with lettering.',
              fx: [{ k: 'focus', at: [0.5, 0.56], r: [0.46, 0.3], n: 120, colour: 'paper', alpha: 0.2 }]
            }
          ],
          words: [
            { k: 'cap', x: 70, y: 70, w: 340, t: 'What nearly made me quit...', in: 'a' },
            { k: 'cap', x: 70, y: 590, w: 380, t: '...was trying to understand the feel difference between real life whoops and the sim.', in: 'b' },
            { k: 'letter', x: 420, y: 1176, size: 80, rot: -4, max: 700, runs: [['IT\'S DIFFERENT.', 'cream']], in: 'd' },
            { k: 'letter', x: 650, y: 1318, size: 124, rot: -6, max: 520, runs: [['BUT HOW?', 'mint']], in: 'd' }
          ]
        },
        {
          id: 'c1-p12',
          label: 'The testers',
          tone: 'paper',
          layout: ['h', 0.3, 0, 'a', ['h', 0.6, 0, 'b', 'c']],
          panels: [
            {
              id: 'a',
              fill: 'ink',
              alt: 'A black panel. Four names are lettered across it: Asylum, Jannes, LeStar and CrapShack.'
            },
            {
              id: 'b',
              art: 'c1/p12-b',
              alt: 'The quad snaps through a hard turn at a gate, crisp, no wobble.',
              fx: [{ k: 'speed', a: 160, n: 34, clear: [0.5, 0.5, 0.22] }]
            },
            {
              id: 'c',
              art: 'c1/p12-c',
              alt: 'The firmware bench again, its PID tuning rows.'
            }
          ],
          words: [
            { k: 'cap', x: 70, y: 70, w: 620, t: 'The testers found bugs and gave feedback on the flight feel, in a chat channel.', in: 'a' },
            { k: 'letter', x: 250, y: 268, size: 68, rot: -4, max: 330, runs: [['ASYLUM', 'cream']], in: 'a' },
            { k: 'letter', x: 690, y: 252, size: 68, rot: -4, max: 330, runs: [['JANNES', 'mint']], in: 'a' },
            { k: 'letter', x: 300, y: 372, size: 68, rot: -4, max: 330, runs: [['LESTAR', 'sakura']], in: 'a' },
            { k: 'letter', x: 700, y: 360, size: 68, rot: -4, max: 400, runs: [['CRAPSHACK', 'amber']], in: 'a' },
            { k: 'note', x: 70, y: 470, w: 560, d: 'Notes · 28 September', t: 'The default tune has a quarter more feedforward. Slow to answer the stick was the most ticked box on the feel form, on 23 reports.', in: 'b' },
            { k: 'cap', x: 450, y: 1240, w: 480, t: 'That helped me direct my development effort.', in: 'c' }
          ]
        },
        {
          id: 'c1-p13',
          label: 'The line',
          tone: 'paper',
          layout: null,
          panels: [
            {
              id: 'a',
              quad: [-14, -14, 1014, -14, 1014, 1428, -14, 1428],
              art: 'c1/p13',
              alt: 'First person view, a clean line straight through the middle of a mint gate, the field and the sky opening beyond it.',
              fx: [{ k: 'focus', at: [0.5, 0.55], r: [0.24, 0.2], n: 170 }]
            }
          ],
          words: [
            { k: 'cap', x: 160, y: 1170, w: 680, big: true, t: 'If it feels like a real quad, the rest is easy.', in: 'a' }
          ]
        },
        {
          id: 'c1-p14',
          label: 'The notes so far',
          tone: 'paper',
          layout: ['h', 0.12, 0, 'hd', ['v', 0.5, 0, ['h', 0.2, 0, 'n1', ['h', 0.25, 0, 'n2', ['h', 1 / 3, 0, 'n3', ['h', 0.5, 0, 'n4', 'n5']]]], ['h', 0.2, 0, 'n6', ['h', 0.25, 0, 'n7', ['h', 1 / 3, 0, 'n8', ['h', 0.5, 0, 'n9', 'n10']]]]]],
          panels: [
            { id: 'hd', fill: 'paper', frame: 'none', alt: 'The page heading.' },
            { id: 'n1', art: 'c1/n1', alt: 'The quad on a blank page, in ink.' },
            { id: 'n2', art: 'c1/n2', alt: 'The track builder\'s plan.' },
            { id: 'n3', art: 'c1/n3', alt: 'The board, Tracks and Times.' },
            { id: 'n4', art: 'c1/n4', alt: 'The front page of webfpv.org, laid out as a manga page.' },
            { id: 'n5', art: 'c1/n5', alt: 'The quad on its back in the grass.' },
            { id: 'n6', art: 'c1/n6', alt: 'The freestyle town.' },
            { id: 'n7', art: 'c1/n7', alt: 'A whoop room.' },
            { id: 'n8', art: 'c1/n8', alt: 'The quad against a wall in the town.' },
            { id: 'n9', art: 'c1/n9', alt: 'Two drift cars sliding through a bend in smoke.' },
            { id: 'n10', art: 'c1/n10', alt: 'The quad upside down over the first gate, at the top of a power loop.' }
          ],
          words: [
            { k: 'letter', x: 70, y: 150, size: 84, anchor: 'start', runs: [['THE NOTES SO FAR', 'cream']], in: 'hd' },
            { k: 'note', x: 64, yb: 405, w: 390, d: '11 August', t: 'Betaflight compiled into the page. First flight.', in: 'n1', small: true },
            { k: 'note', x: 64, yb: 645, w: 390, d: '13 August', t: 'The track builder.', in: 'n2', small: true },
            { k: 'note', x: 64, yb: 886, w: 390, d: '14 August', t: 'The public board of shared courses and lap times.', in: 'n3', small: true },
            { k: 'note', x: 64, yb: 1126, w: 390, d: '18 August', t: 'webfpv.org, the front door.', in: 'n4', small: true },
            { k: 'note', x: 64, yb: 1367, w: 390, d: '22 August', t: 'Turtle. A ghost to chase.', in: 'n5', small: true },
            { k: 'note', x: 529, yb: 405, w: 390, d: '1 September', t: 'Freestyle is the town.', in: 'n6', small: true },
            { k: 'note', x: 529, yb: 645, w: 390, d: '15 September', t: 'RaceGOW Season 5 went in, each track named for the person who drew it.', in: 'n7', small: true },
            { k: 'note', x: 529, yb: 886, w: 390, d: '24 September', t: 'The solid world is in the physics.', in: 'n8', small: true },
            { k: 'note', x: 529, yb: 1126, w: 390, d: '26 September', t: 'Cars drive the roads. Chase a car.', in: 'n9', small: true },
            { k: 'note', x: 529, yb: 1367, w: 390, d: '2 October', t: 'Flight paths: fourteen figures, a power loop and a Matty flip among them.', in: 'n10', small: true }
          ]
        },
        {
          id: 'c1-p15',
          label: 'Next',
          tone: 'paper',
          layout: ['h', 0.56, 0.03, 'a', 'b'],
          panels: [
            {
              id: 'a',
              art: 'c1/p15-a',
              bleed: 'tlr',
              alt: 'First person view, a calm approach: the mint gate ahead with room to spare, the morning field beyond it.'
            },
            {
              id: 'b',
              fill: 'paper',
              fx: [{ k: 'focus', at: [0.5, 0.56], r: [0.46, 0.3], n: 130, alpha: 0.7 }],
              alt: 'A paper panel, labelled Chapter 02, with its title lettered across it: Open house. The next page starts it.'
            }
          ],
          words: [
            { k: 'cap', x: 70, y: 70, w: 420, t: 'The game will keep building.', in: 'a' },
            { k: 'tag', x: 80, y: 880, t: 'Chapter 02', in: 'b' },
            { k: 'letter', x: 500, y: 1110, size: 130, rot: -3, max: 820, runs: [['OPEN ', 'cream'], ['HOUSE', 'sakura']], in: 'b' },
            { k: 'sub', x: 160, y: 1180, w: 680, t: 'Turn the page.', center: true, in: 'b' }
          ]
        }
      ]
    },
    {
      id: 'c2',
      n: 2,
      title: 'Open house',
      date: '20 October 2026',
      sources: [
        'Pull requests merged to main, 3 to 20 October 2026: the simulator (Mathew-Harvey/WebFPVSimulator) 53 to 97, the board (WebFPVSimulator-LeaderBoard) 13 to 27, the front page (landingpage-WebFPVSimulator-) 10 to 20',
        'Release notes, 3 to 11 October 2026 (RELEASE-NOTES-WEEK-2.md), and 12 to 20 October 2026 (RELEASE-NOTES-WEEK-3.md)',
        'Mat\'s own words, quoted under their date from the pull requests and the project\'s rules',
        'WebFPV simulator, shot through its own renderer at commit 7ab233a; Nick Burns\' house, Hibari Yard, the town and RaceGOW Season 5 Track 1',
        'The board at webfpv.org/board, Maps and Tracks, as a visitor saw it on 20 October 2026'
      ],
      pages: [
        {
          id: 'c2-cover',
          label: 'Cover',
          tone: 'paper',
          layout: ['h', 0.7, 0.022, 'hero', ['v', 1 / 3, 0.03, 'w1', ['v', 0.5, -0.03, 'w2', 'w3']]],
          panels: [
            {
              id: 'hero',
              art: 'c2/cover-hero',
              alt: 'Nick Burns\' house from the back yard: grey siding, the pergola over the patio, the red umbrella, the pool in front. A whoop flies in low toward the patio.',
              fx: [{ k: 'focus', at: [0.62, 0.7], r: [0.3, 0.2], n: 110, off: [[56, 60, 620, 640]] }]
            },
            {
              id: 'w1',
              art: 'c2/cover-w1',
              alt: 'A five inch quad slides along the grass on its belly, turf flying.',
              link: 'c2-p1'
            },
            {
              id: 'w2',
              art: 'c2/cover-w2',
              alt: 'The board as a manga magazine: Maps and Tracks lettered at the top, maps as leaning panels.',
              link: 'c2-p11'
            },
            {
              id: 'w3',
              art: 'c2/cover-w3',
              alt: 'Nick at his patio table under the red umbrella, waving.',
              link: 'c2-p13'
            }
          ],
          words: [
            { k: 'tag', x: 74, y: 80, t: 'Chapter 02', in: 'hero' },
            { k: 'letter', x: 74, y: 290, size: 176, anchor: 'start', max: 680, runs: [['WEB', 'cream'], ['FPV', 'sakura']], in: 'hero' },
            { k: 'letter', x: 84, y: 420, size: 112, anchor: 'start', max: 640, runs: [['OPEN HOUSE', 'mint']], in: 'hero' },
            { k: 'tag', x: 76, y: 470, t: '3 to 20 October 2026', in: 'hero' },
            { k: 'tag', x: 66, y: 1002, t: 'The feel', in: 'w1' },
            { k: 'letter', x: 60, y: 1342, size: 44, anchor: 'start', max: 246, runs: [['NO RESET', 'mint']], in: 'w1' },
            { k: 'tag', x: 372, y: 1024, t: 'The board', in: 'w2' },
            { k: 'letter', x: 352, y: 1342, size: 44, anchor: 'start', max: 270, runs: [['THE MAGAZINE', 'sakura']], in: 'w2' },
            { k: 'tag', x: 700, y: 1044, t: 'The house', in: 'w3' },
            { k: 'letter', x: 690, y: 1342, size: 44, anchor: 'start', max: 250, runs: [['NICK\'S', 'cream']], in: 'w3' }
          ]
        },
        {
          id: 'c2-p1',
          label: 'Twitchy',
          tone: 'paper',
          layout: ['h', 0.3, 0, 'a', ['h', 0.56, 0.03, ['v', 0.52, 0.05, 'b', 'c'], 'd']],
          panels: [
            {
              id: 'a',
              fill: 'ink',
              alt: 'A black panel, one word lettered across it: twitchy.',
              fx: [{ k: 'focus', at: [0.5, 0.6], r: [0.42, 0.26], n: 120, colour: 'paper', alpha: 0.2 }]
            },
            {
              id: 'b',
              art: 'c2/p1-b',
              alt: 'First person view, low over the grass, a mint gate coming up on the left.',
              fx: [{ k: 'speed', a: 180, n: 30, clear: [0.5, 0.5, 0.26] }]
            },
            {
              id: 'c',
              art: 'c2/p1-c',
              alt: 'On a blank page, the quad sits level in the air, in ink, its shadow in dots below.'
            },
            {
              id: 'd',
              art: 'c2/p1-d',
              bleed: 'blr',
              alt: 'The quad carves round a gate in a hard flat turn, the field wheeling past behind it.',
              fx: [{ k: 'speed', a: 196, n: 40, clear: [0.5, 0.45, 0.18] }]
            }
          ],
          words: [
            { k: 'cap', x: 70, y: 70, w: 560, t: 'The testers kept writing in. 319 feel tickets, and one word came up more than any other.', in: 'a' },
            { k: 'letter', x: 520, y: 340, size: 176, rot: -5, max: 820, runs: [['TWITCHY.', 'sakura']], in: 'a' },
            { k: 'note', x: 70, yb: 860, w: 420, d: '11 October', t: 'So the default rates went a step softer: 60 and 600, from 70 and 670. Your own rates are never moved.', in: 'b', small: true },
            { k: 'note', x: 70, y: 975, w: 470, d: '9 October', t: 'Half the prop wash, a belly 12 mm lower, and a full yaw stop that swings back 4.1 degrees, not 7.0.', in: 'd', small: true },
            { k: 'cap', x: 560, y: 1260, w: 380, t: 'Mat flew it: "flys good."', in: 'd' }
          ]
        },
        {
          id: 'c2-p2',
          label: 'The whoop',
          tone: 'paper',
          layout: ['h', 0.44, 0, 'a', ['h', 0.48, -0.03, 'b', 'c']],
          panels: [
            {
              id: 'a',
              art: 'c2/p2-a',
              bleed: 'tlr',
              alt: 'A whoop room, pink walls and pipe gates, the tiny ducted whoop hanging in the middle of it.'
            },
            {
              id: 'b',
              art: 'c2/p2-b',
              alt: 'On a blank page, the whoop, in ink: four ducts, a tiny canopy, its shadow in dots.',
              fx: [{ k: 'focus', at: [0.62, 0.55], r: [0.2, 0.22], n: 120 }]
            },
            {
              id: 'c',
              art: 'c2/p2-c',
              bleed: 'blr',
              alt: 'First person view from the whoop, through the lit gate of the room, the next one close behind it.',
              fx: [{ k: 'focus', at: [0.5, 0.52], r: [0.2, 0.18], n: 110 }]
            }
          ],
          words: [
            { k: 'cap', x: 70, y: 70, w: 440, t: 'Remember the whoop, and the question? It got physics of its own.', in: 'a' },
            { k: 'letter', x: 280, y: 860, size: 150, rot: -6, max: 440, runs: [['ONE G.', 'cream']], in: 'b' },
            { k: 'note', x: 70, y: 905, w: 360, d: '10 October', t: 'A one cell whoop on 0702 motors, falling at one real g, in the room as built.', in: 'b', small: true },
            { k: 'letter', x: 690, y: 1300, size: 110, rot: -5, max: 440, runs: [['BZZZT', 'mint']], in: 'c' }
          ]
        },
        {
          id: 'c2-p3',
          label: 'No reset',
          tone: 'paper',
          layout: ['h', 0.26, 0, 'a', ['h', 0.48, 0.04, ['v', 0.54, -0.04, 'b', 'c'], 'd']],
          panels: [
            {
              id: 'a',
              fill: 'ink',
              alt: 'A black panel with Mat\'s words on it.'
            },
            {
              id: 'b',
              art: 'c2/p3-b',
              alt: 'In the town, the quad smacks nose first into a shop wall.',
              look: 'negative',
              fx: [{ k: 'focus', at: [0.5, 0.5], r: [0.18, 0.16], n: 150 }]
            },
            {
              id: 'c',
              art: 'c2/p3-c',
              alt: 'The quad drifts back off the wall, level, still flying.'
            },
            {
              id: 'd',
              art: 'c2/p3-d',
              bleed: 'blr',
              alt: 'Low over the grass, the quad skims along on its belly, a long slide behind it.',
              fx: [{ k: 'speed', a: 180, n: 46, clear: [0.5, 0.5, 0.18] }]
            }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: 'Mat, 16 October', in: 'a' },
            { k: 'cap', x: 70, y: 130, w: 860, big: true, t: '"Fix crashing to not be annoying. No reset, just dull bounce, always."', in: 'a' },
            { k: 'letter', x: 270, y: 640, size: 130, rot: -8, max: 440, runs: [['THUD.', 'amber']], in: 'b' },
            { k: 'cap', x: 560, y: 820, w: 370, t: 'Now a crash is a dull bounce. The quad comes off at a walking pace and you keep flying.', in: 'c' },
            { k: 'letter', x: 700, y: 1310, size: 116, rot: -4, max: 520, runs: [['SKRRRT', 'cream']], in: 'd' },
            { k: 'note', x: 70, yb: 1360, w: 420, d: '18 October', t: 'Touch the grass and you slide. A 12 m/s skim runs out about 10 m and eases to a stop, where it used to grab.', in: 'd', small: true }
          ]
        },
        {
          id: 'c2-p4',
          label: 'Your switches',
          tone: 'paper',
          layout: ['h', 0.52, 0.03, 'a', ['v', 0.5, -0.04, 'b', 'c']],
          panels: [
            {
              id: 'a',
              art: 'c2/p4-a',
              bleed: 'tlr',
              alt: 'First person view over the town\'s rooftops, the street far below, wires and cherry trees.',
              fx: [{ k: 'focus', at: [0.5, 0.5], r: [0.24, 0.2], n: 90 }]
            },
            {
              id: 'b',
              art: 'c2/p4-b',
              alt: 'The pause menu, with the Flight mode row: Acro and Angle.'
            },
            {
              id: 'c',
              art: 'c1/w-tu6',
              focus: [50, 88],
              alt: 'The Nice flying card on the flight screen: would you like to help tune flight feel?'
            }
          ],
          words: [
            { k: 'cap', x: 70, y: 70, w: 460, t: 'Your quad. Your switches.', in: 'a' },
            { k: 'note', x: 70, yb: 1360, w: 380, d: '16 October', t: 'Flight mode, Acro or Angle, is back in the pause menu and Settings. Angle is Betaflight\'s own, 60 degrees.', in: 'b', small: true },
            { k: 'note', x: 540, y: 790, w: 390, d: '11 and 17 October', t: 'After two tracks, a Nice flying card offers the feel sliders. Prop wash has its own On and Off. Off is a tuned lap, and the board tags it.', in: 'c', small: true }
          ]
        },
        {
          id: 'c2-p5',
          label: 'The rule',
          tone: 'paper',
          layout: ['h', 0.46, 0, 'a', 'b'],
          panels: [
            {
              id: 'a',
              art: 'c2/p5-a',
              bleed: 'tlr',
              alt: 'First person view, dead centre on a mint gate, close enough to touch.',
              fx: [{ k: 'focus', at: [0.5, 0.52], r: [0.22, 0.24], n: 170 }]
            },
            {
              id: 'b',
              fill: 'ink',
              bleed: 'blr',
              alt: 'A black panel. One word is lettered huge across it: latency. Mat\'s rule is under it.',
              fx: [{ k: 'focus', at: [0.5, 0.3], r: [0.46, 0.2], n: 140, colour: 'paper', alpha: 0.18 }]
            }
          ],
          words: [
            { k: 'cap', x: 70, y: 70, w: 420, t: 'Between the stick and the screen, nothing may wait.', in: 'a' },
            { k: 'letter', x: 500, y: 860, size: 168, rot: -4, max: 900, runs: [['LATENCY', 'sakura']], in: 'b' },
            { k: 'tag', x: 80, y: 960, t: 'Mat, 9 October', in: 'b' },
            { k: 'cap', x: 80, y: 1010, w: 840, big: true, t: '"Latency is the most important thing in this project, and any change that increases latency is bad."', in: 'b' },
            { k: 'sub', x: 80, y: 1250, w: 840, t: 'So the comic layer is off on every preset, shaders link before the first frame, and Nick casts no shadow.', tone: 'night', in: 'b' }
          ]
        },
        {
          id: 'c2-p6',
          label: 'A track a week',
          tone: 'paper',
          layout: ['h', 0.46, 0.02, 'a', ['v', 0.44, 0.04, 'b', 'c']],
          panels: [
            {
              id: 'a',
              art: 'c2/p6-a',
              bleed: 'tlr',
              alt: 'A whoop races low through a lit gate in a whoop room, the next gate waiting across the floor.',
              fx: [{ k: 'speed', a: 175, n: 34, clear: [0.5, 0.5, 0.2] }]
            },
            {
              id: 'b',
              art: 'c1/w-cg2',
              focus: [50, 30],
              alt: 'CommunityGow on a phone: name your club or group, then Start my community.'
            },
            {
              id: 'c',
              art: 'c1/w-cg6',
              focus: [50, 40],
              alt: 'Invite people: a link and a QR code for the club.'
            }
          ],
          words: [
            { k: 'letter', x: 70, y: 200, size: 104, rot: -4, anchor: 'start', max: 860, runs: [['A TRACK ', 'cream'], ['A WEEK', 'mint']], in: 'a' },
            { k: 'cap', x: 70, yb: 640, w: 560, t: 'CommunityGow. A club, or a few friends, race a new whoop track every week, at home, at their own pace.', in: 'a' },
            { k: 'note', x: 70, yb: 1360, w: 340, d: '11 October', t: 'No account and no email. A YouTube link is the evidence.', in: 'b', small: true },
            { k: 'note', x: 520, yb: 1360, w: 400, d: '11 October', t: 'Each round is scored on F1 points, 25 for first, and the season adds them up.', in: 'c', small: true }
          ]
        },
        {
          id: 'c2-p7',
          label: 'Every lap counts',
          tone: 'paper',
          layout: ['h', 0.46, -0.03, ['v', 0.5, 0.04, 'a', 'b'], 'c'],
          panels: [
            {
              id: 'a',
              art: 'c1/w-tu1',
              focus: [50, 60],
              alt: 'Shared: the tune is on the board, with a short code to send to anybody.'
            },
            {
              id: 'b',
              art: 'c1/w-tu3',
              focus: [40, 40],
              alt: 'The board\'s Tunes tab: tunes pilots share, each with its stars.'
            },
            {
              id: 'c',
              art: 'c2/p7-c',
              bleed: 'blr',
              alt: 'A track\'s page on the board: its fastest lap flown again in 3D, the quad on the recorded line with the camera chasing it.'
            }
          ],
          words: [
            { k: 'letter', x: 500, y: 150, size: 92, rot: -3, max: 860, runs: [['SHARE ', 'cream'], ['IT.', 'sakura']], in: 'a' },
            { k: 'note', x: 70, yb: 640, w: 400, d: '11 October', t: 'A tune you like is a short code now. Paste it, see what is in it, then fly it. Stars, one to five, on tunes, tracks and maps.', in: 'a', small: true },
            { k: 'letter', x: 500, y: 790, size: 92, rot: -3, max: 860, runs: [['EVERY LAP ', 'cream'], ['COUNTS.', 'mint']], in: 'c' },
            { k: 'note', x: 70, yb: 1360, w: 470, d: '16 and 19 October', t: 'Arcade, practice and tuned laps post too, each with its tag. A track\'s page replays its fastest lap, flown on the line it was flown.', in: 'c', small: true }
          ]
        },
        {
          id: 'c2-p8',
          label: 'Their game, bigger',
          tone: 'paper',
          layout: ['h', 0.36, 0.02, 'a', ['h', 0.42, -0.02, ['v', 0.5, 0.04, 'b', 'c'], 'd']],
          panels: [
            {
              id: 'a',
              art: 'c1/w-bd1',
              focus: [50, 55],
              bleed: 'tlr',
              alt: 'WEBFPV spelled in pipe gates on the grass, and the quad threading the W.'
            },
            {
              id: 'b',
              art: 'c1/w-bd2',
              focus: [50, 55],
              alt: 'An invisible gate: only a green glow marks the opening, with nothing to hit.'
            },
            {
              id: 'c',
              art: 'c1/w-bd5',
              alt: 'The live board on a phone: WA State Champs 2026 with its Official badge, a record of 34.25 and Fly this track.'
            },
            {
              id: 'd',
              art: 'c2/p8-d',
              bleed: 'blr',
              alt: 'A white tower mill on a freestyle map, its four sails turning, and the quad lining up on the gap between two of them.',
              fx: [{ k: 'focus', at: [0.42, 0.42], r: [0.2, 0.26], n: 110 }]
            }
          ],
          words: [
            { k: 'cap', x: 70, y: 70, w: 520, t: 'The builder kept growing. Any letter A to Z in pipe, each gap a gate.', in: 'a' },
            { k: 'cap', x: 70, y: 560, w: 360, t: 'A gate with nothing to hit.', in: 'b' },
            { k: 'cap', x: 540, y: 560, w: 380, t: 'Official tracks: anyone flies them and posts a time, and only the board\'s owners can change them.', in: 'c' },
            { k: 'letter', x: 720, y: 1080, size: 110, rot: -6, max: 460, runs: [['WHOOSH', 'cream']], in: 'd' },
            { k: 'note', x: 70, yb: 1360, w: 440, d: '17 October', t: 'A windmill. Its four sails turn, and they are solid: time the gap, or be knocked aside the way they turn.', in: 'd', small: true }
          ]
        },
        {
          id: 'c2-p9',
          label: 'Balloon chase',
          tone: 'paper',
          layout: ['h', 0.58, 0.03, 'a', ['v', 0.52, -0.04, 'b', 'c']],
          panels: [
            {
              id: 'a',
              art: 'c2/p9-a',
              bleed: 'tlr',
              alt: 'A light plane banks over a freestyle map, a long string of red, pink and gold balloons streaming from its tail, and the quad chasing.',
              fx: [{ k: 'speed', a: 200, n: 36, clear: [0.45, 0.42, 0.28] }]
            },
            {
              id: 'b',
              art: 'c2/p9-b',
              alt: 'Close behind the plane, the balloons bobbing in a line.',
              fx: [{ k: 'focus', at: [0.5, 0.5], r: [0.2, 0.2], n: 100 }]
            },
            {
              id: 'c',
              art: 'c2/p9-c',
              alt: 'The Balloon chase piece in the map builder: a pink pad, a mast with a balloon on top, and the dashed ring the plane flies inside.'
            }
          ],
          words: [
            { k: 'letter', x: 230, y: 230, size: 120, rot: -10, max: 340, runs: [['POP!', 'sakura']], in: 'a' },
            { k: 'letter', x: 470, y: 380, size: 96, rot: 6, max: 300, runs: [['POP!', 'amber']], in: 'a' },
            { k: 'letter', x: 740, y: 260, size: 80, rot: -4, max: 260, runs: [['POP!', 'mint']], in: 'a' },
            { k: 'cap', x: 70, yb: 800, w: 520, t: 'Balloon chase. A plane streams balloons over a freestyle map, and you get ninety seconds to pop what you can.', in: 'a' },
            { k: 'note', x: 70, yb: 1360, w: 380, d: '17 October', t: 'Every ninth balloon is gold, and worth three.', in: 'b', small: true },
            { k: 'note', x: 560, y: 900, w: 370, d: '17 October', t: 'It is a piece in the map builder: put it down, give it a radius, a height and a speed.', in: 'c', small: true }
          ]
        },
        {
          id: 'c2-p10',
          label: 'Ninety per cent',
          tone: 'paper',
          layout: ['h', 0.56, 0.02, 'a', ['v', 0.56, 0.04, 'b', 'c']],
          panels: [
            {
              id: 'a',
              art: 'c2/p10-a',
              bleed: 'tlr',
              focus: [70, 50],
              alt: 'A sticker found on a wall: the callout reads 90%er, Xelo FPV, 1 of 100, with the sticker itself framed in a burst.'
            },
            {
              id: 'b',
              art: 'c2/p10-b',
              alt: 'A skate park on the Infinity Loops map, stickers scattered over its ramps and ground.'
            },
            {
              id: 'c',
              art: 'c2/p10-c',
              alt: 'The sticker sheet the map\'s stickers are cut from: dozens of FPV stickers on one page.'
            }
          ],
          words: [
            { k: 'letter', x: 260, y: 230, size: 150, rot: -6, max: 460, runs: [['90%', 'amber'], ['ER', 'cream']], in: 'a' },
            { k: 'cap', x: 70, yb: 760, w: 470, t: 'Infinity Loops. A tribute map with 100 stickers to find, cut from one sheet.', in: 'a' },
            { k: 'note', x: 70, yb: 1360, w: 440, d: '15 to 17 October', t: 'Each one calls out every time it comes back into sight. Find 90 of the 100 and the map gives you an achievement of its own.', in: 'b', small: true }
          ]
        },
        {
          id: 'c2-p11',
          label: 'Maps and Tracks',
          tone: 'paper',
          layout: ['h', 0.56, 0.02, 'a', ['v', 0.58, -0.04, 'b', 'c']],
          panels: [
            {
              id: 'a',
              art: 'c2/p11-a',
              bleed: 'tlr',
              alt: 'The board on a desktop, drawn as a magazine page: Maps and Tracks, the shelves as chapter panels, the official maps big at the top.'
            },
            {
              id: 'b',
              art: 'c2/p11-b',
              alt: 'A map\'s page on the board: its picture, its named gaps, and Fly this map.'
            },
            {
              id: 'c',
              art: 'c2/p11-c',
              alt: 'The same board on a phone, the map panels leaning.'
            }
          ],
          words: [
            { k: 'cap', x: 70, yb: 760, w: 520, t: 'The board turned into a magazine. Maps first, then five inch and whoop tracks, the official ones up top.', in: 'a' },
            { k: 'note', x: 70, yb: 1360, w: 470, d: '19 October', t: 'Every publish draws its own picture, and every track and map on the board has one now. A map\'s page flies its named gaps.', in: 'b', small: true }
          ]
        },
        {
          id: 'c2-p12',
          label: 'Nick Burns\' house',
          tone: 'paper',
          layout: null,
          panels: [
            {
              id: 'a',
              quad: [-14, -14, 1014, -14, 1014, 1428, -14, 1428],
              art: 'c2/p12',
              alt: 'Nick Burns\' house from above the street: the brick front, the porch, the three car garage, and the whoop dropping in over the front lawn.',
              fx: [{ k: 'focus', at: [0.5, 0.62], r: [0.3, 0.2], n: 160 }]
            }
          ],
          words: [
            { k: 'tag', x: 74, y: 80, t: '18 October', in: 'a' },
            { k: 'letter', x: 500, y: 300, size: 132, max: 860, runs: [['NICK BURNS\'', 'cream']], in: 'a' },
            { k: 'letter', x: 500, y: 430, size: 132, max: 860, runs: [['HOUSE', 'sakura']], in: 'a' },
            { k: 'cap', x: 160, y: 1180, w: 680, big: true, t: 'A real house, three and a half times life size, so a five inch flies it the way a whoop flies the real one.', in: 'a' }
          ]
        },
        {
          id: 'c2-p13',
          label: 'Nick',
          tone: 'paper',
          layout: ['h', 0.36, 0, 'a', ['h', 0.5, 0.03, ['v', 0.5, -0.05, 'b', 'c'], 'd']],
          panels: [
            {
              id: 'a',
              art: 'c2/p13-a',
              bleed: 'tlr',
              alt: 'Nick at his black patio table under the red umbrella, the pool behind him.'
            },
            {
              id: 'b',
              art: 'c2/p13-b',
              alt: 'Close to Nick: he waves, and his balloon says, I appreciate your time and thanks for watching!'
            },
            {
              id: 'c',
              art: 'c2/p13-c',
              alt: 'The whoop flies straight into Nick. His balloon shouts, Holy Catfish!',
              fx: [{ k: 'focus', at: [0.5, 0.55], r: [0.2, 0.2], n: 150 }]
            },
            {
              id: 'd',
              art: 'c2/p13-d',
              bleed: 'blr',
              alt: 'Inside, Nick walks through his own house.'
            }
          ],
          words: [
            { k: 'cap', x: 70, y: 70, w: 460, t: 'Nick is home. He sits at his patio table, and every so often he gets up and walks inside.', in: 'a' },
            { k: 'cap', x: 70, yb: 860, w: 360, t: 'Fly close and he thanks you.', in: 'b' },
            { k: 'cap', x: 540, yb: 860, w: 380, t: 'Fly into him and...', in: 'c' },
            { k: 'cap', x: 70, yb: 1360, w: 600, t: 'He has four lines of his own: Holy Catfish! Boom Shakala! Stickers in the box! Motor post to motor post!', in: 'd' }
          ]
        },
        {
          id: 'c2-p14',
          label: 'Every room',
          tone: 'paper',
          layout: ['h', 0.42, 0.02, 'a', ['h', 0.5, -0.02, ['v', 0.46, 0.04, 'b', 'c'], 'd']],
          panels: [
            {
              id: 'a',
              art: 'c2/p14-a',
              bleed: 'tlr',
              alt: 'First person view down the hall into the kitchen: the island, the LED cube gate on it, the breakfast room beyond.',
              fx: [{ k: 'focus', at: [0.5, 0.55], r: [0.2, 0.2], n: 100 }]
            },
            {
              id: 'b',
              art: 'c2/p14-b',
              alt: 'The basement workshop, blue walls and shelves full of drones.'
            },
            {
              id: 'c',
              art: 'c2/p14-c',
              alt: 'Nick on the family room sofa, smiling at whoever just flew in.'
            },
            {
              id: 'd',
              art: 'c2/p14-d',
              bleed: 'blr',
              alt: 'The dining room, every chair pushed in under the table, and the whoop threading the room over it.'
            }
          ],
          words: [
            { k: 'cap', x: 70, y: 70, w: 520, t: 'Every room flies. The kitchen, the stair, the basement and Nick\'s workshop.', in: 'a' },
            { k: 'letter', x: 760, y: 820, size: 64, rot: -6, max: 330, runs: [['STICKERS', 'amber'], [' IN THE BOX!', 'cream']], in: 'c' },
            { k: 'note', x: 70, yb: 980, w: 360, d: '19 October', t: 'Ten NB stickers, one a room, to find.', in: 'b', small: true },
            { k: 'tag', x: 70, y: 1050, t: 'Mat, 19 October', in: 'd' },
            { k: 'cap', x: 70, y: 1100, w: 560, t: '"Push the chairs in everywhere to clear the flight lines."', in: 'd' }
          ]
        },
        {
          id: 'c2-p15',
          label: 'The look',
          tone: 'paper',
          layout: ['h', 0.48, 0.03, 'a', ['v', 0.5, -0.04, 'b', 'c']],
          panels: [
            {
              id: 'a',
              art: 'c2/p15-a',
              bleed: 'tlr',
              alt: 'The simulator\'s first screen, drawn as four manga panels: Five inch racing, Whoop racing, Freestyle and Builder.'
            },
            {
              id: 'b',
              art: 'c2/p15-b',
              alt: 'A sponsor\'s logo sprayed on the grass of a race field like a pitch sponsor.'
            },
            {
              id: 'c',
              art: 'c2/p15-c',
              alt: 'On a blank page, the quad in ink, props blurred, its shadow in dots.',
              fx: [{ k: 'speed', a: 180, n: 26, clear: [0.5, 0.5, 0.3] }]
            }
          ],
          words: [
            { k: 'cap', x: 70, y: 70, w: 480, t: 'And the game started to look like this book.', in: 'a' },
            { k: 'note', x: 70, yb: 1360, w: 380, d: '12 October', t: 'A logo on grass is sprayed like a pitch sponsor. On a bando wall it is graffiti.', in: 'b', small: true },
            { k: 'letter', x: 760, y: 860, size: 76, rot: -5, max: 380, runs: [['whummm', 'cream']], in: 'c' },
            { k: 'note', x: 540, yb: 1360, w: 390, d: '17 October', t: 'The motors sound lower and muffled, like old GoPro Session 5 footage with the wind filter on.', in: 'c', small: true }
          ]
        },
        {
          id: 'c2-p16',
          label: 'Next',
          tone: 'paper',
          layout: ['h', 0.56, 0.03, 'a', 'b'],
          panels: [
            {
              id: 'a',
              art: 'c2/p16-a',
              bleed: 'tlr',
              alt: 'From under the patio umbrella, Nick waves over the pool and the back yard, the whole map open ahead.'
            },
            {
              id: 'b',
              fill: 'paper',
              fx: [{ k: 'focus', at: [0.5, 0.56], r: [0.46, 0.3], n: 130, alpha: 0.7 }],
              alt: 'A paper panel, labelled Chapter 03, with its title lettered across it: Three houses. The next page starts it.'
            }
          ],
          words: [
            { k: 'cap', x: 70, y: 70, w: 420, t: 'The game will keep building.', in: 'a' },
            { k: 'tag', x: 80, y: 880, t: 'Chapter 03', in: 'b' },
            { k: 'letter', x: 500, y: 1110, size: 130, rot: -3, max: 820, runs: [['THREE ', 'cream'], ['HOUSES', 'sakura']], in: 'b' },
            { k: 'sub', x: 160, y: 1180, w: 680, t: 'Turn the page.', center: true, in: 'b' }
          ]
        }
      ]
    },
    {
      id: 'c3',
      n: 3,
      title: 'Three houses',
      date: '23 October 2026',
      sources: [
        'Pull requests and commits merged to main, 20 to 23 October 2026: the simulator (Mathew-Harvey/WebFPVSimulator) 98 to 134, the board (WebFPVSimulator-LeaderBoard) 28 to 34, the front page (landingpage-WebFPVSimulator-) 21 to 23',
        'Release notes, 20 to 23 October 2026 (RELEASE-NOTES-WEEK-4.md)',
        'Mat\'s own words, quoted under their date from the pull requests',
        'WebFPV simulator, shot through its own renderer at commit 107d942; Heads\' house, Joshua Bardwell\'s house and Nick Burns\' house',
        'Screenshots taken by Mat in the simulator and on the board, named in STORYBOARD.md'
      ],
      pages: [
        {
          id: 'c3-cover',
          label: 'Cover',
          tone: 'paper',
          layout: ['h', 0.7, 0.022, 'hero', ['v', 1 / 3, 0.03, 'w1', ['v', 0.5, -0.03, 'w2', 'w3']]],
          panels: [
            {
              id: 'hero',
              art: 'c3/cover-hero',
              alt: 'Joshua Bardwell\'s house from the drive: the orange roofed house among tall pines, a yellow gate on the lawn, and a five inch quad flying in over the drive.',
              fx: [{ k: 'focus', at: [0.62, 0.7], r: [0.3, 0.2], n: 110, off: [[56, 60, 620, 640]] }]
            },
            {
              id: 'w1',
              art: 'c3/cover-w1',
              alt: 'Heads\' house from the street, a green two storey house with a car on the drive, and a whoop flying in front of it.',
              link: 'c3-p1'
            },
            {
              id: 'w2',
              art: 'c3/cover-w2',
              alt: 'The field behind Joshua Bardwell\'s house, goats grazing on the grass between the pines.',
              link: 'c3-p6'
            },
            {
              id: 'w3',
              art: 'c3/cover-w3',
              alt: 'The picture on the gate\'s Career card: a field, a yellow ring and a low sun.',
              link: 'c3-p10'
            }
          ],
          words: [
            { k: 'tag', x: 74, y: 80, t: 'Chapter 03', in: 'hero' },
            { k: 'letter', x: 74, y: 290, size: 176, anchor: 'start', max: 680, runs: [['WEB', 'cream'], ['FPV', 'sakura']], in: 'hero' },
            { k: 'letter', x: 84, y: 420, size: 112, anchor: 'start', max: 640, runs: [['THREE HOUSES', 'mint']], in: 'hero' },
            { k: 'tag', x: 76, y: 470, t: '20 to 23 October 2026', in: 'hero' },
            { k: 'tag', x: 66, y: 1002, t: 'The houses', in: 'w1' },
            { k: 'letter', x: 60, y: 1342, size: 44, anchor: 'start', max: 250, runs: [['THREE HOUSES', 'mint']], in: 'w1' },
            { k: 'tag', x: 372, y: 1024, t: 'The field', in: 'w2' },
            { k: 'letter', x: 352, y: 1342, size: 44, anchor: 'start', max: 270, runs: [['GOATS', 'sakura']], in: 'w2' },
            { k: 'tag', x: 700, y: 1044, t: 'The school', in: 'w3' },
            { k: 'letter', x: 690, y: 1342, size: 44, anchor: 'start', max: 250, runs: [['CAREER', 'cream']], in: 'w3' }
          ]
        },
        {
          id: 'c3-p1',
          label: 'Heads\' house',
          tone: 'paper',
          layout: null,
          panels: [
            {
              id: 'a',
              quad: [-14, -14, 1014, -14, 1014, 1428, -14, 1428],
              art: 'c3/p1',
              alt: 'Heads\' house from the street: the green split level front, the garage with a car on the drive, and a whoop flying by in front of it.',
              fx: [{ k: 'focus', at: [0.5, 0.62], r: [0.3, 0.2], n: 160 }]
            }
          ],
          words: [
            { k: 'tag', x: 74, y: 80, t: '21 October', in: 'a' },
            { k: 'letter', x: 500, y: 300, size: 132, max: 860, runs: [['HEADS\'', 'cream']], in: 'a' },
            { k: 'letter', x: 500, y: 430, size: 132, max: 860, runs: [['HOUSE', 'sakura']], in: 'a' },
            { k: 'cap', x: 140, y: 1060, w: 720, big: true, t: 'The second house. Heads\' place, at Nick\'s scale: the garage, the basement, both streets and the houses across them.', in: 'a' }
          ]
        },
        {
          id: 'c3-p2',
          label: 'Heads',
          tone: 'paper',
          layout: ['h', 0.5, 0.03, 'a', ['v', 0.52, -0.04, 'b', 'c']],
          panels: [
            { id: 'a', art: 'c3/p2-a', bleed: 'tlr', alt: 'Heads\' garage, a black and white tiled floor and a wall of stickers: Heads stands by the shelf with one arm raised, waving.' },
            { id: 'b', art: 'c3/p2-b', alt: 'Close to Heads in his garage: he raises one arm in a wave, a sticker wall behind him.' },
            { id: 'c', art: 'c3/p2-c', bleed: 'blr', alt: 'The whoop flies across the garage past Heads, who stands by the bench.' }
          ],
          words: [
            { k: 'cap', x: 70, y: 70, w: 480, t: 'Heads is home too. He walks his garage between four spots, and when the quad comes close he turns his head and waves.', in: 'a' },
            { k: 'cap', x: 560, yb: 1360, w: 380, t: 'Fly by and he shouts.', in: 'c' }
          ]
        },
        {
          id: 'c3-p3',
          label: 'Under the cars',
          tone: 'paper',
          layout: ['h', 0.26, 0, 'a', ['h', 0.48, 0.04, ['v', 0.54, -0.04, 'b', 'c'], 'd']],
          panels: [
            { id: 'a', fill: 'ink', alt: 'A black panel with Mat\'s words on it.' },
            { id: 'b', art: 'c3/p3-b', alt: 'At tarmac height on Heads\' drive: two parked cars, and the whoop low in the gap between them.' },
            { id: 'c', art: 'c3/p3-c', alt: 'The side of a parked car on Heads\' drive seen from tarmac height, the whoop low beside its wheels.' },
            { id: 'd', fill: 'paper', bleed: 'blr', alt: 'A panel held for a first person frame, low under the parked car on Heads\' drive, the 90% patch in view.' }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: 'Mat, 22 October', in: 'a' },
            { k: 'cap', x: 70, y: 130, w: 860, big: true, t: '"You need to be able to fly under the parked cars in Heads\' yard... good spot to hide a 90% too."', in: 'a' },
            { k: 'letter', x: 270, y: 640, size: 120, rot: -6, max: 440, runs: [['SHHHK', 'amber']], in: 'b' },
            { k: 'cap', x: 560, y: 820, w: 370, t: 'Eleven 90% patches to find. The eleventh is under the car on the drive.', in: 'c' }
          ]
        },
        {
          id: 'c3-p4',
          label: 'Joshua Bardwell\'s house',
          tone: 'paper',
          layout: null,
          panels: [
            {
              id: 'a',
              quad: [-14, -14, 1014, -14, 1014, 1428, -14, 1428],
              art: 'c3/p4',
              alt: 'Joshua Bardwell\'s house from above the drive: the orange roof among tall pines, the gravel drive and a white van, a tall tree at each side of the frame.',
              fx: [{ k: 'focus', at: [0.5, 0.62], r: [0.3, 0.2], n: 160 }]
            }
          ],
          words: [
            { k: 'tag', x: 74, y: 80, t: '21 October', in: 'a' },
            { k: 'letter', x: 500, y: 300, size: 124, max: 880, runs: [['JOSHUA BARDWELL\'S', 'cream']], in: 'a' },
            { k: 'letter', x: 500, y: 430, size: 132, max: 860, runs: [['HOUSE', 'sakura']], in: 'a' },
            { k: 'cap', x: 160, y: 1180, w: 680, big: true, t: 'The third house is outside only, life size, and flown on the five inch.', in: 'a' }
          ]
        },
        {
          id: 'c3-p5',
          label: 'JB stickers',
          tone: 'paper',
          layout: ['h', 0.5, 0.03, 'a', ['v', 0.5, -0.05, 'b', 'c']],
          panels: [
            { id: 'a', art: 'c3/jb-sticker-find', bleed: 'tlr', alt: 'The quad on the porch, a sticker found, the Stickers callout on screen: On the porch, 1 of 12.' },
            { id: 'b', art: 'c3/p5-b', alt: 'The porch of Joshua Bardwell\'s house, a JB sticker on the front door.' },
            { id: 'c', art: 'c3/p5-c', bleed: 'blr', alt: 'A doghouse in the yard with a JB sticker on its front.' }
          ],
          words: [
            { k: 'cap', x: 70, y: 70, w: 520, t: 'Twelve JB stickers round the yard: the porch, the chimney, the woodshed, the doghouse, the mailbox and more. Find one and Joshua says something.', in: 'a' },
            { k: 'note', x: 70, yb: 1360, w: 400, d: '22 October', t: 'A find plays one of eleven Joshua Bardwell clips, shuffled, and none repeats until all have played.', in: 'b', small: true },
            { k: 'note', x: 540, yb: 1360, w: 390, d: '22 October', t: 'Find all twelve and the screen says ALL 12!', in: 'c', small: true }
          ]
        },
        {
          id: 'c3-p6',
          label: 'Goats',
          tone: 'paper',
          layout: ['h', 0.3, 0, 'a', ['h', 0.5, 0.03, ['v', 0.52, 0.05, 'b', 'c'], 'd']],
          panels: [
            {
              id: 'a',
              fill: 'ink',
              alt: 'A black panel, one word lettered across it: goats.',
              fx: [{ k: 'focus', at: [0.5, 0.6], r: [0.42, 0.26], n: 120, colour: 'paper', alpha: 0.2 }]
            },
            { id: 'b', art: 'c3/p6-b', alt: 'Goats graze in the field, a round gate among the pines behind them.' },
            { id: 'c', art: 'c3/goats-run', alt: 'Two goats run across the field from the quad, a round gate between them.' },
            { id: 'd', art: 'c3/goat-catch', bleed: 'blr', alt: 'A caught goat hops high off the grass, the pines and a round gate behind it.' }
          ],
          words: [
            { k: 'cap', x: 70, y: 70, w: 560, t: 'Five goats graze in the field. Come within 24 m and they run.', in: 'a' },
            { k: 'letter', x: 520, y: 340, size: 176, rot: -5, max: 820, runs: [['GOATS.', 'sakura']], in: 'a' },
            { k: 'cap', x: 70, yb: 860, w: 360, t: 'Catch one and you hear Nick.', in: 'b' },
            { k: 'letter', x: 500, y: 1180, size: 120, rot: -4, max: 800, runs: [['BOOM SHAKALA!', 'amber']], in: 'd' },
            { k: 'note', x: 70, yb: 1360, w: 440, d: '22 October', t: 'A catch is within 1.3 m. The goat hops, vanishes and comes back somewhere else four seconds later.', in: 'd', small: true }
          ]
        },
        {
          id: 'c3-p7',
          label: 'Land on the table',
          tone: 'paper',
          layout: ['h', 0.36, 0, 'a', ['v', 0.5, -0.05, 'b', 'c']],
          panels: [
            {
              id: 'a',
              art: 'c2/p13-a',
              bleed: 'tlr',
              alt: 'Nick at his black patio table under the red umbrella, the pool behind him.'
            },
            { id: 'b', art: 'c3/nick-table-1', alt: 'The whoop landed on the patio table, Nick smiling in his balloon: 3 oh 4 in the flight time, 3.47, 46 battery voltage.' },
            { id: 'c', art: 'c3/nick-table-2', bleed: 'blr', alt: 'Nick at the table again, frowning in his balloon: Ah, not 6 7 again.' }
          ],
          words: [
            { k: 'cap', x: 70, y: 70, w: 480, t: 'Back at Nick\'s. Land on his patio table while he sits there, and he reads out the flight.', in: 'a' },
            { k: 'tag', x: 560, y: 70, t: 'Mat, 20 October', in: 'a' },
            { k: 'cap', x: 560, y: 120, w: 380, t: '"Also when you land on the outdoor table with nick sitting there, you should get nick saying:"', in: 'a' },
            { k: 'cap', x: 70, yb: 1360, w: 360, t: 'The flight time, and the battery.', in: 'b' },
            { k: 'cap', x: 540, yb: 1360, w: 380, t: 'Then a pause, and a frown.', in: 'c' }
          ]
        },
        {
          id: 'c3-p8',
          label: 'Nick\'s voice',
          tone: 'paper',
          layout: ['h', 0.5, 0.03, 'a', ['v', 0.5, -0.05, 'b', 'c']],
          panels: [
            { id: 'a', art: 'c3/p8-a', bleed: 'tlr', alt: 'Nick waves from his patio table under the red umbrella, the pool behind him, his balloon saying, I appreciate your time and thanks for watching!' },
            {
              id: 'b',
              art: 'c2/p13-c',
              alt: 'The whoop flies straight into Nick. His balloon shouts, Holy Catfish!',
              fx: [{ k: 'focus', at: [0.5, 0.55], r: [0.2, 0.2], n: 150 }]
            },
            { id: 'c', art: 'c2/p14-c', bleed: 'blr', alt: 'Nick on the family room sofa, smiling at whoever just flew in.' }
          ],
          words: [
            { k: 'cap', x: 70, y: 70, w: 300, t: 'Nick has his voice now.', in: 'a' },
            { k: 'cap', x: 70, yb: 1360, w: 400, t: 'Hit him: "Holy catfish, what\'s going on?" Land on the table: "Get it just right."', in: 'b' },
            { k: 'letter', x: 770, y: 800, size: 70, rot: -5, max: 320, runs: [['HA HA HA', 'amber']], in: 'c' },
            { k: 'note', x: 540, yb: 1360, w: 390, d: '22 October', t: 'A hard crash anywhere on his map and he laughs. Come within a metre and he picks a line of his own. Find one of his NB stickers and he says Stickers.', in: 'c', small: true }
          ]
        },
        {
          id: 'c3-p9',
          label: 'ALL!',
          tone: 'paper',
          layout: ['h', 0.4, 0, 'a', 'b'],
          panels: [
            {
              id: 'a',
              fill: 'ink',
              alt: 'A black panel with a word lettered across it: ALL 10!',
              fx: [{ k: 'focus', at: [0.5, 0.6], r: [0.42, 0.26], n: 120, colour: 'paper', alpha: 0.2 }]
            },
            { id: 'b', art: 'c3/all-splash', bleed: 'blr', alt: 'The ALL 10! splash over the kitchen island sticker: Every sticker found.' }
          ],
          words: [
            { k: 'cap', x: 70, y: 70, w: 640, t: 'Find the last sticker of a map\'s set and the screen says so.', in: 'a' },
            { k: 'letter', x: 500, y: 330, size: 190, rot: -4, max: 860, runs: [['ALL 10!', 'mint']], in: 'a' },
            { k: 'sub', x: 160, y: 880, w: 680, t: 'Every sticker found', center: true, in: 'b' },
            { k: 'note', x: 70, yb: 1360, w: 460, d: '22 October', t: 'Nick\'s ten NB stickers are ten. It shows once for each map in your browser.', in: 'b', small: true }
          ]
        },
        {
          id: 'c3-p10',
          label: 'Career',
          tone: 'paper',
          layout: ['h', 0.56, 0.03, 'a', 'b'],
          panels: [
            { id: 'a', art: 'c3/career-gate', bleed: 'tlr', alt: 'The gate, the Career card first, beside Five Inch Racing and Whoop Racing.' },
            {
              id: 'b',
              fill: 'ink',
              alt: 'A black panel, one word lettered across it: career.',
              fx: [{ k: 'focus', at: [0.5, 0.5], r: [0.42, 0.26], n: 120, colour: 'paper', alpha: 0.2 }]
            }
          ],
          words: [
            { k: 'cap', x: 70, y: 70, w: 440, t: 'It is the first card on the gate.', in: 'a' },
            { k: 'letter', x: 500, y: 960, size: 190, rot: -4, max: 860, runs: [['CAREER', 'sakura']], in: 'b' },
            { k: 'cap', x: 110, y: 1130, w: 780, t: 'Fifty lessons in ten chapters, from your first hover in Angle to a Pro Licence in Acro. Bronze, silver and gold.', in: 'b' },
            { k: 'note', x: 70, yb: 760, w: 380, d: '22 October', t: 'Ten chapters, fifty lessons, medals, briefings and a coach.', in: 'a', small: true }
          ]
        },
        {
          id: 'c3-p11',
          label: 'Lift off',
          tone: 'paper',
          layout: ['h', 0.56, 0.03, 'a', 'b'],
          panels: [
            { id: 'a', art: 'c3/career-1-1-briefing', bleed: 'tlr', alt: 'The briefing of Lesson 1.1, Lift Off, with its drawing of the sticks and its medal times.' },
            { id: 'b', art: 'c3/career-medal', bleed: 'blr', alt: 'The medal screen of Lesson 1.1: Complete, Gold, 0:12.6.' }
          ],
          words: [
            { k: 'cap', x: 70, y: 70, w: 480, t: 'Lesson one: lift the quad off the pad, hold it between one and three metres for five seconds, then land.', in: 'a' },
            { k: 'cap', x: 70, yb: 760, w: 460, t: 'The briefing: "Gently is the whole trick."', in: 'a' },
            { k: 'cap', x: 70, yb: 1360, w: 440, t: 'Land it and the lesson gives you a medal.', in: 'b' }
          ]
        },
        {
          id: 'c3-p12',
          label: 'Angle to Acro',
          tone: 'paper',
          layout: ['h', 0.3, 0, 'a', ['h', 0.5, 0.03, 'b', 'c']],
          panels: [
            { id: 'a', fill: 'ink', alt: 'A black panel with the ten chapters of the Career listed on it, in order.' },
            { id: 'b', art: 'c3/career-chapters', bleed: 'lr', alt: 'The Career screen, its chapters along the top from First Hover, the five lessons of the first below.' },
            { id: 'c', art: 'c3/career-open-all', bleed: 'blr', alt: 'The foot of the Career screen, the button that reads I already fly: open every chapter.' }
          ],
          words: [
            { k: 'cap', x: 70, y: 70, w: 860, big: true, t: 'First Hover, Angle Mode Navigation, Switching to Acro, Big Gaps, Flips and Rolls, Segmented Flips and Rolls, Gates, Racing, Freestyle, Pro Licence.', in: 'a' },
            { k: 'cap', x: 70, yb: 1360, w: 400, t: 'Chapters open in order.', in: 'b' },
            { k: 'note', x: 540, yb: 1360, w: 390, d: '22 October', t: 'Already fly? One button opens every chapter.', in: 'c', small: true }
          ]
        },
        {
          id: 'c3-p13',
          label: 'weBLEEDfpv',
          tone: 'paper',
          layout: ['h', 0.3, 0, 'a', ['h', 0.5, 0.03, 'b', 'c']],
          panels: [
            { id: 'a', fill: 'ink', alt: 'A black panel with a name lettered across it: weBLEEDfpv.' },
            { id: 'b', art: 'c3/webleed-sign', bleed: 'lr', alt: 'The weBLEEDfpv sign on its stand in a freestyle map, a goat grazing behind.' },
            { id: 'c', art: 'c3/webleed-board', bleed: 'blr', alt: 'The weBLEEDfpv card on the board\'s partners page: Official USA micro drone partner.' }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: '20 October', in: 'a' },
            { k: 'cap', x: 70, y: 120, w: 860, t: 'A fourth partner: weBLEEDfpv, the USA micro drone partner, from Syracuse, New York.', in: 'a' },
            { k: 'letter', x: 500, y: 350, size: 110, rot: -3, max: 860, runs: [['WEBLEEDFPV', 'sakura']], in: 'a' },
            { k: 'cap', x: 70, yb: 760, w: 440, t: 'Their sign is in the freestyle maps.', in: 'b' },
            { k: 'cap', x: 70, yb: 1360, w: 520, t: 'And on the board\'s partners page and the front page.', in: 'c' }
          ]
        },
        {
          id: 'c3-p14',
          label: 'Also this week',
          tone: 'paper',
          layout: ['h', 0.5, 0.03, ['v', 0.5, 0.04, 'a', 'b'], ['v', 0.5, -0.04, 'c', 'd']],
          panels: [
            { id: 'a', art: 'c3/p14-a', bleed: 'tl', alt: 'The top of Settings: the first row is 3D mode, with its Off and On switch, and the stick settings below it.' },
            { id: 'b', art: 'c3/p14-b', bleed: 'tr', alt: 'On a blank page, the whoop in ink, seen from the side and above, a duct round each prop.' },
            { id: 'c', art: 'c3/p14-c', bleed: 'bl', alt: 'Heads\' house from the drive, a car in front of the garage, and the whoop flying past.' },
            { id: 'd', art: 'c3/p14-d', bleed: 'br', alt: 'A sign on the white fence at the side of Heads\' yard, a swing set and a slide in front of it.' }
          ],
          words: [
            { k: 'note', x: 60, yb: 690, w: 400, d: '21 October', t: '3D mode: the motors reverse. A switch at the top of Settings, off by default.', in: 'a', small: true },
            { k: 'note', x: 540, yb: 690, w: 400, d: '22 October', t: 'The whoop is drawn from Mat\'s Fractal65 model.', in: 'b', small: true },
            { k: 'note', x: 60, yb: 1360, w: 400, d: '23 October', t: 'Nick\'s and Heads\' houses are flown on the whoop now.', in: 'c', small: true },
            { k: 'note', x: 540, yb: 1360, w: 400, d: '23 October', t: 'Sponsor signs on the houses are a quarter smaller, each brand once.', in: 'd', small: true }
          ]
        },
        {
          id: 'c3-p15',
          label: 'Next',
          tone: 'paper',
          layout: ['h', 0.56, 0.03, 'a', 'b'],
          panels: [
            {
              id: 'a',
              art: 'c2/p16-a',
              bleed: 'tlr',
              alt: 'From under the patio umbrella, Nick waves over the pool and the back yard, the whole map open ahead.'
            },
            {
              id: 'b',
              fill: 'paper',
              fx: [{ k: 'focus', at: [0.5, 0.56], r: [0.46, 0.3], n: 130, alpha: 0.7 }],
              alt: 'A paper panel, labelled Chapter 04, with its title lettered across it: Other people\'s tracks. The next page starts it.'
            }
          ],
          words: [
            { k: 'cap', x: 70, y: 70, w: 420, t: 'The game will keep building.', in: 'a' },
            { k: 'tag', x: 80, y: 880, t: 'Chapter 04', in: 'b' },
            { k: 'letter', x: 500, y: 1110, size: 100, rot: -3, max: 820, runs: [['OTHER PEOPLE\'S ', 'cream'], ['TRACKS', 'sakura']], in: 'b' },
            { k: 'sub', x: 160, y: 1180, w: 680, t: 'Turn the page.', center: true, in: 'b' }
          ]
        }
      ]
    },
    {
      id: 'c4',
      n: 4,
      title: 'Other people\'s tracks',
      date: '27 October 2026',
      sources: [
        'Pull requests and commits merged to main, 24 to 27 October 2026: the simulator (Mathew-Harvey/WebFPVSimulator) 135 to 155, with 156 and 157 left out',
        'Release notes, 24 to 27 October 2026 (RELEASE-NOTES-WEEK-5.md)',
        'Mat\'s own words, quoted under their date from the pull requests',
        'WebFPV simulator, shot through its own renderer at commit 6d74094; Heads\' house, Nick Burns\' house and Joshua Bardwell\'s house',
        'Screenshots taken by Mat in the simulator and on TinyLaps, named in STORYBOARD.md'
      ],
      pages: [
        {
          id: 'c4-cover',
          label: 'Cover',
          tone: 'paper',
          layout: ['h', 0.7, 0.022, 'hero', ['v', 1 / 3, 0.03, 'w1', ['v', 0.5, -0.03, 'w2', 'w3']]],
          panels: [
            {
              id: 'hero',
              art: 'c4/cover-hero',
              alt: 'Heads\' front lawn with a whoop sized pipe gate track standing on the grass in front of the green house, the white start pad and the RaceGOW6 logo painted on the lawn.',
              fx: [{ k: 'focus', at: [0.62, 0.7], r: [0.3, 0.2], n: 110, off: [[56, 60, 620, 640]] }]
            },
            {
              id: 'w1',
              art: 'c4/cover-w1',
              alt: 'A track imported from TinyLaps on the start pad in the whoop room: a lit green gate stands ahead in the pink hall.',
              link: 'c4-p1'
            },
            {
              id: 'w2',
              art: 'c4/cover-w2',
              alt: 'Nick Burns\' back lawn from above, the pipe gates of a track standing on the grass between the trees.',
              link: 'c4-p2'
            },
            {
              id: 'w3',
              art: 'c4/cover-w3',
              alt: 'A goat in the field behind Joshua Bardwell\'s house, a round JB sticker on its flank.',
              link: 'c4-p4'
            }
          ],
          words: [
            { k: 'tag', x: 74, y: 80, t: 'Chapter 04', in: 'hero' },
            { k: 'letter', x: 74, y: 290, size: 176, anchor: 'start', max: 680, runs: [['WEB', 'cream'], ['FPV', 'sakura']], in: 'hero' },
            { k: 'letter', x: 84, y: 420, size: 84, anchor: 'start', max: 640, runs: [['OTHER PEOPLE\'S TRACKS', 'mint']], in: 'hero' },
            { k: 'tag', x: 76, y: 470, t: '24 to 27 October 2026', in: 'hero' },
            { k: 'tag', x: 66, y: 1002, t: 'The editor', in: 'w1' },
            { k: 'letter', x: 60, y: 1342, size: 44, anchor: 'start', max: 250, runs: [['TINYLAPS', 'mint']], in: 'w1' },
            { k: 'tag', x: 372, y: 1024, t: 'The yards', in: 'w2' },
            { k: 'letter', x: 352, y: 1342, size: 44, anchor: 'start', max: 270, runs: [['YARD TRACK', 'sakura']], in: 'w2' },
            { k: 'tag', x: 700, y: 1044, t: 'The field', in: 'w3' },
            { k: 'letter', x: 690, y: 1342, size: 44, anchor: 'start', max: 250, runs: [['ON A GOAT', 'cream']], in: 'w3' }
          ]
        },
        {
          id: 'c4-p1',
          label: 'TinyLaps',
          tone: 'paper',
          layout: ['h', 0.5, 0.03, 'a', ['v', 0.5, -0.05, 'b', 'c']],
          panels: [
            { id: 'a', art: 'c4/tinylaps-editor', bleed: 'tlr', alt: 'A TinyLaps track opened in the track builder, seen from above as a numbered line through its gates.' },
            { id: 'b', art: 'c4/tinylaps-in-sim', alt: 'The same track in the simulator, on the start pad, a lit green gate ahead in the whoop room.' },
            {
              id: 'c',
              fill: 'ink',
              bleed: 'blr',
              alt: 'A black panel, one word lettered across it: TinyLaps.',
              fx: [{ k: 'focus', at: [0.5, 0.5], r: [0.42, 0.26], n: 120, colour: 'paper', alpha: 0.2 }]
            }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: '24 October', in: 'a' },
            { k: 'cap', x: 70, y: 120, w: 560, t: 'Kwayzu\'s TinyLaps is a whoop gate editor. Tracks made there now open in WebFPV, from a button on their editor and from Import.', in: 'a' },
            { k: 'cap', x: 70, yb: 1360, w: 360, t: 'Every one goes straight to the board.', in: 'b' },
            { k: 'letter', x: 770, y: 1000, size: 92, rot: -4, max: 330, runs: [['TINY', 'mint'], ['LAPS', 'sakura']], in: 'c' },
            { k: 'note', x: 540, yb: 1360, w: 390, d: '24 October', t: 'A track from TinyLaps draws its own thumbnail on the board, and anyone can open it there and edit a copy.', in: 'c', small: true }
          ]
        },
        {
          id: 'c4-p2',
          label: 'Track 3 in the yards',
          tone: 'paper',
          layout: ['h', 0.26, 0, 'a', ['h', 0.48, 0.04, ['v', 0.54, -0.04, 'b', 'c'], 'd']],
          panels: [
            { id: 'a', fill: 'ink', alt: 'A black panel with words on it.' },
            { id: 'b', art: 'c4/p2-b', alt: 'Heads\' front lawn, the pipe gates of a track on the grass in front of the house, and the whoop at the start.' },
            { id: 'c', art: 'c4/p2-c', alt: 'Nick Burns\' back lawn, gates of the same track standing between the trees.' },
            { id: 'd', art: 'c4/p2-d', bleed: 'blr', alt: 'Joshua Bardwell\'s lawn by the woodshed, the same track in a clearing among the pines, the white box painted on the grass.' }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: '24 October', in: 'a' },
            { k: 'cap', x: 70, y: 130, w: 860, big: true, t: 'The board\'s RaceGOW6 Track 3 stands in three yards: Heads\' front lawn, Nick\'s back lawn, and Joshua Bardwell\'s lawn by the woodshed.', in: 'a' },
            { k: 'cap', x: 560, y: 800, w: 380, t: 'MiniFigs.me and RaceGOW6 are painted on the floor.', in: 'c' },
            { k: 'note', x: 70, yb: 1360, w: 440, d: '24 October', t: 'Fly through the start gate and the lap clock starts. Fly away from the track and it resets.', in: 'd', small: true },
            { k: 'note', x: 540, yb: 1360, w: 390, d: '24 October', t: 'At Bardwell\'s it is the whoop\'s 28 inch track. Land the five inch in the white box and it asks if you want to swap to the whoop.', in: 'd', small: true }
          ]
        },
        {
          id: 'c4-p3',
          label: 'JSL',
          tone: 'paper',
          layout: ['h', 0.56, 0.03, 'a', 'b'],
          panels: [
            { id: 'a', art: 'c4/jsl-callout', bleed: 'tlr', alt: 'A quad upside down in mid air over the town, the middle of a freestyle combo.' },
            {
              id: 'b',
              fill: 'ink',
              bleed: 'blr',
              alt: 'A black panel, one word lettered across it: JSL.',
              fx: [{ k: 'focus', at: [0.5, 0.5], r: [0.42, 0.26], n: 120, colour: 'paper', alpha: 0.2 }]
            }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: '24 October', in: 'a' },
            { k: 'cap', x: 70, y: 120, w: 540, t: 'A new freestyle combo: a Juicy Flick, then a Slingshot, then a Laser Flip or a Power Loop, back to back.', in: 'a' },
            { k: 'letter', x: 500, y: 1000, size: 210, rot: -4, max: 860, runs: [['JSL', 'amber']], in: 'b' },
            { k: 'note', x: 70, yb: 1360, w: 460, d: '24 October', t: 'It is worth 650 points in the trick list.', in: 'b', small: true }
          ]
        },
        {
          id: 'c4-p4',
          label: 'The goat',
          tone: 'paper',
          layout: ['h', 0.5, 0.03, 'a', ['v', 0.5, -0.05, 'b', 'c']],
          panels: [
            { id: 'a', art: 'c4/p4-a', bleed: 'tlr', alt: 'A goat in the field behind Joshua Bardwell\'s house, a round JB sticker on its flank, the pines behind it.' },
            { id: 'b', art: 'c4/goat-sticker-find', alt: 'Close to the goat: a round JB sticker on its flank.' },
            { id: 'c', art: 'c3/p8-a', bleed: 'blr', alt: 'Nick waves from his patio table under the red umbrella, the pool behind him.' }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: '24 October', in: 'a' },
            { k: 'cap', x: 70, y: 120, w: 540, t: 'Nobody found the twelfth JB sticker on the mailbox. Now it rides on a goat.', in: 'a' },
            { k: 'cap', x: 70, yb: 1360, w: 360, t: 'Find it and the callout says: On a goat.', in: 'b' },
            { k: 'note', x: 540, yb: 1360, w: 390, d: '24 October', t: 'Nick\'s crash call comes one time in four now, and it is only "Poor thing."', in: 'c', small: true }
          ]
        },
        {
          id: 'c4-p5',
          label: 'Sound',
          tone: 'paper',
          layout: ['h', 0.56, 0.03, 'a', 'b'],
          panels: [
            { id: 'a', art: 'c4/sound-sliders', bleed: 'tlr', alt: 'The Sound section of Settings: Sound, Volume, Motors, Wind, Music, Effects and Callouts, each a slider with a number box.' },
            {
              id: 'b',
              fill: 'ink',
              bleed: 'blr',
              alt: 'A black panel, one word lettered across it: thud.',
              fx: [{ k: 'focus', at: [0.5, 0.5], r: [0.42, 0.26], n: 120, colour: 'paper', alpha: 0.2 }]
            }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: '24 October', in: 'a' },
            { k: 'cap', x: 70, yb: 770, w: 540, t: 'Effects and Callouts have their own levels now. Every sound level in Settings is a slider with a number box.', in: 'a' },
            { k: 'letter', x: 500, y: 960, size: 190, rot: -4, max: 860, runs: [['THUD', 'sakura']], in: 'b' },
            { k: 'note', x: 70, yb: 1360, w: 460, d: '24 October', t: 'The crash is a low thud now, where it was a bright smack.', in: 'b', small: true }
          ]
        },
        {
          id: 'c4-p6',
          label: 'Laps keep counting',
          tone: 'paper',
          layout: ['h', 0.56, 0.03, 'a', 'b'],
          panels: [
            { id: 'a', art: 'c4/p6-a', bleed: 'tlr', alt: 'First person in the whoop room, a lit pipe gate ahead in the pink hall.' },
            {
              id: 'b',
              fill: 'ink',
              bleed: 'blr',
              alt: 'A black panel, one word lettered across it: tuned.',
              fx: [{ k: 'focus', at: [0.5, 0.5], r: [0.42, 0.26], n: 120, colour: 'paper', alpha: 0.2 }]
            }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: '25 October', in: 'a' },
            { k: 'cap', x: 70, y: 120, w: 520, t: 'Change Air grip, Motor power, prop wash or Weight in the middle of a lap and the lap keeps going. It no longer voids.', in: 'a' },
            { k: 'letter', x: 500, y: 960, size: 170, rot: -4, max: 860, runs: [['TUNED', 'mint']], in: 'b' },
            { k: 'cap', x: 110, y: 1130, w: 780, t: 'The lap counts, and it is filed Tuned.', in: 'b' }
          ]
        },
        {
          id: 'c4-p7',
          label: 'Also this week',
          tone: 'paper',
          layout: ['h', 0.26, 0, 'a', ['h', 0.5, 0.04, ['v', 0.5, -0.04, 'b', 'c'], 'd']],
          panels: [
            { id: 'a', art: 'c4/p7-a', bleed: 'tlr', alt: 'The Quad screen of the simulator: the Camera angle row, a slider with a number box beside it reading 70.' },
            { id: 'b', art: 'c4/p7-b', alt: 'The screen after a landing: the quad on the ground, a heads up message above it and, along the bottom, the Weight slider with the Camera angle slider under it.' },
            { id: 'c', art: 'c4/p7-c', alt: 'The whoop room wall, the weBLEEDfpv sign hanging on it.' },
            { id: 'd', art: 'c4/p7-d', bleed: 'blr', alt: 'A course preview from above: two tall pipe poles on a striped field.' }
          ],
          words: [
            { k: 'note', x: 60, yb: 340, w: 400, d: '24 October', t: 'The camera angle goes up to 70, with a number box beside the slider.', in: 'a', small: true },
            { k: 'note', x: 60, yb: 900, w: 400, d: '24 October', t: 'And a camera angle slider sits on the screen you see when you have landed.', in: 'b', small: true },
            { k: 'note', x: 540, yb: 900, w: 400, d: '24 October', t: 'weBLEEDfpv\'s sign hangs on the whoop room wall.', in: 'c', small: true },
            { k: 'note', x: 60, yb: 1360, w: 400, d: '24 October', t: 'Gate markings are hidden in course previews.', in: 'd', small: true }
          ]
        },
        {
          id: 'c4-p8',
          label: 'Also this week, more',
          tone: 'paper',
          layout: ['h', 0.5, 0.03, 'a', ['v', 0.5, -0.05, 'b', 'c']],
          panels: [
            { id: 'a', art: 'c4/p8-a', bleed: 'tlr', alt: 'Heads\' stop sign from the street, a red octagon on its post.' },
            { id: 'b', art: 'c4/p8-b', alt: 'On a blank page, the whoop in ink, seen from the side and above, a duct round each prop.' },
            { id: 'c', art: 'c4/p8-c', bleed: 'blr', alt: 'The whoop on the grass of Heads\' front lawn, flipped over on its back, its props pointing up.' }
          ],
          words: [
            { k: 'note', x: 70, y: 70, w: 460, d: '25 October', t: 'Heads\' stop sign is solid now, so you can tap the wall on it.', in: 'a', small: true },
            { k: 'note', x: 70, yb: 1360, w: 400, d: '24 October', t: 'Whoop track GIFs are drawn in the whoop room now, with the floor logos.', in: 'b', small: true },
            { k: 'note', x: 540, yb: 1360, w: 390, d: '26 October', t: '3D mode: both sides of the quad count as a base.', in: 'c', small: true }
          ]
        },
        {
          id: 'c4-p9',
          label: 'Drone Factory',
          tone: 'paper',
          layout: ['h', 0.5, 0.03, 'a', ['v', 0.5, -0.05, 'b', 'c']],
          panels: [
            { id: 'a', art: 'c4/p9-a', bleed: 'tlr', alt: 'A big white sign on two posts at Joshua Bardwell\'s house reading Drone Factory, the pines behind it.' },
            { id: 'b', art: 'c4/p9-b', alt: 'The Drone Factory sign on the side fence of Heads\' yard.' },
            { id: 'c', art: 'c4/p9-c', bleed: 'blr', alt: 'The Drone Factory sign on the garage wall of Nick Burns\' house.' }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: '26 October', in: 'a' },
            { k: 'cap', x: 70, y: 120, w: 480, t: 'Drone Factory\'s sign is on Heads\' house, Joshua Bardwell\'s house and Nick Burns\' house.', in: 'a' }
          ]
        },
        {
          id: 'c4-p10',
          label: 'Next',
          tone: 'paper',
          layout: ['h', 0.56, 0.03, 'a', 'b'],
          panels: [
            {
              id: 'a',
              art: 'c2/p16-a',
              bleed: 'tlr',
              alt: 'From under the patio umbrella, Nick waves over the pool and the back yard, the whole map open ahead.'
            },
            {
              id: 'b',
              fill: 'paper',
              fx: [{ k: 'focus', at: [0.5, 0.56], r: [0.46, 0.3], n: 130, alpha: 0.7 }],
              alt: 'The next chapter\'s title page: Chapter 05, Rooms and mini games, with the words Turn the page.'
            }
          ],
          words: [
            { k: 'cap', x: 70, y: 70, w: 420, t: 'The game will keep building.', in: 'a' },
            { k: 'tag', x: 80, y: 880, t: 'Chapter 05', in: 'b' },
            { k: 'letter', x: 500, y: 1050, size: 92, rot: -3, max: 820, runs: [['ROOMS AND ', 'cream'], ['MINI GAMES', 'sakura']], in: 'b' },
            { k: 'sub', x: 160, y: 1190, w: 680, t: 'Turn the page.', center: true, in: 'b' }
          ]
        }
      ]
    },
    {
      id: 'c5',
      n: 5,
      title: 'Rooms and mini games',
      date: '28 October 2026',
      sources: [
        'Pull requests and commits merged to main, 26 to 28 October 2026: the simulator (Mathew-Harvey/WebFPVSimulator) 153 to 176, with 171 and 173 left out because they are not on main',
        'Release notes, 26 to 28 October 2026 (RELEASE-NOTES-WEEK-6.md)',
        'Frames drawn by the simulator and kept by the threads that built each feature, named in STORYBOARD.md'
      ],
      pages: [
        {
          id: 'c5-cover',
          label: 'Cover',
          tone: 'paper',
          layout: ['h', 0.7, 0.022, 'hero', ['v', 1 / 3, 0.03, 'w1', ['v', 0.5, -0.03, 'w2', 'w3']]],
          panels: [
            { id: 'hero', art: 'c5/cover-hero', alt: 'A street of the goat map from a low whoop, goats on the road and the houses of the neighbourhood behind them.' },
            { id: 'w1', art: 'c5/cover-w1', alt: 'Two drift cars side by side in a cloud of smoke on the festival circuit, the cherry trees behind them.', link: 'c5-p8' },
            { id: 'w2', art: 'c5/cover-w2', alt: 'The main street of Sunnyfield, a giant donut on a roof, the shop fronts and a car ahead.', link: 'c5-p10' },
            { id: 'w3', art: 'c5/cover-w3', alt: 'The overview camera over a room: the whole field from above, a coloured trail behind each pilot.', link: 'c5-p1' }
          ],
          words: [
            { k: 'tag', x: 74, y: 80, t: 'Chapter 05', in: 'hero' },
            { k: 'letter', x: 74, y: 290, size: 176, anchor: 'start', max: 680, runs: [['WEB', 'cream'], ['FPV', 'sakura']], in: 'hero' },
            { k: 'letter', x: 84, y: 410, size: 72, anchor: 'start', max: 700, runs: [['ROOMS AND MINI GAMES', 'mint']], in: 'hero' },
            { k: 'tag', x: 76, y: 470, t: '27 and 28 October 2026', in: 'hero' },
            { k: 'tag', x: 66, y: 1002, t: 'The mini game', in: 'w1' },
            { k: 'letter', x: 60, y: 1342, size: 44, anchor: 'start', max: 270, runs: [['DRIFT', 'mint']], in: 'w1' },
            { k: 'tag', x: 372, y: 1024, t: 'The town', in: 'w2' },
            { k: 'letter', x: 352, y: 1342, size: 44, anchor: 'start', max: 270, runs: [['SUNNYFIELD', 'sakura']], in: 'w2' },
            { k: 'tag', x: 700, y: 1044, t: 'The room', in: 'w3' },
            { k: 'letter', x: 690, y: 1342, size: 44, anchor: 'start', max: 250, runs: [['TOGETHER', 'cream']], in: 'w3' }
          ]
        },
        {
          id: 'c5-p1',
          label: 'Fly together',
          tone: 'paper',
          layout: ['h', 0.5, 0.03, 'a', ['v', 0.5, -0.05, 'b', 'c']],
          panels: [
            { id: 'a', art: 'c5/p1-a', bleed: 'tlr', alt: 'The front screen of WebFPV with two big choices, Fly solo and Multiplayer.' },
            { id: 'b', art: 'c5/p1-b', alt: 'The multiplayer screen: Host a room, Find a room, Join with a code and a pilot card.' },
            { id: 'c', art: 'c5/p1-c', bleed: 'blr', alt: 'Three pilots in a room over Joshua Bardwell\'s house, their names over their quads and a list of pilots at the top right.' }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: '27 October', in: 'a' },
            { k: 'cap', x: 70, y: 120, w: 540, t: 'Fly together is open to everybody. Host a room, pick one in the Rooms tab, or join with a code or a link.', in: 'a' },
            { k: 'cap', x: 70, yb: 1360, w: 380, t: 'Nobody is matched with strangers, and a solo flight is never entered.', in: 'b' },
            { k: 'note', x: 540, yb: 1360, w: 390, d: '27 October', t: 'Pilots talk with quick lines and waves. Typed chat only exists in a private room, if its host turns it on.', in: 'c', small: true }
          ]
        },
        {
          id: 'c5-p2',
          label: 'Your pilot',
          tone: 'paper',
          layout: ['h', 0.5, 0.03, 'a', ['v', 0.5, -0.05, 'b', 'c']],
          panels: [
            { id: 'a', art: 'c5/p2-a', bleed: 'tlr', alt: 'The Make your pilot screen: a trading card with a smiling pilot with blonde hair buns, and the tabs Face, Hair, Eyes, Gear and Quad.' },
            { id: 'b', art: 'c5/p2-b', alt: 'Twelve random pilots on trading cards, each with different hair, face and colours.' },
            { id: 'c', art: 'c5/p2-c', bleed: 'blr', alt: 'The Gear tab of the pilot builder, the pilot\'s card beside rows of gear to try on.' }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: '27 October', in: 'a' },
            { k: 'cap', x: 70, y: 120, w: 440, t: 'Make your pilot like a trading card: face, hair, eyes, gear and quad. Hover a part to try it on.', in: 'a' },
            { k: 'cap', x: 70, yb: 1360, w: 380, t: 'Random, Undo and Reset are on the card.', in: 'b' },
            { k: 'note', x: 540, yb: 1360, w: 390, d: '27 October', t: 'More hair and glasses came after, and tattoos on a Marks tab.', in: 'c', small: true }
          ]
        },
        {
          id: 'c5-p3',
          label: 'Race and watch',
          tone: 'paper',
          layout: ['h', 0.5, 0.03, 'a', ['v', 0.5, -0.05, 'b', 'c']],
          panels: [
            { id: 'a', art: 'c5/p3-a', bleed: 'tlr', alt: 'A room mid race: a list of pilots in order with their laps and gaps at the top right.' },
            { id: 'b', art: 'c5/p3-b', alt: 'The room at the start of a race, the throttle prompt over the trees and a pilot list.' },
            { id: 'c', art: 'c5/p3-c', bleed: 'blr', alt: 'Riding along behind another pilot\'s quad, a small panel at the bottom naming the pilot being watched.' }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: '27 October', in: 'a' },
            { k: 'cap', x: 70, y: 120, w: 480, t: 'Rooms can race. Everyone waits in the pit and presses Ready, the room counts down to GO, and standings and results follow.', in: 'a' },
            { k: 'note', x: 70, yb: 1360, w: 400, d: '27 October', t: 'Share a room link and the preview shows the host\'s pilot on the map.', in: 'b', small: true },
            { k: 'cap', x: 540, yb: 1360, w: 380, t: 'Press V to ride along behind another pilot.', in: 'c' }
          ]
        },
        {
          id: 'c5-p4',
          label: 'Overview camera',
          tone: 'paper',
          layout: ['h', 0.5, 0.03, 'a', ['v', 0.5, -0.05, 'b', 'c']],
          panels: [
            { id: 'a', art: 'c5/p4-a', bleed: 'tlr', alt: 'The overview camera: the whole field from above with a race table, each pilot a labelled marker with a coloured trail.' },
            { id: 'b', art: 'c5/p4-b', alt: 'The overview with the clean feed: the field and the trails with no panels.' },
            { id: 'c', art: 'c5/p4-c', bleed: 'blr', alt: 'The room with a yellow New: overview card at the top left announcing the new camera.' }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: '28 October', in: 'a' },
            { k: 'cap', x: 70, yb: 560, w: 440, t: 'A new camera over the whole room. Press O and every pilot is on the field with a trail behind.', in: 'a' },
            { k: 'note', x: 70, yb: 1360, w: 400, d: '28 October', t: 'H gives a clean feed with no panels. R is the whole field and F rides behind a pilot.', in: 'b', small: true },
            { k: 'note', x: 540, yb: 1360, w: 390, d: '28 October', t: 'The question mark opens the keys.', in: 'c', small: true }
          ]
        },
        {
          id: 'c5-p5',
          label: 'Change the map',
          tone: 'paper',
          layout: ['h', 0.56, 0.03, 'a', 'b'],
          panels: [
            { id: 'a', art: 'c5/p5-a', bleed: 'tlr', alt: 'The room asked to move to The town: a card with Call it off for the host and a tally of votes.' },
            { id: 'b', art: 'c5/p5-b', bleed: 'blr', alt: 'A paper panel across the middle of the screen asking Follow Kite Runner? with a Follow and a Stay button.' }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: '27 October', in: 'a' },
            { k: 'cap', x: 70, y: 120, w: 440, t: 'The host can move the room to another map. Everyone votes, then the room goes or stays.', in: 'a' },
            { k: 'tag', x: 70, y: 780, t: '28 October', in: 'b' },
            { k: 'cap', x: 70, yb: 1360, w: 440, t: 'When a pilot takes a different map the room asks across the screen: follow, or stay.', in: 'b' }
          ]
        },
        {
          id: 'c5-p6',
          label: '90%er goats',
          tone: 'paper',
          layout: ['h', 0.5, 0.03, 'a', ['v', 0.5, -0.05, 'b', 'c']],
          panels: [
            { id: 'a', art: 'c5/p6-a', bleed: 'tlr', alt: 'Goats in the street of the goat map, each with a logo on its flank.' },
            { id: 'b', art: 'c5/p6-b', alt: 'A car on a street with goats stepping out of its way, the houses behind.' },
            { id: 'c', art: 'c5/p6-c', bleed: 'blr', alt: 'Goats close up on a lawn, the logo on each flank.' }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: '28 October', in: 'a' },
            { k: 'cap', x: 70, y: 120, w: 520, t: 'A new whoop map: 90%er goat herding. Heads\' house and the street around it, and a goat for every 90%er sticker.', in: 'a' },
            { k: 'cap', x: 70, yb: 1360, w: 380, t: 'Cars drive the streets. The goats step out of their way.', in: 'b' },
            { k: 'note', x: 540, yb: 1360, w: 390, d: '28 October', t: 'Fly low and they run. The pause menu has a row to let them out again.', in: 'c', small: true }
          ]
        },
        {
          id: 'c5-p7',
          label: 'Herd them home',
          tone: 'paper',
          layout: ['h', 0.56, 0.03, 'a', 'b'],
          panels: [
            { id: 'a', art: 'c5/p7-a', bleed: 'tlr', alt: 'The goat map from above: six streets of houses, a park with a pond, and the road past Heads\' house.' },
            { id: 'b', art: 'c5/p7-b', bleed: 'blr', alt: 'Goats on a driveway, a small box under the score counting the goats home.' }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: '28 October', in: 'a' },
            { k: 'cap', x: 70, y: 120, w: 480, t: 'Herd them into Heads\' garage. A box under the score counts the goats home and the clock since the first one ran.', in: 'a' },
            { k: 'note', x: 70, yb: 1360, w: 440, d: '28 October', t: 'Every goat home gets a callout with its logo. All of them home is the big finish.', in: 'b', small: true }
          ]
        },
        {
          id: 'c5-p8',
          label: 'Drift Matsuri',
          tone: 'paper',
          layout: ['h', 0.5, 0.03, 'a', ['v', 0.5, -0.05, 'b', 'c']],
          panels: [
            { id: 'a', art: 'c5/p8-a', bleed: 'tlr', alt: 'A bridge of red lanterns over a grandstand on the festival circuit, cherry trees on either side.' },
            { id: 'b', art: 'c5/p8-b', alt: 'A drift car seen from in front through a green viewfinder frame.' },
            { id: 'c', art: 'c5/p8-c', bleed: 'blr', alt: 'The festival ground beside the track, rows of coloured flags behind a red and white kerb.' }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: '28 October', in: 'a' },
            { k: 'cap', x: 70, y: 120, w: 520, t: 'A mini game. Drift Matsuri is a festival circuit under cherry trees, and you are the camera.', in: 'a' },
            { k: 'cap', x: 70, yb: 1360, w: 380, t: 'Film the drift battles for a minute.', in: 'b' },
            { k: 'note', x: 540, yb: 1360, w: 390, d: '28 October', t: 'There are seven drift cars on the circuit.', in: 'c', small: true }
          ]
        },
        {
          id: 'c5-p9',
          label: 'The take',
          tone: 'paper',
          layout: ['h', 0.56, 0.03, 'a', 'b'],
          panels: [
            { id: 'a', art: 'c5/p9-a', bleed: 'tlr', alt: 'A take card over the track: a score of 532 with a list of marks for frame, close and steady.' },
            { id: 'b', art: 'c5/p9-b', bleed: 'blr', alt: 'A drift car filmed from the side, a green frame around it and a smoke cloud behind it.' }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: '28 October', in: 'a' },
            { k: 'cap', x: 70, y: 780, w: 440, t: 'A shot scores on frame, close and steady. Two cars together, or a whole train, in the picture score more.', in: 'a' },
            { k: 'note', x: 70, yb: 1360, w: 460, d: '28 October', t: 'Your take is graded from S to D, and your best take is kept in your browser.', in: 'b', small: true }
          ]
        },
        {
          id: 'c5-p10',
          label: 'Sunnyfield',
          tone: 'paper',
          layout: ['h', 0.26, 0, 'a', ['h', 0.5, 0.04, ['v', 0.5, -0.04, 'b', 'c'], 'd']],
          panels: [
            { id: 'a', fill: 'ink', alt: 'A black panel with words on it.' },
            { id: 'b', art: 'c5/p10-b', alt: 'A tall water tower with the name of the town on its tank, power lines and a road beside it.' },
            { id: 'c', art: 'c5/p10-c', alt: 'The dump: a yellow bulldozer on a hill of earth, smoke rising behind.' },
            { id: 'd', art: 'c5/p10-d', bleed: 'blr', alt: 'Sunnyfield from above: a power plant with cooling towers, a park with a pond, and the streets of houses.' }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: '28 October', in: 'a' },
            { k: 'cap', x: 70, y: 130, w: 860, big: true, t: 'A new map: Sunnyfield, a cartoon American town of our own. Fly through the clock tower and the church belfry, round the water tower, and over the dump.', in: 'a' },
            { k: 'note', x: 540, yb: 900, w: 400, d: '28 October', t: 'There is a donut shop with a giant donut, a hedge tunnel, a plank bridge over a gorge and a skate park.', in: 'c', small: true },
            { k: 'note', x: 70, yb: 1360, w: 440, d: '28 October', t: 'The town has twelve named gaps to find.', in: 'd', small: true }
          ]
        },
        {
          id: 'c5-p11',
          label: 'Thomas More\'s Shop',
          tone: 'paper',
          layout: ['h', 0.56, 0.03, 'a', 'b'],
          panels: [
            { id: 'a', art: 'c5/p11-a', bleed: 'tlr', alt: 'The floor of a workshop from a whoop at the start: a long bench, pillars, racking and strip lights, drawn in flat colour with heavy outlines.' },
            { id: 'b', art: 'c5/p11-b', bleed: 'blr', alt: 'The workshop from the south west, a table in front and racking behind.' }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: '27 October', in: 'a' },
            { k: 'cap', x: 70, y: 120, w: 440, t: 'Thomas More\'s Shop is a whoop map now, built from his own flights.', in: 'a' },
            { k: 'note', x: 70, yb: 1360, w: 440, d: '27 October', t: 'It is on the board with the other official maps.', in: 'b', small: true }
          ]
        },
        {
          id: 'c5-p12',
          label: 'Also',
          tone: 'paper',
          layout: ['h', 0.56, 0.03, 'a', 'b'],
          panels: [
            { id: 'a', art: 'c5/p12-a', bleed: 'tlr', alt: 'The first person view over a fenced field, a prop tip at the left edge, the stick overlay showing the pitch stick part way forward.' },
            { id: 'b', art: 'c5/p12-b', bleed: 'blr', alt: 'The Camera rows on the Quad screen: Camera angle 30, Field of view 85 degrees vertical, Props and shadow Both.' }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: '28 October', in: 'a' },
            { k: 'cap', x: 70, y: 120, w: 460, t: 'Your own props are in the FPV view now, and the quad throws a shadow in the sun. A Props and shadow row in Settings turns either off.', in: 'a' },
            { k: 'note', x: 70, yb: 1360, w: 400, d: '27 October', t: 'Field of view sits beside Camera angle in Settings and Rates.', in: 'b', small: true },
            { k: 'note', x: 540, yb: 1360, w: 400, d: '28 October', t: 'On a keyboard the sticks ramp steadily from cruise to full while a key is held.', in: 'b', small: true }
          ]
        },
        {
          id: 'c5-p13',
          label: 'Next',
          tone: 'paper',
          layout: ['h', 0.56, 0.03, 'a', 'b'],
          panels: [
            { id: 'a', art: 'c5/p13-a', bleed: 'tlr', alt: 'The Drift Matsuri circuit from above, a ribbon of road through the cherry trees.' },
            {
              id: 'b',
              fill: 'paper',
              fx: [{ k: 'focus', at: [0.5, 0.56], r: [0.46, 0.3], n: 130, alpha: 0.7 }],
              alt: 'An empty panel, labelled Chapter 06, with one question lettered across it: what\'s coming next?'
            }
          ],
          words: [
            { k: 'cap', x: 70, y: 70, w: 420, t: 'The game will keep building.', in: 'a' },
            { k: 'tag', x: 80, y: 880, t: 'Chapter 06', in: 'b' },
            { k: 'letter', x: 500, y: 1100, size: 96, rot: -3, max: 820, runs: [['WHAT\'S COMING ', 'cream'], ['NEXT?', 'sakura']], in: 'b' }
          ]
        }
      ]
    },
    {
      id: 'c6',
      n: 6,
      title: 'Twenty two new maps',
      date: '31 October 2026',
      sources: [
        'Commits merged to main on 31 October 2026 in the simulator (Mathew-Harvey/WebFPVSimulator), and its map list, src/maps/registry.js, at b285dc5',
        'Frames drawn by the simulator at b285dc5 for this chapter, listed in tools/shoot/c6.js'
      ],
      pages: [
        {
          id: 'c6-cover',
          label: 'Cover',
          tone: 'paper',
          layout: ['h', 0.7, 0.022, 'hero', ['v', 1 / 3, 0.03, 'w1', ['v', 0.5, -0.03, 'w2', 'w3']]],
          panels: [
            { id: 'hero', art: 'c6/cover-hero', alt: 'Kamome Wharf at dusk: the quad flying past the red port tower, a crane and a big orange sky.' },
            { id: 'w1', art: 'c6/cover-w1', alt: 'Momiji Pass: the quad over a mountain road through autumn trees.', link: 'c6-p1' },
            { id: 'w2', art: 'c6/cover-w2', alt: 'Hyoura Island: the quad low over floes of drift ice.', link: 'c6-p2' },
            { id: 'w3', art: 'c6/cover-w3', alt: 'Kumoi Towers: the face of a tower, rows of windows, the street below.', link: 'c6-p3' }
          ],
          words: [
            { k: 'tag', x: 74, y: 80, t: 'Chapter 06', in: 'hero' },
            { k: 'letter', x: 74, y: 290, size: 176, anchor: 'start', max: 680, runs: [['WEB', 'cream'], ['FPV', 'sakura']], in: 'hero' },
            { k: 'letter', x: 84, y: 410, size: 72, anchor: 'start', max: 700, runs: [['TWENTY TWO NEW MAPS', 'mint']], in: 'hero' },
            { k: 'tag', x: 76, y: 470, t: '31 October 2026', in: 'hero' },
            { k: 'tag', x: 66, y: 1002, t: 'The pass', in: 'w1' },
            { k: 'letter', x: 60, y: 1342, size: 44, anchor: 'start', max: 270, runs: [['MOMIJI', 'mint']], in: 'w1' },
            { k: 'tag', x: 372, y: 1024, t: 'The ice', in: 'w2' },
            { k: 'letter', x: 352, y: 1342, size: 44, anchor: 'start', max: 270, runs: [['HYOURA', 'sakura']], in: 'w2' },
            { k: 'tag', x: 700, y: 1044, t: 'The towers', in: 'w3' },
            { k: 'letter', x: 690, y: 1342, size: 44, anchor: 'start', max: 250, runs: [['KUMOI', 'cream']], in: 'w3' }
          ]
        },
        {
          id: 'c6-p1',
          label: 'Mountains',
          tone: 'paper',
          layout: ['h', 0.26, 0, 'a', ['h', 0.5, 0.04, ['v', 0.5, -0.04, 'b', 'c'], 'd']],
          panels: [
            { id: 'a', fill: 'ink', alt: 'A black panel with words on it.' },
            { id: 'b', art: 'c6/p1-b', alt: 'Momiji Pass: a red bridge carries the road over a gorge, autumn trees all round.' },
            { id: 'c', art: 'c6/p1-c', alt: 'Kodama Onsen: the quad in front of an old two storey inn, tall cedars round it.' },
            { id: 'd', art: 'c6/p1-d', bleed: 'blr', alt: 'Raicho Ridge from the air: rocky slopes and forest falling away to a lake in the valley.' }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: '31 October', in: 'a' },
            { k: 'cap', x: 70, y: 130, w: 860, big: true, t: 'Twenty two new maps landed in one go, all in the town\'s manga look. Here they are, one by one.', in: 'a' },
            { k: 'cap', x: 60, yb: 900, w: 300, t: 'Momiji Pass. Autumn hairpins and a red bridge.', in: 'b' },
            { k: 'cap', x: 540, yb: 900, w: 300, t: 'Kodama Onsen. An old inn in the cedars.', in: 'c' },
            { k: 'note', x: 70, yb: 1360, w: 460, d: '31 October', t: 'Raicho Ridge. A high ridge in the Japanese Alps. Dive the south face and drop to the lake.', in: 'd', small: true }
          ]
        },
        {
          id: 'c6-p2',
          label: 'The coast',
          tone: 'paper',
          layout: ['h', 0.5, 0.03, 'a', ['v', 0.5, -0.05, 'b', 'c']],
          panels: [
            { id: 'a', art: 'c6/p2-a', bleed: 'tlr', alt: 'Kazesuna Dunes: the quad over a big slope of sand, the sea and its sand fences beyond.' },
            { id: 'b', art: 'c6/p2-b', alt: 'Shiokaze Point from the sea: hotel blocks along a rock island, sea stacks in the water.' },
            { id: 'c', art: 'c6/p2-c', bleed: 'blr', alt: 'Hyoura Island: a snowy island and its harbour, floes of ice in the sea.' }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: '31 October', in: 'a' },
            { k: 'cap', x: 70, y: 120, w: 480, t: 'Kazesuna Dunes. A dune coast on the Sea of Japan. Surf the big ridge, then race twelve bamboo gates to the sea and back.', in: 'a' },
            { k: 'cap', x: 70, yb: 1360, w: 380, t: 'Shiokaze Point. A resort on a rock island, closed for years. Strafe the hotel balconies.', in: 'b' },
            { k: 'note', x: 540, yb: 1360, w: 390, d: '31 October', t: 'Hyoura Island. A winter island in the drift ice. Skim the floes.', in: 'c', small: true }
          ]
        },
        {
          id: 'c6-p3',
          label: 'The city',
          tone: 'paper',
          layout: ['h', 0.5, 0.03, ['v', 0.5, -0.04, 'a', 'b'], ['v', 0.5, 0.04, 'c', 'd']],
          panels: [
            { id: 'a', art: 'c6/p3-a', bleed: 'tl', alt: 'Kumoi Towers: the quad beside a tall tower, looking up into a blue sky.' },
            { id: 'b', art: 'c6/p3-b', bleed: 'tr', alt: 'Ekimae Drift: the quad and a yellow drift car on the street under the railway bridge, shops and flats round it.' },
            { id: 'c', art: 'c6/p3-c', bleed: 'bl', alt: 'Tsukimi Danchi: the quad over the grass by an old block of flats, the railway viaduct beside it.' },
            { id: 'd', art: 'c6/p3-d', bleed: 'br', alt: 'Hinode Park: the quad over a pond and a lawn, cherry trees and houses round the park.' }
          ],
          words: [
            { k: 'cap', x: 60, y: 60, w: 400, t: 'Kumoi Towers. A tower city to dive, right from the very top.', in: 'a' },
            { k: 'cap', x: 540, y: 60, w: 400, t: 'Ekimae Drift. A street drift event round a station. Chase the cars under the tracks.', in: 'b' },
            { k: 'cap', x: 60, yb: 1360, w: 400, t: 'Tsukimi Danchi. An abandoned housing estate in the city, a viaduct right beside it.', in: 'c' },
            { k: 'cap', x: 540, yb: 1360, w: 400, t: 'Hinode Park. A city park at golden hour.', in: 'd' }
          ]
        },
        {
          id: 'c6-p4',
          label: 'Port and works',
          tone: 'paper',
          layout: ['h', 0.5, 0.03, 'a', ['v', 0.5, -0.05, 'b', 'c']],
          panels: [
            { id: 'a', art: 'c6/p4-a', bleed: 'tlr', alt: 'Kamome Wharf at dusk: rows of stacked containers, a yellow crane, ship to shore cranes and the red port tower.' },
            { id: 'b', art: 'c6/p4-b', alt: 'Hamakaze Works: a red and white stack, pipe racks and white gas spheres.' },
            { id: 'c', art: 'c6/p4-c', bleed: 'blr', alt: 'Kazami Airfield from the air: a long strip, a big hangar and fields in a valley.' }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: '31 October', in: 'a' },
            { k: 'cap', x: 70, y: 120, w: 480, t: 'Kamome Wharf. A container terminal. Canyons of boxes, the big cranes and the port tower.', in: 'a' },
            { k: 'cap', x: 70, yb: 1360, w: 380, t: 'Hamakaze Works. The stack, the pipe racks and the gas spheres.', in: 'b' },
            { k: 'note', x: 540, yb: 1360, w: 390, d: '31 October', t: 'Kazami Airfield. A grass strip in a mountain valley. Fly the hangar front to back.', in: 'c', small: true }
          ]
        },
        {
          id: 'c6-p5',
          label: 'Motorsport',
          tone: 'paper',
          layout: ['h', 0.5, 0.03, ['v', 0.5, -0.04, 'a', 'b'], ['v', 0.5, 0.04, 'c', 'd']],
          panels: [
            { id: 'a', art: 'c6/p5-a', bleed: 'tl', alt: 'Hayate Circuit: the quad over the pit straight, GT cars coming down it, the pit building and a grandstand.' },
            { id: 'b', art: 'c6/p5-b', bleed: 'tr', alt: 'Tanada RX: the quad low over the track among rally cars, a grandstand behind.' },
            { id: 'c', art: 'c6/p5-c', bleed: 'bl', alt: 'Bakuon Dome: the quad over the dirt floor, monster trucks round it, a jump and old buses, the stands under the roof.' },
            { id: 'd', art: 'c6/p5-d', bleed: 'br', alt: 'Shiroyama FMX: the quad beside a rider on the dirt, the kickers and riders in the air, the castle keep beyond.' }
          ],
          words: [
            { k: 'cap', x: 60, y: 60, w: 400, t: 'Hayate Circuit. GT cars lap it flat out. Thread the pit garages.', in: 'a' },
            { k: 'cap', x: 540, y: 60, w: 400, t: 'Tanada RX. Rallycross on tarmac and gravel, the cars racing door to door.', in: 'b' },
            { k: 'cap', x: 60, yb: 1360, w: 400, t: 'Bakuon Dome. A dirt floored stadium with monster trucks inside.', in: 'c' },
            { k: 'cap', x: 540, yb: 1360, w: 400, t: 'Shiroyama FMX. Riders jump the kickers in a castle park.', in: 'd' }
          ]
        },
        {
          id: 'c6-p6',
          label: 'Countryside',
          tone: 'paper',
          layout: ['h', 0.5, 0.03, 'a', ['v', 0.5, -0.05, 'b', 'c']],
          panels: [
            { id: 'a', art: 'c6/p6-a', bleed: 'tlr', alt: 'Hotaru Valley: the quad by a red torii standing in the sea, the harbour, farmhouses and rice paddies beyond.' },
            { id: 'b', art: 'c6/p6-b', alt: 'Kazahana Plain: the quad over an avenue of autumn trees, fields beyond.' },
            { id: 'c', art: 'c6/p6-c', bleed: 'blr', alt: 'Tonbo Fest: the quad over a row of food stalls and parked cars by the river.' }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: '31 October', in: 'a' },
            { k: 'cap', x: 70, y: 120, w: 480, t: 'Hotaru Valley. Rice paddies, farmhouses, and a torii standing in the sea.', in: 'a' },
            { k: 'cap', x: 70, yb: 1360, w: 380, t: 'Kazahana Plain. A wide plain in autumn. Cruise the avenue of trees.', in: 'b' },
            { k: 'note', x: 540, yb: 1360, w: 390, d: '31 October', t: 'Tonbo Fest. A drone racing festival on the river ground. Sixteen gates in one lap.', in: 'c', small: true }
          ]
        },
        {
          id: 'c6-p7',
          label: 'Indoors and ruins',
          tone: 'paper',
          layout: ['h', 0.56, 0.03, 'a', 'b'],
          panels: [
            { id: 'a', art: 'c6/p7-a', bleed: 'tlr', alt: 'Hoshino Shoji: the whoop low over the sales floor, rows of desks and the office beyond.' },
            { id: 'b', art: 'c6/p7-b', bleed: 'blr', alt: 'Kirigaoka Sanatorium: a long three storey building on a hill, a clock tower in the middle.' }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: '31 October', in: 'a' },
            { k: 'cap', x: 70, y: 120, w: 460, t: 'Hoshino Shoji. A trading company after hours, flown on a whoop. Thread the desks on the sales floor.', in: 'a' },
            { k: 'note', x: 70, yb: 1360, w: 460, d: '31 October', t: 'Kirigaoka Sanatorium. Abandoned on a hill. Fly the long corridor and thread the clock tower.', in: 'b', small: true }
          ]
        },
        {
          id: 'c6-p8',
          label: 'Next',
          tone: 'paper',
          layout: ['h', 0.56, 0.03, 'a', 'b'],
          panels: [
            { id: 'a', art: 'c6/p8-a', bleed: 'tlr', alt: 'Momiji Pass from above: the road winding up through the autumn forest.' },
            {
              id: 'b',
              fill: 'paper',
              fx: [{ k: 'focus', at: [0.5, 0.56], r: [0.46, 0.3], n: 130, alpha: 0.7 }],
              alt: 'A panel labelled Chapter 07, with the next chapter\'s title lettered across it: game night.'
            }
          ],
          words: [
            { k: 'cap', x: 70, y: 70, w: 420, t: 'Twenty two maps in one night. Pick one and go for a fly. Then the games come out.', in: 'a' },
            { k: 'tag', x: 80, y: 880, t: 'Chapter 07', in: 'b' },
            { k: 'letter', x: 500, y: 1100, size: 96, rot: -3, max: 820, runs: [['NEXT: ', 'cream'], ['GAME NIGHT', 'sakura']], in: 'b' }
          ]
        }
      ]
    },
    {
      id: 'c7',
      n: 7,
      title: 'Game night',
      date: '30 October 2026',
      sources: [
        'Commits merged to main in the simulator (Mathew-Harvey/WebFPVSimulator) from 28 to 30 October 2026: pull requests 171, 173, 177 to 185 and the commits named in STORYBOARD.md',
        'Frames drawn by the simulator at 883f799 for this chapter, listed in tools/shoot/c7.js'
      ],
      pages: [
        {
          id: 'c7-cover',
          label: 'Cover',
          tone: 'paper',
          layout: ['h', 0.7, 0.022, 'hero', ['v', 1 / 3, 0.03, 'w1', ['v', 0.5, -0.03, 'w2', 'w3']]],
          panels: [
            { id: 'hero', art: 'c7/cover-hero', alt: 'A dogfight in the town: a street between houses seen from the pilot\'s quad, bot quads named over the rooftops, the health, gun and missile bars at the left.' },
            { id: 'w1', art: 'c7/cover-w1', alt: 'Ribbon cutting in the town: a street seen from a quad, a ribbon trailing along the road, a line that says Ribbons out, and the count of cuts and ribbons left.', link: 'c7-p2' },
            { id: 'w2', art: 'c7/cover-w2', alt: 'Quad Ball: GOAL! lettered across the arena from the pilot\'s view, the stands full of fans on both sides.', link: 'c7-p5' },
            { id: 'w3', art: 'c7/cover-w3', alt: 'Ridgeline MX: a brown dirt jump right under the camera with the track and pine trees beyond, the film recording marks round the edge of the picture.', link: 'c7-p6' }
          ],
          words: [
            { k: 'tag', x: 74, y: 80, t: 'Chapter 07', in: 'hero' },
            { k: 'letter', x: 74, y: 290, size: 176, anchor: 'start', max: 680, runs: [['WEB', 'cream'], ['FPV', 'sakura']], in: 'hero' },
            { k: 'letter', x: 84, y: 410, size: 104, anchor: 'start', max: 640, runs: [['GAME NIGHT', 'mint']], in: 'hero' },
            { k: 'tag', x: 76, y: 470, t: '28 to 30 October 2026', in: 'hero' },
            { k: 'tag', x: 66, y: 1002, t: 'The ribbons', in: 'w1' },
            { k: 'letter', x: 60, y: 1342, size: 44, anchor: 'start', max: 270, runs: [['SNIP', 'mint']], in: 'w1' },
            { k: 'tag', x: 372, y: 1024, t: 'The ball', in: 'w2' },
            { k: 'letter', x: 352, y: 1342, size: 44, anchor: 'start', max: 270, runs: [['GOAL', 'sakura']], in: 'w2' },
            { k: 'tag', x: 700, y: 1044, t: 'The track', in: 'w3' },
            { k: 'letter', x: 690, y: 1342, size: 44, anchor: 'start', max: 250, runs: [['MX', 'cream']], in: 'w3' }
          ]
        },
        {
          id: 'c7-p1',
          label: 'Dogfight',
          tone: 'paper',
          layout: ['h', 0.26, 0, 'a', ['h', 0.5, 0.04, ['v', 0.5, -0.04, 'b', 'c'], 'd']],
          panels: [
            { id: 'a', fill: 'ink', alt: 'A black panel with words on it.' },
            { id: 'b', art: 'c7/p1-b', alt: 'POP! lettered across the screen in a comic burst, with a line under it saying MOCHI got you with the gun and a count that says Back in 3.' },
            { id: 'c', art: 'c7/p1-c', alt: 'A phone held sideways in flight, with two round buttons, GUN and MISSILE, beside the right thumb.' },
            { id: 'd', art: 'c7/p1-d', bleed: 'blr', alt: 'A dogfight over the town from above the rooftops: bot quads with names over them, and the health, gun and missile bars at the left.' }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: '29 October', in: 'a' },
            { k: 'cap', x: 70, y: 130, w: 860, big: true, t: 'Dogfight. Guns, missiles and bots, on any map, alone or in a room.', in: 'a' },
            { k: 'cap', x: 60, yb: 900, w: 300, t: 'Get popped and you are straight back in.', in: 'b' },
            { k: 'cap', x: 540, yb: 900, w: 300, t: 'On a phone, GUN and MISSILE sit beside the right thumb plate.', in: 'c' },
            { k: 'note', x: 70, yb: 1360, w: 500, d: '29 October', t: 'Up to seven bots, rookie to ace, and each has its own habits. Missiles can be dodged. In a room the host fills the roster with bots.', in: 'd', small: true }
          ]
        },
        {
          id: 'c7-p2',
          label: 'Ribbon cutting',
          tone: 'paper',
          layout: ['h', 0.5, 0.03, 'a', ['v', 0.5, -0.05, 'b', 'c']],
          panels: [
            { id: 'a', art: 'c7/p2-a', bleed: 'tlr', alt: 'Ribbon cutting over the town: a street between rooftops, name tags over the other quads, a red ribbon laid across the road ahead.' },
            { id: 'b', art: 'c7/p2-b', alt: 'The ribbon game\'s screen in flight: a count of ribbons left, the clock, a name tag over each quad and a ribbon curling down toward the rooftops.' },
            { id: 'c', art: 'c7/p2-c', bleed: 'blr', alt: 'A street seen from above in the ribbon game, a red and white ribbon laid across the road beside a bus.' }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: '29 October', in: 'a' },
            { k: 'cap', x: 70, y: 120, w: 500, t: 'Ribbon cutting. Every quad trails a ribbon. Cut the others and keep yours. The last pilot with a ribbon wins.', in: 'a' },
            { k: 'cap', x: 70, yb: 1360, w: 380, t: 'Alone against bots, on any map.', in: 'b' },
            { k: 'note', x: 540, yb: 1360, w: 390, d: '29 October', t: 'Or in a room, with the host\'s bots in the empty seats.', in: 'c', small: true }
          ]
        },
        {
          id: 'c7-p3',
          label: 'More games',
          tone: 'paper',
          layout: ['h', 0.5, 0.03, ['v', 0.5, -0.04, 'a', 'b'], ['v', 0.5, 0.04, 'c', 'd']],
          panels: [
            { id: 'a', art: 'c7/p3-a', bleed: 'tl', alt: 'Goat herding: a knot of goats trotting along a street past a house, each with a picture on its side.' },
            { id: 'b', art: 'c7/p3-b', bleed: 'tr', alt: 'The goat herding table at the end of a round: GIZMO WINS, with each pilot and the goats they got home.' },
            { id: 'c', art: 'c7/p3-c', bleed: 'bl', alt: 'Drift Matsuri: a blue drift car sliding round a corner in a cloud of white smoke, the pits and the cherry trees beyond, the film recording marks round the edge of the picture.' },
            { id: 'd', art: 'c7/p3-d', bleed: 'br', alt: 'The Mini games page: picture cards for Dogfight, Ribbon cutting, Drift Matsuri and Quad Ball, each with a line of rules and tags for bots and friends.' }
          ],
          words: [
            { k: 'cap', x: 60, y: 60, w: 400, t: 'Goat herding with bots. Push the goats home. Most goats wins the round.', in: 'a' },
            { k: 'cap', x: 540, y: 60, w: 400, t: 'A round ends with a table. In a room there is one herd for everybody, and the host\'s bots join in.', in: 'b' },
            { k: 'cap', x: 60, yb: 1360, w: 400, t: 'Drift Matsuri with bots. Everyone films the cars, and the best reel wins.', in: 'c' },
            { k: 'cap', x: 540, yb: 1360, w: 400, t: 'Every game sits on the Mini games page. A bug hunt over all of them went in too.', in: 'd' }
          ]
        },
        {
          id: 'c7-p4',
          label: 'Two small things',
          tone: 'paper',
          layout: ['h', 0.56, 0.03, 'a', 'b'],
          panels: [
            { id: 'a', art: 'c7/p4-a', bleed: 'tlr', alt: 'Goats grazing on a lawn in front of a house on the goat herding map.' },
            { id: 'b', art: 'c7/p4-b', bleed: 'blr', alt: 'The Konex Drone logo.' }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: '29 October', in: 'a' },
            { k: 'cap', x: 70, y: 120, w: 460, t: 'Patron goats. Every patron adds one more goat to the goat herding map.', in: 'a' },
            { k: 'note', x: 70, yb: 1360, w: 460, d: '29 October', t: 'Konex Drone. A small Konex Drone logo is hidden in every map. Some are in hard to reach spots.', in: 'b', small: true }
          ]
        },
        {
          id: 'c7-p5',
          label: 'Quad Ball',
          tone: 'paper',
          layout: ['h', 0.5, 0.03, 'a', ['v', 0.5, -0.05, 'b', 'c']],
          panels: [
            { id: 'a', art: 'c7/p5-a', bleed: 'tlr', alt: 'Quad Ball: GOAL! lettered across the arena, the score and clock at the top, the stands full of fans.' },
            { id: 'b', art: 'c7/p5-b', alt: 'Quad Ball kickoff: a countdown over the pitch, the stands on both sides.' },
            { id: 'c', art: 'c7/p5-c', bleed: 'blr', alt: 'Quad Ball: a countdown of 1 over the pitch, the other quads and the ball at the far end, the stands on both sides.' }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: '30 October', in: 'a' },
            { k: 'cap', x: 70, y: 120, w: 500, t: 'Quad Ball. Rocket League with quads. Pink against mint, and the ball goes in their goal.', in: 'a' },
            { k: 'cap', x: 70, yb: 1360, w: 380, t: 'One against one up to three against three, with bots or in a room.', in: 'b' },
            { k: 'note', x: 540, yb: 1360, w: 390, d: '30 October', t: 'The arena has stands, a crowd and a cage of light. Goals set off fireworks.', in: 'c', small: true }
          ]
        },
        {
          id: 'c7-p6',
          label: 'Ridgeline MX',
          tone: 'paper',
          layout: ['h', 0.5, 0.03, 'a', ['v', 0.5, -0.05, 'b', 'c']],
          panels: [
            { id: 'a', art: 'c7/p6-a', bleed: 'tlr', alt: 'Ridgeline MX: a dirt start straight with a chequered arch at the far end and pine trees either side.' },
            { id: 'b', art: 'c7/p6-b', alt: 'Ridgeline MX: a rider in green on a red dirt bike on a wooden ramp, dust flying.' },
            { id: 'c', art: 'c7/p6-c', bleed: 'blr', alt: 'The take card after a run on Ridgeline MX, with a line that says tap for another take.' }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: '30 October', in: 'a' },
            { k: 'cap', x: 70, y: 120, w: 500, t: 'Ridgeline MX. A motocross track on the Mini games page. Fly the camera behind the pack and film it for a minute.', in: 'a' },
            { k: 'cap', x: 70, yb: 1360, w: 380, t: 'Ten bikes in three packs. They whip, scrub, lean and throw roost.', in: 'b' },
            { k: 'note', x: 540, yb: 1360, w: 390, d: '30 October', t: 'A finish arch, bunting, marshal huts and advertising boards line the start straight. Best reel wins.', in: 'c', small: true }
          ]
        },
        {
          id: 'c7-p7',
          label: 'Career',
          tone: 'paper',
          layout: ['h', 0.5, 0.03, 'a', ['v', 0.5, -0.05, 'b', 'c']],
          panels: [
            { id: 'a', art: 'c7/p7-a', bleed: 'tlr', alt: 'The career skill tree: a trunk of lessons that splits into Race and Freestyle branches, each part a card.' },
            { id: 'b', art: 'c7/p7-b', alt: 'A career lesson briefing: SHOP DOORS in big letters over a picture of the shop, a guide\'s speech bubble, and boxes for the job, the sticks and the stars.' },
            { id: 'c', art: 'c7/p7-c', bleed: 'blr', alt: 'The Paint Shop: a quad and a grid of liveries to pick from.' }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: '28 October', in: 'a' },
            { k: 'cap', x: 70, y: 120, w: 500, t: 'The career is a skill tree now. Fly the trunk to the Rookie Licence, then grow Race or Freestyle.', in: 'a' },
            { k: 'cap', x: 70, yb: 1360, w: 380, t: '73 lessons in 18 parts. Many of them are flown in the real maps.', in: 'b' },
            { k: 'note', x: 540, yb: 1360, w: 390, d: '28 October', t: 'Finish a part to earn a livery for your quad. Your career title shows beside your name in a room.', in: 'c', small: true }
          ]
        },
        {
          id: 'c7-p8',
          label: 'Quad picker',
          tone: 'paper',
          layout: ['h', 0.56, 0.03, 'a', 'b'],
          panels: [
            { id: 'a', art: 'c7/p8-a', bleed: 'tlr', alt: 'The quad picker page for the town: a five inch and a whoop side by side, the five inch marked Recommended.' },
            { id: 'b', art: 'c7/p8-b', bleed: 'blr', alt: 'A street of the town from a whoop\'s own camera, low between the houses, power lines overhead.' }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: '28 October', in: 'a' },
            { k: 'cap', x: 70, y: 120, w: 460, t: 'Pick your quad. Fly the five inch or the whoop on any freestyle world. The page says which one the map was built for.', in: 'a' },
            { k: 'note', x: 70, yb: 1360, w: 460, d: '28 October', t: 'A sweep afterwards made sure everything follows the quad you pick: your props, your chase view and the other pilots in a room.', in: 'b', small: true }
          ]
        },
        {
          id: 'c7-p9',
          label: 'Also',
          tone: 'paper',
          layout: ['h', 0.26, 0, 'a', ['h', 0.5, 0.04, ['v', 0.5, -0.04, 'b', 'c'], 'd']],
          panels: [
            { id: 'a', fill: 'ink', alt: 'A black panel with words on it.' },
            { id: 'b', art: 'c7/p9-b', alt: 'Sunnyfield: back gardens behind two houses, a trampoline, fences, shrubs and flowers.' },
            { id: 'c', art: 'c7/p9-c', alt: 'The take card on Drift Matsuri after a take, graded D, with its lines and a button that says tap for another take.' },
            { id: 'd', art: 'c7/p9-d', bleed: 'blr', alt: 'Sunnyfield from above: rows of house yards with small pools, play sets, beds and trees, fences between them.' }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: 'Also, 28 to 30 October', in: 'a' },
            { k: 'cap', x: 70, y: 130, w: 860, big: true, t: 'Smaller things went in too.', in: 'a' },
            { k: 'cap', x: 60, yb: 900, w: 300, t: 'Sunnyfield is set dressed. Window boxes, patio sets, grills, bins and bikes.', in: 'b' },
            { k: 'cap', x: 540, yb: 900, w: 300, t: 'The take card goes when you tap it. Its labels follow the map.', in: 'c' },
            { k: 'note', x: 70, yb: 1360, w: 500, d: '29 October', t: 'A craft wedged at the foot of a wall is set down.', in: 'd', small: true }
          ]
        },
        {
          id: 'c7-p10',
          label: 'Next',
          tone: 'paper',
          layout: ['h', 0.56, 0.03, 'a', 'b'],
          panels: [
            { id: 'a', art: 'c7/p10-a', bleed: 'tlr', alt: 'The town from above in the evening light, tiled rooftops and trees, with name tags floating over the quads flying across it.' },
            {
              id: 'b',
              fill: 'paper',
              fx: [{ k: 'focus', at: [0.5, 0.56], r: [0.46, 0.3], n: 130, alpha: 0.7 }],
              alt: 'A paper panel, labelled Chapter 08, with its title lettered across it: Two new worlds. The next page starts it.'
            }
          ],
          words: [
            { k: 'cap', x: 70, y: 70, w: 420, t: 'Bots, ribbons, a ball and a dirt track in three days. Pick a game and go for a fly.', in: 'a' },
            { k: 'tag', x: 80, y: 860, t: 'Chapter 08', in: 'b' },
            { k: 'letter', x: 500, y: 1110, size: 100, rot: -3, max: 820, runs: [['TWO NEW ', 'cream'], ['WORLDS', 'sakura']], in: 'b' },
            { k: 'sub', x: 160, y: 1180, w: 680, t: 'Turn the page.', center: true, in: 'b' }
          ]
        }
      ]
    },
    {
      id: 'c8',
      n: 8,
      title: 'Two new worlds',
      date: '3 November 2026',
      sources: [
        'Pull requests merged to main in the simulator (Mathew-Harvey/WebFPVSimulator) from 1 to 3 November 2026: 208 to 217, 219 and 220, with the board pull requests 63, 64, 66 and 67 and the front page commit f415510 (Mathew-Harvey/landingpage-WebFPVSimulator-)',
        'Frames drawn by the simulator at f23ce7f for this chapter, listed in tools/shoot/c8.js'
      ],
      pages: [
        {
          id: 'c8-cover',
          label: 'Cover',
          tone: 'paper',
          layout: ['h', 0.7, 0.022, 'hero', ['v', 1 / 3, 0.03, 'w1', ['v', 0.5, -0.03, 'w2', 'w3']]],
          panels: [
            { id: 'hero', art: 'c8/cover-hero', alt: 'Hanabi Sound at dusk: the main stage lit up at the far end of a field, the crowd packed in front of it, and an orange sky behind.' },
            { id: 'w1', art: 'c8/cover-w1', alt: 'Yumeboshi Land: a roller coaster track climbing past a castle and looping over a lake.', link: 'c8-p2' },
            { id: 'w2', art: 'c8/cover-w2', alt: 'A Quad Ball results card with three buttons, Rematch, Fly on and Leave, over the arena stands.', link: 'c8-p3' },
            { id: 'w3', art: 'c8/cover-w3', alt: 'A phone held sideways in flight, with two round thumb sticks on the glass.', link: 'c8-p5' }
          ],
          words: [
            { k: 'tag', x: 74, y: 80, t: 'Chapter 08', in: 'hero' },
            { k: 'letter', x: 74, y: 290, size: 176, anchor: 'start', max: 680, runs: [['WEB', 'cream'], ['FPV', 'sakura']], in: 'hero' },
            { k: 'letter', x: 84, y: 410, size: 76, anchor: 'start', max: 640, runs: [['TWO NEW WORLDS', 'mint']], in: 'hero' },
            { k: 'tag', x: 76, y: 470, t: '1 to 3 November 2026', in: 'hero' },
            { k: 'tag', x: 66, y: 1002, t: 'The coaster', in: 'w1' },
            { k: 'letter', x: 60, y: 1342, size: 44, anchor: 'start', max: 270, runs: [['WHOOSH', 'mint']], in: 'w1' },
            { k: 'tag', x: 372, y: 1024, t: 'The room', in: 'w2' },
            { k: 'letter', x: 352, y: 1342, size: 44, anchor: 'start', max: 270, runs: [['AGAIN', 'sakura']], in: 'w2' },
            { k: 'tag', x: 700, y: 1044, t: 'The phone', in: 'w3' },
            { k: 'letter', x: 690, y: 1342, size: 44, anchor: 'start', max: 250, runs: [['THUMB', 'cream']], in: 'w3' }
          ]
        },
        {
          id: 'c8-p1',
          label: 'Hanabi Sound',
          tone: 'paper',
          layout: ['h', 0.5, 0.03, 'a', ['v', 0.5, -0.05, 'b', 'c']],
          panels: [
            { id: 'a', art: 'c8/p1-a', bleed: 'tlr', alt: 'Hanabi Sound at dusk: the pilot low over the crowd, the main stage ahead with its screens lit and its roof of lights.' },
            { id: 'b', art: 'c8/p1-b', alt: 'Hanabi Sound after dark: fireworks bursting over the field and lasers fanning out across the sky.' },
            { id: 'c', art: 'c8/p1-c', bleed: 'blr', alt: 'Hanabi Sound: the ferris wheel at the edge of the grounds against the dusk sky.' }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: '3 November', in: 'a' },
            { k: 'cap', x: 70, y: 120, w: 500, t: 'Hanabi Sound. A dance festival at dusk. A main stage, a crowd at the barrier, and fireworks over the field.', in: 'a' },
            { k: 'cap', x: 70, yb: 1360, w: 380, t: 'Lasers fan out across the sky and the crowd jumps to the beat.', in: 'b' },
            { k: 'note', x: 540, yb: 1360, w: 390, d: '3 November', t: 'There is a ferris wheel, bars, food trucks and a sound desk in its tent. Named gaps to thread include one under the decks and one through the big wheel.', in: 'c', small: true }
          ]
        },
        {
          id: 'c8-p2',
          label: 'Yumeboshi Land',
          tone: 'paper',
          layout: ['h', 0.5, 0.03, 'a', ['v', 0.5, -0.05, 'b', 'c']],
          panels: [
            { id: 'a', art: 'c8/p2-a', bleed: 'tlr', alt: 'Yumeboshi Land: a roller coaster track on tall teal columns, a loop in the distance, a lake and a castle.' },
            { id: 'b', art: 'c8/p2-b', alt: 'Yumeboshi Land: the hub of the park, a carousel with a red roof, the castle and the big wheel.' },
            { id: 'c', art: 'c8/p2-c', bleed: 'blr', alt: 'Yumeboshi Land: the rides in the middle of the park, a big wheel and a carousel under a golden sky.' }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: '3 November', in: 'a' },
            { k: 'cap', x: 70, y: 120, w: 500, t: 'Yumeboshi Land. A theme park with a roller coaster to fly. A chain lift, a drop, a loop, a helix and a tunnel through the dragon mountain.', in: 'a' },
            { k: 'cap', x: 70, yb: 1360, w: 380, t: 'A gate, a main street of shops, a hub with a carousel, a castle and a lake with swan boats.', in: 'b' },
            { k: 'note', x: 540, yb: 1360, w: 390, d: '3 November', t: 'The big wheel, the carousel, the drop tower and the other rides move, and they are solid where they are drawn. A train runs the coaster.', in: 'c', small: true }
          ]
        },
        {
          id: 'c8-p3',
          label: 'Quad Ball rooms',
          tone: 'paper',
          layout: ['h', 0.5, 0.03, 'a', ['v', 0.5, -0.05, 'b', 'c']],
          panels: [
            { id: 'a', art: 'c8/p3-a', bleed: 'tlr', alt: 'A Quad Ball room before the kickoff: a countdown number over the pilot\'s pad, the score and a clock at the top, and the room card at the right.' },
            { id: 'b', art: 'c8/p3-b', alt: 'The Quad Ball results card: the winners, a table of the four pilots and three buttons, Rematch, Fly on and Leave.' },
            { id: 'c', art: 'c8/p3-c', bleed: 'blr', alt: 'The Quad Ball results card after one Rematch: the line under the buttons says one of two needed.' }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: '1 November', in: 'a' },
            { k: 'cap', x: 70, y: 120, w: 500, t: 'Quad Ball rooms got fixed up. The match clock runs, and each pilot starts at their own team\'s end.', in: 'a' },
            { k: 'note', x: 70, y: 330, w: 500, d: '1 November', t: 'Every mini game now asks how you want to play: with bots, make a game or join with a code.', in: 'a', small: true },
            { k: 'cap', x: 70, yb: 1360, w: 380, t: 'When a match ends everybody gets Rematch, Fly on or Leave.', in: 'b' },
            { k: 'note', x: 540, yb: 1360, w: 390, d: '1 November', t: 'More than half the pilots asking starts the next match. A pilot who leaves keeps a bot in their seat, and a pilot left alone gets a bot to play.', in: 'c', small: true }
          ]
        },
        {
          id: 'c8-p4',
          label: 'Sound',
          tone: 'paper',
          layout: ['h', 0.56, 0.03, 'a', 'b'],
          panels: [
            { id: 'a', art: 'c8/p4-a', bleed: 'tlr', alt: 'A quad sitting on its start pad at dusk with the festival stage glowing behind it, just before take off.' },
            {
              id: 'b',
              fill: 'paper',
              fx: [{ k: 'focus', at: [0.5, 0.56], r: [0.46, 0.3], n: 130, alpha: 0.7 }],
              alt: 'A paper panel with one sound lettered across it: THOCK.'
            }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: '2 November', in: 'a' },
            { k: 'cap', x: 70, y: 120, w: 460, t: 'The sounds got softer. Cues are rounder, clicks and crashes start slower with less top end, and the wind is a steadier, lower hush.', in: 'a' },
            { k: 'letter', x: 500, y: 1030, size: 150, rot: -4, max: 820, runs: [['THOCK', 'sakura']], in: 'b' },
            { k: 'cap', x: 160, y: 1130, w: 680, t: 'Landing and take off are a deep thock now, and the motors have more body.', center: true, in: 'b' }
          ]
        },
        {
          id: 'c8-p5',
          label: 'Phone play',
          tone: 'paper',
          layout: ['h', 0.5, 0.03, 'a', 'b'],
          panels: [
            { id: 'a', art: 'c8/p5-a', bleed: 'tlr', alt: 'The Settings page on a phone held sideways, with the Thumb stick size row set to Large.' },
            { id: 'b', art: 'c8/p5-b', bleed: 'blr', alt: 'A dogfight on a phone held sideways: two large round thumb sticks and the GUN and MISSILE buttons beside the right one.' }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: '1 and 2 November', in: 'a' },
            { k: 'cap', x: 70, y: 120, w: 500, t: 'Thumb stick size. On a touchscreen, pick Small, Normal or Large sticks. Bigger sticks are easier to hit and give your thumb more room.', in: 'a' },
            { k: 'note', x: 70, yb: 1360, w: 520, d: '2 November', t: 'In the mini games the GUN and MISSILE buttons follow the stick size. On the ground they fade away, and in the air they come back.', in: 'b', small: true }
          ]
        },
        {
          id: 'c8-p6',
          label: 'The manga look',
          tone: 'paper',
          layout: ['h', 0.5, 0.03, ['v', 0.5, -0.04, 'a', 'b'], ['v', 0.5, 0.04, 'c', 'd']],
          panels: [
            { id: 'a', art: 'c8/p6-a', bleed: 'tl', alt: 'Cedar Forest: layered conifers drawn with pointed layers and ink lines, and inked tufts of grass on the lawn.' },
            { id: 'b', art: 'c8/p6-b', bleed: 'tr', alt: 'Hyoura Island: a sea drawn as inked swell in cold blues beside a snowy shore.' },
            { id: 'c', art: 'c8/p6-c', bleed: 'bl', alt: 'Momiji Pass: the car park the pilot starts in, worn asphalt with repair patches and a darker fresh aisle.' },
            { id: 'd', art: 'c8/p6-d', bleed: 'br', alt: 'Hayate Circuit: the pit roof with seams across it and a walkway with a yellow safety line.' }
          ],
          words: [
            { k: 'cap', x: 60, y: 60, w: 400, t: 'The new maps got a manga pass. Conifers are drawn as layers of points and the grass is inked in tufts.', in: 'a' },
            { k: 'cap', x: 540, y: 60, w: 400, t: 'Hyoura Island has an inked sea. Shiokaze Point\'s cliffs show rock seams.', in: 'b' },
            { k: 'cap', x: 60, yb: 1360, w: 400, t: 'Momiji Pass. The car park is worn asphalt with repair patches.', in: 'c' },
            { k: 'cap', x: 540, yb: 1360, w: 400, t: 'Hayate Circuit. The pit roof has seams, a walkway and its name painted on.', in: 'd' }
          ]
        },
        {
          id: 'c8-p7',
          label: 'Also',
          tone: 'paper',
          layout: ['h', 0.26, 0, 'a', ['h', 0.5, 0.04, ['v', 0.5, -0.04, 'b', 'c'], 'd']],
          panels: [
            { id: 'a', fill: 'ink', alt: 'A black panel with words on it.' },
            { id: 'b', art: 'c8/p7-b', alt: 'The title cover of the game with two choices, Fly solo and Multiplayer.' },
            { id: 'c', art: 'c8/p7-c', alt: 'The board\'s Maps page: a grid of picture cards, one for each world.' },
            { id: 'd', art: 'c8/p7-d', bleed: 'blr', alt: 'The partner row on the front page of webfpv.org, with the Konex Drone mark among the partners.' }
          ],
          words: [
            { k: 'tag', x: 70, y: 70, t: 'Also, 1 to 3 November', in: 'a' },
            { k: 'cap', x: 70, y: 130, w: 860, big: true, t: 'Smaller things went in too.', in: 'a' },
            { k: 'note', x: 70, y: 235, w: 860, d: '1 November', t: 'A fly note pass on the new maps made what is drawn solid, so a gap you can see is a gap you can fly.', in: 'a', small: true },
            { k: 'cap', x: 60, yb: 900, w: 300, t: 'The title cover asks one thing: Fly solo or Multiplayer. Mini games moved under Fly solo.', in: 'b' },
            { k: 'cap', x: 540, yb: 900, w: 300, t: 'The board\'s Maps page takes its worlds from the simulator\'s own list.', in: 'c' },
            { k: 'note', x: 60, yb: 1360, w: 330, d: '1 November', t: 'Konex Drone is on the front page as our Spanish partner.', in: 'd', small: true }
          ]
        },
        {
          id: 'c8-p8',
          label: 'Next',
          tone: 'paper',
          layout: ['h', 0.56, 0.03, 'a', 'b'],
          panels: [
            { id: 'a', art: 'c8/p8-a', bleed: 'tlr', alt: 'Yumeboshi Land from above in golden light: the coaster, the lake, the castle and the big wheel.' },
            {
              id: 'b',
              fill: 'paper',
              fx: [{ k: 'focus', at: [0.5, 0.56], r: [0.46, 0.3], n: 130, alpha: 0.7 }],
              alt: 'A panel labelled Chapter 09, with one line lettered across it: the game will keep building.'
            }
          ],
          words: [
            { k: 'cap', x: 70, y: 70, w: 420, t: 'A festival at dusk and a theme park with a roller coaster. Pick one and go for a fly.', in: 'a' },
            { k: 'tag', x: 80, y: 860, t: 'Chapter 09', in: 'b' },
            { k: 'letter', x: 500, y: 1010, size: 84, rot: -3, max: 820, runs: [['THE GAME WILL ', 'cream']], in: 'b' },
            { k: 'letter', x: 500, y: 1110, size: 84, rot: -3, max: 820, runs: [['KEEP BUILDING.', 'sakura']], in: 'b' },
            { k: 'fly', x: 500, y: 1220, t: 'FLY NOW', name: 'Fly WebFPV', href: 'https://webfpv.org/sim/', in: 'b' }
          ]
        }
      ]
    }

  ];

  root.CHAPTERS = CHAPTERS;
  if (typeof module === 'object' && module.exports) module.exports = CHAPTERS;
})(typeof window !== 'undefined' ? window : globalThis);
