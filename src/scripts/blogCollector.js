// @ts-expect-error import
import fs from 'node:fs';

const ARTICLES_PATH = 'src/lib/articles';

const articlesData = {};

// @ts-expect-error typing
function convertTitleToSlug(title) {
	return title.replaceAll(' ', '-').toLowerCase();
}

for (const file of fs.readdirSync(ARTICLES_PATH)) {
	if (file.endsWith('.svx')) {
		const content = fs.readFileSync(`${ARTICLES_PATH}/${file}`, 'utf-8');
		const matches = content.match(/^---\n([\s\S]*?)\n---/);
		if (matches) {
			const frontMatter = matches[1];

			const shouldIgnore = frontMatter.match(/ignore:(.*?)\n/)?.[1]?.trim();
			const title = frontMatter.match(/title:(.*?)\n/)?.[1]?.trim();
			const published = frontMatter.match(/published:(.*?)(\n|$)/)?.[1]?.trim();
			const blurb = frontMatter.match(/blurb:(.*?)(\n|$)/)?.[1]?.trim();

			if (!shouldIgnore || shouldIgnore === 'no') {
				const slug = convertTitleToSlug(title);
				// @ts-expect-error record
				articlesData[slug] = {
					title,
					published,
					blurb,
					slug,
					timestamp: new Date(published).getTime()
				};
			}
		}
	}
}

fs.writeFileSync('src/lib/data/articlesBlob.json', JSON.stringify(articlesData, null, 2));
