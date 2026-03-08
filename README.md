# Copyright Header

Eine VSCode-Extension, die automatisch Copyright-Header in verschiedenen Programmiersprachen erkennt und hinzufügt.

## Features

✨ **Automatische Dateityp-Erkennung**: Erkennt Programmier-Dateien automatisch anhand der Dateierweiterung

🔍 **Sprachspezifische Kommentare**: Nutzt die richtige Kommentar-Syntax für jede Programmiersprache:

- JavaScript/TypeScript: `/* */`
- Python: `'''`
- Java/C/C++: `/* */`
- Shell Scripts: `#`
- Und viele mehr...

🚫 **Config-Dateien ausgeschlossen**: Ignoriert automatisch Konfigurationsdateien wie:

- `package.json`, `tsconfig.json`, `.eslintrc`
- `dockerfile`, `.env`, `.gitignore`
- Und weitere...

📝 **Automatisches Hinzufügen**: Copyright-Header werden automatisch hinzugefügt wenn:

- Eine neue Code-Datei geöffnet wird
- Eine neue Datei gespeichert wird

## Unterstützte Sprachen

- **Web**: JavaScript, TypeScript, HTML, CSS, SCSS, LESS, Vue, Svelte
- **Backend**: Python, Java, Go, Rust, PHP, Ruby, Kotlin, Scala
- **System**: C, C++, C#, Shell, Bash, Zsh
- **Datenbanken**: SQL
- **Markup**: XML, Markdown
- **Scripting**: Lua, Perl
- **Konfiguration**: YAML, TOML

## Installation

1. Öffne das Projekt in VSCode
2. Installiere Dependencies: `npm install`
3. Starte die Extension im Debug-Modus: Drücke `F5`

## Entwicklung

```bash
# Kompilieren
npm run compile

# Watch Mode
npm run watch

# Testen
npm run test

# Packaging
npm run package
```

## Wie es funktioniert

Die Extension überwacht alle neuen und gespeicherten Dateien. Wenn eine Code-Datei ohne Copyright-Header erkannt wird, wird automatisch folgende Zeile am Anfang eingefügt:

```
Copyright (c) {JAHR} eele14. All Rights Reserved.
```

Mit der richtigen Kommentar-Syntax für die jeweilige Programmiersprache.

### Beispiele

**TypeScript/JavaScript:**

```typescript
/* Copyright (c) 2026 eele14. All Rights Reserved. */

export function myFunction() {
  // ...
}
```

**Python:**

```python
''' Copyright (c) 2026 eele14. All Rights Reserved. '''

def my_function():
    pass
```

**Bash:**

```bash
# Copyright (c) 2026 eele14. All Rights Reserved.

#!/bin/bash
```

## Lizenz

All Rights Reserved © 2026 eele14
