import { RestaurantDeal } from "../interfaces/restaurant-data";
import tw from 'tailwind-styled-components';

const StyledDeal = tw.div`
    w-full
    block
    py-2
`;

type DealProps = {
    data: RestaurantDeal
};


const Deal = ({data}:DealProps) =><StyledDeal>
    <span className="text-gray-500 mr-1 line-through">{data.price}</span>
    >
    <span className="text-green-600 mx-1">{data.price} egp</span>
    {data.name}
    <br/>
    <span className="text-gray-500 text-sm mb-1 leading-tight block">
        {data.description}
    </span>
</StyledDeal>

export default Deal;