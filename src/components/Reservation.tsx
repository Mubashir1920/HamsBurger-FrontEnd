

export default function Reservation() {


    return (
        <section className="flex flex-col md:flex-row justify-between  text-white rounded-3xl p-6 md:p-10 mt-10 gap-8">
            <div className="flex-1 bg-[#111111] p-6 md:p-8 rounded-2xl shadow-md">
                <h2 className="text-5xl font-bebas text-left">ONLINE RESERVATION</h2>
                <p className="text-left mt-1 text-2xl ">
                </p>
                <div className="w-full   py-6  ">
                    <div className="text-xl grid md:grid-cols-4  grid-cols-1 ">
                        <div>
                            <p className="uppercase font-bebas  text-4xl tracking-wide font-medium ">Booking Request</p>
                            <p className="text-theme-red font-bold text-xl mb-4"> <a href="tel:+88-123-123456"> +88-123-123456</a></p>
                        </div>
                        <div>
                            <p className="uppercase font-bebas  text-4xl tracking-wide font-medium ">Location</p>
                            <p className=" text-gray-400 text-lg mb-4">Restaurant St, Delicious City,<br />London 9578, UK</p>
                            {/* https://maps.app.goo.gl/BW7G3oXMUyLRX3Ch6 */}
                        </div>
                        <div>
                            <p className="uppercase font-bebas  text-4xl tracking-wide font-medium ">Lunch Time</p>
                            <p className="mb-4 text-gray-400 text-lg">Monday to Sunday<br />11.00 am - 2.30pm</p>
                        </div>
                        <div>
                            <p className="uppercase font-bebas  text-4xl tracking-wide font-medium ">Dinner Time</p>
                            <p className='text-gray-400 text-lg' >Monday to Sunday<br />5.30 pm - 11.30 pm</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
