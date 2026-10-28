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
            { k: 'tag', x: 76, y: 680, t: 'New: Chapter 04, Other people\'s tracks', in: 'hero' },
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
            { k: 'cap', x: 70, y: 560, w: 560, t: 'Then I wanted it to be accessible for all the people that could not buy a VelociDrone, or what not.', in: 'b' },
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
              fill: 'paper',
              alt: 'A panel held for the Career card on the gate, with its three facts: 50 lessons, Angle to Acro, Medals.',
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
            { id: 'a', fill: 'paper', bleed: 'tlr', alt: 'A panel held for a frame of a JB sticker found on Joshua Bardwell\'s house, its callout on screen.' },
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
            { id: 'c', fill: 'paper', alt: 'A panel held for a first person frame of the goats running from the quad across the field.' },
            { id: 'd', fill: 'paper', bleed: 'blr', alt: 'A panel held for the moment a goat is caught: it hops.' }
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
            { id: 'b', fill: 'paper', alt: 'A panel held for a frame of the whoop landed on the patio table, Nick\'s balloon reading out the flight.' },
            { id: 'c', fill: 'paper', bleed: 'blr', alt: 'A panel held for the second balloon, after a pause: Ah, not 6 7 again.' }
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
            { id: 'b', fill: 'paper', bleed: 'blr', alt: 'A panel held for the ALL 10! splash on Nick Burns\' house, Every sticker found.' }
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
            { id: 'a', fill: 'paper', bleed: 'tlr', alt: 'A panel held for the gate with the Career card first: 50 lessons, Angle to Acro, Medals.' },
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
            { id: 'a', fill: 'paper', bleed: 'tlr', alt: 'A panel held for the briefing of the first lesson, Lift Off, with its drawing of the sticks.' },
            { id: 'b', fill: 'paper', bleed: 'blr', alt: 'A panel held for a lesson\'s medal screen.' }
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
            { id: 'b', fill: 'paper', bleed: 'lr', alt: 'A panel held for the Career chapter list.' },
            { id: 'c', fill: 'paper', bleed: 'blr', alt: 'A panel held for the button that reads I already fly: open every chapter.' }
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
            { id: 'b', fill: 'paper', bleed: 'lr', alt: 'A panel held for the weBLEEDfpv sign in a freestyle map.' },
            { id: 'c', fill: 'paper', bleed: 'blr', alt: 'A panel held for the weBLEEDfpv card on the board\'s partners page.' }
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
              alt: 'An empty panel, labelled Chapter 05, with one question lettered across it: what\'s coming next? The next chapter is not drawn yet.'
            }
          ],
          words: [
            { k: 'cap', x: 70, y: 70, w: 420, t: 'The game will keep building.', in: 'a' },
            { k: 'tag', x: 80, y: 880, t: 'Chapter 05', in: 'b' },
            { k: 'letter', x: 500, y: 1100, size: 96, rot: -3, max: 820, runs: [['WHAT\'S COMING ', 'cream'], ['NEXT?', 'sakura']], in: 'b' },
            { k: 'fly', x: 500, y: 1200, t: 'FLY NOW', name: 'Fly WebFPV', href: 'https://webfpv.org/sim/', in: 'b' }
          ]
        }
      ]
    }
  ];

  root.CHAPTERS = CHAPTERS;
  if (typeof module === 'object' && module.exports) module.exports = CHAPTERS;
})(typeof window !== 'undefined' ? window : globalThis);
