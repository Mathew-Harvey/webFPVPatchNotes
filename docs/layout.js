/*
 * layout.js: where the panels of a page go.
 *
 * A page is 1000 units wide and 1414 tall, the shape of a printed manga
 * page, and every number in a chapter is in those units: a panel's corners,
 * a caption's position, a balloon's width. The reader scales the page to the
 * window, so the units never change and the drawing never reflows.
 *
 * A page's panels are cut, not placed. The layout is a tree of cuts, the way
 * the simulator's own results page cuts its panels (src/ui/mangapage.js in
 * WebFPVSimulator): ['h', f, lean, A, B] cuts the box across at f of its
 * height, A above and B below, and ['v', f, lean, A, B] cuts it down at f of
 * its width, A left and B right. Lean tilts the cut, so a gutter can run
 * downhill the way a drawn page's do. A leaf is a panel's id.
 *
 * Every panel is then moved in by half a gutter on every side, edge by edge,
 * so a gutter is the same width however its edges lean. A panel that bleeds
 * is pushed back out past the edge of the paper on the sides it names, along
 * its own edges, so a leaning gutter still leans where it leaves the page.
 *
 * The same file runs in the reader and in Node, where the capture rig asks it
 * how wide and how tall each panel is, so a picture is shot for its frame.
 *
 * This file is part of the WebFPV comic. Copyright 2026 Mathew Harvey
 * (andAgainFPV). Licensed under CC BY-ND 4.0, see LICENSE.
 */
(function (root) {
  'use strict';

  var PAGE_W = 1000;
  var PAGE_H = 1414;
  /* The front door's page numbers, which are the simulator's results page's:
   * margin 3.5, gutter 2.2 and border 0.65 per cent of the short side
   * (src/page.js on the landing page). On a 1000 unit page, 35, 22 and 6.5. */
  var MARGIN = 35;
  var GUTTER = 22;
  var BORDER = 6.5;
  /* How far past the paper a bleed is pushed, so no hairline of paper is
   * left where the scaled page meets the edge of the screen. */
  var OVER = 14;

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  /* A quad is [TLx, TLy, TRx, TRy, BRx, BRy, BLx, BLy]. */
  function rectQuad(x0, y0, x1, y1) {
    return [x0, y0, x1, y0, x1, y1, x0, y1];
  }

  /* A cut down the box, from the top edge at f + d to the bottom at f - d. */
  function splitV(q, f, d) {
    var tx = lerp(q[0], q[2], f + d);
    var ty = lerp(q[1], q[3], f + d);
    var bx = lerp(q[6], q[4], f - d);
    var by = lerp(q[7], q[5], f - d);
    return [
      [q[0], q[1], tx, ty, bx, by, q[6], q[7]],
      [tx, ty, q[2], q[3], q[4], q[5], bx, by]
    ];
  }

  /* A cut across the box, from the left edge at f - e to the right at f + e. */
  function splitH(q, f, e) {
    var lx = lerp(q[0], q[6], f - e);
    var ly = lerp(q[1], q[7], f - e);
    var rx = lerp(q[2], q[4], f + e);
    var ry = lerp(q[3], q[5], f + e);
    return [
      [q[0], q[1], q[2], q[3], rx, ry, lx, ly],
      [lx, ly, rx, ry, q[4], q[5], q[6], q[7]]
    ];
  }

  /*
   * The quad moved in by d on every side. Each edge's line is offset inward
   * and neighbouring lines are intersected, which keeps the gutter the same
   * width however the edges lean. Quads here are convex and wound clockwise
   * on a y down page, so inward is to the right of each edge.
   */
  function insetQuad(q, d) {
    var lines = [];
    var i;
    for (i = 0; i < 4; i += 1) {
      var px = q[i * 2];
      var py = q[i * 2 + 1];
      var dx = q[((i + 1) % 4) * 2] - px;
      var dy = q[((i + 1) % 4) * 2 + 1] - py;
      var len = Math.hypot(dx, dy) || 1;
      lines.push([px - (dy / len) * d, py + (dx / len) * d, dx, dy]);
    }
    var out = new Array(8);
    for (i = 0; i < 4; i += 1) {
      var a = lines[(i + 3) % 4];
      var b = lines[i];
      var cross = a[2] * b[3] - a[3] * b[2];
      var t = cross ? ((b[0] - a[0]) * b[3] - (b[1] - a[1]) * b[2]) / cross : 0;
      out[i * 2] = a[0] + a[2] * t;
      out[i * 2 + 1] = a[1] + a[3] * t;
    }
    return out;
  }

  function cut(node, q, out) {
    if (typeof node === 'string') {
      out[node] = q;
      return;
    }
    var parts = node[0] === 'h' ? splitH(q, node[1], node[2] || 0) : splitV(q, node[1], node[2] || 0);
    cut(node[3], parts[0], out);
    cut(node[4], parts[1], out);
  }

  /* Which edges of the live area a raw corner sits on. */
  function sides(x, y, live) {
    var s = '';
    if (Math.abs(y - live[1]) < 0.5) s += 't';
    if (Math.abs(y - live[3]) < 0.5) s += 'b';
    if (Math.abs(x - live[0]) < 0.5) s += 'l';
    if (Math.abs(x - live[2]) < 0.5) s += 'r';
    return s;
  }

  /*
   * Push one corner out past the paper along the edge that leaves the page.
   * For a top or bottom bleed that is the panel's side edge, for a left or
   * right bleed its top or bottom edge, so the line the gutter drew is the
   * line that runs off the page.
   */
  var PARTNER = {
    /* corner: [partner across a top or bottom bleed, partner across a left or right bleed] */
    0: [3, 1],
    1: [2, 0],
    2: [1, 3],
    3: [0, 2]
  };

  function extend(q, i, j, axis, to) {
    var x = q[i * 2];
    var y = q[i * 2 + 1];
    var px = q[j * 2];
    var py = q[j * 2 + 1];
    if (axis === 'y') {
      var dy = y - py;
      var t = Math.abs(dy) < 1e-6 ? 0 : (to - py) / dy;
      return [Math.abs(dy) < 1e-6 ? x : px + (x - px) * t, to];
    }
    var dx = x - px;
    var u = Math.abs(dx) < 1e-6 ? 0 : (to - px) / dx;
    return [to, Math.abs(dx) < 1e-6 ? y : py + (y - py) * u];
  }

  function bboxOf(q) {
    var x0 = Math.min(q[0], q[2], q[4], q[6]);
    var x1 = Math.max(q[0], q[2], q[4], q[6]);
    var y0 = Math.min(q[1], q[3], q[5], q[7]);
    var y1 = Math.max(q[1], q[3], q[5], q[7]);
    return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
  }

  /*
   * Every panel of a page: { id: { quad, box } } in page units. The page may
   * name its own margin and gutter, a panel its own bleed ('tblr' in any
   * order) or an explicit quad, which is how an inset sits over another panel.
   */
  function layoutPage(page) {
    var margin = page.margin != null ? page.margin : MARGIN;
    var gutter = page.gutter != null ? page.gutter : GUTTER;
    /* The cuts are made in a box half a gutter bigger than the margin, so
     * once every panel is moved in by half a gutter its outer edge sits on
     * the margin, as the front door's frame does. */
    var h = gutter / 2;
    var live = [margin - h, margin - h, PAGE_W - margin + h, PAGE_H - margin + h];
    var raw = {};
    if (page.layout) cut(page.layout, rectQuad(live[0], live[1], live[2], live[3]), raw);
    var out = {};
    var list = page.panels || [];
    if (!Array.isArray(list)) {
      list = Object.keys(list).map(function (k) { return Object.assign({ id: k }, list[k]); });
    }
    list.forEach(function (spec) {
      var id = spec.id;
      if (spec.quad) {
        out[id] = { quad: spec.quad.slice(), box: bboxOf(spec.quad) };
        return;
      }
      var r = raw[id];
      if (!r) return;
      var q = insetQuad(r, gutter / 2);
      var bleed = spec.bleed || '';
      if (bleed) {
        var moved = q.slice();
        for (var i = 0; i < 4; i += 1) {
          var on = sides(r[i * 2], r[i * 2 + 1], live);
          var vy = null;
          var hx = null;
          if (on.indexOf('t') >= 0 && bleed.indexOf('t') >= 0) vy = -OVER;
          if (on.indexOf('b') >= 0 && bleed.indexOf('b') >= 0) vy = PAGE_H + OVER;
          if (on.indexOf('l') >= 0 && bleed.indexOf('l') >= 0) hx = -OVER;
          if (on.indexOf('r') >= 0 && bleed.indexOf('r') >= 0) hx = PAGE_W + OVER;
          var p = null;
          if (vy != null && hx != null) p = [hx, vy];
          else if (vy != null) p = extend(q, i, PARTNER[i][0], 'y', vy);
          else if (hx != null) p = extend(q, i, PARTNER[i][1], 'x', hx);
          if (p) {
            moved[i * 2] = p[0];
            moved[i * 2 + 1] = p[1];
          }
        }
        q = moved;
      }
      out[id] = { quad: q, box: bboxOf(q) };
    });
    return out;
  }

  /* The part of a panel's box that is on the paper, for sizing its picture. */
  function visibleBox(box) {
    var x0 = Math.max(0, box.x);
    var y0 = Math.max(0, box.y);
    var x1 = Math.min(PAGE_W, box.x + box.w);
    var y1 = Math.min(PAGE_H, box.y + box.h);
    return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
  }

  var api = {
    PAGE_W: PAGE_W,
    PAGE_H: PAGE_H,
    MARGIN: MARGIN,
    GUTTER: GUTTER,
    BORDER: BORDER,
    layoutPage: layoutPage,
    insetQuad: insetQuad,
    bboxOf: bboxOf,
    visibleBox: visibleBox
  };
  root.WebFPVLayout = api;
  if (typeof module === 'object' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
