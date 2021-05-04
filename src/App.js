import React from 'react';

import {
	ReactiveBase,
	SingleDropdownRange,
	ResultCard,
	ReactiveList,
  CategorySearch
} from '@appbaseio/reactivesearch';

import './index.css';

const Main = () => (
	<ReactiveBase
		app="myappdemo"
    credentials='cnjg9Mh5k:c18fa74e-33d4-4460-807c-712b54e002f4'
		// enableAppbase
	>
  <CategorySearch
    componentId="searchbox"
    dataField="model"
    categoryField="brand.keyword"
    placeholder="Search"
    style={{
        padding: '5px',
        marginTop: '10px',
    }}
  />
		<div className="row reverse-labels">
			<div className="col">
			<SingleDropdownRange
					componentId="BookSensor"
					dataField="average_rating"
					title="SingleDropdownRange"
					data={[
						{ start: 0, end: 3, label: 'Rating < 3' },
						{ start: 3, end: 4, label: 'Rating 3 to 4' },
						{ start: 4, end: 5, label: 'Rating > 4' },
					]}
				/>
			</div>
			<div className="col" style={{ backgroundColor: '#fafafa' }}>
				<ReactiveList
					componentId="SearchResult"
					dataField="original_title"
					size={10}
					pagination
					URLParams
					react={{
						and: 'BookSensor',
					}}
					render={({ data }) => (
						<ReactiveList.ResultCardsWrapper>
							{data.map(item => (
								<ResultCard key={item.id}>
									<ResultCard.Image src={item.image} />
									<ResultCard.Title>
										<div
											className="book-title"
											dangerouslySetInnerHTML={{
												__html: item.original_title,
											}}
										/>
									</ResultCard.Title>

									<ResultCard.Description>
										{/* <div className="flex column justify-space-between"> */}
											{/* <div> */}
												<div>
													by{' '}
													<span className="authors-list">
														{item.authors}
													</span>
												</div>
												{/* <div className="ratings-list flex align-center">
													<span className="stars">
														{Array(item.average_rating_rounded)
															.fill('x')
															.map((
																item, // eslint-disable-line
																index,
															) => (
																<i
																	className="fas fa-star"
																	key={index} // eslint-disable-line
																/>
															))}
													</span>
													<span className="avg-rating">
														({item.average_rating} avg)
													</span>
												</div> */}
											{/* </div> */}
											<span className="pub-year">
												Pub {item.original_publication_year}
											</span>
										{/* </div> */}
									</ResultCard.Description>
								</ResultCard>
							))}
						</ReactiveList.ResultCardsWrapper>
					)}
				/>
			</div>
		</div>
	</ReactiveBase>
);

export default Main;