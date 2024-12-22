import fs from 'node:fs';

const ARTICLES_PATH = '../lib/articles';

const articlesData: Record<string, Record<string, string>> = {};

function convertTitleToSlug(title: string): string {
	return title.replaceAll(' ', '-');
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
				articlesData[slug] = {
					title,
					published,
					blurb,
					slug
				};
			}
		}
	}
}
await fs.writeFileSync('../lib/data/articlesBlob.json', JSON.stringify(articlesData, null, 2));
