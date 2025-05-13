import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
}

const ContactForm = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const validateForm = (): FormErrors => {
        const errs: FormErrors = {};
        if (!formData.name.trim()) errs.name = 'Name is required';
        if (!formData.email.trim()) errs.email = 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Invalid email';
        if (!formData.phone.trim()) errs.phone = 'Phone number is required';
        if (!formData.message.trim()) errs.message = 'Message is required';
        return errs;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        // TODO: API call
        setFormData({
            name: '',
            email: '',
            phone: '',
            message: ''
        });
        console.log('Form submitted', formData);
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl md:text-4xl font-bebas   uppercase">Say hi, don’t be shy!</h2>

            <div>
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full p-3 bg-zinc-800 text-white border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
                <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full p-3 bg-zinc-800 text-white border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
                <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full p-3 bg-zinc-800 text-white border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    rows={5}
                    className="w-full p-3 bg-zinc-800 text-white border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                ></textarea>
                {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
            </div>

            <button
                type="submit"
                className="bg-theme-red px-6 py-2  rounded-md text-white "
            >
                Submit
            </button>
        </form>
    )
}

export default ContactForm
