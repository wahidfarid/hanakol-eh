import { useState } from 'react';
import RestaurantData from '../interfaces/restaurant-data';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import { ChevronDownSolid, ChevronUpSolid } from "@graywolfai/react-heroicons";

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
    hover:bg-yellow-100
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
    pt-2
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
    data:RestaurantData,
}

const Restaurant = ( {data}: RestaurantProps) => {

    const [isExpanded, toggleExpansion] = useState(false);
    // useEffect(
    //   () =>
    //     setTimeout(() => {
    //       /* do stuff */
    //     }, timerMs),
    //   [timerMs]
    // );

// let toggleExpansion = (event:MouseEvent) =>{
//     event.preventDefault();

//     console.log("poopy");
//     isExpanded = !isExpanded;
// }

return <StyledCard>
    <a href={data.link} target={"_blank"}>
    <StyledTopSection>
        <StyledImage src={data.image} alt={data.name} className="rounded"/>
        <div className="flex flex-col px-4 justify-center">
            <StyledTitle>{data.name}</StyledTitle>            
            {data.isDiscounted && <StyledSubtitle>{data.discount?.percentage+"% Discount ("+data.discount?.text+")"}</StyledSubtitle>}
        </div>
    </StyledTopSection>
    </a>
    
    {data.isDeal && 
        <StyledBottomSection>
            {/* First three deals */}
            {data.deals?.slice(0,3).map(deal => {
                return <Deal data={deal} key={deal.itemId}/>
            })}

            {/* Chevron to expand */}
            { data.deals?.length>2 && !isExpanded && <ChevronDownSolid onClick={()=>toggleExpansion(!isExpanded)} className="cursor-pointer h-10 text-yellow-400 hover:text-yellow-300 -mb-4" />}    

            {/* rest of the deals */}
            {isExpanded && data.deals?.slice(3).map(deal => {
                return <Deal data={deal} key={deal.itemId}/>
            })}

            {/* Chevron to collapse */}
            { isExpanded && <ChevronUpSolid onClick={()=>toggleExpansion(!isExpanded)} className="cursor-pointer h-10 text-yellow-400 hover:text-yellow-300 -mb-4" />}    
            
        </StyledBottomSection>
    }
    
</StyledCard>}

export default Restaurant;