import RestaurantData from '../interfaces/restaurant-data';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';

import Deal from './Deal';

const StyledCard = tw.div`
    rounded
    bg-white
    border-2
    border-yellow-400
    flex
    flex-col
    my-8
    shadow-md
`
const StyledTopSection = tw.div`
    flex
    jusify-start
    item-middle
    text-xl
`
const StyledTitle = tw.h3`
    h-6 
    truncate 
    w-60 
    text-center
`;
const StyledSubtitle = tw.h4`
    overflow-ellipsis 
    w-full 
    text-center 
    text-sm
`;
const StyledBottomSection = tw.div`
    p-4
    bg-gray-100
    flex
    flex-col
    divide-y-2
    divide-yellow-400
    divide-dashed
`;
const StyledImage = styled.img`
    height: 60px;
    width: 60px;
`


type RestaurantProps = {
    data:RestaurantData
}

const Restaurant = ( {data}: RestaurantProps) => <StyledCard>
    <a href={data.link} target={"_blank"}>
    <StyledTopSection>
        <StyledImage src={data.image} alt={data.name} className="rounded"/>
        <div className="flex flex-col px-4 justify-center">
            <StyledTitle>{data.name}</StyledTitle>            
            {data.isDiscounted && <StyledSubtitle>{data.discount?.percentage+"% Discount ("+data.discount?.text+")"}</StyledSubtitle>}
        </div>
    </StyledTopSection>
    {data.isDeal && <StyledBottomSection>
        {data.deals?.map(deal => {
            return <Deal data={deal} key={deal.itemId}/>
        })}
    </StyledBottomSection>}
    </a>
</StyledCard>

export default Restaurant;