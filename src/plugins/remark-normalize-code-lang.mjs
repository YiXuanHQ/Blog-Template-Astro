/**
 * Normalize fenced code block languages for Shiki.
 * - Lowercase language ids (e.g. YAML -> yaml, Java -> java)
 * - Map common aliases to Shiki-friendly ids
 */
export default function remarkNormalizeCodeLang() {
	/** @type {import('unified').Transformer} */
	return (tree) => {
		/** @param {any} node */
		function visit(node) {
			if (!node || typeof node !== 'object') return;

			// mdast `code` node: { type: 'code', lang?: string, meta?: string, value: string }
			if (node.type === 'code' && typeof node.lang === 'string' && node.lang.trim()) {
				const raw = node.lang.trim();
				const lower = raw.toLowerCase();

				// shiki language ids are mostly lowercase; also fix common aliases
				const mapped =
					{
						// file / config-like snippets
						yml: 'yaml',
						aof: 'text',
						shell: 'bash',
						sh: 'bash',
						zsh: 'bash',
						shellscript: 'bash',
						conf: 'ini',
						gitignore: 'text',
						// templates
						jsp: 'html',
					}[lower] ?? lower;

				node.lang = mapped;
			}

			const children = node.children;
			if (Array.isArray(children)) {
				for (const child of children) visit(child);
			}
		}

		visit(tree);
	};
}


