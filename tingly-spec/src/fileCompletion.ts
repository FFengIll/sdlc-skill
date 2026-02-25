import * as vscode from 'vscode';
import { FileCache } from './fileCache';

/**
 * Provide file path completion using VSCode's built-in file discovery
 */
export class FileCompletion {
  private readonly MAX_FILES = 1000;
  private fileCache: FileCache;

  constructor(fileCache: FileCache) {
    this.fileCache = fileCache;
  }

  async provide(
    document: vscode.TextDocument,
    position: vscode.Position,
    textBeforeCursor: string,
    token: vscode.CancellationToken
  ): Promise<vscode.CompletionItem[]> {
    const match = textBeforeCursor.match(/@([^\s#:]*)$/);
    if (!match) {
      return [];
    }

    const partialPath = match[1];
    const atIndex = textBeforeCursor.lastIndexOf('@');

    const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
    if (!workspaceFolder) {
      return [];
    }

    // Check cancellation
    if (token.isCancellationRequested) {
      return [];
    }

    // Get files (with caching)
    let files = this.fileCache.get(workspaceFolder.uri.fsPath);
    if (!files) {
      files = await this.fileCache.refresh(workspaceFolder);
    }

    if (token.isCancellationRequested) {
      return [];
    }

    return this.createCompletionItems(files, partialPath, position, atIndex, document);
  }

  private createCompletionItems(
    files: vscode.Uri[],
    partialPath: string,
    position: vscode.Position,
    atIndex: number,
    document: vscode.TextDocument
  ): vscode.CompletionItem[] {
    const items: vscode.CompletionItem[] = [];
    const range = new vscode.Range(
      position.line,
      atIndex + 1,
      position.line,
      position.character
    );

    for (const file of files) {
      // Use VSCode's built-in relative path calculation
      const relativePath = vscode.workspace.asRelativePath(file, false);

      // Filter by partial path
      if (partialPath && !relativePath.includes(partialPath)) {
        continue;
      }

      const item = new vscode.CompletionItem(
        relativePath,
        vscode.CompletionItemKind.File
      );

      item.insertText = relativePath;
      item.range = range;
      item.filterText = relativePath; // Ensure filtering works on full path
      item.detail = file.fsPath;
      item.sortText = relativePath;

      items.push(item);
    }

    return items;
  }
}