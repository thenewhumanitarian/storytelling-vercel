import ArticleChecker from '@components/live-blog/articleChecker'
import { IconNewsReport, IconAudio, IconMovie, IconPhotoGallery } from '@components/icons/media'
import moment from 'moment'

export default function Feed({ entries, lang }) {
	if (!lang) {
		lang = 'en'
	}

	const activity = entries
		.sort((a, b) => moment(b.date) - moment(a.date))
		.map((entry, i) => {
			let icon = <IconNewsReport />

			if (entry.type === 'Video') {
				icon = <IconMovie />
			}

			if (entry.type === 'Audio') {
				icon = <IconAudio />
			}

			if (entry.type === 'Photo essay') {
				icon = <IconPhotoGallery />
			}

			const dateOneDayAgo = moment(new Date()).subtract(1, 'days')
			const dateIsOld = moment(entry.date).isBefore(dateOneDayAgo)

			let datePublished = dateIsOld ? moment(entry.date).format('DD MMMM YY') : moment(entry.date).fromNow()

			return {
				id: i,
				type: 'comment',
				title: entry.title,
				slug: entry.slug,
				person: { name: entry.blogEntryAuthor.name, href: '#' },
				imageUrl: entry.blogEntryAuthor.image.url,
				comment:
					'Outcomes greenwashing strategy thought partnership, citizen-centered outcomes mobilize collective impact. Gender rights best practices policymaker segmentation move the needle society. Impact, social entrepreneurship change-makers NGO systems thinking, ideate replicable ideate compassion low-hanging fruit problem-solvers innovate outcomes replicable.',
				summary: entry.summary,
				date: datePublished || '',
				icon: icon,
			}
		})

	return (
		<div className='flow-root'>
			<ul role='list' className='p-0 m-0 -mb-8 list-none'>
				{activity.map((activityItem) => (
					<li key={activityItem.id}>
						<div className='relative pb-8'>
							<div className='relative flex items-start space-x-3'>
								<div className='relative'>
									<img
										className='flex items-center justify-center object-cover w-16 h-16 bg-gray-400 ring-8 ring-white'
										src={activityItem.imageUrl}
										alt=''
									/>
									<span className={'absolute bottom-0 right-0 bg-white w-6 h-6 flex justify-center items-center'}>
										<span className={'w-4 h-4 mb-3 mr-0.5 block'}>{activityItem.icon}</span>
									</span>
								</div>
								<div className='flex-1 min-w-0'>
									<div>
										<div className='flex items-center justify-between w-full gap-8 gap-x-4'>
											<a href={`${lang}/entries/${activityItem.slug}`} className='font-serif text-burgundy'>
												<h3 className={'text-2xl mb-0 mt-1'}>{activityItem.title}</h3>
											</a>
											{/* <span className={'block w-6 opacity-40 absolute top-0 right-0'}>{activityItem.icon}</span> */}
										</div>
										<div className={'flex flex-row gap-2 justify-start items-center'}>
											<ArticleChecker slug={activityItem.slug} clickable={true} />
											<p className='text-gray-500 '>
												Posted {activityItem.date} by {activityItem.person.name}
											</p>
										</div>
									</div>
									<div className='mt-2 text-black'>
										<p className={'text-base line-clamp-1'}>{activityItem.summary}</p>
									</div>
								</div>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}