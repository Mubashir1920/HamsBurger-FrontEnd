import DealCard from './DealCard';
import Image1 from '/assets/discount_dish.png';
import Image2 from '/assets/discount_dish2.png';
import Image3 from '/assets/discount_dish3.png';
import bgImage from '/assets/banner_bg.png'
import DiscountIcon from '/assets/dicount_icon.png';


const Deals = () => {
    const cards = [
        {
            discountText: '35% OFF',
            title: 'CHICHA MORADA',
            description:
                'Bacon, chorizo, roasted roma toma with mushrooms & spinach. Beef, Eggs, poached, fried.',
            currentPrice: '$25.00',
            originalPrice: '$50.00',
            buttonText: 'ORDER NOW',
            image: Image1,
        },
        {
            discountText: '25% OFF',
            title: 'TACOS AL PASTOR',
            description:
                'Pork marinated in spices, grilled pineapple, onions & cilantro on corn tortillas.',
            currentPrice: '$15.00',
            originalPrice: '$20.00',
            buttonText: 'ORDER NOW',
            image: Image2,
        },
        {
            discountText: '40% OFF',
            title: 'PAELLA MARINERA',
            description:
                'Seafood rice with shrimp, clams, mussels, saffron & fresh herbs cooked to perfection.',
            currentPrice: '$30.00',
            originalPrice: '$50.00',
            buttonText: 'ORDER NOW',
            image: Image3,
        },
    ];

    return (
        <section style={{ background: `url(${bgImage})`, backgroundAttachment: 'fixed' }} className="py-12 px-4 bg-gray-100">
            <div className=" mx-auto">
                <h2 className="text-black  text-center text-6xl font-bebas tracking-tight font-medium mb-6">Hot Deals of the Week</h2>

                <div className="flex flex-col gap-10 relative">
                    <div className='h-24 w-24 absolute -left-5 -top-40 md:-top-15 md:left-10 ' >
                        <img src={DiscountIcon} alt="discount" className='h-full w-full' />
                    </div>
                    {cards.map((card, index) => (
                        <DealCard key={index} {...card} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Deals;
