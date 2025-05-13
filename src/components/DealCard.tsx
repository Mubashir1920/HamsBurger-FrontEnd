
type DealCardProps = {
    discountText: string;
    title: string;
    description: string;
    currentPrice: string;
    originalPrice: string;
    buttonText: string;
    image: string;
    altText?: string;
};

const DealCard: React.FC<DealCardProps> = ({
    discountText,
    title,
    description,
    currentPrice,
    originalPrice,
    buttonText,
    image,
    altText = 'Discount Image',
}) => {
    return (
        <div className="flex flex-col  lg:flex-row bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg md:w-[80%] w-full  mx-auto">
            {/* Left Text Section */}
            <div className="bg-[#111] text-white flex flex-col justify-center items-center px-8 py-7 text-center lg:w-1/2">
                <div className="border border-white/20 p-10 text-left rounded-md w-full ">
                    <h2 className="text-theme-red text-3xl font-bold mb-2">{discountText}</h2>
                    <h3 className="text-white text-4xl font-medium font-bebas mb-4">{title}</h3>
                    <p className="text-gray-400 text-sm capitalize leading-relaxed mb-4">{description}</p>
                    <div className="mb-4">
                        <span className="text-theme-red text-xl font-semibold mr-2">{currentPrice}</span>
                        <span className="text-gray-400 line-through font-medium">{originalPrice}</span>
                    </div>
                    <button className="bg-theme-red  text-white font-bold py-2 px-6 rounded">
                        {buttonText}
                    </button>
                </div>
            </div>

            {/* Right Image Section */}
            <div className="lg:w-1/2 w-full relative min-h-[300px]">
                <img
                    src={image}
                    alt={altText}
                    className="object-cover"
                />
            </div>
        </div>
    );
};

export default DealCard;
