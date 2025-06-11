import { motion } from 'motion/react';
import ContactForm from '../components/ContactForm';
import { MdEmail, MdLocationOn, MdPhone, MdWhatsapp } from 'react-icons/md';

export default function Contact() {
    const contactItems = [
        {
            title: "CALL US",
            lines: ["+1 123 456 7890", "+1 098 765 4321"],
            icons: [
                <MdPhone key="phone" className="text-white w-5 h-5" />,
                <MdWhatsapp key="whatsapp" className="text-white w-5 h-5" />
            ],
        },
        {
            title: "EMAIL US",
            lines: ["hello@gmail.com"],
            icons: [
                <MdEmail key="email" className="text-white w-5 h-5" />
            ],
        },
        {
            title: "FIND US",
            lines: ["Restaurant St, Delicious City, London 9578, UK"],
            icons: [
                <MdLocationOn key="location" className="text-white w-5 h-5" />
            ],
        },
    ];

    return (
        <section className="text-white p-6 md:p-12">
            {/* Header Animation */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="font-bebas text-white  text-center w-[90%] md:w-[70%] mx-auto mb-10 px-4"
            >
                <p className="text-red-400 font-bebas italic text-xl mb-6">Contact</p>
                <h2 className="text-5xl lg:text-6xl leading-14 font-medium ">
                    Get In Touch With Us
                    <br />
                    We Are Here To Help You
                </h2>
            </motion.div>

            {/* Grid Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10"
            >
                {/* Image Animation */}
                <motion.img
                    src="/assets/contact.png"
                    alt="Restaurant"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="rounded-xl shadow-lg w-full"
                />

                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-4xl border-b font-bebas mb-4">Contact Information</h3>

                    {contactItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="border-b mb-2 border-white pb-6"
                        >
                            <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                            <div className="flex justify-between items-start">
                                <div className="space-y-2 text-sm">
                                    {item.lines.map((line, idx) => (
                                        <p key={idx}>{line}</p>
                                    ))}
                                </div>
                                <div className="flex flex-col gap-2 mt-1">
                                    {item.icons.map((icon) => icon)}
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Contact Form Animation */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <ContactForm />
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}
