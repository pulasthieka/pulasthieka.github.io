// The portrait simplified for small sizes (home page, article byline):
// fewer channels drawn heavier, so it still reads at 80px wide.
process.env.OUT = 'public/img/portrait-thumb.svg';
process.env.ROWS = '22';
process.env.COLS = '70';
process.env.STROKE = '5';
process.env.AMP = '2.6';
await import('./portrait.mjs');
