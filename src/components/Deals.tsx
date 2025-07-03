import DealCard from './DealCard';
import bgImage from '/assets/banner_bg.png'
import DiscountIcon from '/assets/dicount_icon.png';
import { menuData } from '../utils/menu';


const Deals = () => {
    const cards = menuData.Deals.slice(0, 3)

    return (
        <section style={{ background: `url(${bgImage})`, backgroundAttachment: 'fixed' }} className="py-12 px-4 bg-gray-100">
            <div className=" mx-auto">
                <h2 className="text-black  text-center text-6xl font-bebas tracking-tight font-medium mb-6">Hot Deals of the Week</h2>

                <div className="flex flex-col gap-10 relative">
                    <div className='h-24 w-24 absolute -left-5 -top-40 md:-top-15 md:left-10 ' >
                        <img src={DiscountIcon} alt="discount" className='h-full w-full' />
                    </div>
                    {cards.map((card, index) => (
                        <DealCard key={index} card={card} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Deals;
