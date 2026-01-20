import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';

export interface BreadcrumbItem {
	label: string;
	href?: string;
}

/**
 * 生成面包屑导航项
 * @param currentPath 当前路径
 * @param currentTitle 当前页面标题
 * @param type 内容类型：'tutorial' | 'article' | 'note'
 * @returns 面包屑项数组
 */
export function generateBreadcrumb(
	currentPath: string,
	currentTitle: string,
	type: 'tutorial' | 'article' | 'note' = 'article'
): BreadcrumbItem[] {
	const items: BreadcrumbItem[] = [];

	// 根据类型添加分类页
	if (type === 'tutorial') {
		// 教程中心：显示首页
		items.push({
			label: '首页',
			href: '/',
		});
		items.push({
			label: '教程中心',
			href: '/tutorials/',
		});
	} else if (type === 'article') {
		// 技术文章：不显示首页，直接显示"技术文章"
		items.push({
			label: '技术文章',
			href: '/articles/',
		});
	} else if (type === 'note') {
		// 笔记：显示首页
		items.push({
			label: '首页',
			href: '/',
		});
		items.push({
			label: '笔记',
			href: '/notes/',
		});
	}

	// 解析路径，生成中间层级
	const pathSegments = currentPath
		.replace(/^\//, '')
		.replace(/\/$/, '')
		.split('/')
		.filter(Boolean);

	// 对于教程，生成中间层级
	if (type === 'tutorial' && pathSegments.length > 1) {
		const tutorialSegments = pathSegments.slice(1); // 跳过 'tutorials'

		// 构建中间层级的路径
		for (let i = 0; i < tutorialSegments.length - 1; i++) {
			const segment = tutorialSegments[i];
			const path = `/tutorials/${tutorialSegments.slice(0, i + 1).join('/')}/`;

			// 尝试获取友好的名称（从 README 或文件名）
			const label = formatSegmentLabel(segment);
			items.push({
				label,
				href: path,
			});
		}
	}

	// 当前页面（不添加链接）
	items.push({
		label: currentTitle,
	});

	return items;
}

/**
 * 格式化路径段为友好的标签
 */
function formatSegmentLabel(segment: string): string {
	// 移除文件扩展名
	let label = segment.replace(/\.(md|mdx)$/, '');

	// 处理 README
	if (label.toLowerCase() === 'readme') {
		return '目录';
	}

	// 处理常见的命名模式
	// 例如：java-backend -> Java 后端
	label = label
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');

	// 处理中文路径
	if (/[\u4e00-\u9fa5]/.test(label)) {
		return label;
	}

	return label;
}

/**
 * 为教程生成面包屑（使用元数据）
 */
export async function generateTutorialBreadcrumb(
	currentPost: CollectionEntry<'tutorials'>,
	allTutorials: CollectionEntry<'tutorials'>[] = []
): Promise<BreadcrumbItem[]> {
	const items: BreadcrumbItem[] = [];

	// 教程中心
	items.push({
		label: '教程中心',
		href: '/tutorials/',
	});

	// 使用元数据构建面包屑
	const pathSegments = currentPost.id.split('/');

	// 构建父级路径
	for (let i = 0; i < pathSegments.length - 1; i++) {
		const parentPath = pathSegments.slice(0, i + 1).join('/');
		const readmeId = `${parentPath}/readme`;

		// 查找父级 README
		const parentReadme = allTutorials?.find(
			(t) => t.id.toLowerCase() === readmeId.toLowerCase()
		);

		if (parentReadme) {
			items.push({
				label: parentReadme.data.title,
				href: `/tutorials/${parentPath}/`,
			});
		} else {
			// 如果没有 README，使用路径段名称
			const segment = pathSegments[i];
			items.push({
				label: formatSegmentLabel(segment),
				href: `/tutorials/${parentPath}/`,
			});
		}
	}

	// 当前页面
	items.push({
		label: currentPost.data.title,
	});

	return items;
}

