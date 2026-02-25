import * as vscode from 'vscode';

/**
 * Parse .gitignore file and return exclusion patterns
 */
export class GitignoreParser {
  private static readonly DEFAULT_PATTERNS = [
    '**/node_modules/**',
    '**/.git/**',
    '**/dist/**',
    '**/build/**',
    '**/out/**',
    '**/.vscode/**',
    '**/.idea/**',
    '**/coverage/**',
    '**/*.log',
    '**/.DS_Store',
    '**/vendor/**',
  ];

  /**
   * Get exclusion patterns from workspace .gitignore
   */
  static async getExclusionPatterns(workspaceFolder: vscode.WorkspaceFolder): Promise<string[]> {
    const patterns = [...GitignoreParser.DEFAULT_PATTERNS];

    try {
      const gitignoreUri = vscode.Uri.joinPath(workspaceFolder.uri, '.gitignore');
      const content = await vscode.workspace.fs.readFile(gitignoreUri);
      const text = Buffer.from(content).toString('utf8');
      const parsed = this.parseGitignore(text);

      patterns.push(...parsed);
    } catch {
      // .gitignore doesn't exist or can't be read, use defaults
    }

    return patterns;
  }

  /**
   * Parse .gitignore content and return glob patterns
   */
  private static parseGitignore(content: string): string[] {
    const patterns: string[] = [];
    const lines = content.split('\n');

    for (const line of lines) {
      const trimmed = line.trim();

      // Skip empty lines and comments
      if (!trimmed || trimmed.startsWith('#')) {
        continue;
      }

      // Skip negation patterns (too complex for our use case)
      if (trimmed.startsWith('!')) {
        continue;
      }

      // Convert .gitignore pattern to glob
      const glob = this.gitignoreToGlob(trimmed);
      if (glob) {
        patterns.push(glob);
      }
    }

    return patterns;
  }

  /**
   * Convert .gitignore pattern to VSCode glob pattern
   */
  private static gitignoreToGlob(pattern: string): string | null {
    // Patterns starting with / are relative to root
    // VSCode glob is also workspace-relative, so just remove leading /
    if (pattern.startsWith('/')) {
      pattern = pattern.substring(1);
    }

    // Patterns ending with / are directories, match their contents
    if (pattern.endsWith('/')) {
      pattern = `${pattern}**`;
    }

    // Skip patterns that are too complex or don't make sense
    if (pattern.startsWith('\\') || pattern.startsWith('..')) {
      return null;
    }

    // Handle ** patterns (already works in VSCode glob)
    // Handle * and ? (already works in VSCode glob)

    // Wrap in ** if it doesn't contain path separators
    if (!pattern.includes('/')) {
      pattern = `**/${pattern}`;
    }

    return pattern;
  }

  /**
   * Combine multiple exclusion patterns into a single glob
   * VSCode findFiles accepts a single exclude pattern, so we combine them
   */
  static combineExclusionPatterns(patterns: string[]): string {
    if (patterns.length === 0) {
      return '';
    }
    return `{${patterns.join(',')}}`;
  }
}