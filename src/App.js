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
	<div className='main'>
	<ReactiveBase
		app="myappdemo"
    	credentials='cnjg9Mh5k:c18fa74e-33d4-4460-807c-712b54e002f4'
		className='reactivebase' 
	>
	<div className='category-search'>
		<CategorySearch
			componentId="searchbox"
			dataField="original_title"
			categoryField="avarage_rating_rounded.keyword"
			placeholder="Search"
			style={{
				padding: '5px',
				marginTop: '10px',
				marginBottom: '3rem'
			}}
		/>
	</div>
	<div className="row reverse-labels">
		<div className="col">
			<SingleDropdownRange
				componentId="BookSensor"
				dataField="average_rating_rounded"
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
				size={12}
				pagination
				URLParams
				react={{
					and: ['BookSensor', 'searchbox'],
				}}
				render={({ data }) => (
					<ReactiveList.ResultCardsWrapper>
						{data.map(item => (
							<ResultCard href={item.url} key={item.id}>
								<ResultCard.Image src={item.image} />
								<div className='card-content'>
									<div>
										<ResultCard.Title>
											<div
												className="card-title"
												dangerouslySetInnerHTML={{
													__html: item.original_title,
												}}
											/>
										</ResultCard.Title>
										<ResultCard.Description>
											<div className="authors-list">
												by{' '}{item.authors}
											</div>
											<div className="ratings-list">
												{'*'.repeat(item.average_rating_rounded)}
											</div>
											<span className="pub-year">
												Pub {item.original_publication_year}
											</span>
										</ResultCard.Description>
									</div>
									<div className='item-price'>
										${item.price}
									</div>
								</div>
							</ResultCard>
						))}
					</ReactiveList.ResultCardsWrapper>
				)}
			/>
		</div>
	</div>
	</ReactiveBase>
	</div>
);

export default Main;