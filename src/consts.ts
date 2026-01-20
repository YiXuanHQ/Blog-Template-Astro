// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

// 网站基本信息 - 请修改为您的信息
export const SITE_TITLE = '我的博客';
export const SITE_DESCRIPTION = '分享技术知识，记录成长历程';

// Waline 配置（用于留言/评论与浏览量统计）
// 请修改为您自己的 Waline 服务器地址，或留空禁用评论功能
export const WALINE_SERVER_URL = 'https://your-waline-server.com';

// Algolia 搜索配置（可选）
// 如需启用搜索功能，请修改为您自己的 Algolia 配置
export const algolia = {
	appId: 'YOUR_APP_ID',
	apiKey: 'YOUR_SEARCH_API_KEY',
	// indices 使用数组，名称需与 Algolia 索引一致
	indices: ['your_index_name'],
	debug: false, // 调试模式
	// 中文界面配置
	placeholder: '搜索文档',
	translations: {
		button: {
			buttonText: '搜索',
			buttonAriaLabel: '搜索文档',
		},
		modal: {
			searchBox: {
				resetButtonTitle: '清除查询条件',
				resetButtonAriaLabel: '清除查询条件',
				cancelButtonText: '取消',
				cancelButtonAriaLabel: '取消',
			},
			startScreen: {
				recentSearchesTitle: '最近搜索',
				noRecentSearchesText: '没有最近的搜索',
				saveRecentSearchButtonTitle: '保存到最近搜索',
				removeRecentSearchButtonTitle: '从历史记录中删除',
				favoriteSearchesTitle: '收藏',
				removeFavoriteSearchButtonTitle: '从收藏中删除',
			},
			errorScreen: {
				titleText: '无法获取结果',
				helpText: '你可能需要检查网络连接。',
			},
			footer: {
				selectText: '选择',
				selectKeyAriaLabel: '回车键',
				navigateText: '导航',
				navigateUpKeyAriaLabel: '向上箭头',
				navigateDownKeyAriaLabel: '向下箭头',
				closeText: '关闭',
				closeKeyAriaLabel: 'ESC键',
			},
			noResultsScreen: {
				noResultsText: '无法找到相关结果',
				suggestedQueryText: '尝试搜索',
				reportMissingResultsText: '认为此查询应该返回结果？',
				reportMissingResultsLinkText: '告诉我们。',
			},
		},
	},
} as const;
