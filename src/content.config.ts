import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 技术文章集合（实际内容目录：src/content/articles）
const blogs = defineCollection({
	// Load Markdown and MDX files in the `src/content/articles/` directory.
	loader: glob({ base: './src/content/articles', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string().optional(),
			date: z.coerce.date().optional(),
			pubDate: z.coerce.date().optional(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			tags: z.array(z.string()).default([]),
			categories: z.array(z.string()).default([]),
			author: z.string().optional(),
			draft: z.boolean().default(false),
		}),
});

// 教程集合 (tutorials)
const tutorials = defineCollection({
	// Load Markdown and MDX files in the `src/content/tutorials/` directory.
	loader: glob({ base: './src/content/tutorials', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string().optional(),
			date: z.coerce.date().optional(),
			pubDate: z.coerce.date().optional(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			tags: z.array(z.string()).default([]),
			categories: z.array(z.string()).default([]),
			author: z.string().optional(),
			sidebar: z.boolean().optional(),
			article: z.boolean().optional(),
			draft: z.boolean().default(false),
			prevChapter: z.string().optional(),
			nextChapter: z.string().optional(),
			parentChapter: z.string().optional(),
		}),
});

// 日常随笔集合 (diary)
const diary = defineCollection({
	// Load Markdown and MDX files in the `src/content/diary/` directory.
	loader: glob({ base: './src/content/diary', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string().optional(),
			date: z.coerce.date().optional(),
			pubDate: z.coerce.date().optional(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			tags: z.array(z.string()).default([]),
			categories: z.array(z.string()).default([]),
			author: z.string().optional(),
			sidebar: z.boolean().optional(),
			draft: z.boolean().default(false),
		}),
});

// 注意：不要再声明 blog 集合（src/content/blog 并不存在），统一使用 blogs/articles
export const collections = { blogs, tutorials, diary };
