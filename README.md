# Widgets para Notion

Widgets gratis, sin cuentas ni inicio de sesión. Son páginas web simples que se insertan en Notion con `/embed`.

## Horario del día
- `horario/editor.html`: escribís tu horario (un bloque por línea, ej. `08:00-09:30 Gimnasio`), elegís orden, tema y color, y copiás el link.
- `horario/index.html`: el widget. Muestra la tarea actual al centro y las demás translúcidas. Se puede scrollear y vuelve solo a la tarea actual.
- Para probar a otra hora: agregá `?now=14:30` al link (y `&day=1` para lunes, 0 = domingo).

## Usarlo en Notion
1. Abrí el editor: https://emiliano-nunez.github.io/fluent-day/horario/editor.html
2. Armá tu horario y tocá "Copiar link".
3. En Notion escribí `/embed`, pegá el link y ajustá el tamaño del bloque.
