import * as vscode from "vscode";

const commentSyntax: {
  [key: string]: { start: string; end: string; line: string };
} = {
  // languages
  ts: { start: "/*", end: "*/", line: "//" },
  tsx: { start: "/*", end: "*/", line: "//" },
  js: { start: "/*", end: "*/", line: "//" },
  jsx: { start: "/*", end: "*/", line: "//" },
  py: { start: "#", end: "", line: "#" },
  java: { start: "/*", end: "*/", line: "//" },
  cs: { start: "/*", end: "*/", line: "//" },
  cpp: { start: "/*", end: "*/", line: "//" },
  c: { start: "/*", end: "*/", line: "//" },
  h: { start: "/*", end: "*/", line: "//" },
  hpp: { start: "/*", end: "*/", line: "//" },
  go: { start: "/*", end: "*/", line: "//" },
  rs: { start: "/*", end: "*/", line: "//" },
  php: { start: "/*", end: "*/", line: "//" },
  rb: { start: "=begin", end: "=end", line: "#" },
  swift: { start: "/*", end: "*/", line: "//" },
  kt: { start: "/*", end: "*/", line: "//" },
  scala: { start: "/*", end: "*/", line: "//" },
  r: { start: "", end: "", line: "#" },
  lua: { start: "--[[", end: "]]", line: "--" },
  pl: { start: "=pod", end: "=cut", line: "#" },
  sh: { start: "", end: "", line: "#" },
  bash: { start: "", end: "", line: "#" },
  zsh: { start: "", end: "", line: "#" },
  sql: { start: "/*", end: "*/", line: "--" },
  xml: { start: "<!--", end: "-->", line: "<!--" },
  html: { start: "<!--", end: "-->", line: "<!--" },
  css: { start: "/*", end: "*/", line: "/*" },
  scss: { start: "/*", end: "*/", line: "//" },
  less: { start: "/*", end: "*/", line: "//" },
  vue: { start: "<!--", end: "-->", line: "<!--" },
  svelte: { start: "<!--", end: "-->", line: "<!--" },
  yaml: { start: "", end: "", line: "#" },
  yml: { start: "", end: "", line: "#" },
  toml: { start: "", end: "", line: "#" },
  ini: { start: "", end: "", line: ";" },
};

// Config files that should be excluded
const excludedPatterns = [
  /package\.json$/,
  /package-lock\.json$/,
  /tsconfig\.json$/,
  /\.eslintrc/,
  /\.prettierrc/,
  /\.babelrc/,
  /webpack\.config\./,
  /vite\.config\./,
  /next\.config\./,
  /nuxt\.config\./,
  /rollup\.config\./,
  /dockerfile$/i,
  /\.env/,
  /\.gitignore/,
  /\.gitattributes/,
  /\.editorconfig/,
  /\.nvmrc/,
  /license/i,
  /changelog/i,
  /readme/i,
];

function getCopyrightHeader(extension: string): string | null {
  const syntax = commentSyntax[extension];
  if (!syntax) {
    return null;
  }

  const year = new Date().getFullYear();
  const copyrightText = `Copyright (c) ${year} eele14. All Rights Reserved.`;

  if (
    extension === "sh" ||
    extension === "bash" ||
    extension === "zsh" ||
    extension === "py" ||
    extension === "yaml" ||
    extension === "yml" ||
    extension === "toml" ||
    extension === "ini" ||
    extension === "r"
  ) {
    // Shell scripts, Python, R, and config files use line comments
    return `${syntax.line} ${copyrightText}\n`;
  } else if (
    extension === "xml" ||
    extension === "html" ||
    extension === "vue" ||
    extension === "svelte"
  ) {
    return `${syntax.start} ${copyrightText} ${syntax.end}\n`;
  } else if (extension === "rb") {
    return `${syntax.start}\n${copyrightText}\n${syntax.end}\n`;
  } else {
    return `${syntax.start} ${copyrightText} ${syntax.end}\n`;
  }
}

function isCodeFile(filePath: string): boolean {
  // Check if file matches any excluded patterns
  for (const pattern of excludedPatterns) {
    if (pattern.test(filePath)) {
      return false;
    }
  }

  // Get file extension
  const extension = filePath.split(".").pop()?.toLowerCase() || "";
  return extension in commentSyntax;
}

function hasCopyrightHeader(document: vscode.TextDocument): boolean {
  if (document.lineCount === 0) {
    return false;
  }

  const linesToCheck = Math.min(4, document.lineCount);
  for (let i = 0; i < linesToCheck; i++) {
    const line = document.lineAt(i).text;
    if (line.includes("Copyright (c)") && line.includes("eele14")) {
      return true;
    }
  }
  return false;
}

export function activate(context: vscode.ExtensionContext) {
  console.log("Copyright Header extension is now active!");

  // Listen for new files being opened
  const onOpenDisposable = vscode.workspace.onDidOpenTextDocument(
    async (document) => {
      // Only process files in the workspace
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders || workspaceFolders.length === 0) {
        return;
      }

      if (!document.uri.fsPath.startsWith(workspaceFolders[0].uri.fsPath)) {
        return;
      }

      // Skip unsaved documents
      if (document.isUntitled) {
        return;
      }

      if (isCodeFile(document.uri.fsPath) && !hasCopyrightHeader(document)) {
        const extension =
          document.uri.fsPath.split(".").pop()?.toLowerCase() || "";
        const header = getCopyrightHeader(extension);

        if (header) {
          const workspaceEdit = new vscode.WorkspaceEdit();
          workspaceEdit.insert(document.uri, new vscode.Position(0, 0), header);
          await vscode.workspace.applyEdit(workspaceEdit);
        }
      }
    },
  );

  // Listen for file save to add header to newly created files
  const onSaveDisposable = vscode.workspace.onDidSaveTextDocument(
    async (document) => {
      if (isCodeFile(document.uri.fsPath) && !hasCopyrightHeader(document)) {
        const extension =
          document.uri.fsPath.split(".").pop()?.toLowerCase() || "";
        const header = getCopyrightHeader(extension);

        if (header) {
          const workspaceEdit = new vscode.WorkspaceEdit();
          workspaceEdit.insert(document.uri, new vscode.Position(0, 0), header);
          await vscode.workspace.applyEdit(workspaceEdit);
        }
      }
    },
  );

  context.subscriptions.push(onOpenDisposable);
  context.subscriptions.push(onSaveDisposable);
}

export function deactivate() {}
