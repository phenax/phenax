const COLOR_ACCENT = '#519d9e';
const COLOR_BLOCK = COLOR_ACCENT;
const COLOR_PRIMARY = '#151823';
const COLOR_FG = '#f1fff5';

const getNextRow = (row, rule) => row.map((current, i) => {
  const prev = row[i - 1] || false;
  const next = row[i + 1] || false;
  return rule(prev, current, next);
});

const rules = {
  150: (a, b, c) => (a + b + c) % 2 === 1,
  126: (a, b, c) => !(a === b && b === c),
  60: (a, b, _) => a === b,
};
const RULE = rules[126];

const getInitialRow = count => Array(count).fill(false).map(() => Math.random() > 0.5);

const SIZE = 20;
const GAP = 5;
const drawRow = (current, row) => current.map((state, col) => {
  const x = col * (SIZE + GAP);
  const y = row * (SIZE + GAP);

  return !state ? '' : `
    <rect
        x="${x}"
        y="${y}"
        class="b"
        style="animation-delay: ${row * col / 50}s;"
    />
  `.replace(/\s+/g, ' ');
}).join('');

const MAX_ROWS = 15;
const renderSvg = (rule, currentRow, rows) => {
  if (rows > MAX_ROWS) return '';
  return drawRow(currentRow, rows) + renderSvg(rule, getNextRow(currentRow, rule), rows + 1);
};

const width = 1500;
const height = (SIZE + GAP) * MAX_ROWS;

const fontSize = 60;
const padding = (height - fontSize); // TODO

const template = ({ contents }) => `
<svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" style="background-color: ${COLOR_PRIMARY};">
  ${contents}
  <style>
    @keyframes animation {
      0% { opacity: 0.2; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(1.01); }
      100% { opacity: 0.2; transform: scale(1); }
    }
    .b {
      fill: ${COLOR_BLOCK};
      width: ${SIZE}px;
      height: ${SIZE}px;
      transform-origin: 50% 50%;
      opacity: 0.2;
      animation: animation 2s infinite ease-in-out;
    }
  </style>
	<foreignObject width="100%" height="100%">
    <div xmlns="http://www.w3.org/1999/xhtml">
      <style>
        .container {
          position: absolute;
          width: 100%;
          height: 100%;
          text-align: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          color: ${COLOR_FG};
        }
        .name { font-size: ${fontSize}px; }
        //.name span { color: ${COLOR_ACCENT}; }
      </style>
      <div class="container">
        <div class="name">Akshay Nair</div>
      </div>
    </div>
  </foreignObject>
</svg>
`.replace(/\s+/g, ' ');

const contents = renderSvg(RULE, getInitialRow(width / SIZE), 0);

console.log(template({ contents }));

