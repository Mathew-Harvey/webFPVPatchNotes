# Keyboard, as the simulator flies it

Source: `_upstream/WebFPVSimulator` at `cbaee3f`. The comic repo does not patch this file. Line numbers are from that checkout.

Mode 2 is the default (`DEFAULT_STICK_MODE` in `src/input/stickmode.js`, line 61). The keyboard copies a Mode 2 radio.

## Which key is which stick

`KEY_STICKS` in `src/input/input.js`, lines 1179 to 1186.

| Stick | Forward | Back | Left | Right |
| --- | --- | --- | --- | --- |
| Left | KeyW | KeyS | KeyA | KeyD |
| Right | ArrowUp | ArrowDown | ArrowLeft | ArrowRight |

Mode 2 puts throttle and yaw on the left stick, and pitch and roll on the right (`stickChannels` in `src/input/stickmode.js`, lines 74 to 88).

The file header, lines 21 to 22, says what those keys do in the air: A and D are yaw, the up arrow pushes the stick forward (nose down), the left and right arrows roll, W and S are the collective.

Channel signs, same header, lines 31 to 32, and `src/native/sim_abi.h` line 39: roll positive is right, pitch positive is nose up (stick pulled back), yaw positive is nose right, throttle is 0 to 1.

`keyAxes` (input.js lines 1191 to 1201) maps the forward key to the positive channel and the back key to the negative one. The comment at lines 1173 to 1177 says the forward key on a pitch stick is the negative one, because forward is nose down. The capture runner does not trust that comment against the mapper. On each flight it holds ArrowUp for a short beat and reads `pitchDeg` from `window.__craftState`. Nose down is the key that raises `pitchDeg`. It does the same for KeyD and the heading. The learned signs are written into the sidecar.

## Hold time, not a switch

`analogMag` in `src/input/input.js`, lines 1229 to 1254. The comment above it, lines 1218 to 1223, is the contract:

| Hold | Stick |
| --- | --- |
| about 90 ms | 0.16, a nudge |
| 240 ms to 750 ms | 0.34, cruise, and it stays there |
| 1250 ms | 1.00, full |

Release springs back. `RATE_DOWN` is 9.0 per second (`readKeyboard`, line 3604). The hold clock advances by at most 40 ms per poll (line 3624). Throttle uses the same curve once the craft is off the pad, and rest becomes hover (`applyKeyboardCollective`, lines 3688 to 3732). Liftoff is `KEY_LIFTOFF` 0.25 (line 1279), the shell's own takeoff threshold.

A tap and a punch are different inputs. The runner holds a key across polls. It does not send a tape of timed taps that ignore the craft.

## Why a key can fail to take off

`window.__stick` exists because a held key's ramp is wall clock, and a slow frame never reaches 0.25. The comment is `src/main.js` lines 11320 to 11330. On a headed GPU at frame rate the ramp should reach cruise in about a quarter of a second.

The runner tries keys first. If the craft is still on the grass after a two second hold of KeyW, with the page in flight and the intro finished, it logs that in `SHOTLIST.md` and flies the rest of the pass with `window.__stick`. That override sits above the keyboard (`input.js` lines 1383 to 1391, and `poll` at lines 4012 to 4016). Calling it with no arguments gives the sticks back.

## Flight keys that are not sticks

`input.onKey` in `src/main.js`, lines 6700 to 6763.

| Key | What it does |
| --- | --- |
| KeyR | `reset()`, and the intro stays skipped (line 6712, and `reset` sets `introMs` to -1) |
| KeyX | Set down nearby, in flight, not while landed (line 6723) |
| KeyM | Flip angle and acro (line 6734) |
| KeyL | Launch control, if the setting is on (line 6738) |
| KeyT | Turtle, held, through `pollManualFlip` (line 3280) |
| Escape | Pause, eaten by the menu (`ui.js` `handleKey`, lines 17060 to 17065) |

While the screen is flight, `handleKey` returns false for the stick keys (line 17066), so they reach the window listener at input.js line 1563. On any other screen those same keys move the menu (lines 17160 to 17179). The runner clicks the canvas and checks `window.__screen` before it holds a stick key.

Keyboard races start in angle mode. `keyRaceMode` defaults to `'angle'` (`ui.js` line 1073). The comment at input.js lines 3948 to 3953 says the keyboard races in angle mode by default.
