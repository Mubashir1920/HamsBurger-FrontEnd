import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaArrowUp } from 'react-icons/fa';

import FooterBg from '/assets/footer_bg.png';

export default function Footer() {
    return (
        <footer style={{ background: `url(${FooterBg})`, backgroundAttachment: 'fixed' }} className="   text-white relative overflow-hidden px-6 py-12 md:px-16 lg:px-24">
            <div className='bg-black/90 z-[1] absolute top-0 left-0 w-full h-full' ></div>
            <div className='z-[5] relative ' >

                {/* Top Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold leading-snug">
                            Restaurant St, Delicious City,<br />
                            London 9578, UK
                        </h2>
                        <p className="text-xl mt-2">Booking : +88-123-123456</p>
                        <a href="#direction" className="mt-3 inline-block mr-2 text-red-500 hover:underline font-semibold">
                            GET DIRECTION →
                        </a>
                    </div>

                    <div className="text-right">
                        <p className="text-sm">Monday - Friday : 8AM - 9PM</p>
                        <p className="text-sm">Saturday - Sunday : 8AM - 11PM</p>
                        <button className="mt-3 px-6 py-2 bg-red-500 hover:bg-red-600 rounded text-white font-bold transition">
                            BOOK A TABLE
                        </button>
                    </div>
                </div>

                {/* Divider */}
                <hr className="my-10 border-gray-700" />

                {/* Newsletter & Socials */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                    {/* Newsletter */}
                    <div>
                        <h3 className="text-2xl font-bold">GET NEWS & OFFERS</h3>
                        <p className="mt-1">Subscribe us & Get <span className="font-bold">25% Off.</span></p>

                        <form className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className="flex items-center bg-white text-black px-4 py-2 rounded w-full sm:w-auto">
                                <span className="mr-2">✉</span>
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="outline-none bg-transparent w-full sm:w-60"
                                />
                            </div>
                            <button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded font-bold">
                                SUBSCRIBE NOW
                            </button>
                        </form>
                    </div>

                    {/* Socials */}
                    <div className="text-sm flex flex-col gap-2">
                        <a href="#" className="hover:text-red-500"> <FaFacebookF className='inline-block mr-2' /> Facebook </a>
                        <a href="#" className="hover:text-red-500"><FaInstagram className='inline-block mr-2' />Instagram</a>
                        <a href="#" className="hover:text-red-500"><FaTwitter className='inline-block mr-2' />Twitter</a>
                        <a href="#" className="hover:text-red-500"><FaYoutube className='inline-block mr-2' />Youtube</a>
                    </div>
                </div>

            </div>
            {/* Scroll to top button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="absolute right-6 z-[10] bottom-6 bg-red-500 hover:bg-red-600 p-3 rounded-full shadow-lg"
            >
                <FaArrowUp className="text-white" />
            </button>
        </footer>
    );
}
