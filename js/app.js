(() => {
  'use strict';

  const STORAGE_KEY = 'climb-plans-v1';

  const PREFECTURES = [
    '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
    '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
    '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
    '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
    '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
    '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
    '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
  ];

  const EQUIPMENT = [
    '登山靴', 'ザック', 'レインウェア', '防寒着', '帽子', '手袋',
    'ヘッドランプ', '予備電池', '地図', 'コンパス', 'スマホ／GPS', 'モバイルバッテリー',
    '救急セット', '常備薬', 'ツェルト', 'ホイッスル', '熊鈴', '水筒',
    '日焼け止め', '健康保険証', '現金', 'トイレットペーパー', 'ゴミ袋', 'ストック',
  ];

  // ---------- storage ----------
  function loadPlans() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const data = raw ? JSON.parse(raw) : [];
      return Array.isArray(data) ? data : [];
    } catch (e) {
      return [];
    }
  }

  function savePlans() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
      return true;
    } catch (e) {
      return false;
    }
  }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  function emptyPlan() {
    return {
      id: uid(),
      updatedAt: new Date().toISOString(),
      mountain: '', prefecture: '', style: '日帰り', area: '',
      dateStart: '', dateEnd: '', dateReserve: '',
      trailhead: '', access: '', purpose: '',
      members: [{ role: 'リーダー', name: '', age: '', gender: '', phone: '', emergencyName: '', emergencyPhone: '' }],
      route: [
        { day: 1, place: '', elevation: '', time: '', note: '' },
        { day: 1, place: '', elevation: '', time: '', note: '' },
      ],
      distance: '', gainUp: '', gainDown: '', hours: '',
      bodyWeight: '', packWeight: '', water: '',
      foods: [
        { type: '行動食', name: '', qty: 1, kcal: '' },
        { type: '非常食', name: '', qty: 1, kcal: '' },
      ],
      equipment: ['登山靴', 'ザック', 'レインウェア', '防寒着', 'ヘッドランプ', '地図', '救急セット', '水筒'],
      equipmentOther: '',
      escape: '', submitTo: '', insurance: '', notes: '',
    };
  }

  function samplePlan() {
    return Object.assign(emptyPlan(), {
      mountain: '北岳', prefecture: '山梨県', style: '山小屋泊', area: '南アルプス',
      dateStart: '2026-10-10', dateEnd: '2026-10-11', dateReserve: '2026-10-12',
      trailhead: '広河原', access: 'JR甲府駅から山梨交通バスで広河原へ',
      purpose: '日本第2位の高峰・北岳に登頂する',
      members: [
        { role: 'リーダー', name: '山田 太郎', age: 42, gender: '男', phone: '090-1234-5678', emergencyName: '山田 花子（妻）', emergencyPhone: '090-8765-4321' },
        { role: 'メンバー', name: '佐藤 次郎', age: 38, gender: '男', phone: '080-1111-2222', emergencyName: '佐藤 一郎（父）', emergencyPhone: '03-0000-0000' },
      ],
      route: [
        { day: 1, place: '広河原', elevation: 1520, time: '07:00', note: '登山届提出' },
        { day: 1, place: '白根御池小屋', elevation: 2236, time: '10:00', note: '水場' },
        { day: 1, place: '小太郎尾根分岐', elevation: 2800, time: '12:30', note: '' },
        { day: 1, place: '北岳肩の小屋', elevation: 3000, time: '13:30', note: '宿泊' },
        { day: 2, place: '北岳肩の小屋', elevation: 3000, time: '05:30', note: '' },
        { day: 2, place: '北岳山頂', elevation: 3193, time: '06:30', note: '' },
        { day: 2, place: '北岳肩の小屋', elevation: 3000, time: '07:20', note: '' },
        { day: 2, place: '白根御池小屋', elevation: 2236, time: '09:40', note: '' },
        { day: 2, place: '広河原', elevation: 1520, time: '11:40', note: '下山' },
      ],
      distance: 12.4,
      bodyWeight: 62, packWeight: 9, water: 2,
      foods: [
        { type: '食事', name: 'おにぎり', qty: 2, kcal: 180 },
        { type: '行動食', name: 'ナッツ・ドライフルーツ', qty: 2, kcal: 250 },
        { type: '行動食', name: 'エネルギーバー', qty: 3, kcal: 200 },
        { type: '行動食', name: 'ようかん', qty: 2, kcal: 170 },
        { type: '非常食', name: 'アルファ米', qty: 1, kcal: 370 },
        { type: '非常食', name: 'チョコレート', qty: 2, kcal: 280 },
      ],
      equipment: ['登山靴', 'ザック', 'レインウェア', '防寒着', '帽子', '手袋', 'ヘッドランプ', '予備電池', '地図', 'コンパス', 'スマホ／GPS', '救急セット', 'ツェルト', '水筒', '健康保険証'],
      equipmentOther: 'ストック、サングラス',
      escape: '悪天候・体調不良時は白根御池小屋から広河原へ引き返す',
      submitTo: '山梨県警察（コンパス）、家族',
      insurance: '〇〇山岳保険',
      notes: '小屋は事前予約済み。雷予報の場合は山頂アタックを中止。',
    });
  }

  // ---------- helpers ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function esc(v) {
    return String(v == null ? '' : v)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function num(v) {
    if (v === '' || v == null) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }

  function fmt(n, digits = 0) {
    if (n == null || !Number.isFinite(n)) return '—';
    return n.toLocaleString('ja-JP', { maximumFractionDigits: digits, minimumFractionDigits: digits });
  }

  function toMinutes(t) {
    if (!t || !/^\d{1,2}:\d{2}/.test(t)) return null;
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  }

  function fmtHours(h) {
    if (h == null) return '—';
    const total = Math.round(h * 60);
    return `${Math.floor(total / 60)}時間${String(total % 60).padStart(2, '0')}分`;
  }

  function fmtDate(d) {
    if (!d) return '';
    const dt = new Date(d + 'T00:00:00');
    if (Number.isNaN(dt.getTime())) return d;
    const w = '日月火水木金土'[dt.getDay()];
    return `${dt.getFullYear()}年${dt.getMonth() + 1}月${dt.getDate()}日(${w})`;
  }

  function dateRange(p) {
    if (!p.dateStart) return '未定';
    if (!p.dateEnd || p.dateEnd === p.dateStart) return fmtDate(p.dateStart);
    return `${fmtDate(p.dateStart)} 〜 ${fmtDate(p.dateEnd)}`;
  }

  // ---------- calculations ----------
  function calc(p) {
    const pts = (p.route || []).filter(r => r.place || num(r.elevation) != null || r.time);
    const elevPts = pts.filter(r => num(r.elevation) != null);

    let maxPt = null, minPt = null, autoUp = 0, autoDown = 0;
    elevPts.forEach((r, i) => {
      const e = num(r.elevation);
      if (!maxPt || e > num(maxPt.elevation)) maxPt = r;
      if (!minPt || e < num(minPt.elevation)) minPt = r;
      if (i > 0) {
        const d = e - num(elevPts[i - 1].elevation);
        if (d > 0) autoUp += d; else autoDown -= d;
      }
    });
    const startElev = elevPts.length ? num(elevPts[0].elevation) : null;
    const maxElev = maxPt ? num(maxPt.elevation) : null;
    const elevDiff = maxPt && minPt ? maxElev - num(minPt.elevation) : null;

    // 行動時間: 日ごとに最初〜最後の時刻
    const byDay = new Map();
    pts.forEach(r => {
      const m = toMinutes(r.time);
      if (m == null) return;
      const day = num(r.day) || 1;
      if (!byDay.has(day)) byDay.set(day, []);
      byDay.get(day).push(m);
    });
    let autoMinutes = 0;
    const dayHours = [];
    Array.from(byDay.keys()).sort((a, b) => a - b).forEach(day => {
      const list = byDay.get(day);
      let mins = 0;
      for (let i = 1; i < list.length; i++) {
        let d = list[i] - list[i - 1];
        if (d < 0) d += 24 * 60;
        mins += d;
      }
      autoMinutes += mins;
      dayHours.push({ day, hours: mins / 60 });
    });
    const autoHours = byDay.size ? autoMinutes / 60 : null;

    const hours = num(p.hours) ?? autoHours;
    const gainUp = num(p.gainUp) ?? (elevPts.length > 1 ? autoUp : null);
    const gainDown = num(p.gainDown) ?? (elevPts.length > 1 ? autoDown : null);
    const distance = num(p.distance);
    const body = num(p.bodyWeight);
    const pack = num(p.packWeight) || 0;
    const mass = body != null ? body + pack : null;

    let burn = null;
    if (mass != null && hours != null) {
      burn = (1.8 * hours + 0.3 * (distance || 0) + 10 * ((gainUp || 0) / 1000) + 0.6 * ((gainDown || 0) / 1000)) * mass;
    }
    const waterNeed = mass != null && hours != null ? 5 * mass * hours : null; // mL

    let intake = 0, emergency = 0;
    (p.foods || []).forEach(f => {
      const k = (num(f.qty) || 0) * (num(f.kcal) || 0);
      if (f.type === '非常食') emergency += k; else intake += k;
    });

    return {
      startElev, maxElev, maxPlace: maxPt ? maxPt.place : '',
      elevDiff, autoUp: elevPts.length > 1 ? autoUp : null, autoDown: elevPts.length > 1 ? autoDown : null,
      autoHours, dayHours, hours, gainUp, gainDown, distance,
      burn, waterNeed, intake, emergency,
      balance: burn != null ? intake - burn : null,
    };
  }

  // ---------- elevation profile ----------
  function profileData(p) {
    const pts = (p.route || []).filter(r => num(r.elevation) != null);
    if (pts.length < 2) return null;
    const timed = pts.every(r => toMinutes(r.time) != null);
    let x = 0;
    const out = pts.map((r, i) => {
      const day = num(r.day) || 1;
      if (i > 0) {
        const prev = pts[i - 1];
        if (!timed) x += 1;
        else if ((num(prev.day) || 1) === day) {
          let d = toMinutes(r.time) - toMinutes(prev.time);
          if (d < 0) d += 24 * 60;
          x += d;
        }
        // 日が変わったら経過時間は前日の到着時点から継続
      }
      return { x, elev: num(r.elevation), place: r.place || '', time: r.time || '', day };
    });
    return { pts: out, timed };
  }

  function niceStep(range) {
    const steps = [50, 100, 200, 250, 500, 1000];
    return steps.find(s => range / s <= 5) || 1000;
  }

  // 文字列の表示幅のおおよその見積もり（全角は1文字=fs、半角は0.6fs）
  function textWidth(str, fs) {
    let w = 0;
    for (const ch of String(str)) w += ch.charCodeAt(0) > 255 ? fs : fs * 0.6;
    return w;
  }

  // 各地点に「地点名・標高」のラベルを付ける。
  // 重なる場合は上下を入れ替え、それでも重なるラベルは省略する（グラフに触れれば確認できる）
  function pointLabels(pts, o) {
    const { sx, sy, W, H, L, R, T, B, compact } = o;
    const narrow = W < 520;
    const fsName = compact ? 9 : narrow ? 10 : 11, fsElev = compact ? 9 : narrow ? 9 : 10, gap = 6;
    const placed = [];
    const hit = (a) => placed.some(b => a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h);

    // 障害物：点・日付ラベル（折れ線の上には文字の縁取りで重ねて読めるようにする）
    pts.forEach(d => placed.push({ x: sx(d.x) - 5, y: sy(d.elev) - 5, w: 10, h: 10 }));
    o.days.forEach(d => placed.push({ x: sx(d.x) + 2, y: H - B - 16, w: 34, h: 14 }));

    // 同じ位置に同じ地点が重なる場合（泊まった小屋など）は1つにまとめる
    const uniq = [];
    pts.forEach(d => {
      if (!uniq.some(u => Math.abs(sx(u.x) - sx(d.x)) < 1 && u.elev === d.elev && u.place === d.place)) uniq.push(d);
    });
    // 最高地点 → 出発・到着 → その他の順に場所を決める
    const topElev = Math.max(...uniq.map(d => d.elev));
    const prio = d => (d.elev === topElev ? 0 : d === uniq[0] || d === uniq[uniq.length - 1] ? 1 : 2);
    const order = uniq.map((d, i) => ({ d, i })).sort((a, b) => prio(a.d) - prio(b.d) || a.i - b.i);

    const out = [];
    order.forEach(({ d, i }) => {
      const name = d.place || '';
      const elev = `${fmt(d.elev)}m`;
      const lines = compact ? [name ? `${name} ${elev}` : elev] : (name ? [name, elev] : [elev]);
      const fsz = compact ? [fsName] : (name ? [fsName, fsElev] : [fsElev]);
      const w = Math.max(...lines.map((t, k) => textWidth(t, fsz[k]))) + 4;
      const h = fsz.reduce((a, f) => a + f * 1.2, 0);
      const px = sx(d.x), py = sy(d.elev);
      // 谷（前後より低い地点）は下側を優先
      const prev = uniq[i - 1], next = uniq[i + 1];
      const valley = (!prev || prev.elev > d.elev) && (!next || next.elev > d.elev) && (prev || next);
      const above = { y: py - gap - h }, below = { y: py + gap };
      const cands = valley ? [below, above] : [above, below];
      // 横位置：点の真上（中央）→ 右寄せ → 左寄せ。縦軸の目盛りには掛からないようにする
      const clampX = x => Math.min(Math.max(x, L + 2), W - R - w + 4);
      const xs = [...new Set([clampX(px - w / 2), clampX(px - 4), clampX(px - w + 4)])];
      const box = cands.flatMap(c => xs.map(x => ({ x, y: c.y, w, h })))
        .find(b => b.y >= 2 && b.y + b.h <= H - B - 2 && !hit(b));
      if (!box) return;
      placed.push(box);
      let y = box.y;
      const spans = lines.map((t, k) => {
        y += fsz[k] * 1.05;
        const cls = compact ? 'ep-pt-name' : (k === 0 && name ? 'ep-pt-name' : 'ep-pt-elev');
        return `<tspan class="${cls}${d.elev === topElev ? ' top' : ''}" x="${(box.x + 2).toFixed(1)}" y="${y.toFixed(1)}" font-size="${fsz[k]}">${esc(t)}</tspan>`;
      }).join('');
      out.push(`<text class="ep-pt">${spans}</text>`);
    });
    return out.join('');
  }

  // 標高グラフ（SVG文字列）。色はCSS変数 --chart-line で指定
  function profileSVG(p, width, compact) {
    const data = profileData(p);
    if (!data) return '<p class="profile-empty">行程に標高を2地点以上入力すると、標高グラフが表示されます。</p>';
    const { pts, timed } = data;
    const W = Math.round(Math.max(320, width || 720));
    // compact: 計画書用に縦を詰めた版（単位は見出しに表示）
    const H = compact ? Math.round(Math.min(Math.max(W * 0.2, 120), 150)) : (W < 520 ? 240 : 270);
    // 上側は最高地点の名前・標高ラベルが入る分を空けておく
    const L = compact ? 40 : 50, R = compact ? 10 : 16, T = compact ? 26 : 46, B = compact ? 20 : 34;
    const elevs = pts.map(d => d.elev);
    let min = Math.min(...elevs), max = Math.max(...elevs);
    const step = niceStep(Math.max(max - min, 1));
    let yMin = Math.floor(min / step) * step;
    let yMax = Math.ceil(max / step) * step;
    if (yMin === yMax) yMax += step;
    const xMax = pts[pts.length - 1].x || 1;
    const sx = v => L + (v / xMax) * (W - L - R);
    const sy = v => T + (1 - (v - yMin) / (yMax - yMin)) * (H - T - B);

    const grid = [];
    for (let v = yMin; v <= yMax; v += step) {
      grid.push(`<line class="ep-grid" x1="${L}" x2="${W - R}" y1="${sy(v)}" y2="${sy(v)}"/>` +
        `<text class="ep-tick" x="${L - 6}" y="${sy(v) + 4}" text-anchor="end">${fmt(v)}</text>`);
    }

    const xt = [];
    if (timed) {
      const maxTicks = Math.max(3, Math.floor((W - L - R) / 56));
      const hStep = [1, 2, 3, 4, 6, 12, 24].find(h => xMax / (h * 60) <= maxTicks) || 24;
      for (let m = 0; m <= xMax + 1; m += hStep * 60) {
        xt.push(`<text class="ep-tick" x="${sx(m)}" y="${H - B + 14}" text-anchor="middle">${m / 60}h</text>`);
      }
    }

    // 日の区切り
    const days = [];
    pts.forEach((d, i) => {
      if (i > 0 && d.day !== pts[i - 1].day) {
        const xx = sx(d.x);
        days.push(`<line class="ep-day" x1="${xx}" x2="${xx}" y1="${T - 8}" y2="${H - B}"/>` +
          // 地点ラベルと重ならないよう、日付ラベルは軸のすぐ上に置く
          `<text class="ep-daylabel" x="${xx + 4}" y="${H - B - 4}">${esc(d.day)}日目</text>`);
      }
    });

    const line = pts.map((d, i) => `${i ? 'L' : 'M'}${sx(d.x).toFixed(1)},${sy(d.elev).toFixed(1)}`).join('');
    const area = `${line}L${sx(xMax)},${H - B}L${sx(0)},${H - B}Z`;
    const dots = pts.map(d => `<circle class="ep-dot" cx="${sx(d.x)}" cy="${sy(d.elev)}" r="4"/>`).join('');

    const labels = pointLabels(pts, { sx, sy, W, H, L, R, T, B, compact, days: pts.filter((d, i) => i > 0 && d.day !== pts[i - 1].day) });

    const hover = pts.map(d => ({ x: sx(d.x), y: sy(d.elev), place: d.place, elev: d.elev, time: d.time, day: d.day }));

    return `<svg class="ep" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="標高グラフ：最低${fmt(min)}m、最高${fmt(max)}m、高低差${fmt(max - min)}m" data-points='${esc(JSON.stringify(hover))}'>
      ${grid.join('')}
      <line class="ep-axis" x1="${L}" x2="${W - R}" y1="${H - B}" y2="${H - B}"/>
      ${xt.join('')}
      ${compact ? '' : `<text class="ep-unit" x="${L - 6}" y="${T - 12}" text-anchor="end">標高(m)</text>`}
      ${timed && !compact ? `<text class="ep-unit" x="${W - R}" y="${H - 4}" text-anchor="end">経過時間</text>` : ''}
      ${days.join('')}
      <path class="ep-area" d="${area}"/>
      <path class="ep-line" d="${line}"/>
      ${dots}
      ${labels}
      <line class="ep-cross" x1="0" x2="0" y1="${T}" y2="${H - B}" visibility="hidden"/>
      <circle class="ep-focus" r="6" visibility="hidden"/>
    </svg><div class="ep-tip" hidden></div>`;
  }

  // ホバーでその地点の名前・標高・時刻を表示
  function attachProfileHover(box) {
    const svg = $('svg.ep', box);
    if (!svg) return;
    const pts = JSON.parse(svg.dataset.points);
    const tip = $('.ep-tip', box), cross = $('.ep-cross', svg), focus = $('.ep-focus', svg);
    const hide = () => { tip.hidden = true; cross.setAttribute('visibility', 'hidden'); focus.setAttribute('visibility', 'hidden'); };
    const move = e => {
      const rect = svg.getBoundingClientRect();
      const vb = svg.viewBox.baseVal;
      const cx = e.clientX !== undefined ? e.clientX : e.touches[0].clientX;
      const x = (cx - rect.left) * (vb.width / rect.width);
      const d = pts.reduce((a, b) => (Math.abs(b.x - x) < Math.abs(a.x - x) ? b : a));
      cross.setAttribute('x1', d.x); cross.setAttribute('x2', d.x); cross.setAttribute('visibility', 'visible');
      focus.setAttribute('cx', d.x); focus.setAttribute('cy', d.y); focus.setAttribute('visibility', 'visible');
      tip.innerHTML = `<b>${esc(d.place || '（地点名なし）')}</b><span>${fmt(d.elev)} m</span>` +
        `<span class="muted">${esc(d.day)}日目${d.time ? ' ' + esc(d.time) : ''}</span>`;
      tip.hidden = false;
      const px = d.x * rect.width / vb.width, py = d.y * rect.height / vb.height;
      const left = Math.min(Math.max(px - tip.offsetWidth / 2, 0), rect.width - tip.offsetWidth);
      tip.style.left = `${left}px`;
      tip.style.top = `${Math.max(py - tip.offsetHeight - 12, 0)}px`;
    };
    svg.addEventListener('pointermove', move);
    svg.addEventListener('pointerdown', move);
    svg.addEventListener('pointerleave', hide);
  }

  function renderProfile(box, p) {
    // 画面幅に合わせて描き直し、スマホでも文字が小さくならないようにする
    // 計画書のグラフは紙の幅（A4・余白10mm＝約718px）で描き、画面では縮小表示する
    const onSheet = box.id === 'profile-sheet';
    box.innerHTML = profileSVG(p, onSheet ? 718 : box.clientWidth, onSheet);
    attachProfileHover(box);
  }

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const p = current();
      if (!p) return;
      ['#profile-edit', '#profile-sheet'].forEach(sel => {
        const box = $(sel);
        if (box && box.offsetParent) renderProfile(box, p);
      });
    }, 150);
  });

  // ---------- state ----------
  let plans = loadPlans();
  let currentId = null;
  const current = () => plans.find(p => p.id === currentId) || null;

  // ---------- view switching ----------
  function show(view) {
    if ((view === 'edit' || view === 'sheet') && !current()) view = 'list';
    $$('.view').forEach(v => { v.hidden = v.id !== `view-${view}`; });
    $$('.tab').forEach(t => {
      const on = t.dataset.view === view;
      t.classList.toggle('active', on);
      t.setAttribute('aria-selected', on);
      t.disabled = (t.dataset.view !== 'list') && !current();
    });
    if (view === 'list') renderList();
    if (view === 'edit') fillForm(current());
    if (view === 'sheet') renderSheet(current());
    window.scrollTo(0, 0);
  }

  // ---------- list ----------
  function renderList() {
    const box = $('#plan-list');
    if (!plans.length) {
      box.innerHTML = '<div class="empty">まだ計画がありません。「＋ 新しい計画」から作成してください。</div>';
      return;
    }
    const sorted = [...plans].sort((a, b) => (b.dateStart || '').localeCompare(a.dateStart || ''));
    box.innerHTML = sorted.map(p => {
      const c = calc(p);
      return `
        <div class="plan-card" data-id="${esc(p.id)}">
          <div class="plan-card-main">
            <div class="plan-date">${esc(dateRange(p))}</div>
            <div class="plan-name">${esc(p.mountain || '（山名未入力）')}</div>
            <div class="plan-meta">${esc(p.prefecture || '都道府県未設定')} ・ ${esc(p.style || '')}</div>
            <div class="plan-stats">
              <span>高低差 <b>${fmt(c.elevDiff)}</b> m</span>
              <span>行動 <b>${c.hours != null ? fmtHours(c.hours) : '—'}</b></span>
              <span>消費 <b>${fmt(c.burn)}</b> kcal</span>
            </div>
          </div>
          <div class="plan-card-actions">
            <button type="button" class="btn small" data-act="edit">編集</button>
            <button type="button" class="btn small" data-act="sheet">計画書</button>
            <button type="button" class="btn small" data-act="dup">複製</button>
          </div>
        </div>`;
    }).join('');
  }

  $('#plan-list').addEventListener('click', e => {
    const btn = e.target.closest('button[data-act]');
    const card = e.target.closest('.plan-card');
    if (!card) return;
    const id = card.dataset.id;
    const act = btn ? btn.dataset.act : 'edit';
    if (act === 'dup') {
      const src = plans.find(p => p.id === id);
      const copy = JSON.parse(JSON.stringify(src));
      copy.id = uid();
      copy.mountain = (copy.mountain || '') + '（コピー）';
      copy.updatedAt = new Date().toISOString();
      plans.push(copy);
      savePlans();
      renderList();
      return;
    }
    currentId = id;
    show(act);
  });

  $('#btn-new').addEventListener('click', () => {
    const p = emptyPlan();
    plans.push(p);
    savePlans();
    currentId = p.id;
    show('edit');
  });

  $('#btn-sample').addEventListener('click', () => {
    const p = samplePlan();
    plans.push(p);
    savePlans();
    renderList();
  });

  $('#btn-export').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(plans, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `climb-plans-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });

  $('#input-import').addEventListener('change', async e => {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      const list = Array.isArray(data) ? data : [data];
      let added = 0;
      list.forEach(item => {
        if (!item || typeof item !== 'object') return;
        const p = Object.assign(emptyPlan(), item);
        if (plans.some(x => x.id === p.id)) p.id = uid();
        plans.push(p);
        added++;
      });
      savePlans();
      renderList();
      alert(`${added}件の計画を読み込みました。`);
    } catch (err) {
      alert('読み込みに失敗しました。JSONファイルを確認してください。');
    }
  });

  // ---------- edit form ----------
  const form = $('#plan-form');

  $('#prefecture').innerHTML = '<option value="">選択してください</option>' +
    PREFECTURES.map(p => `<option>${p}</option>`).join('');

  $('#equipment-checks').innerHTML = EQUIPMENT.map(item =>
    `<label class="check"><input type="checkbox" value="${esc(item)}"> ${esc(item)}</label>`).join('');

  const TABLES = {
    members: { tbody: '#members-table tbody', tpl: '#tpl-member' },
    route: { tbody: '#route-table tbody', tpl: '#tpl-route' },
    foods: { tbody: '#foods-table tbody', tpl: '#tpl-food' },
  };

  function addRow(key, data = {}) {
    const { tbody, tpl } = TABLES[key];
    const row = $(tpl).content.firstElementChild.cloneNode(true);
    $$('[data-field]', row).forEach(el => {
      const v = data[el.dataset.field];
      if (v !== undefined && v !== null) el.value = v;
    });
    $(tbody).appendChild(row);
    return row;
  }

  function readRows(key) {
    return $$(`${TABLES[key].tbody} tr`).map(tr => {
      const obj = {};
      $$('[data-field]', tr).forEach(el => { obj[el.dataset.field] = el.value; });
      return obj;
    });
  }

  function fillForm(p) {
    if (!p) return;
    $('#edit-title').textContent = p.mountain ? `${p.mountain} の計画` : '新しい登山計画';
    $$('input[name], select[name], textarea[name]', form).forEach(el => {
      el.value = p[el.name] ?? '';
    });
    Object.keys(TABLES).forEach(key => {
      $(TABLES[key].tbody).innerHTML = '';
      (p[key] || []).forEach(r => addRow(key, r));
    });
    const eq = new Set(p.equipment || []);
    $$('#equipment-checks input').forEach(cb => { cb.checked = eq.has(cb.value); });
    $('#save-status').textContent = '';
    refreshDerived();
  }

  function readForm() {
    const p = current();
    if (!p) return;
    $$('input[name], select[name], textarea[name]', form).forEach(el => { p[el.name] = el.value; });
    Object.keys(TABLES).forEach(key => { p[key] = readRows(key); });
    p.equipment = $$('#equipment-checks input:checked').map(cb => cb.value);
    p.updatedAt = new Date().toISOString();
  }

  function refreshDerived() {
    const p = current();
    if (!p) return;
    const c = calc(p);

    // 自動計算値をプレースホルダーとして表示
    const autos = { gainUp: c.autoUp, gainDown: c.autoDown, hours: c.autoHours };
    $$('[data-auto]', form).forEach(el => {
      const v = autos[el.dataset.auto];
      el.placeholder = v != null ? `自動: ${fmt(v, el.dataset.auto === 'hours' ? 1 : 0)}` : '自動計算';
    });

    $$('#foods-table tbody tr').forEach(tr => {
      const q = num($('[data-field="qty"]', tr).value) || 0;
      const k = num($('[data-field="kcal"]', tr).value) || 0;
      $('[data-subtotal]', tr).textContent = q * k ? fmt(q * k) : '';
    });

    $('#summary').innerHTML = summaryHTML(c, p);
    renderProfile($('#profile-edit'), p);
  }

  function summaryHTML(c, p) {
    const bal = c.balance;
    const balClass = bal == null ? '' : (bal >= 0 ? 'ok' : 'warn');
    const water = num(p.water);
    const waterClass = c.waterNeed != null && water != null ? (water * 1000 >= c.waterNeed ? 'ok' : 'warn') : '';
    const item = (label, value, unit, cls = '') =>
      `<div class="stat ${cls}"><div class="stat-label">${label}</div><div class="stat-value">${value}<small>${unit}</small></div></div>`;
    return [
      item('最高地点', fmt(c.maxElev), 'm'),
      item('高低差', fmt(c.elevDiff), 'm'),
      item('累積標高 上り/下り', `${fmt(c.gainUp)} / ${fmt(c.gainDown)}`, 'm'),
      item('行動時間', c.hours != null ? fmtHours(c.hours) : '—', ''),
      item('消費カロリー', fmt(c.burn), 'kcal'),
      item('摂取カロリー（計画）', fmt(c.intake), 'kcal'),
      item('差し引き', bal == null ? '—' : (bal > 0 ? '+' : '') + fmt(bal), 'kcal', balClass),
      item('非常食', fmt(c.emergency), 'kcal'),
      item('必要水分 / 持参', `${c.waterNeed != null ? fmt(c.waterNeed / 1000, 1) : '—'} / ${water != null ? fmt(water, 1) : '—'}`, 'L', waterClass),
    ].join('');
  }

  let saveTimer = null;
  function onChange() {
    readForm();
    refreshDerived();
    const p = current();
    $('#edit-title').textContent = p && p.mountain ? `${p.mountain} の計画` : '新しい登山計画';
    clearTimeout(saveTimer);
    $('#save-status').textContent = '保存中…';
    saveTimer = setTimeout(() => {
      $('#save-status').textContent = savePlans() ? '✓ 自動保存しました' : '⚠ 保存できませんでした';
    }, 400);
  }

  form.addEventListener('input', onChange);
  form.addEventListener('change', onChange);
  form.addEventListener('submit', e => e.preventDefault());

  form.addEventListener('click', e => {
    const add = e.target.closest('[data-add]');
    if (add) {
      const key = add.dataset.add;
      let data = {};
      if (key === 'route') {
        const rows = readRows('route');
        const last = rows[rows.length - 1];
        data = { day: last ? last.day : 1 };
      }
      const row = addRow(key, data);
      const first = $('input:not([type=number]), input', row);
      if (first) first.focus();
      onChange();
      return;
    }
    const rm = e.target.closest('[data-remove]');
    if (rm) {
      rm.closest('tr').remove();
      onChange();
    }
  });

  $('#btn-delete').addEventListener('click', () => {
    const p = current();
    if (!p) return;
    if (!confirm(`「${p.mountain || '無題'}」の計画を削除しますか？`)) return;
    plans = plans.filter(x => x.id !== p.id);
    savePlans();
    currentId = null;
    show('list');
  });

  // ---------- sheet ----------
  function renderSheet(p) {
    if (!p) return;
    const c = calc(p);
    const members = (p.members || []).filter(m => m.name || m.phone);
    const route = (p.route || []).filter(r => r.place || r.elevation || r.time);
    const foods = (p.foods || []).filter(f => f.name || f.kcal);
    const equipment = [...(p.equipment || [])];
    if (p.equipmentOther) equipment.push(p.equipmentOther);

    const row = (th, td) => `<tr><th>${th}</th><td colspan="3">${td}</td></tr>`;
    const row2 = (th1, td1, th2, td2) => `<tr><th>${th1}</th><td>${td1}</td><th>${th2}</th><td>${td2}</td></tr>`;
    const dash = v => (v === '' || v == null) ? '—' : esc(v);

    let prevDay = null;
    const routeRows = route.map(r => {
      const dayCell = r.day !== prevDay ? `${esc(r.day)}日目` : '';
      prevDay = r.day;
      return `<tr><td class="c">${dayCell}</td><td>${esc(r.place)}</td><td class="num">${r.elevation !== '' ? fmt(num(r.elevation)) : ''}</td><td class="c">${esc(r.time)}</td><td>${esc(r.note)}</td></tr>`;
    }).join('');

    const foodRows = type => foods.filter(f => (type === '非常食') === (f.type === '非常食')).map(f => {
      const sub = (num(f.qty) || 0) * (num(f.kcal) || 0);
      return `<tr><td>${esc(f.type)}</td><td>${esc(f.name)}</td><td class="num">${esc(f.qty)}</td><td class="num">${f.kcal !== '' ? fmt(num(f.kcal)) : ''}</td><td class="num">${sub ? fmt(sub) : ''}</td></tr>`;
    }).join('');

    const hm = h => { const m = Math.round(h * 60); return `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`; };
    const dayBreakdown = c.dayHours.length > 1
      ? c.dayHours.map(d => `${d.day}日目 ${hm(d.hours)}`).join(' / ') : '';

    $('#sheet').innerHTML = `
      <header class="sheet-head">
        <h2>登山計画書</h2>
        <div class="sheet-created">作成日：${fmtDate(new Date().toISOString().slice(0, 10))}</div>
      </header>

      <table class="kv">
        ${row2('山名', `<strong class="big">${dash(p.mountain)}</strong>${p.area ? `（${esc(p.area)}）` : ''}`, '都道府県', dash(p.prefecture))}
        ${row('登山日', esc(dateRange(p)) + (p.dateReserve ? `　予備日：${esc(fmtDate(p.dateReserve))}` : ''))}
        ${row2('山行形態', dash(p.style), '登山口', dash(p.trailhead))}
        ${row('交通手段', dash(p.access))}
        ${p.purpose ? row('目的', esc(p.purpose)) : ''}
      </table>

      <h3>行程概要</h3>
      <div class="sheet-stats">
        <div><span>最高地点</span><b>${fmt(c.maxElev)} m</b><em>${esc(c.maxPlace)}</em></div>
        <div><span>高低差</span><b>${fmt(c.elevDiff)} m</b></div>
        <div><span>累積標高</span><b>↑${fmt(c.gainUp)} ↓${fmt(c.gainDown)} m</b></div>
        <div><span>歩行距離</span><b>${c.distance != null ? fmt(c.distance, 1) : '—'} km</b></div>
        <div><span>行動時間</span><b>${c.hours != null ? fmtHours(c.hours) : '—'}</b><em>${esc(dayBreakdown)}</em></div>
      </div>

      <h3>標高グラフ <small>縦軸：標高(m)　横軸：経過時間</small></h3>
      <div class="profile" id="profile-sheet"></div>

      <h3>行程表</h3>
      <table class="grid-table">
        <thead><tr><th style="width:4.5em">日程</th><th>地点</th><th style="width:6em">標高(m)</th><th style="width:5.5em">予定時刻</th><th>メモ</th></tr></thead>
        <tbody>${routeRows || '<tr><td colspan="5" class="c">—</td></tr>'}</tbody>
      </table>

      <h3>メンバー（${members.length}名）</h3>
      <table class="grid-table">
        <thead><tr><th>役割</th><th>氏名</th><th>年齢</th><th>性別</th><th>携帯電話</th><th>緊急連絡先</th><th>緊急連絡先電話</th></tr></thead>
        <tbody>${members.map(m => `<tr><td>${esc(m.role)}</td><td>${esc(m.name)}</td><td class="c">${esc(m.age)}</td><td class="c">${esc(m.gender)}</td><td>${esc(m.phone)}</td><td>${esc(m.emergencyName)}</td><td>${esc(m.emergencyPhone)}</td></tr>`).join('') || '<tr><td colspan="7" class="c">—</td></tr>'}</tbody>
      </table>

      <h3>カロリー・水分（1人あたり）</h3>
      <table class="grid-table cal">
        <tbody>
          <tr><th>体重＋荷物</th><td class="num">${num(p.bodyWeight) != null ? `${fmt(num(p.bodyWeight), 1)} ＋ ${fmt(num(p.packWeight) || 0, 1)} kg` : '—'}</td>
              <th>推定消費カロリー</th><td class="num"><b>${fmt(c.burn)} kcal</b></td></tr>
          <tr><th>計画摂取カロリー</th><td class="num"><b>${fmt(c.intake)} kcal</b></td>
              <th>差し引き</th><td class="num">${c.balance == null ? '—' : (c.balance > 0 ? '+' : '') + fmt(c.balance) + ' kcal'}</td></tr>
          <tr><th>非常食カロリー</th><td class="num">${fmt(c.emergency)} kcal</td>
              <th>必要水分 / 持参</th><td class="num">${c.waterNeed != null ? fmt(c.waterNeed / 1000, 1) : '—'} / ${num(p.water) != null ? fmt(num(p.water), 1) : '—'} L</td></tr>
        </tbody>
      </table>

      <div class="two-col">
        <div>
          <h3>食料</h3>
          <table class="grid-table">
            <thead><tr><th>区分</th><th>品名</th><th>数量</th><th>kcal</th><th>計</th></tr></thead>
            <tbody>${foodRows('normal') || '<tr><td colspan="5" class="c">—</td></tr>'}</tbody>
          </table>
        </div>
        <div>
          <h3>非常食</h3>
          <table class="grid-table">
            <thead><tr><th>区分</th><th>品名</th><th>数量</th><th>kcal</th><th>計</th></tr></thead>
            <tbody>${foodRows('非常食') || '<tr><td colspan="5" class="c">—</td></tr>'}</tbody>
          </table>
        </div>
      </div>

      <h3>装備・安全対策</h3>
      <table class="kv">
        ${row('装備', equipment.length ? equipment.map(esc).join('、') : '—')}
        ${row('エスケープルート', dash(p.escape).replace(/\n/g, '<br>'))}
        ${row2('計画書提出先', dash(p.submitTo), '山岳保険', dash(p.insurance))}
        ${p.notes ? row('備考', esc(p.notes).replace(/\n/g, '<br>')) : ''}
      </table>

      <p class="sheet-foot">※ 消費カロリーは山本正嘉氏の推定式、必要水分は 5mL × 体重(荷物込) × 行動時間 による概算です。</p>
    `;
    renderProfile($('#profile-sheet'), p);
  }

  $('#btn-print').addEventListener('click', () => {
    const p = current();
    const prevTitle = document.title;
    if (p) document.title = pdfName(p).replace(/\.pdf$/, '');
    window.print();
    document.title = prevTitle;
  });

  function pdfName(p) {
    const name = `登山計画書_${p.mountain || '無題'}_${p.dateStart || ''}`.replace(/[\\/:*?"<>|]/g, '_');
    return name.replace(/_$/, '') + '.pdf';
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  $('#btn-pdf').addEventListener('click', async () => {
    const p = current();
    if (!p) return;
    const btn = $('#btn-pdf');
    btn.disabled = true;
    btn.textContent = 'PDF作成中…';
    try {
      if (!window.html2pdf) {
        try {
          await loadScript('js/vendor/html2pdf.bundle.min.js');
        } catch (e) {
          await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js');
        }
      }
      const sheet = $('#sheet');
      sheet.classList.add('exporting');
      // PDFの幅（190mm）に合わせてグラフを描き直す
      renderProfile($('#profile-sheet'), p);
      await window.html2pdf().set({
        margin: [10, 10, 10, 10],
        filename: pdfName(p),
        image: { type: 'jpeg', quality: 0.96 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff', scrollX: 0, scrollY: 0 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'], avoid: ['tr', 'h3', '.sheet-stats', '.profile'] },
      }).from(sheet).save();
    } catch (err) {
      alert('PDFの直接作成に失敗しました（オフラインの可能性があります）。印刷ダイアログから「PDFに保存」を選んでください。');
      window.print();
    } finally {
      $('#sheet').classList.remove('exporting');
      renderProfile($('#profile-sheet'), p);
      btn.disabled = false;
      btn.textContent = 'PDFをダウンロード';
    }
  });

  // ---------- navigation ----------
  $$('.tab').forEach(t => t.addEventListener('click', () => show(t.dataset.view)));
  document.addEventListener('click', e => {
    const g = e.target.closest('[data-goto]');
    if (g) show(g.dataset.goto);
  });

  // Ctrl+P などで直接印刷した場合も最新の計画書を出力する
  window.addEventListener('beforeprint', () => { if (current()) renderSheet(current()); });

  show('list');
})();
