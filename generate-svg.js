const COLOR_BLOCK = '#b1cdce';
const COLOR_ACCENT = '#519d9e';

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

const width = 1000;
const height = (SIZE + GAP) * MAX_ROWS;

const fontSize = 60;
const padding = (height - fontSize); // TODO

const template = ({ contents }) => `
<svg fill="none" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  ${contents}
	<foreignObject width="100%" height="100%">
    <div xmlns="http://www.w3.org/1999/xhtml">
      <style>
        .container {
          position: absolute;
          width: 100%;
          height: 100%;
          text-align: center;
          font-family: monospace;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .name { font-size: ${fontSize}px; }
        .name span { color: ${COLOR_ACCENT}; }
      </style>
      <div class="container">
        <div class="name">AKSHAY <span>NAIR</span></div>
      </div>
    </div>
  </foreignObject>
  <style>
    @keyframes animation {
      0% { opacity: 0.3; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.01); }
      100% { opacity: 0.3; transform: scale(1); }
    }
    .b {
      fill: ${COLOR_BLOCK};
      width: ${SIZE}px;
      height: ${SIZE}px;
      transform-origin: 50% 50%;
      opacity: 0.3;
      animation: animation 2s infinite ease-in-out;
    }
  </style>
</svg>
`.replace(/\s+/g, ' ');

const contents = renderSvg(RULE, getInitialRow(width / SIZE), 0);

console.log(template({ contents }));

