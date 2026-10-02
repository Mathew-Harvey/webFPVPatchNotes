/*
 * Chapter 1. One approach, too fast, then a second lift.
 * Course is a shipped track. WCMRC Round 5 puts gate 0 about 15 m
 * ahead of the grid in the document. The runner confirms the live
 * spawn faces it before it trusts the frames.
 */
module.exports = {
  id: 'c1',
  course: 'tracks/json/trk-a75a1bc4.json',
  airframe: '5inch',
  shots: [
    {
      id: 'c1-p1-a',
      note: 'Just off the pad. Gate small, ahead.',
      when(s) {
        return s.fpv && !s.crashed && s.air && s.clearance > 1.2 && s.clearance < 3.8
          && s.dist > 10 && s.dist < 16 && s.speed > 0.8 && s.speed < 8
          && s.aligned && s.up > 0.9 && s.gateY != null && s.gateY > 0.2 && s.gateY < 0.8
          && !s.seen['c1-p1-a'];
      },
      score(s) {
        return s.aligned * 4 + (s.up > 0.8 ? 2 : 0) + Math.min(s.speed, 8) / 8;
      },
    },
    {
      id: 'c1-p1-b',
      note: 'Mid approach, banked, gate larger.',
      when(s) {
        return s.fpv && !s.crashed && s.seen['c1-p1-a'] && s.dist < 10 && s.dist > 5
          && s.aligned && s.speed > 1.5 && s.clearance < 4 && s.up > 0.75
          && s.aperture > 0.1 && !s.seen['c1-p1-b'];
      },
      score(s) {
        return s.aligned * 3 + Math.min(Math.abs(s.roll), 0.5) * 4 + (s.up > 0.45 ? 1 : 0);
      },
    },
    {
      id: 'c1-cover',
      note: 'Gate fills the glass.',
      when(s) {
        return s.fpv && !s.crashed && !s.landed && s.seen['c1-p1-b'] && s.inFront
          && s.aperture > 0.32 && s.speed > 4 && s.clearance > 0.6 && s.clearance < 5
          && s.up > 0.45 && !s.seen['c1-cover'];
      },
      score(s) {
        const fill = Math.min(s.aperture, 0.85);
        return fill * 4 + (s.centred ? 2 : 0);
      },
    },
    {
      id: 'c1-p1-c',
      note: 'Same arrival, a later frame of the burst family.',
      when(s) {
        return s.fpv && !s.landed && s.seen['c1-cover'] && s.inFront && s.aperture > 0.36
          && !s.seen['c1-p1-c'];
      },
      score(s) {
        return Math.min(s.aperture, 1) * 3 + (s.centred ? 1 : 0);
      },
    },
    {
      id: 'c1-p2-a',
      note: 'Miss or clip. Horizon tipped.',
      when(s) {
        return s.seen['c1-p1-c'] && (s.tipped || s.past || s.hit)
          && !s.seen['c1-p2-a'];
      },
      score(s) {
        return (s.tipped ? 3 : 0) + (s.past ? 1 : 0) + (s.hit ? 1 : 0);
      },
    },
    {
      id: 'c1-p2-b',
      note: 'Down on the grass.',
      when(s) {
        return s.seen['c1-p2-a'] && s.landed && !s.seen['c1-p2-b'];
      },
      score(s) {
        return s.landed ? 2 : 0;
      },
    },
    {
      id: 'c1-p2-c',
      note: 'Sitting. The gate is ahead again.',
      when(s) {
        return s.seen['c1-p2-b'] && s.landed && s.inFront && !s.seen['c1-p2-c'];
      },
      score(s) {
        return (s.inFront ? 2 : 0) + (s.centred ? 1 : 0);
      },
    },
    {
      id: 'c1-p3-a',
      note: 'Second liftoff.',
      when(s) {
        return s.seen['c1-p2-c'] && s.air && s.clearance > 1.2 && s.clearance < 5
          && !s.seen['c1-p3-a'];
      },
      score(s) {
        return s.air ? 2 + Math.min(s.clearance, 3) : 0;
      },
    },
    {
      id: 'c1-p3-b',
      note: 'Hold. Gate framed, not entered.',
      when(s) {
        return s.seen['c1-p3-a'] && s.hold && s.inFront && s.centred
          && s.dist > 6 && s.dist < 16 && !s.seen['c1-p3-b'];
      },
      score(s) {
        return (s.centred ? 3 : 0) + (s.up > 0.85 ? 2 : 0) + (s.speed < 4 ? 1 : 0);
      },
    },
  ],
};
