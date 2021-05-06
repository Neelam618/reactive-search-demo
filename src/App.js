import React from 'react';
import star from './star.svg';

import {
	ReactiveBase,
	SingleDropdownRange,
	ResultCard,
	ReactiveList,
  	CategorySearch,
	RangeInput
} from '@appbaseio/reactivesearch';

import './index.css';

const Main = () => (
	<ReactiveBase
		app="myappdemo"
    	credentials='cnjg9Mh5k:c18fa74e-33d4-4460-807c-712b54e002f4'
		className='reactivebase'
		style={{maxWidth: 1600, margin: '0 auto'}} 
	>
		<div className='category-search'>
			<CategorySearch
				componentId="searchbox"
				dataField="title"
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
				<RangeInput
					componentId="RangeInputSensor"
					dataField="price"
					title="Price"
					range={{
						"start": 8,
						"end": 80
					}}
					defaultValue={{
						"start": 10,
						"end": 30
					}}
					rangeLabels={{
						"start": "From",
						"end": "To"
					}}
					showFilter={true}
					stepValue={1}
					showHistogram={true}
					interval={2}
					react={{
						and: ["CategoryFilter", "SearchFilter", "RangeInputSensor"]
					}}
					URLParams={false}
					style={{marginTop: 30}}
				/>
			</div>
			<div className="col" style={{ backgroundColor: '#fafafa' }}>
				<ReactiveList
					componentId="SearchResult"
					dataField="title"
					size={12}
					pagination
					URLParams
					react={{
						and: ['BookSensor', 'searchbox', 'RangeInputSensor'],
					}}
					render={({ data }) => (
						<ReactiveList.ResultCardsWrapper>
							{data.map(item => (
								<ResultCard href={item.url} key={item.id}>
									<ResultCard.Image src={item.image} />
									<div className='card-content'>
										<div style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
											<ResultCard.Title>
												<div
													className="card-title"
													dangerouslySetInnerHTML={{
														__html: item.title,
													}}
												/>
											</ResultCard.Title>
											<ResultCard.Description>
												<div className="authors-list">
													by{' '}{item.authors}
												</div>
												<div className="ratings-list">
													{Array.apply(null, { length: item.average_rating_rounded }).map(() => {
														return <img src={star} alt="" width="15px" style={{marginRight: 2}}/>
													})}
												</div>
												<div>{item.sales} Sales</div>
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
);

export default Main;