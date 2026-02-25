import * as vscode from 'vscode';
import { GitignoreParser } from './gitignoreParser';

/**
 * File cache to avoid repeated workspace scans
 */
export class FileCache {
  private cache: Map<string, vscode.Uri[]> = new Map();
  private cacheValid = false;
  private watcher: vscode.Disposable | undefined;
  private excludePatterns: string[] = [];

  constructor() {
    // Watch for file changes to invalidate cache
    this.watcher = vscode.workspace.onDidChangeTextDocument(() => {
      this.invalidate();
    });
  }

  async initialize(workspaceFolder: vscode.WorkspaceFolder): Promise<void> {
    this.excludePatterns = await GitignoreParser.getExclusionPatterns(workspaceFolder);
  }

  get(workspacePath: string): vscode.Uri[] | undefined {
    if (this.cacheValid) {
      return this.cache.get(workspacePath);
    }
    return undefined;
  }

  async refresh(workspaceFolder: vscode.WorkspaceFolder): Promise<vscode.Uri[]> {
    const excludePattern = GitignoreParser.combineExclusionPatterns(this.excludePatterns);
    const files = await vscode.workspace.findFiles('**/*', excludePattern, 1000);
    this.set(workspaceFolder.uri.fsPath, files);
    return files;
  }

  set(workspacePath: string, files: vscode.Uri[]): void {
    this.cache.set(workspacePath, files);
    this.cacheValid = true;
  }

  invalidate(): void {
    this.cacheValid = false;
  }

  dispose(): void {
    this.watcher?.dispose();
  }
}