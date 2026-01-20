import { getCollection, type CollectionEntry } from 'astro:content';

export interface TutorialNavigation {
	prev?: CollectionEntry<'tutorials'>;
	next?: CollectionEntry<'tutorials'>;
	parent?: CollectionEntry<'tutorials'>;
	currentPath: string;
	backPath: string;
}

/**
 * 获取教程的导航信息
 * @param currentPost 当前教程文章
 * @returns 导航信息对象
 */
export async function getTutorialNavigation(
	currentPost: CollectionEntry<'tutorials'>
): Promise<TutorialNavigation> {
	const allTutorials = await getCollection('tutorials', ({ data }) => !data.draft);

	const navigation: TutorialNavigation = {
		currentPath: `/tutorials/${currentPost.id}/`,
		backPath: '/tutorials/',
	};

	// 通过元数据查找上一章（大小写不敏感匹配）
	if (currentPost.data.prevChapter) {
		const prevChapterPath = currentPost.data.prevChapter.toLowerCase();
		const prev = allTutorials.find((t) => t.id.toLowerCase() === prevChapterPath);
		if (prev) {
			navigation.prev = prev;
		}
	}

	// 通过元数据查找下一章（大小写不敏感匹配）
	if (currentPost.data.nextChapter) {
		const nextChapterPath = currentPost.data.nextChapter.toLowerCase();
		const next = allTutorials.find((t) => t.id.toLowerCase() === nextChapterPath);
		if (next) {
			navigation.next = next;
		}
	}

	// 通过元数据查找父级章节（目录页）（大小写不敏感匹配）
	if (currentPost.data.parentChapter) {
		const parentChapterPath = currentPost.data.parentChapter.toLowerCase();
		const parent = allTutorials.find((t) => t.id.toLowerCase() === parentChapterPath);
		if (parent) {
			navigation.parent = parent;
			navigation.backPath = `/tutorials/${parent.id}/`;
		}
	} else {
		// 如果没有指定父级，自动推断（上一级目录）
		const pathSegments = currentPost.id.split('/');
		if (pathSegments.length > 1) {
			const parentPath = pathSegments.slice(0, -1).join('/');
			// 查找该目录的 README
			const parent = allTutorials.find(
				(t) => t.id.toLowerCase() === `${parentPath}/readme`.toLowerCase()
			);
			if (parent) {
				navigation.parent = parent;
				navigation.backPath = `/tutorials/${parent.id}/`;
			} else {
				// 如果没有 README，使用目录路径
				navigation.backPath = `/tutorials/${parentPath}/`;
			}
		}
	}

	return navigation;
}

/**
 * 计算返回路径（改进版）
 * @param currentPath 当前路径
 * @param parentPath 父级路径（可选）
 * @returns 返回路径或 null
 */
export function calculateBackPath(currentPath: string, parentPath?: string): string | null {
	// 优先使用传入的父级路径
	if (parentPath) {
		return parentPath.endsWith('/') ? parentPath : `${parentPath}/`;
	}

	// 使用路径解析逻辑
	const normalizedPath = currentPath.toLowerCase().replace(/\/$/, '');

	if (normalizedPath.startsWith('/tutorials')) {
		const pathWithoutPrefix = normalizedPath.replace(/^\/tutorials\/?/, '');
		if (!pathWithoutPrefix) {
			return '/tutorials/';
		}

		const segments = pathWithoutPrefix.split('/').filter(Boolean);
		if (segments.length <= 1) {
			return '/tutorials/';
		}

		const parentSegments = segments.slice(0, -1);
		return `/tutorials/${parentSegments.join('/')}/`;
	}

	return null;
}

