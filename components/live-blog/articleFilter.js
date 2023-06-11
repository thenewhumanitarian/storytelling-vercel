import Link from 'next/link'

const ArticleFilter = ({ authors, lang, currentFilter }) => {
	const filterText = lang === 'en' ? 'Filter by author' : 'Filtrer par auteur'
	const sortedAuthors = authors.sort((a, b) => a.slug.localeCompare(b.slug))

	return (
		<li className={'border-t mt-4 pt-3 border-black'}>
			<h3 className={'font-sans font-bold text-base'}>{filterText}</h3>
			{sortedAuthors.map((el) => {
				if (el.slug === currentFilter) {
					return <span className={'block'}>{el.name}</span>
				}
				return (
					<Link href={`/car-live-blog/${lang}/by-author/${el.slug}`}>
						<p className={'block cursor-pointer text-burgundy font-medium hover:underline'}>{el.name}</p>
					</Link>
				)
			})}
		</li>
	)
}

export default ArticleFilter