import * as vscode from 'vscode';
import { FileCache } from './fileCache';
import { FileCompletion } from './fileCompletion';
import { SymbolCompletion } from './symbolCompletion';
import { SymbolCache } from './symbolCache';

/**
 * Vibely Completion Provider
 * Provides:
 * 1. File path completion triggered by '@'
 * 2. Symbol completion triggered by '#' after a file path
 */
export class VibelyCompletionProvider implements vscode.CompletionItemProvider {
  private fileCompletion: FileCompletion;
  private symbolCompletion: SymbolCompletion;
  private symbolCache: SymbolCache;
  private fileCache: FileCache;

  constructor() {
    this.fileCache = new FileCache();
    this.fileCompletion = new FileCompletion(this.fileCache);
    this.symbolCache = new SymbolCache();
    this.symbolCompletion = new SymbolCompletion(this.symbolCache);

    // Trigger background preload when workspace is ready
    this.schedulePreload();
  }

  /**
   * Schedule preload for both files and symbols
   */
  private schedulePreload(): void {
    // Small delay to let workspace and LSP extensions initialize
    setTimeout(() => {
      this.preloadWorkspace();
    }, 1000);
  }

  /**
   * Preload workspace files and symbols to improve first-use experience
   */
  private async preloadWorkspace(): Promise<void> {
    const token = new vscode.CancellationTokenSource().token;

    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
      return;
    }

    // 1. Initialize file cache with .gitignore patterns
    await this.fileCache.initialize(workspaceFolder);

    // 2. Preload file list (triggers workspace scan with proper excludes)
    this.fileCache.refresh(workspaceFolder);

    // 3. Preload symbols for recently opened files (warming up LSP)
    const uris = vscode.workspace.textDocuments.map(doc => doc.uri);
    const toPreload = uris.slice(0, 10);

    for (const uri of toPreload) {
      if (token.isCancellationRequested) {
        break;
      }
      await this.symbolCompletion.preload(uri, token);
    }
  }

  /**
   * Main completion entry point
   * Always checks if cursor is in a valid completion context:
   * - After '@' for file path completion
   * - After '@path#' for symbol completion
   */
  async provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext
  ): Promise<vscode.CompletionItem[] | undefined> {
    const lineText = document.lineAt(position.line).text;
    const textBeforeCursor = lineText.substring(0, position.character);

    // Check if we're in symbol completion context: @path/to/file#
    const symbolMatch = textBeforeCursor.match(/@([^\s#]+)#$/);
    if (symbolMatch) {
      return this.symbolCompletion.provide(document, position, textBeforeCursor, token);
    }

    // Check if we're in file completion context: @partial/path
    const fileMatch = textBeforeCursor.match(/@([^\s#]*)$/);
    if (fileMatch) {
      // If ends with #, provide symbol completion
      if (textBeforeCursor.endsWith('#')) {
        return this.symbolCompletion.provide(document, position, textBeforeCursor, token);
      }
      // Otherwise provide file completion
      return this.fileCompletion.provide(document, position, textBeforeCursor, token);
    }

    return undefined;
  }

  dispose(): void {
    this.symbolCache.dispose();
  }
}