// Convierte texto como "08:00-09:30 Gimnasio" en bloques con minutos.
// Formatos aceptados por línea:
//   08:00-09:30 Gimnasio
//   8-9 Gimnasio        8.30 a 9 Gimnasio      8h30 - 9h Gimnasio
//   08:00 Desayuno      (sin hora de fin: dura hasta el bloque siguiente)
// Si la hora de fin es menor que la de inicio (23:00-07:00) se toma como del día siguiente.
const Schedule = {
  LINE: /^\s*(\d{1,2})(?:[:.h](\d{2}))?\s*(?:(?:-|–|—|a|hasta)\s*(\d{1,2})(?:[:.h](\d{2}))?h?)?\s+(.+?)\s*$/i,

  parse(text) {
    const blocks = [];
    const errors = [];
    (text || "").split(/\r?\n/).forEach((raw, i) => {
      if (!raw.trim()) return;
      const m = raw.match(Schedule.LINE);
      const ok = (h, min) => h === undefined || (+h <= 24 && +(min || 0) < 60);
      if (!m || !ok(m[1], m[2]) || !ok(m[3], m[4])) {
        errors.push({ line: i + 1, text: raw.trim() });
        return;
      }
      const s = +m[1] * 60 + +(m[2] || 0);
      const e = m[3] === undefined ? null : +m[3] * 60 + +(m[4] || 0);
      blocks.push({ s, e, t: m[5] });
    });

    blocks.sort((a, b) => a.s - b.s);
    blocks.forEach((b, i) => {
      if (b.e === null) b.e = blocks[i + 1] ? blocks[i + 1].s : b.s + 60;
      if (b.e <= b.s) b.e += 1440;
    });
    return { blocks, errors };
  },

  // Horario de un día (0 = domingo ... 6 = sábado).
  textFor(data, day) {
    if (!data) return "";
    return data.same !== false ? data.all || "" : (data.days || {})[day] || "";
  },

  fmt(min) {
    const m = ((Math.round(min) % 1440) + 1440) % 1440;
    return String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
  },

  dur(min) {
    min = Math.max(0, Math.ceil(min));
    const h = Math.floor(min / 60);
    const m = min % 60;
    if (!h) return m + " min";
    return m ? `${h} h ${m} min` : `${h} h`;
  },
};
