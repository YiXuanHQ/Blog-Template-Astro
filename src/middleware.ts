import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
	const { url } = context;
	const { pathname } = url;

	// 如果路径不是根路径且没有尾部斜杠，重定向到有尾部斜杠的版本
	// 排除静态资源（有文件扩展名的路径）
	if (pathname !== '/' && !pathname.endsWith('/')) {
		const hasExtension = /\.(html|css|js|json|xml|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/i.test(pathname);
		
		// 如果不是静态资源，重定向到有尾部斜杠的版本
		if (!hasExtension) {
			const redirectUrl = new URL(pathname + '/', url);
			return context.redirect(redirectUrl.toString(), 301);
		}
	}

	return next();
};

