import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
    name: string;
    phone: string;
    people: number | null;
    date: string;
    time: string;
    message: string;
    botAnswer: string;
}

// interface BotQuestion {
//     question: string;
//     answer: string;
// }

interface FormErrors {
    name?: string;
    phone?: string;
    date?: string;
    time?: string;
    botAnswer?: string;
}

export default function Reservation() {
    const [form, setForm] = useState<FormData>({
        name: '',
        phone: '',
        people: null,
        date: '',
        time: '',
        message: '',
        botAnswer: '',
    });

    // const [botQuestion, setBotQuestion] = useState<BotQuestion>(generateBotQuestion());
    const [errors, setErrors] = useState<FormErrors>({});

    // function generateBotQuestion(): BotQuestion {
    //     const a = Math.floor(Math.random() * 10) + 1;
    //     const b = Math.floor(Math.random() * 10) + 1;
    //     return {
    //         question: `${a} + ${b}`,
    //         answer: (a + b).toString(),
    //     };
    // }

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function validateForm(): FormErrors {
        const newErrors: FormErrors = {};
        if (!form.name) newErrors.name = 'Name is required';
        if (!form.phone) newErrors.phone = 'Phone is required';
        if (!form.date) newErrors.date = 'Date is required';
        if (!form.time) newErrors.time = 'Time is required';
        // if (!form.botAnswer || form.botAnswer !== botQuestion.answer) {
        //     newErrors.botAnswer = 'Bot verification failed';
        // }
        return newErrors;
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            // Placeholder for API call
            // apiCall(form);
            console.log('Form submitted:', form);
        }
    }

    return (
        <section className="flex flex-col md:flex-row justify-between  text-white rounded-3xl p-6 md:p-10 mt-10 gap-8">
            {/* Left: Reservation Form */}
            <div className="flex-1 bg-[#111111] p-6 md:p-8 rounded-2xl shadow-md">
                <h2 className="text-5xl font-bebas text-left">ONLINE RESERVATION</h2>
                <p className="text-left mt-1 text-sm ">
                    Booking request <span className="text-theme-red font-semibold">+88-123-123456</span> or fill out the order form
                </p>
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded bg-[#1d1d1d] border border-gray-700 focus:outline-none"
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded bg-[#1d1d1d] border border-gray-700 focus:outline-none"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="number"
                            name="people"
                            placeholder="1 Person"
                            value={form.people || ''}
                            onChange={handleChange}
                            onScroll={(e) => e.currentTarget.blur()}
                            className="w-full px-4 py-2 rounded bg-[#1d1d1d] border border-gray-700 focus:outline-none"
                        />
                        <input
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded bg-[#1d1d1d] border border-gray-700 focus:outline-none"
                        />
                        <input
                            type="time"
                            name="time"
                            value={form.time}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded bg-[#1d1d1d] border border-gray-700 focus:outline-none"
                        />
                    </div>

                    <textarea
                        name="message"
                        rows={4}
                        placeholder="Message"
                        value={form.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded bg-[#1d1d1d] border border-gray-700 focus:outline-none"
                    ></textarea>

                    {/* Bot Verification
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <span className="text-sm">{`What is ${botQuestion.question}?`}</span>
                        <input
                            type="text"
                            name="botAnswer"
                            placeholder="Your Answer"
                            value={form.botAnswer}
                            onChange={handleChange}
                            className="w-full sm:w-auto px-4 py-2 rounded bg-[#1d1d1d] border border-gray-700 focus:outline-none"
                        />
                    </div> */}

                    {/* Errors */}
                    <div className="text-theme-red text-sm space-y-1">
                        {Object.values(errors).map((err, i) => (
                            <div key={i}>{err}</div>
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-theme-red hover:bg-red-600 py-3 rounded font-bold mt-2"
                    >
                        BOOK A TABLE
                    </button>
                </form>
            </div>

            {/* Right: Contact Info */}
            <div className="w-full md:w-96 bg-[#111111]  p-6 md:p-8 rounded-2xl shadow-md ">
                <h3 className="text-5xl  font-bebas mb-4">CONTACT US</h3>
                <div className="text-lg">
                    <p className="uppercase font-bebas  text-2xl tracking-wide ">Booking Request</p>
                    <p className="text-theme-red font-bold text-lg mb-4"> <a href="tel:+88-123-123456"> +88-123-123456</a></p>

                    <p className="uppercase font-bebas  text-2xl tracking-wide ">Location</p>
                    <p className=" text-gray-400 text-sm mb-4">Restaurant St, Delicious City,<br />London 9578, UK</p>

                    <p className="uppercase font-bebas  text-2xl tracking-wide ">Lunch Time</p>
                    <p className="mb-4 text-gray-400 text-sm">Monday to Sunday<br />11.00 am - 2.30pm</p>

                    <p className="uppercase font-bebas  text-2xl tracking-wide ">Dinner Time</p>
                    <p className='text-gray-400 text-sm' >Monday to Sunday<br />5.30 pm - 11.30 pm</p>
                </div>
            </div>
        </section>
    );
}
