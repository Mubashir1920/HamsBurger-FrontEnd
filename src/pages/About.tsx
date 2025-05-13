
import { motion } from "motion/react";
import { FaMapMarkerAlt, FaConciergeBell } from 'react-icons/fa';
import { MdDeliveryDining } from 'react-icons/md';

import TitleIcon from '/assets/title_icon.png';

const images = [
    "/assets/gallery_01.png",
    "/assets/gallery_02.png",
    "/assets/gallery_03.png",
    "/assets/gallery_04.png",
    "/assets/gallery_05.png",
];

const animationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.2,
            duration: 0.6,
            type: "spring",
        },
    }),
};

const About = () => {
    return (
        <>
            <div className="flex flex-col container mx-auto  items-center py-10   ">
                <div className="font-bebas text-white text-center w-[70%]  mx-auto  px-4">
                    <div className="flex justify-center mb-4">
                        <img src={TitleIcon} alt="icon" className="w-10 h-10" />
                    </div>
                    <p className="text-red-400 font-bebas italic  text-xl mb-6">Our Story</p>
                    <h2 className="text-5xl lg:text-6xl font-medium">
                        A luxury restaurant with A rare taste you
                        can’t find anywhere in paris.
                    </h2>
                    <p className='capitalize font-poppin  ' >
                        A Restaurant With Timeless & Traditional Tastesteak Icon We Only Serve Real Steaks, Authentic Tastes & Authentic Atmosphere,the Steak You Will Always Remember Bread Iconlet Us Change Your Life With Our Burgers.
                    </p>
                </div>
                <div className=" text-white py-10 px-4">
                    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {images.map((src, index) => (
                            <motion.div
                                key={index}
                                className={`rounded-lg overflow-hidden border-2 ${index === 2 ? "col-span-2 row-span-2 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1 lg:scale-110" : ""}`}
                                custom={index}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={animationVariants}
                            >
                                <img
                                    src={src}
                                    alt={`Grid image ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
            <iframe
                src="https://www.youtube.com/embed/N47kapFfXl0?autoplay=1&mute=1&loop=1&playlist=N47kapFfXl0&controls=0&modestbranding=1&showinfo=0&rel=0"
                className="w-full h-screen"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
            ></iframe>


            <div className="bg-[url('/assets/banner_bg.png')] bg-cover bg-fixed bg-center text-black py-20 px-6 md:px-20">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <p className="text-red-600 italic text-lg font-medium mb-2">Why we best</p>
                    <h2 className="text-5xl lg:text-6xl  tracking-tight font-bebas uppercase">
                        Our Journey Started From 1923 <br />
                        To Serve Tasty Steaks
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 mt-12 text-center">
                    {/* Prime Location */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <FaMapMarkerAlt className="text-red-600 text-4xl mx-auto mb-4" />
                        <h3 className="text-lg font-bold uppercase mb-2">Prime Location</h3>
                        <p className="text-sm text-gray-700">
                            Lorem Ipsum is simply dummy text of the printing and typeset ting industry lorem Ipsum has
                            been the industrys standard my text ever sincerstandard.
                        </p>
                    </motion.div>

                    {/* Free Home Delivery */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <MdDeliveryDining className="text-red-600 text-4xl mx-auto mb-4" />
                        <h3 className="text-lg font-bold uppercase mb-2">Free Home Delivery</h3>
                        <p className="text-sm text-gray-700">
                            Lorem Ipsum is simply dummy text of the printing and typeset ting industry lorem Ipsum has
                            been the industrys standard my text ever sincerstandard.
                        </p>
                    </motion.div>

                    {/* Premium Services */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                    >
                        <FaConciergeBell className="text-red-600 text-4xl mx-auto mb-4" />
                        <h3 className="text-lg font-bold uppercase mb-2">Premium Services</h3>
                        <p className="text-sm text-gray-700">
                            Lorem Ipsum is simply dummy text of the printing and typeset ting industry lorem Ipsum has
                            been the industrys standard my text ever sincerstandard.
                        </p>
                    </motion.div>
                </div>
            </div>
        </>
    )
}

export default About
