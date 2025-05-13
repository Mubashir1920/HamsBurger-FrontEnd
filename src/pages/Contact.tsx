import { motion } from 'motion/react';
import ContactForm from '../components/ContactForm';


export default function Contact() {


    return (
        <section className=" text-white p-6 md:p-12">
            <div className="font-bebas text-white text-center w-[70%]  mx-auto mb-10  px-4">
                <p className="text-red-400 font-bebas italic  text-xl mb-6">Contact</p>
                <h2 className="text-5xl lg:text-6xl font-medium">
                    Get In Touch With Us
                    <br />
                    We Are Here To Help You
                </h2>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10"
            >
                <img
                    src="/assets/contact.png"
                    alt="Restaurant"
                    className="rounded-xl shadow-lg w-full"
                />
                <div>
                    <h3 className="text-4xl border-b  font-bebas mb-4">Contact Information</h3>
                    <p className="mb-2 text-lg">
                        <strong>Address:</strong> 123 Main Street, Paris, France
                    </p>
                    <p className="mb-2 text-lg">
                        <strong>Email:</strong>
                        <a href="mailto:test@gmail.com " className="text-red-400"> test@gmail.com </a>
                    </p>
                    <p className="mb-2 text-lg">
                        <strong>Phone:</strong>
                        <a href="tel:+1234567890" className="text-red-400"> +33 1 23 45 67 89 </a>
                    </p>
                    <p className="mb-2 text-lg">
                        <strong>Social Media:</strong>
                        <a href="https://www.instagram.com" className="text-red-400"> Instagram </a> |
                        <a href="https://www.facebook.com" className="text-red-400"> Facebook </a>
                    </p>
                    <p className="mb-2 text-lg border-b pb-2 ">
                        <strong>Business Hours:</strong>
                        <br />
                        Monday - Friday: 10 AM - 10 PM
                        <br />
                        Saturday - Sunday: 11 AM - 11 PM
                    </p>
                    <ContactForm />
                </div>

            </motion.div>
        </section>
    );
}
