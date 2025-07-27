import { motion } from "motion/react";
import { TbAsterisk } from "react-icons/tb";

const items: string[] = [
    "BEEF BURGERS",
    "SPICY PIZZA",
    "ZINGER CRUNCH",
    "FAJITA PIZZA",
];

const InfiniteTicker: React.FC = () => {
    const repeatedItems = [...items, ...items]; 

    return (
        <section className="w-full overflow-hidden" >
            <div className=" my-5 -rotate-1 py-6  bg-black w-full border-y border-white">
                <motion.div
                    className="flex whitespace-nowrap "
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        duration: 10,
                        ease: "linear",
                    }}
                >
                    {repeatedItems.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center   text-white text-3xl font-bold px-8"
                        >
                            <span className="uppercase pr-6 ">{item}</span>
                            {index !== repeatedItems.length - 1 && (
                                <TbAsterisk size={28} />
                            )}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default InfiniteTicker;
