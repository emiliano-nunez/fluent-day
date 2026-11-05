// Utilidades comunes: guardar la configuración dentro del link (#data=...)
// y aplicar tema, fondo y color de acento.
const W = {
  ACCENTS: {
    azul: "#2383e2",
    verde: "#2f9e6a",
    naranja: "#d9730d",
    violeta: "#9065b0",
    rosa: "#c14c8a",
    rojo: "#e03e3e",
    amarillo: "#cb912f",
    gris: "#9b9a97",
  },

  encode(obj) {
    const bytes = new TextEncoder().encode(JSON.stringify(obj));
    let bin = "";
    bytes.forEach((b) => (bin += String.fromCharCode(b)));
    return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  },

  decode(str) {
    try {
      let s = str.replace(/-/g, "+").replace(/_/g, "/");
      while (s.length % 4) s += "=";
      const bytes = Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
      return JSON.parse(new TextDecoder().decode(bytes));
    } catch (e) {
      return null;
    }
  },

  hashData() {
    const m = location.hash.match(/data=([^&]+)/);
    return m ? W.decode(m[1]) : null;
  },

  query(name) {
    return new URLSearchParams(location.search).get(name);
  },

  applyLook(o) {
    const root = document.documentElement;
    if (o.theme === "light" || o.theme === "dark") root.dataset.theme = o.theme;
    else delete root.dataset.theme;
    root.dataset.bg = o.bg === "transparent" ? "transparent" : "solid";
    root.style.setProperty("--accent", W.ACCENTS[o.accent] || W.ACCENTS.azul);
  },
};
