const COLOR_ACCENT = '#58c9b9';
const COLOR_PRIMARY = '#0f0c19';
const COLOR_FG = '#d8dee9';

const width = 1500;
const height = 380;
const fontSize = 90;

// const svg = (strs, ...values) => strs.reduce((acc, s, i) => [...acc, s, values[i]], []);

const balls = {
  fromBottom: 40,
  size: 20,
  spacing: 28,
  count: 4,
};

balls.startX = balls.size + width/2 - (balls.size + balls.spacing) * balls.count/2;

const template = () => `
<svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" style="background-color: ${COLOR_PRIMARY};" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="gooey">
      <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="filt" />
      <feBlend in2="filt" in="SourceGraphic" result="mix" />
    </filter>
  </defs>
  <g>
    <g font-size="15.501" fill="#c8ced9">
      <path d="M538.344 204.401v-2.982h2.982v2.982zm-2.948 26.632v-2.982h-2.947v-2.948h2.947v2.948h2.948v-17.755h-2.948v-2.947h5.93v20.702h-2.982v2.982zM559.08 225.103v-2.947h-2.982v-2.982h2.982v-8.878h-8.877v-2.947h11.825v17.754zm-8.877-14.807v11.86h-2.982v-11.86zm5.895 11.86v2.947h-5.895v-2.947zM570.905 225.103v-5.93h-2.947v-5.894h-2.983v-5.93h2.983v5.93h2.947v5.895h2.948v-5.895h2.982v-5.93h2.947v5.93h-2.947v5.895h-2.982v5.93zM594.59 225.103v-2.947h-2.983v-2.982h2.982v-8.878h-8.877v-2.947h11.825v17.754zm-8.878-14.807v11.86h-2.982v-11.86zm5.895 11.86v2.947h-5.895v-2.947zM603.467 207.349h11.825v2.947h-11.825zm0 2.947v2.983h-2.982v-2.983zm0 2.983h8.877v2.947h-8.877zm8.877 2.947h2.947v5.93h-2.947zm0 5.93v2.947h-11.86v-2.947zM630.098 213.279v-2.983h-8.877v-2.947h8.877v2.947h2.948v2.983zm-8.877-2.983v11.86h-2.982v-11.86zm8.877 11.86v-2.982h2.948v2.982zm0 0v2.947h-8.877v-2.947zM647.853 213.279v-2.983h-8.877v14.807h-2.982V207.35h11.859v2.947h2.948v2.983zM659.678 204.401v-2.982h2.947v2.982zm-2.948 2.948h5.895v14.807h-2.947v-11.86h-2.948zm5.895 14.807h5.93v2.947h-5.93zM671.503 233.98V207.35h11.859v2.947h2.948v11.86h-2.948v2.947h-8.877v8.878zm11.859-23.684h-8.877v11.86h8.877zM692.24 207.349v-5.93h2.947v5.93h5.93v2.947h-5.93v11.86h-2.948v-11.86h-2.982v-2.947zm2.947 14.807h8.877v2.947h-8.877zM727.748 207.349h8.878v2.947h2.947v8.878h-2.947v2.982h-8.878v-2.982h-2.982v-8.878h2.982zM763.257 198.472h5.895v23.684h2.983v2.947h-5.93V201.42h-2.948zM783.96 204.401v-2.982h2.947v2.982zm-2.948 2.948h5.895v14.807h-2.948v-11.86h-2.947zm5.895 14.807h5.93v2.947h-5.93zM807.644 225.103v-14.807h-8.878v14.807h-2.982V207.35h11.86v2.947h2.947v14.807zM825.398 222.156v-14.807h2.948v17.754H816.52v-2.947h-2.982v-14.807h2.982v14.807zM843.153 225.103v-2.947h-2.983v-2.982h-2.947v-5.895h-2.948v-2.983h-2.982v-2.947h2.982v2.947h2.948v2.983h2.947v-2.983h2.983v-2.947h2.947v2.947h-2.947v2.983h-2.983v5.895h2.983v2.982h2.947v2.947zm-11.86 0v-2.947h2.982v-2.982h2.948v2.982h-2.948v2.947zM869.784 207.349h8.878v2.947h2.947v8.878h-2.947v2.982h-8.878v-2.982h-2.982v-8.878h2.982zM911.188 225.103v-5.93h-2.947v-5.894h2.947v5.895h2.983v-11.825h2.947v11.825h-2.947v5.93zm-5.895 0v-5.93h-2.982V207.35h2.982v11.825h2.948v5.93zM923.048 207.349h8.877v2.947h-8.877zm8.877 2.947h2.948v5.93h-11.825v5.93h-2.982v-11.86h2.982v2.983h8.877zm0 11.86v-2.982h2.948v2.982zm0 0v2.947h-8.877v-2.947zM937.82 225.103v-26.631h2.982v8.877h8.878v2.947h2.947v11.86h-2.947v2.947zm11.86-14.807h-8.878v11.86h8.878z" style="line-height:1.25;"/>
    </g>
    <g font-size="43.574" stroke-width="1.089">
      <g aria-label="Akshay" style="line-height:1.25;" fill="#d8dee9">
        <path d="M514.97 163.88v-24.954h-24.954v24.955h-8.383v-58.195h8.383v24.955h24.954v-24.955h-24.954v-8.383h24.954v8.383h8.286v58.195zM564.88 163.88v-8.285h-8.384v-8.383h-16.571v16.669h-8.383V89.017h8.383v49.91h8.286v-8.286h8.285v-8.383h8.383v-8.286h8.286v8.286h-8.286v8.383h-8.383v16.571h8.383v8.383h8.286v8.286zM589.834 113.972h33.24v8.286h-33.24zm0 8.286v8.383h-8.383v-8.383zm0 8.383h24.954v8.285h-24.954zm24.954 8.285h8.286v16.67h-8.286zm0 16.67v8.285h-33.337v-8.286zM664.698 163.88v-41.622h-24.955v41.623h-8.383V89.017h8.383v24.955h24.955v8.286h8.285v41.623zM714.607 163.88v-8.285h-8.384v-8.383h8.384v-24.954h-24.955v-8.286h33.24v49.909zm-24.955-41.622v33.337h-8.383v-33.337zm16.571 33.337v8.286h-16.571v-8.286zM764.516 155.595v-41.623h8.285v66.578h-8.285v-16.67H739.56v-8.285h-8.383v-41.623h8.383v41.623zm0 24.955v8.285H739.56v-8.285z"/>
      </g>
      <g aria-label="Nair" style="line-height:1.25;-inkscape-font-specification:CozetteVector" fill="#58c9b9">
        <path d="M866.51 163.88v-8.285h-8.382v-16.669h-8.286v-16.668h-8.286v41.623h-8.383V97.303h8.383v8.383h8.286v16.572h8.286v16.668h8.383V97.303h8.285v66.578zM916.42 163.88v-8.285h-8.383v-8.383h8.383v-24.954h-24.955v-8.286h33.24v49.909zm-24.955-41.622v33.337h-8.383v-33.337zm16.572 33.337v8.286h-16.572v-8.286zM949.66 105.686v-8.383h8.286v8.383zm-8.286 8.286h16.572v41.623h-8.286v-33.337h-8.286zm16.572 41.623h16.668v8.286h-16.668zM1016.238 130.64v-8.382h-24.955v41.623H982.9v-49.91h33.338v8.287h8.285v8.383z"/>
      </g>
    </g>
  </g>
  
  <g style="filter: url('#gooey');">
    ${Array(balls.count)
      .fill(null)
      .map((_, i) => `<circle
        cx="${balls.startX + i * (balls.size + balls.spacing)}"
        cy="${height - balls.fromBottom - balls.size}"
        class="ball"
      />`)
      .join('')}
  </g>

  <style>
    @keyframes ballend {
      0% { transform: translateX(0); }
      25% { transform: translateX(40px); }
      50% { transform: translateX(0); }
      100% { transform: translateX(0); }
    }
    @keyframes ballstart {
      0% { transform: translateX(0); }
      50% { transform: translateX(0); }
      75% { transform: translateX(-40px); }
      100% { transform: translateX(0); }
    }

    .ball {
      r: ${balls.size};
      fill: ${COLOR_ACCENT};
    }
    .ball:last-child {
      animation: ballend 1.3s ease-in-out infinite;
    }
    .ball:first-child {
      animation: ballstart 1.3s ease-in-out infinite;
    }
  </style>
</svg>
`.replace(/\s+/g, ' ');

console.log(template());

