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
              alt: 'An empty panel, labelled Chapter 02, with one question lettered across it: what\'s coming next? The next chapter is not drawn yet.'
            }
          ],
          words: [
            { k: 'cap', x: 70, y: 70, w: 420, t: 'The game will keep building.', in: 'a' },
            { k: 'tag', x: 80, y: 880, t: 'Chapter 02', in: 'b' },
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
