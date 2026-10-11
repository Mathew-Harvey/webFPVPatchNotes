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
        'Release notes, 3 to 11 October 2026 (RELEASE-NOTES-WEEK-2.md), read from the code on main of the simulator, the board and the front page',
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
            { k: 'tag', x: 76, y: 680, t: 'New this week: CommunityGow', in: 'hero' },
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
          id: 'c1-p14b',
          label: 'CommunityGow',
          tone: 'paper',
          layout: ['h', 0.1, 0, 'hd', ['h', 0.47, 0.02, 'n1', ['v', 0.5, 0.05, 'n2', 'n3']]],
          panels: [
            { id: 'hd', fill: 'paper', frame: 'none', alt: 'The page heading.' },
            { id: 'n1', art: 'c1/w-cg1', alt: 'The Example Whoop Club page on the board: this week\'s round, its track plan, and the first three times.' },
            { id: 'n2', art: 'c1/w-cg2', bleed: 'lb', alt: 'The CommunityGow page on a phone, with Your Whoop Club typed in the box that starts a new club.' },
            { id: 'n3', art: 'c1/w-cg3', bleed: 'rb', alt: 'The whoop builder holding a RaceGOW room, with a Send to Example Whoop Club button at the top.' }
          ],
          words: [
            { k: 'letter', x: 70, y: 132, size: 76, anchor: 'start', max: 860, runs: [['COMMUNITY', 'cream'], ['GOW', 'mint']], in: 'hd' },
            { k: 'note', x: 61, yb: 679, w: 400, d: '11 October', t: 'A club or a group of friends races a new whoop track every week, at home, at their own pace, with a YouTube link as the evidence. It lives at webfpv.org/board/CommunityGow.', in: 'n1', small: true },
            { k: 'note', x: 61, yb: 1402, w: 400, d: '11 October', t: 'Name your club, press Start my community, and it is public from the first second. No account and no email. You keep one organiser link, and it is the only key to editing, so save it.', in: 'n2', small: true },
            { k: 'note', x: 539, yb: 1402, w: 400, d: '11 October', t: 'A round is one track, sent from the whoop builder with Send to the community, or dropped in as a pack. It can open on a date, so next week is lined up today. Every round is also a track on the board, with a Fly it in the simulator button.', in: 'n3', small: true }
          ]
        },
        {
          id: 'c1-p14b-2',
          label: 'CommunityGow, post a time',
          tone: 'paper',
          layout: ['h', 0.1, 0, 'hd', ['v', 0.55, 0.04, 'n1', ['h', 0.5, -0.03, 'n2', 'n3']]],
          panels: [
            { id: 'hd', fill: 'paper', frame: 'none', alt: 'The page heading.' },
            { id: 'n1', art: 'c1/w-cg4', bleed: 'lb', alt: 'The Post your time form on a phone: the name Kestrel, the time 34.56, read back as 34.560.' },
            { id: 'n2', art: 'c1/w-cg5', bleed: 'r', alt: 'The club\'s Season tab: the points per round, and a table with Kestrel on 43 and Tofu below.' },
            { id: 'n3', art: 'c1/w-cg6', bleed: 'rb', alt: 'Invite people to Example Whoop Club: a link and a QR code for the wall.' }
          ],
          words: [
            { k: 'letter', x: 70, y: 132, size: 76, anchor: 'start', max: 860, runs: [['POST A ', 'cream'], ['TIME', 'mint']], in: 'hd' },
            { k: 'note', x: 61, yb: 1402, w: 400, d: '11 October', t: 'Post a time with no sign in. Type it the way you say it: 34.56, 12s, 1:02.5. A YouTube link plays in place, and nothing loads from YouTube until you press Watch.', in: 'n1', small: true },
            { k: 'note', x: 539, y: 198, w: 400, d: '11 October', t: 'The Season table scores every round on the F1 points, 25 for first down to 1 for tenth. The organiser can mark a time Verified. Nothing is verified for you.', in: 'n2', small: true },
            { k: 'note', x: 539, yb: 1402, w: 400, d: '11 October', t: 'Invite people gives a link, a QR code and a poster for the wall. Never used on the live board by a pilot yet: it was checked with self tests and a headless browser.', in: 'n3', small: true }
          ]
        },
        {
          id: 'c1-p14b2',
          label: 'Tunes',
          tone: 'paper',
          layout: ['h', 0.1, 0, 'hd', ['h', 0.44, -0.02, ['v', 0.5, -0.05, 'n1', 'n2'], 'n3']],
          panels: [
            { id: 'hd', fill: 'paper', frame: 'none', alt: 'The page heading.' },
            { id: 'n1', art: 'c1/w-tu1', alt: 'The simulator\'s Shared dialog: the tune is on the board, with its short code and Copy code.' },
            { id: 'n2', art: 'c1/w-tu2', alt: 'Share this tune: the list of what goes up with a tune, and what is never included.' },
            { id: 'n3', art: 'c1/w-tu3', bleed: 'lrb', alt: 'The board\'s Tunes tab in Top rated order: three tune cards with stars, share codes and Load in the simulator.' }
          ],
          words: [
            { k: 'letter', x: 70, y: 132, size: 76, anchor: 'start', max: 860, runs: [['TUNES', 'cream']], in: 'hd' },
            { k: 'note', x: 61, y: 198, w: 400, d: '11 October', t: 'A Tunes library. Share this tune puts the tune you fly on the board with a short code, like k7mq-2xrt-9vwd. Paste a code under Load a tune and see what is in it before anything changes.', in: 'n1', small: true },
            { k: 'note', x: 539, yb: 642, w: 400, d: '11 October', t: 'A tune holds its PIDs, rates, weight, Air grip, Motor power, pack, lens and tilt. Not your graphics, sticks, radio, flight mode, names or laps. Put mine back undoes a load.', in: 'n2', small: true },
            { k: 'note', x: 61, y: 761, w: 400, d: '11 October', t: 'Star ratings, one to five, on tunes, tracks and maps. One rating a browser, and you can change it. Tracks has a Top rated order, and the board has a Tunes tab.', in: 'n3', small: true }
          ]
        },
        {
          id: 'c1-p14b2-2',
          label: 'The guide and the bundle',
          tone: 'paper',
          layout: ['h', 0.1, 0, 'hd', ['v', 0.45, -0.04, ['h', 0.5, 0.03, 'n1', 'n2'], 'n3']],
          panels: [
            { id: 'hd', fill: 'paper', frame: 'none', alt: 'The page heading.' },
            { id: 'n1', art: 'c1/w-tu4', bleed: 'l', alt: 'A whoop on the pad in a RaceGOW room with the first flight guide\'s words over the view.' },
            { id: 'n2', art: 'c1/w-tu5', bleed: 'lb', alt: 'The printable build instructions from a bundle: pictures of the room\'s gates from two corners.' },
            { id: 'n3', art: 'c1/w-tu6', bleed: 'rb', alt: 'The Nice flying card on the flight screen after two tracks, asking whether to show the tuning sliders.' }
          ],
          words: [
            { k: 'letter', x: 70, y: 132, size: 76, anchor: 'start', max: 860, runs: [['GUIDE', 'cream'], [' + ', 'sakura'], ['BUNDLE', 'cream']], in: 'hd' },
            { k: 'note', x: 61, yb: 708, w: 400, d: '11 October', t: 'A first flight guide for each kind of place: a race track, a whoop room and a freestyle world. It starts at launch, from a friend\'s Fly link as well. Add ?guide=1 to the address to see it again.', in: 'n1', small: true },
            { k: 'note', x: 61, y: 850, w: 400, d: '11 October', t: 'Export bundle in the whoop builder makes one zip: the track file, a plan, six pictures, the lap animation and printable build instructions.', in: 'n2', small: true },
            { k: 'note', x: 579, y: 288, w: 360, d: '11 October', t: 'The Air grip and Motor power sliders stay opt in. After two tracks, or ten minutes of freestyle, a Nice flying card asks on landing if you want them. Settings has the same switch. Nobody has flown this on the live build.', in: 'n3', small: true }
          ]
        },
        {
          id: 'c1-p14c',
          label: 'The week, building',
          tone: 'paper',
          layout: ['h', 0.1, 0, 'hd', ['h', 0.47, 0.02, 'n1', ['v', 0.5, 0.05, 'n2', 'n3']]],
          panels: [
            { id: 'hd', fill: 'paper', frame: 'none', alt: 'The page heading.' },
            { id: 'n1', art: 'c1/w-bd1', alt: 'A five inch quad banks into the W of WEBFPV, spelled in pipe letters standing on the race field.' },
            { id: 'n2', art: 'c1/w-bd2', bleed: 'lb', alt: 'The race field\'s first gate made Invisible: the pads and the field, and no frame where the gate is.' },
            { id: 'n3', art: 'c1/w-bd3', bleed: 'rb', alt: 'Export animation on the Race field setting: the striped turf, the course, a ground logo and the gates.' }
          ],
          words: [
            { k: 'letter', x: 70, y: 132, size: 76, anchor: 'start', max: 860, runs: [['THE WEEK: ', 'cream'], ['BUILDING', 'amber']], in: 'hd' },
            { k: 'note', x: 539, yb: 703, w: 400, d: '4 October', t: 'Letters in the five inch builder. Any capital A to Z in pipe, with one to three gaps to fly through, each gap a gate in the order. Any gate can be made a letter and back.', in: 'n1', small: true },
            { k: 'note', x: 61, y: 773, w: 400, d: '4 October', t: 'An Invisible gate, key I, on the five inch and the whoop. An opening you fly through and score like a gate, with nothing to hit. Any gate can drop its frame.', in: 'n2', small: true },
            { k: 'note', x: 539, y: 798, w: 400, d: '4 October', t: 'Export animation has a Size, Standard, High or Very high, and a Setting: Black stage or Race field, with the striped turf, the ground logos and sponsors on the gate headers.', in: 'n3', small: true }
          ]
        },
        {
          id: 'c1-p14c-2',
          label: 'Stacks and official tracks',
          tone: 'paper',
          layout: ['h', 0.1, 0, 'hd', ['v', 0.55, 0.04, 'n1', ['h', 0.5, -0.03, 'n2', 'n3']]],
          panels: [
            { id: 'hd', fill: 'paper', frame: 'none', alt: 'The page heading.' },
            { id: 'n1', art: 'c1/w-bd4', bleed: 'lb', alt: 'The builder\'s Each opening card for a triple stack: three openings, two set to their own sizes, and the frame\'s upright buttons.' },
            { id: 'n2', art: 'c1/w-bd5', bleed: 'r', alt: 'The live board on a phone: WA State Champs 2026 with its Official badge, a record of 34.25 and Fly this track.' },
            { id: 'n3', art: 'c1/w-bd6', bleed: 'rb', alt: 'A quad flies past a patron\'s sign, Quad Configurator, on a wall in the town.' }
          ],
          words: [
            { k: 'letter', x: 70, y: 132, size: 76, anchor: 'start', max: 860, runs: [['STACKS', 'cream'], [' + ', 'sakura'], ['OFFICIAL', 'amber']], in: 'hd' },
            { k: 'note', x: 61, y: 198, w: 360, d: '4 October', t: 'Stacked gates: each opening has its own width and height, and Delete takes away one opening\'s upright stretch. The options card can be dragged by its heading.', in: 'n1', small: true },
            { k: 'note', x: 539, yb: 708, w: 400, d: '4 October', t: 'Official tracks. The board\'s owners can mark a track Official. Anyone can fly it and post a time. Nobody else can change it or open it in the builder.', in: 'n2', small: true },
            { k: 'note', x: 562, yb: 1402, w: 400, d: '11 October', t: 'Logos and stickers in the map builder are for the board\'s owners only. Patron signs, up to three, can hang on the walls of the freestyle maps and the town.', in: 'n3', small: true }
          ]
        },
        {
          id: 'c1-p14d',
          label: 'The week, flying',
          tone: 'paper',
          layout: ['h', 0.1, 0, 'hd', ['h', 0.44, -0.02, ['v', 0.5, -0.05, 'n1', 'n2'], 'n3']],
          panels: [
            { id: 'hd', fill: 'paper', frame: 'none', alt: 'The page heading.' },
            { id: 'n1', art: 'c1/w-fl1', alt: 'On the pad with Flight feel tuning on: Air grip at 115 and Motor power at 105 under Weight, and the card explaining them.' },
            { id: 'n2', art: 'c1/w-fl2', alt: 'A quad pitched down into the green first gate of the race field.' },
            { id: 'n3', art: 'c1/w-fl3', bleed: 'lrb', alt: 'The Rates screen: a curve to 600 degrees a second, Centre sensitivity 60 and Max rate 600.' }
          ],
          words: [
            { k: 'letter', x: 70, y: 132, size: 76, anchor: 'start', max: 860, runs: [['THE WEEK: ', 'cream'], ['FLYING', 'mint']], in: 'hd' },
            { k: 'note', x: 61, y: 198, w: 400, d: '9 October', t: 'Flight feel tuning, off by default: Air grip, 50 to 150, and Motor power, 80 to 120. At 100 it is the stock quad. A tuned flight is not posted to the board. Nobody has flown the sliders on the live build.', in: 'n1', small: true },
            { k: 'note', x: 539, yb: 642, w: 400, d: '9 October', t: 'Default tune: prop wash halved, the I term limit halved, the quad 12 mm lower. A full stick yaw stop swings back 4.1 degrees, not 7.0. The owner flew it: flys good.', in: 'n2', small: true },
            { k: 'note', x: 61, y: 761, w: 300, d: '11 October', t: 'Default rates are softer: 60 and 600, from 70 and 670. Your own rates are never moved. 319 feel tickets read twitchy most often.', in: 'n3', small: true }
          ]
        },
        {
          id: 'c1-p14d-2',
          label: 'The whoop and the race line',
          tone: 'paper',
          layout: ['h', 0.1, 0, 'hd', ['v', 0.45, -0.04, ['h', 0.5, 0.03, 'n1', 'n2'], 'n3']],
          panels: [
            { id: 'hd', fill: 'paper', frame: 'none', alt: 'The page heading.' },
            { id: 'n1', art: 'c1/w-fl4', bleed: 'l', alt: 'The 65 mm whoop, white ducts and a black camera, banking past a red gate in a pink room.' },
            { id: 'n2', art: 'c1/w-fl5', bleed: 'lb', alt: 'The Race line in a whoop room: a trail of dots over a dive, packed tight at the bottom where the whoop has to slow.' },
            { id: 'n3', art: 'c1/w-fl6', bleed: 'rb', alt: 'The flight screen on the start pad with the words Auto reset. across the sky and the next gate ahead.' }
          ],
          words: [
            { k: 'letter', x: 70, y: 132, size: 76, anchor: 'start', max: 860, runs: [['WHOOP', 'cream'], [' + ', 'sakura'], ['RACE LINE', 'mint']], in: 'hd' },
            { k: 'note', x: 61, yb: 708, w: 400, d: '10 October', t: 'The whoop has its own physics: 23 g, 0702 motors on one cell, real gravity, and a hit box about two thirds of the drawn whoop. Nobody has reported flying it on the live build.', in: 'n1', small: true },
            { k: 'note', x: 61, yb: 1402, w: 400, d: '9 October', t: 'Race line, off by default. In a whoop room, dots through the next gates: close together means slow down. Next gate cue is a setting. Neither has been flown by a pilot.', in: 'n2', small: true },
            { k: 'note', x: 528, yb: 1252, w: 400, d: '11 October', t: 'Auto reset, off by default. A crash puts you back on the start line after 0.5, 1 or 2 seconds, and a radio switch can be bound to it. Checked by a script only.', in: 'n3', small: true }
          ]
        },
        {
          id: 'c1-p14e',
          label: 'The week, looks',
          tone: 'paper',
          layout: ['h', 0.1, 0, 'hd', ['h', 0.47, 0.02, 'n1', ['v', 0.5, 0.05, 'n2', 'n3']]],
          panels: [
            { id: 'hd', fill: 'paper', frame: 'none', alt: 'The page heading.' },
            { id: 'n1', art: 'c1/w-lk1', alt: 'The town in the Gem look from above, a quad in front of a sea of roofs, trees and a torii gate.' },
            { id: 'n2', art: 'c1/w-lk2', bleed: 'lb', alt: 'A quad low over a town street, a parked car with its plate ahead.' },
            { id: 'n3', art: 'c1/w-lk3', bleed: 'rb', alt: 'The rebuilt five inch quad, pink props and a black frame, beside a car with a Japanese number plate.' }
          ],
          words: [
            { k: 'letter', x: 70, y: 132, size: 76, anchor: 'start', max: 860, runs: [['LOOKS ', 'cream'], ['AND ', 'sakura'], ['FIXES', 'cream']], in: 'hd' },
            { k: 'note', x: 61, yb: 679, w: 400, d: '9 October', t: 'The Gem look replaces the comic look, which cost latency and is off on every preset. Shadows are a setting, and Medium redraws them every third frame. Nothing was measured on a real GPU.', in: 'n1', small: true },
            { k: 'note', x: 61, y: 773, w: 400, d: '8 October', t: 'Faster loads. Shader programs link before the first frame and none link mid flight. The town\'s height lookup is about 100 times faster with identical results.', in: 'n2', small: true },
            { k: 'note', x: 539, y: 798, w: 400, d: '7 October', t: 'The five inch quad is rebuilt as a bench built freestyle quad. Cars have plates, arches and a story, and trees are round and lumpy. Clouds are heaped.', in: 'n3', small: true }
          ]
        },
        {
          id: 'c1-p14e-2',
          label: 'The week, fixes',
          tone: 'paper',
          layout: ['h', 0.1, 0, 'hd', ['v', 0.55, 0.04, 'n1', ['h', 0.5, -0.03, 'n2', 'n3']]],
          panels: [
            { id: 'hd', fill: 'paper', frame: 'none', alt: 'The page heading.' },
            { id: 'n1', art: 'c1/w-lk4', bleed: 'lb', alt: 'A quad at rest on its launch ramp, facing the first gate, the horizon level.' },
            { id: 'n2', art: 'c1/w-lk5', bleed: 'r', alt: 'The Support prompt over the Paused screen: Patreon $3 a month or a one-off $5.' },
            { id: 'n3', art: 'c1/w-lk6', bleed: 'rb', alt: 'The front page on a phone with the Menu open: The Story, Wiki, Patch notes and every other link.' }
          ],
          words: [
            { k: 'letter', x: 70, y: 132, size: 76, anchor: 'start', max: 860, runs: [['FIXES', 'cream']], in: 'hd' },
            { k: 'note', x: 61, y: 198, w: 400, d: '5 October', t: 'The view no longer sinks toward the grass before the quad lifts off. It was the parked camera, not the physics.', in: 'n1', small: true },
            { k: 'note', x: 606, yb: 696, w: 400, d: '5 October', t: 'Fixed the simulator hit a fault after about 20 minutes in the air, and the false Could not post that time. Both came from the Support prompt, and both were fixed the same day.', in: 'n2', small: true },
            { k: 'note', x: 539, yb: 1402, w: 400, d: '6 October', t: 'Stick overlay on by default. About fits a phone on its side. Show FPS is a setting. Camera angle is back on Rates. On the front page a Menu button reaches every link on a phone.', in: 'n3', small: true }
          ]
        },
        {
          id: 'c1-p14f',
          label: 'Also this week',
          tone: 'paper',
          layout: ['h', 0.1, 0, 'hd', ['h', 0.44, -0.02, ['v', 0.5, -0.05, 'n1', 'n2'], 'n3']],
          panels: [
            { id: 'hd', fill: 'paper', frame: 'none', alt: 'The page heading.' },
            { id: 'n1', art: 'c1/w-aw1', alt: 'The flight screen\'s stick overlay: two small boxes with a dot for each stick, beside the pack voltage and the Weight slider.' },
            { id: 'n2', art: 'c1/w-aw2', alt: 'The About screen with Buy Mat a battery ($5) picked, and Instagram below it.' },
            { id: 'n3', art: 'c1/w-aw3', bleed: 'lrb', alt: 'The front page on a desktop: The Story, Patch notes, Quad Race Lottery, Patreon and Tip along the top.' }
          ],
          words: [
            { k: 'letter', x: 70, y: 132, size: 76, anchor: 'start', max: 860, runs: [['ALSO ', 'cream'], ['THIS WEEK', 'sakura']], in: 'hd' },
            { k: 'note', x: 61, y: 198, w: 400, d: '6 October', t: 'Stick overlay, on by default: two small boxes with a dot for each stick, now for radios and gamepads as well as keys. Show FPS is a setting, and Camera angle is back on Rates.', in: 'n1', small: true },
            { k: 'note', x: 539, yb: 642, w: 400, d: '5 October', t: 'Support. About has Buy Mat a battery ($5) and an Instagram row, and a small Support prompt shows at most once a week. Settings, Advanced, Support prompts turns it off. YourFPV is a map only supporter.', in: 'n2', small: true },
            { k: 'note', x: 61, yb: 1402, w: 400, d: '3 to 6 October', t: 'On webfpv.org: a link to this book, The Story, a Quad Race Lottery card for a random draw on race day, a Tip button, and a Menu button so a phone can reach every link.', in: 'n3', small: true }
          ]
        },
        {
          id: 'c1-p14f-2',
          label: 'The rule and the sweep',
          tone: 'paper',
          layout: ['h', 0.1, 0, 'hd', ['h', 0.47, 0.02, 'n1', ['v', 0.5, 0.05, 'n2', 'n3']]],
          panels: [
            { id: 'hd', fill: 'paper', frame: 'none', alt: 'The page heading.' },
            { id: 'n1', art: 'c1/w-aw4', alt: 'Settings, Advanced: Input to screen asks for a few key presses, with Low latency view and Predicted view on.' },
            { id: 'n2', art: 'c1/w-aw5', bleed: 'lb', alt: 'The Paused screen: Resume, Restart run, and the rest of the run\'s menu.' },
            { id: 'n3', art: 'c1/w-aw6', bleed: 'rb', alt: 'The next gate cue: brackets round the green gate ahead and the distance to it.' }
          ],
          words: [
            { k: 'letter', x: 70, y: 132, size: 76, anchor: 'start', max: 860, runs: [['THE RULE', 'cream'], [' + ', 'sakura'], ['THE SWEEP', 'amber']], in: 'hd' },
            { k: 'note', x: 61, yb: 679, w: 340, d: '11 October', t: 'The rule for all of it: nothing that adds delay between stick and screen is accepted. Nothing was measured on a real GPU or a weak laptop, so the Input to screen reading on your own machine is the check that counts.', in: 'n1', small: true },
            { k: 'note', x: 61, yb: 1402, w: 400, d: '11 October', t: 'A bug sweep of the whole week fixed 24 faults. Auto reset waits through a pause, a shared tune loads at once over Your edits, and closing Send to community no longer makes a duplicate round.', in: 'n2', small: true },
            { k: 'note', x: 526, yb: 1402, w: 400, d: '11 October', t: 'Also fixed: Next gate cue Off now holds on the title and results, CommunityGow pages with the wrong round number or a 404, and a club name with a $ that broke the page title. Thirteen findings were left alone on purpose.', in: 'n3', small: true }
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
