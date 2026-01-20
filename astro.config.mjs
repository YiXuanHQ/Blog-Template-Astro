// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import remarkNormalizeCodeLang from './src/plugins/remark-normalize-code-lang.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com', // 修改为您的域名
	integrations: [mdx(), sitemap()],
	trailingSlash: 'always',
	markdown: {
		remarkPlugins: [remarkNormalizeCodeLang],
		shikiConfig: {
			themes: {
				light: 'github-light',
				dark: 'github-dark',
			},
		},
	},
});
