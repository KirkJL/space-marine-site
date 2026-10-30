'use strict';

/*
  PROJECT SPACE MARINE — V1
  Fitness command centre
  GitHub Pages / static-first application

  Features:
  - Daily dashboard
  - Workout tracking
  - Progressive overload
  - Muscle recovery scanner
  - Nutrition planning
  - MyFitnessPal check-ins
  - Training history
  - Local backup and restore

  Data is stored locally in the browser.
*/

const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const EX = {
  Monday: [
    ['Brisk walk', 1, '30 min', []]
  ],

  Tuesday: [
    ['Goblet squat', 2, '10', ['quads', 'glutes']],
    ['KB deadlift', 2, '10', ['hamstrings', 'glutes', 'back']],
    ['Single-arm row', 2, '10/side', ['back', 'biceps']],
    ['KB floor press', 2, '10/side', ['chest', 'triceps']],
    ['Farmer carry', 2, '30 sec', ['traps', 'forearms', 'core']],
    ['Dead bug', 2, '8/side', ['core']]
  ],

  Wednesday: [
    ['Brisk walk / cycling', 1, '35 min', []]
  ],

  Thursday: [
    ['KB overhead press', 2, '8/side', ['shoulders', 'triceps']],
    ['KB row', 2, '10/side', ['back', 'biceps']],
    ['KB Romanian deadlift', 2, '12', ['hamstrings', 'glutes']],
    ['Suitcase carry', 2, '30 sec/side', ['traps', 'forearms', 'core']],
    ['Incline push-ups', 2, '8–12', ['chest', 'triceps']],
    ['Side plank', 2, '20 sec/side', ['core']]
  ],

  Friday: [
    ['Recovery / mobility', 1, 'Optional', []]
  ],

  Saturday: [
    ['Bench press', 2, '6–10', ['chest', 'triceps', 'shoulders']],
    ['Incline DB press', 2, '8–12', ['chest', 'triceps', 'shoulders']],
    ['Seated shoulder press', 2, '8–12', ['shoulders', 'triceps']],
    ['Lat pulldown', 2, '8–12', ['back', 'biceps']],
    ['Lateral raise', 2, '12–15', ['shoulders']],
    ['DB shrugs', 2, '10–15', ['traps', 'forearms']],
    ['Triceps pushdown', 2, '10–15', ['triceps']],
    ['DB curl', 2, '10–15', ['biceps']]
  ],

  Sunday: [
    ['Leg press', 2, '8–12', ['quads', 'glutes']],
    ['Romanian deadlift', 2, '8–10', ['hamstrings', 'glutes', 'back']],
    ['Leg curl', 2, '10–15', ['hamstrings']],
    ['Chest-supported row', 2, '8–12', ['back', 'biceps']],
    ['Reverse pec deck', 2, '12–15', ['shoulders', 'back']],
    ['Calf raise', 2, '12–15', ['calves']],
    ['Farmer carry', 2, '30 sec', ['traps', 'forearms', 'core']],
    ['Cable crunch', 2, '10–15', ['core']]
  ]
};

/*
  Nutritional values per 100 g:
  [calories, protein, carbohydrates, fat]

  Generic estimates; confirm product labels.
*/

const FOOD = {
  oats: [389, 16.9, 66.3, 6.9],
  blueberries: [57, 0.7, 14.5, 0.3],
  chicken: [110, 23, 0, 1.5],
  rice: [365, 7.1, 80, 0.7],
  broccoli: [34, 2.8, 7, 0.4],
  mince: [137, 21, 0, 5],
  veg: [45, 2, 8, 0.5],
  oil: [884, 0, 0, 100],
  yogurt: [59, 10, 3.6, 0.4],
  apple: [52, 0.3, 14, 0.2],
  almonds: [579, 21, 22, 50],
  steak: [155, 21, 0, 7.5],
  banana: [89, 1.1, 22.8, 0.3],
  eggs: [143, 12.6, 0.7, 9.5],
  sourdough: [250, 9, 49, 1.5],
  superman: [324, 54.4, 16.8, 3.6],
  whey: [370, 66.7, 12, 5]
};

const NAMES = {
  oats: 'Oats',
  blueberries: 'Blueberries',
  chicken: 'Chicken breast · raw',
  rice: 'Rice · dry',
  broccoli: 'Broccoli',
  mince: '5% beef mince · raw',
  veg: 'Mixed vegetables',
  oil: 'Olive oil',
  yogurt: '0% Greek yoghurt',
  apple: 'Apple',
  almonds: 'Almonds',
  steak: 'Rump steak · raw',
  banana: 'Banana',
  eggs: 'Eggs · edible weight',
  sourdough: 'Sourdough',
  superman: 'Superman Blend · estimated flavour',
  whey: 'Whey 360 · estimated flavour'
};

const BASE = [
  ['10:00', 'Oats', 'oats', 60],
  ['10:00', 'Oats', 'blueberries', 100],
  ['11:30', 'Superman', 'superman', 50],
  ['12:30', 'Lunch', 'chicken', 220],
  ['12:30', 'Lunch', 'rice', 85],
  ['12:30', 'Lunch', 'broccoli', 150],
  ['12:30', 'Lunch', 'oil', 10],
  ['15:30', 'Whey', 'whey', 30],
  ['16:30', 'Snack', 'yogurt', 250],
  ['16:30', 'Snack', 'apple', 150],
  ['19:00', 'Dinner', 'mince', 220],
  ['19:00', 'Dinner', 'rice', 85],
  ['19:00', 'Dinner', 'veg', 200],
  ['19:00', 'Dinner', 'oil', 10],
  ['20:00', 'Snack', 'almonds', 20]
];

const MUSCLES = [
  'chest',
  'shoulders',
  'traps',
  'back',
  'biceps',
  'triceps',
  'forearms',
  'core',
  'quads',
  'hamstrings',
  'glutes',
  'calves'
];

const STORE = 'space_marine_v1';

const today = () => {
  const d = new Date();
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, '0'),
    String(d.getDate()).padStart(2, '0')
  ].join('-');
};

const safe = s => String(s).replace(
  /[&<>"']/g,
  c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c])
);

function load() {
  try {
    const o = JSON.parse(localStorage.getItem(STORE) || '{}');
    return o && typeof o === 'object' ? o : {};
  } catch {
    return {};
  }
}

let db = load();

db.logs ||= {};
db.sessions ||= [];
db.settings ||= {
  calories: 2500,
  protein: 190,
  beerKcal: 244,
  reminders: false
};
db.soreness ||= {};
db.portions ||= {};

let view = 'dashboard';
let selectedDay = DAYS[new Date().getDay()];
let selectedMuscle = 'chest';

function save() {
  try {
    localStorage.setItem(STORE, JSON.stringify(db));
  } catch {
    toast('Storage full. Export your backup.');
  }
}

function toast(s) {
  const el = document.getElementById('toast');
  if (!el) return;

  el.textContent = s;
  el.style.display = 'block';

  clearTimeout(toast.t);

  toast.t = setTimeout(() => {
    el.style.display = 'none';
  }, 3000);
}

function log(d = today()) {
  return db.logs[d] ||= {};
}

function num(v, def = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : def;
}

function fmt(n) {
  return Math.round(n).toLocaleString('en-GB');
}

function meals(day) {
  let m = BASE.map(x => [...x]);

  if (['Saturday', 'Sunday'].includes(day)) {
    m = m.map(x =>
      x[2] === 'mince'
        ? [x[0], x[1], 'steak', 250]
        : x
    );

    m.push(['17:00', 'Training fuel', 'banana', 120]);
  }

  if (day === 'Friday') {
    m = m.map(x =>
      x[2] === 'mince'
        ? [x[0], x[1], 'eggs', 200]
        : x[2] === 'rice' && x[0] === '19:00'
          ? [x[0], x[1], 'sourdough', 100]
          : x
    );
  }

  return m;
}

function quantities(day) {
  return meals(day).map((x, i) =>
    num(db.portions[day + '_' + i], x[3])
  );
}

function totals(day) {
  const z = [0, 0, 0, 0];
  const q = quantities(day);

  meals(day).forEach((x, i) => {
    FOOD[x[2]].forEach((v, j) => {
      z[j] += v * q[i] / 100;
    });
  });

  return z;
}

function progress(value, max) {
  const width = Math.max(
    0,
    Math.min(
      100,
      100 * num(value) / Math.max(1, num(max, 1))
    )
  );

  return `
    <div class="bar">
      <i style="width:${width}%"></i>
    </div>
  `;
}

function header(title, subtitle) {
  return `
    <div class="heading">
      <div>
        <div class="eyebrow">${safe(subtitle)}</div>
        <h2>${safe(title)}</h2>
      </div>
      <span class="pill">
        ${safe(new Date().toLocaleDateString('en-GB', {
          weekday: 'short',
          day: 'numeric',
          month: 'short'
        }))}
      </span>
    </div>
  `;
}

function metric(label, value, unit, target) {
  return `
    <div class="card">
      <div class="label">${label}</div>
      <div class="metric">
        ${value}<span> ${unit}</span>
      </div>
      ${
        target !== undefined
          ? progress(
              Number(String(value).replace(/,/g, '')),
              target
            )
          : ''
      }
    </div>
  `;
}

function lastSession(ex) {
  return [...db.sessions]
    .reverse()
    .find(x => x.exercise === ex);
}

function status(ex) {
  const s = lastSession(ex);

  if (!s) return 'NO HISTORY';

  return s.recommendation || 'HOLD';
}

/* ==========================================================
   DASHBOARD
========================================================== */

function dashboard() {
  const d = log();
  const protein = num(d.protein);
  const cal = num(d.calories);
  const water = num(d.water);
  const steps = num(d.steps);

  const day = DAYS[new Date().getDay()];
  const rec = recovery();

  return header('COMMAND CENTRE', 'TODAY // MISSION OVERVIEW') + `
    <div class="grid cols4">
      ${metric(
        'Energy intake',
        cal || '—',
        '/ ' + db.settings.calories + ' kcal',
        db.settings.calories
      )}

      ${metric(
        'Protein',
        protein || '—',
        '/ ' + db.settings.protein + ' g',
        db.settings.protein
      )}

      ${metric('Hydration', water || '—', 'litres', 3)}
      ${metric('Steps', steps || '—', 'steps', 8000)}
    </div>

    <div class="spacer"></div>

    <div class="grid cols2">
      <section class="card">
        <h3>TODAY'S MISSION // ${day.toUpperCase()}</h3>

        <div class="stack">
          ${EX[day].slice(0, 5).map(x => `
            <div class="row">
              <span>${safe(x[0])}</span>
              <span class="pill">${x[1]} × ${x[2]}</span>
            </div>
          `).join('')}
        </div>

        <p class="fine">
          ${EX[day].length} prescribed movements.
          Progress by performance, not calendar.
        </p>

        <button class="btn primary" data-go="training">
          OPEN TRAINING HUD →
        </button>
      </section>

      <section class="card">
        <h3>BODY SCAN // ESTIMATED READINESS</h3>

        <div class="grid cols2">
          ${MUSCLES.slice(0, 8).map(m => `
            <div>
              <div class="row">
                <span class="label">${m}</span>
                <span class="fine">${rec[m].label}</span>
              </div>

              ${progress(rec[m].score, 100)}
            </div>
          `).join('')}
        </div>

        <p class="fine">
          Heuristic estimate, not a measurement of tissue repair.
          Soreness and performance matter.
        </p>

        <button class="btn" data-go="recovery">
          OPEN BODY SCAN →
        </button>
      </section>
    </div>

    <div class="spacer"></div>

    <div class="card">
      <h3>DAILY CHECK-IN // MYFITNESSPAL TOTALS</h3>

      ${checkinFields(d)}

      <p class="fine">
        Enter daily totals from MyFitnessPal.
        Include beer calories there; the beer field is for
        visibility, not double counting.
      </p>

      <button class="btn primary" id="save-checkin">
        SAVE CHECK-IN
      </button>
    </div>
  `;
}

function checkinFields(d) {
  const fields = [
    ['calories', 'Calories (kcal)'],
    ['protein', 'Protein (g)'],
    ['weight', 'Weight (kg)'],
    ['sleep', 'Sleep (hours)'],
    ['steps', 'Steps'],
    ['water', 'Water (L)'],
    ['beer', 'Beer (pints)'],
    ['energy', 'Energy 1–5']
  ];

  return `
    <div class="fields">
      ${fields.map(([k, label]) => `
        <div>
          <label for="c-${k}">${label}</label>

          <input
            id="c-${k}"
            type="number"
            min="0"
            max="${k === 'steps' ? 100000 : 10000}"
            step="${
              ['weight', 'sleep', 'water', 'beer'].includes(k)
                ? '.1'
                : '1'
            }"
            value="${d[k] ?? ''}"
          >
        </div>
      `).join('')}
    </div>
  `;
}

/* ==========================================================
   TRAINING
========================================================== */

function dayTabs() {
  return `
    <div class="daytabs">
      ${
        [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ].map(d => `
          <button
            class="${d === selectedDay ? 'active' : ''}"
            data-day="${d}"
          >
            ${d.slice(0, 3)}
          </button>
        `).join('')
      }
    </div>
  `;
}

function training() {
  const ex = EX[selectedDay];

  return header(
    'TRAINING PROTOCOL',
    'INTELLIGENT OVERLOAD // RIR'
  ) + dayTabs() + `
    <div class="notice">
      Week 1–2: two working sets. Add a third set gradually
      as recovery allows.

      Progress only after all prescribed sets reach the top
      of the rep range with at least 2 reps in reserve and
      clean technique.

      For time-based exercises, record duration in the reps field.
    </div>

    <div class="spacer"></div>

    <div class="stack">
      ${ex.map((e, i) => {
        const prev = lastSession(e[0]);

        return `
          <section class="card">
            <div class="row">
              <div>
                <div class="eyebrow">
                  MOVEMENT ${String(i + 1).padStart(2, '0')}
                </div>

                <h3>${safe(e[0])}</h3>
              </div>

              <span class="pill ${
                status(e[0]) === 'PROGRESS' ? 'good' : ''
              }">
                ${safe(status(e[0]))}
              </span>
            </div>

            <p class="fine">
              TARGET: ${e[1]} × ${safe(e[2])}
              · ${e[3].join(', ') || 'Cardio / recovery'}

              <br>

              PREVIOUS:
              ${
                prev
                  ? prev.sets.map(
                      s => s.kg + 'kg × ' + s.reps
                    ).join(' / ')
                  : 'No session recorded'
              }
            </p>

            <div class="sets" id="sets-${i}">
              ${
                Array.from(
                  { length: e[1] },
                  (_, j) => `
                    <div class="setrow">
                      <strong>${j + 1}</strong>

                      <label>
                        <span>KG</span>
                        <input
                          type="number"
                          min="0"
                          max="1000"
                          step=".5"
                          data-field="kg"
                          value="${prev?.sets?.[j]?.kg ?? ''}"
                        >
                      </label>

                      <label>
                        <span>REPS / MIN</span>
                        <input
                          type="number"
                          min="0"
                          max="1000"
                          step="1"
                          data-field="reps"
                          value="${prev?.sets?.[j]?.reps ?? ''}"
                        >
                      </label>

                      <label>
                        <span>EFFORT (RIR)</span>

                        <select data-field="rir">
                          <option value="4">Easy · 4+</option>
                          <option value="3">Comfortable · 3</option>
                          <option value="2" selected>
                            Challenging · 2
                          </option>
                          <option value="1">Hard · 1</option>
                          <option value="0">Maximum · 0</option>
                        </select>
                      </label>

                      <label class="fine">
                        <span>Technique</span>

                        <select data-field="technique">
                          <option value="clean">Clean</option>
                          <option value="poor">Needs work</option>
                        </select>
                      </label>
                    </div>
                  `
                ).join('')
              }
            </div>

            <div class="spacer"></div>

            <button
              class="btn primary"
              data-save-ex="${i}"
            >
              COMPLETE EXERCISE
            </button>

            <p class="fine" id="result-${i}"></p>
          </section>
        `;
      }).join('')}
    </div>
  `;
}

function recordExercise(i) {
  const ex = EX[selectedDay][i];
  const root = document.getElementById('sets-' + i);

  const rows = [...root.querySelectorAll('.setrow')];

  const sets = rows.map(row => {
    const get = k =>
      row.querySelector('[data-field="' + k + '"]');

    return {
      kg: num(get('kg').value),
      reps: num(get('reps').value),
      rir: num(get('rir').value),
      technique: get('technique').value
    };
  });

  if (sets.some(s => s.reps <= 0)) {
    toast('Enter completed reps / minutes for every set.');
    return;
  }

  const old = lastSession(ex[0]);

  // Identify the top of the prescribed repetition range.
  const numbers = [...String(ex[2]).matchAll(/\d+/g)]
    .map(x => Number(x[0]));

  const upper = numbers.length
    ? Math.max(...numbers)
    : null;

  // Time-based movements are not evaluated using
  // standard repetition-based overload rules.
  const timeBased = /sec|min|optional/i.test(ex[2]);

  const good =
    !timeBased &&
    upper !== null &&
    sets.every(s =>
      s.reps >= upper &&
      s.rir >= 2 &&
      s.technique === 'clean'
    );

  // Compare total reps only when the exercise has
  // a previous session and the loads are comparable.
  const comparable =
    old &&
    old.sets.length === sets.length &&
    old.sets.every((s, j) =>
      Math.abs(s.kg - sets[j].kg) < 0.01
    );

  const previousReps = comparable
    ? old.sets.reduce((a, s) => a + s.reps, 0)
    : 0;

  const currentReps = sets.reduce(
    (a, s) => a + s.reps,
    0
  );

  const decline =
    comparable &&
    previousReps > 0 &&
    currentReps < previousReps * 0.85;

  const recommendation = good
    ? 'PROGRESS'
    : decline
      ? 'REVIEW RECOVERY'
      : 'BUILD / HOLD';

  db.sessions.push({
    id: crypto.randomUUID?.() || String(Date.now()),
    date: new Date().toISOString(),
    day: selectedDay,
    exercise: ex[0],
    muscles: ex[3],
    sets,
    recommendation
  });

  save();

  document.getElementById('result-' + i).textContent =
    good
      ? 'READY TO PROGRESS: increase by the smallest practical increment next time.'
      : decline
        ? 'Performance down >15% versus the previous comparable session. Review sleep, soreness and technique.'
        : 'Maintain load; build clean reps within the prescribed range.';

  toast('Session recorded · ' + recommendation);
}

/* ==========================================================
   MUSCLE RECOVERY ENGINE
========================================================== */

function recovery() {
  const out = {};

  for (const m of MUSCLES) {
    const recent = db.sessions.filter(s =>
      Array.isArray(s.muscles) &&
      s.muscles.includes(m)
    );

    let score = 100;
    const latest = recent.at(-1);

    if (latest && latest.sets.length) {
      const hours = Math.max(
        0,
        (
          Date.now() -
          new Date(latest.date).getTime()
        ) / 3600000
      );

      const sets = recent
        .filter(s =>
          Date.now() - new Date(s.date).getTime()
          < 72 * 3600000
        )
        .reduce(
          (n, s) => n + s.sets.length,
          0
        );

      const avg = latest.sets.reduce(
        (n, s) => n + (4 - s.rir),
        0
      ) / latest.sets.length;

      const fatigue = Math.min(
        85,
        sets * 5 + avg * 6
      );

      score = Math.round(
        100 - fatigue * Math.exp(-hours / 36)
      );
    }

    const soreness = num(db.soreness[m], 0);

    score = Math.min(
      score,
      100 - soreness * 18
    );

    const label =
      !latest && !soreness
        ? 'UNKNOWN'
        : score >= 80
          ? 'READY'
          : score >= 60
            ? 'RECOVERING'
            : score >= 40
              ? 'FATIGUED'
              : 'HIGH FATIGUE';

    out[m] = {
      score,
      label,
      latest,
      soreness
    };
  }

  return out;
}

/* ==========================================================
   ANATOMICAL BODY SCANNER
========================================================== */

function bodySvg(back) {
  const torso = back ? 'back' : 'front';

  const shapes = back
    ? [
        [
          'traps',
          'M85 44 L115 33 L145 44 L130 68 L100 68Z'
        ],
        [
          'shoulders',
          'M62 52 Q42 56 38 87 L63 104 L85 69Z M145 69 L167 52 Q188 56 192 87 L167 104Z'
        ],
        [
          'back',
          'M85 69 L145 69 L157 165 L73 165Z'
        ],
        [
          'triceps',
          'M40 93 L63 108 L57 150 L35 141Z M167 108 L190 93 L195 141 L173 150Z'
        ],
        [
          'forearms',
          'M35 145 L57 153 L47 216 L24 206Z M173 153 L195 145 L206 206 L183 216Z'
        ],
        [
          'glutes',
          'M73 168 L157 168 L155 214 L115 221 L75 214Z'
        ],
        [
          'hamstrings',
          'M75 218 L111 226 L108 320 L74 313Z M119 226 L155 218 L156 313 L122 320Z'
        ],
        [
          'calves',
          'M74 323 L108 327 L102 408 L78 408Z M122 327 L156 323 L152 408 L128 408Z'
        ]
      ]
    : [
        [
          'traps',
          'M85 43 L115 33 L145 43 L132 62 L98 62Z'
        ],
        [
          'shoulders',
          'M62 52 Q42 56 38 88 L63 103 L84 66Z M146 66 L167 52 Q188 56 192 88 L167 103Z'
        ],
        [
          'chest',
          'M85 66 L113 72 L115 121 L70 117Z M117 72 L145 66 L160 117 L115 121Z'
        ],
        [
          'biceps',
          'M39 93 L63 108 L59 150 L34 142Z M167 108 L191 93 L196 142 L171 150Z'
        ],
        [
          'forearms',
          'M34 147 L58 156 L47 216 L24 207Z M172 156 L196 147 L206 207 L183 216Z'
        ],
        [
          'core',
          'M77 123 L153 123 L150 199 L80 199Z'
        ],
        [
          'quads',
          'M75 216 L111 222 L108 319 L73 311Z M119 222 L155 216 L157 311 L122 319Z'
        ],
        [
          'calves',
          'M73 322 L108 326 L102 408 L78 408Z M122 326 L157 322 L152 408 L128 408Z'
        ]
      ];

  const r = recovery();

  const col = s =>
    s.label === 'UNKNOWN'
      ? '#42545c'
      : s.score >= 80
        ? '#54b68a'
        : s.score >= 60
          ? '#d8b65f'
          : s.score >= 40
            ? '#dc9256'
            : '#d66065';

  return `
    <svg
      class="body-svg"
      viewBox="0 0 230 435"
      role="img"
      aria-label="${torso} muscle recovery map"
    >
      <text
        x="115"
        y="17"
        text-anchor="middle"
        fill="#9cb2b8"
        font-size="12"
        letter-spacing="3"
      >
        ${torso.toUpperCase()}
      </text>

      <circle
        cx="115"
        cy="43"
        r="20"
        fill="#233740"
        stroke="#526d76"
      />

      <path
        d="M98 53 L78 56 L45 70 L24 205 L40 218 L70 112 L77 207 L75 310 L78 415 L104 415 L115 252 L126 415 L152 415 L155 310 L153 207 L160 112 L190 218 L206 205 L185 70 L152 56 L132 53"
        fill="#182a32"
        stroke="#526d76"
        stroke-width="2"
      />

      ${shapes.map(([m, d]) => `
        <path
          data-muscle="${m}"
          class="${selectedMuscle === m ? 'selected' : ''}"
          d="${d}"
          fill="${col(r[m])}"
        >
          <title>${m}: ${r[m].label}</title>
        </path>
      `).join('')}
    </svg>
  `;
}

function recoveryView() {
  const r = recovery();
  const m = r[selectedMuscle];

  return header(
    'ANATOMICAL BODY SCAN',
    'RECOVERY // TRAINING READINESS'
  ) + `
    <div class="grid cols2">
      <div class="card">
        <div class="scan">
          ${bodySvg(false)}
          ${bodySvg(true)}
        </div>

        <div class="legend">
          <span>
            <i class="dot" style="background:#54b68a"></i>
            Ready
          </span>

          <span>
            <i class="dot" style="background:#d8b65f"></i>
            Recovering
          </span>

          <span>
            <i class="dot" style="background:#dc9256"></i>
            Fatigued
          </span>

          <span>
            <i class="dot" style="background:#d66065"></i>
            High fatigue
          </span>

          <span>
            <i class="dot" style="background:#42545c"></i>
            Unknown
          </span>
        </div>

        <p class="fine">
          Tap a muscle on either diagram or choose it from the list.
        </p>
      </div>

      <div class="stack">
        <section class="card">
          <div class="eyebrow">MUSCLE READOUT</div>

          <h2>${selectedMuscle.toUpperCase()}</h2>

          <div class="metric">
            ${m.label === 'UNKNOWN' ? '—' : m.score + '%'}
            <span>estimated readiness</span>
          </div>

          ${progress(m.score, 100)}

          <p class="fine">
            Last trained:
            ${
              m.latest
                ? new Date(m.latest.date).toLocaleString('en-GB')
                : 'No recorded session'
            }
          </p>

          <label for="soreness">Soreness check-in</label>

          <select id="soreness">
            <option value="0" ${m.soreness === 0 ? 'selected' : ''}>
              None
            </option>

            <option value="1" ${m.soreness === 1 ? 'selected' : ''}>
              Mild
            </option>

            <option value="2" ${m.soreness === 2 ? 'selected' : ''}>
              Moderate
            </option>

            <option value="3" ${m.soreness === 3 ? 'selected' : ''}>
              Severe
            </option>
          </select>

          <div class="spacer"></div>

          <button class="btn" id="save-soreness">
            UPDATE BODY SCAN
          </button>
        </section>

        <section class="card">
          <h3>SELECT MUSCLE GROUP</h3>

          <div class="grid cols2">
            ${MUSCLES.map(k => `
              <button
                class="musclebtn ${
                  selectedMuscle === k ? 'active' : ''
                }"
                data-muscle-btn="${k}"
              >
                <span>${k}</span>

                <span>
                  ${
                    r[k].label === 'UNKNOWN'
                      ? '—'
                      : r[k].score + '%'
                  }
                </span>
              </button>
            `).join('')}
          </div>
        </section>
      </div>
    </div>

    <div class="spacer"></div>

    <div class="notice">
      This model estimates fatigue using recent sets, effort,
      elapsed time and soreness.

      The percentage is not a physiological measurement.

      Sharp pain, injury symptoms or persistent weakness
      require assessment, not a recovery score.
    </div>
  `;
}

/* ==========================================================
   NUTRITION
========================================================== */

function nutrition() {
  const ms = meals(selectedDay);
  const q = quantities(selectedDay);
  const t = totals(selectedDay);

  return header(
    'FUEL PROTOCOL',
    'MEAL PLAN // EDITABLE PORTIONS'
  ) + dayTabs() + `
    <div class="grid cols4">
      ${metric(
        'Planned energy',
        fmt(t[0]),
        'kcal',
        db.settings.calories
      )}

      ${metric(
        'Planned protein',
        fmt(t[1]),
        'g',
        db.settings.protein
      )}

      ${metric('Carbohydrates', fmt(t[2]), 'g')}
      ${metric('Fat', fmt(t[3]), 'g')}
    </div>

    <div class="spacer"></div>

    <div class="stack">
      ${ms.map((x, i) => {
        const f = FOOD[x[2]];
        const v = q[i];

        return `
          <div class="meal row">
            <div>
              <div class="eyebrow">
                ${x[0]} // ${safe(x[1])}
              </div>

              <strong>${safe(NAMES[x[2]])}</strong>

              <div class="fine">
                ${Math.round(f[0] * v / 100)} kcal
                ·
                ${Math.round(f[1] * v / 100)}g protein
              </div>
            </div>

            <div style="width:125px">
              <label for="food-${i}">Quantity (g)</label>

              <input
                id="food-${i}"
                data-portion="${i}"
                type="number"
                min="0"
                max="2000"
                step="5"
                value="${v}"
              >
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <div class="spacer"></div>

    <div class="notice">
      Nutrition values are generic estimates, not product-label
      guarantees.

      Superman and whey vary by flavour.

      All meat weights are raw; rice is dry.

      Record your actual intake in MyFitnessPal.
    </div>

    <div class="spacer"></div>

    <button class="btn primary" id="save-portions">
      SAVE PORTIONS
    </button>
  `;
}

/* ==========================================================
   HISTORY
========================================================== */

function history() {
  const sessions = [...db.sessions].reverse();
  const dates = Object.keys(db.logs).sort().reverse();

  return header(
    'MISSION INTELLIGENCE',
    'TRAINING HISTORY // PROGRESS'
  ) + `
    <div class="grid cols2">
      <section class="card">
        <h3>RECORDED EXERCISES</h3>

        <div class="stack">
          ${
            sessions.slice(0, 40).map(s => `
              <div class="historyrow">
                <div class="row">
                  <strong>${safe(s.exercise)}</strong>

                  <span class="pill">
                    ${safe(s.recommendation)}
                  </span>
                </div>

                <div class="fine">
                  ${new Date(s.date).toLocaleDateString('en-GB')}
                  ·
                  ${
                    s.sets.map(x =>
                      `${x.kg}kg × ${x.reps} @RIR${x.rir}`
                    ).join(' | ')
                  }
                </div>
              </div>
            `).join('')
            ||
            '<p class="muted">Log your first workout to begin tracking progression.</p>'
          }
        </div>
      </section>

      <section class="card">
        <h3>DAILY CHECK-INS</h3>

        <div class="stack">
          ${
            dates.slice(0, 30).map(k => `
              <div class="historyrow">
                <strong>${safe(k)}</strong>

                <div class="fine">
                  ${num(db.logs[k].calories) || '—'} kcal
                  ·
                  ${num(db.logs[k].protein) || '—'}g protein
                  ·
                  ${num(db.logs[k].weight) || '—'}kg
                  ·
                  ${num(db.logs[k].beer) || 0} pints
                </div>
              </div>
            `).join('')
            ||
            '<p class="muted">No check-ins yet.</p>'
          }
        </div>
      </section>
    </div>
  `;
}

/* ==========================================================
   SETTINGS
========================================================== */

function settings() {
  return header(
    'SYSTEM CONFIGURATION',
    'BACKUP // TARGETS // REMINDERS'
  ) + `
    <div class="grid cols2">
      <section class="card">
        <h3>MISSION PARAMETERS</h3>

        <div class="fields two">
          <div>
            <label for="target-cal">Daily calories</label>

            <input
              id="target-cal"
              type="number"
              min="1000"
              max="6000"
              value="${db.settings.calories}"
            >
          </div>

          <div>
            <label for="target-protein">Daily protein (g)</label>

            <input
              id="target-protein"
              type="number"
              min="40"
              max="350"
              value="${db.settings.protein}"
            >
          </div>
        </div>

        <div class="spacer"></div>

        <button class="btn primary" id="save-settings">
          SAVE TARGETS
        </button>
      </section>

      <section class="card">
        <h3>DATA CONTROL</h3>

        <p class="fine">
          Your logs live in this browser only.
          Clearing site data or switching devices can erase them.
          Export a backup regularly.
        </p>

        <div class="row">
          <button class="btn" id="export-data">
            EXPORT JSON
          </button>

          <label
            class="btn"
            for="import-data"
            style="cursor:pointer;margin:0"
          >
            IMPORT JSON
          </label>

          <input
            id="import-data"
            type="file"
            accept="application/json"
            style="display:none"
          >
        </div>

        <div class="spacer"></div>

        <button class="btn danger" id="clear-data">
          DELETE LOCAL DATA
        </button>
      </section>

      <section class="card">
        <h3>REMINDER STATUS</h3>

        <p class="fine">
          In this static build, reminders appear only while
          the app is open.

          Closed-app scheduled push requires a backend
          and is not included in V1.
        </p>

        <button class="btn" id="notify">
          ${
            db.settings.reminders
              ? 'DISABLE'
              : 'ENABLE'
          }
          IN-APP REMINDERS
        </button>

        <p class="fine">
          10:00 oats · 12:30 lunch · 15:30 shake
          · 19:00 dinner · 21:00 debrief
        </p>
      </section>

      <section class="card">
        <h3>INSTALLATION</h3>

        <p class="fine">
          On Android Chrome, open the deployed HTTPS site
          and select Add to Home screen / Install app.
        </p>

        <p class="fine">
          No accounts or cloud synchronisation in V1.
        </p>
      </section>
    </div>
  `;
}

/* ==========================================================
   APPLICATION RENDERING
========================================================== */

function render() {
  const main = document.getElementById('main');

  if (!main) {
    console.error('Missing #main element in index.html');
    return;
  }

  const pages = {
    dashboard,
    training,
    recovery: recoveryView,
    nutrition,
    history,
    settings
  };

  main.innerHTML = pages[view]();

  document.querySelectorAll('[data-view]').forEach(b => {
    b.classList.toggle(
      'active',
      b.dataset.view === view
    );
  });

  main.querySelectorAll('[data-go]').forEach(b => {
    b.addEventListener('click', () => {
      view = b.dataset.go;
      render();
    });
  });

  main.querySelectorAll('[data-day]').forEach(b => {
    b.addEventListener('click', () => {
      selectedDay = b.dataset.day;
      render();
    });
  });

  main.querySelectorAll('[data-save-ex]').forEach(b => {
    b.addEventListener('click', () => {
      recordExercise(Number(b.dataset.saveEx));
    });
  });

  main.querySelectorAll('[data-muscle-btn]').forEach(b => {
    b.addEventListener('click', () => {
      selectedMuscle = b.dataset.muscleBtn;
      render();
    });
  });

  main.querySelectorAll('[data-muscle]').forEach(b => {
    b.addEventListener('click', () => {
      selectedMuscle = b.dataset.muscle;
      render();
    });
  });

  const click = (id, fn) => {
    const b = document.getElementById(id);
    if (b) b.addEventListener('click', fn);
  };

  /* Daily check-in */

  click('save-checkin', () => {
    const d = log();

    [
      'calories',
      'protein',
      'weight',
      'sleep',
      'steps',
      'water',
      'beer',
      'energy'
    ].forEach(k => {
      const v = document.getElementById('c-' + k).value;

      d[k] = v === ''
        ? null
        : Math.max(0, num(v));
    });

    save();
    toast('Check-in recorded');
    render();
  });

  /* Soreness */

  click('save-soreness', () => {
    db.soreness[selectedMuscle] = num(
      document.getElementById('soreness').value
    );

    save();
    render();
    toast('Scan updated');
  });

  /* Meal portions */

  click('save-portions', () => {
    main.querySelectorAll('[data-portion]').forEach(x => {
      db.portions[
        selectedDay + '_' + x.dataset.portion
      ] = Math.max(
        0,
        Math.min(2000, num(x.value))
      );
    });

    save();
    render();
    toast('Portions saved');
  });

  /* Targets */

  click('save-settings', () => {
    db.settings.calories = Math.max(
      1000,
      Math.min(
        6000,
        num(
          document.getElementById('target-cal').value,
          2500
        )
      )
    );

    db.settings.protein = Math.max(
      40,
      Math.min(
        350,
        num(
          document.getElementById('target-protein').value,
          190
        )
      )
    );

    save();
    render();
    toast('Targets saved');
  });

  /* Export */

  click('export-data', () => {
    const blob = new Blob(
      [JSON.stringify(db, null, 2)],
      { type: 'application/json' }
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = 'space-marine-backup-' + today() + '.json';
    a.click();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  /* Import */

  const imp = document.getElementById('import-data');

  if (imp) {
    imp.addEventListener('change', async e => {
      const f = e.target.files[0];

      if (!f || f.size > 2000000) {
        toast('Select a JSON backup under 2 MB');
        return;
      }

      try {
        const o = JSON.parse(await f.text());

        if (
          !o ||
          !Array.isArray(o.sessions) ||
          !o.logs ||
          typeof o.logs !== 'object' ||
          !o.settings ||
          typeof o.settings !== 'object'
        ) {
          throw new Error('Invalid backup');
        }

        if (!confirm(
          'Replace all current local data with this backup?'
        )) {
          return;
        }

        db = o;
        db.soreness ||= {};
        db.portions ||= {};

        save();
        render();
        toast('Backup restored');
      } catch {
        toast('Invalid backup file');
      }
    });
  }

  /* Delete */

  click('clear-data', () => {
    if (confirm(
      'Permanently delete all local logs? Export a backup first.'
    )) {
      localStorage.removeItem(STORE);
      location.reload();
    }
  });

  /* Reminders */

  click('notify', () => {
    db.settings.reminders = !db.settings.reminders;

    save();
    render();

    toast(
      'In-app reminders ' +
      (db.settings.reminders ? 'enabled' : 'disabled')
    );
  });
}

/* ==========================================================
   NAVIGATION
========================================================== */

document.querySelectorAll('[data-view]').forEach(b => {
  b.addEventListener('click', () => {
    view = b.dataset.view;
    render();
  });
});

/* ==========================================================
   CLOCK
========================================================== */

function clock() {
  const el = document.getElementById('clock');

  if (!el) return;

  el.textContent = new Date().toLocaleTimeString(
    'en-GB',
    {
      hour: '2-digit',
      minute: '2-digit'
    }
  );
}

clock();

setInterval(clock, 30000);

/* ==========================================================
   IN-APP REMINDERS
========================================================== */

const reminderTimes = {
  '10:00': 'Protein oats check-in',
  '12:30': 'Lunch check-in',
  '15:30': 'Protein shake check-in',
  '19:00': 'Dinner check-in',
  '21:00': 'Daily debrief: log MFP totals'
};

let lastReminder = '';

setInterval(() => {
  if (!db.settings.reminders) return;

  const now = new Date();
  const key = now.toTimeString().slice(0, 5);
  const stamp = today() + key;

  if (
    reminderTimes[key] &&
    stamp !== lastReminder
  ) {
    lastReminder = stamp;
    toast(reminderTimes[key]);
  }
}, 30000);

/* ==========================================================
   SERVICE WORKER
========================================================== */

if (
  'serviceWorker' in navigator &&
  location.protocol === 'https:'
) {
  navigator.serviceWorker
    .register('./sw.js')
    .catch(err => {
      console.warn('Service worker registration failed:', err);
    });
}

/* ==========================================================
   START APPLICATION
========================================================== */

render();
