import Icon1 from '/assets/who_icon.png';
import Icon2 from '/assets/who_icon2.png';
import TitleIcon from '/assets/title_icon.png';
import Gallery1 from '/assets/gallery_01.png';
import Gallery2 from '/assets/gallery_02.png';
import Gallery3 from '/assets/gallery_03.png';
import Gallery4 from '/assets/gallery_04.png';
import Gallery5 from '/assets/gallery_05.png';
import Gallery7 from '/assets/gallery_07.png';
import Gallery8 from '/assets/gallery_08.png';

import { motion } from 'motion/react';

const images1 = [Gallery1, Gallery2, Gallery3, Gallery4];
const images2 = [Gallery5, Gallery7, Gallery8, Gallery1];

const Gallery = () => {
    const upperGallery = [...images1, ...images1];
    const lowerGallery = [...images2, ...images2];

    return (
        <div className="py-6">
            {/* Text Section */}
            <div className="font-bebas text-white text-center py-10 px-4">
                <div className="flex justify-center mb-4">
                    <img src={TitleIcon} alt="icon" className="w-15 h-15" />
                </div>
                <p className="text-red-400 font-bebas italic  text-xl mb-6">Who we are</p>
                <h2 className="text-5xl lg:text-6xl font-medium">
                    A RESTAURANT WITH TIMELESS & TRADITIONAL TASTE
                    <span className="inline-block ml-2">
                        <img src={Icon1} alt="steak icon" className="inline w-10 h-10" />
                    </span>
                    <br />
                    WE ONLY SERVE REAL STEAKS,<br />
                    AUTHENTIC TASTES & AUTHENTIC ATMOSPHERE,<br />
                    THE STEAK YOU WILL ALWAYS REMEMBER.
                    <span className="inline-block mx-2">
                        <img src={Icon2} alt="bread icon" className="inline w-10 h-10" />
                    </span>
                    LET US <br />
                    CHANGE YOUR LIFE WITH OUR STEAKS.
                </h2>
            </div>

            {/* Upper Gallery */}
            <div className="overflow-hidden py-5">
                <motion.div
                    className="flex gap-4 w-max"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: 10,
                        ease: 'linear',
                    }}
                >
                    {upperGallery.map((src, index) => (
                        <div
                            key={index}
                            className="min-w-[300px] w-[300px] h-[300px] rounded-xl overflow-hidden border border-neutral-400 shadow-inner"
                        >
                            <img
                                src={src}
                                alt={`gallery-upper-${index}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Lower Gallery - Opposite Direction */}
            <div className="overflow-hidden py-5">
                <motion.div
                    className="flex gap-4 w-max"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: 10,
                        ease: 'linear',
                    }}
                >
                    {lowerGallery.map((src, index) => (
                        <div
                            key={index}
                            className="min-w-[300px] w-[300px] h-[300px] rounded-xl overflow-hidden border border-neutral-400 shadow-inner"
                        >
                            <img
                                src={src}
                                alt={`gallery-upper-${index}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>

        </div>
    );
};

export default Gallery;
