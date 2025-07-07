import { useState, useEffect } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import Slide1 from '/assets/slide1.png';
import Slide2 from '/assets/slide2.png';
import Slide3 from '/assets/slide3.png';
import { Link } from 'react-router';


type Slide = {
    id: number;
    bg: string;
    subtitle: string;
    title: string;
    description: string;
};


const slides: Slide[] = [
    {
        id: 1,
        bg: Slide1,
        subtitle: 'Beef Burger Lovers',
        title: 'PREMIUM BEEF, PERFECTLY GRILLED',
        description: 'Satisfy your cravings with our juicy, handcrafted beef burgers.',
    },
    {
        id: 2,
        bg: Slide2,
        subtitle: 'Crispy Chicken Delight',
        title: 'IRRESISTIBLE CHICKEN BURGERS',
        description: 'Enjoy golden crispy chicken with bold spices in every bite.',
    },
    {
        id: 3,
        bg: Slide3,
        subtitle: 'Pizza Perfection',
        title: 'FIRE-BAKED GOURMET PIZZAS',
        description: 'Loaded with toppings, baked to cheesy, crispy perfection.',
    },
];


const HeroSlider: React.FC = () => {
    const [current, setCurrent] = useState<number>(0);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className='relative h-[100dvh]  text-white' >

            <div className="absolute -left-40 top-1/2  -rotate-90  font-semibold flex  gap-2 text-sm  z-20">
                <div className="flex items-center gap-2">
                    <FaFacebookF /> Facebook
                </div>
                <div className="flex items-center gap-2">
                    <FaInstagram /> Instagram
                </div>
                <div className="flex items-center gap-2">
                    <FaTwitter /> Twitter
                </div>
                <div className="flex items-center gap-2">
                    <FaYoutube /> Youtube
                </div>
            </div>

            <div className="absolute text-sm -right-36 top-1/2 rotate-90   font-semibold flex items-center gap-2   z-20 text-right">
                <div>Mon - Fri: 8AM - 9PM</div>
                <div className="border-t border-gray-400 w-8 mx-auto"></div>
                <div>Sat - Sun: 8AM - 11PM</div>
            </div>



            {/* Slider Container */}
            <div className="relative mx-auto w-full h-full overflow-hidden  shadow-lg">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                        <img
                            src={slide.bg}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-black/50  flex items-center justify-center text-white text-center px-4">
                            <div>
                                <p className="text-md italic mb-3">{slide.subtitle}</p>
                                <h1 className="text-4xl tracking-wider font-bebas sm:text-6xl font-bold mb-4">{slide.title}</h1>
                                <p className="text-base  capitalize sm:text-lg mb-6">{slide.description}</p>
                                <Link to='/menu' className="hover:bg-black font-bebas hover:text-white bg-white duration-300 text-black transition-colors px-6 py-2 text-2xl  rounded-md">
                                    VIEW OUR FULL MENU
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </section>
    );
};

export default HeroSlider;
