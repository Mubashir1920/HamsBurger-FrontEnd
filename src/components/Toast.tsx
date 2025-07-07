import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";

type MessageType = "success" | "failure";

type ToastProps = {
    messageType: MessageType;
    message: string;
    showToast: boolean;
}

const Toast: React.FC<ToastProps> = ({ messageType, message, showToast }) => {
    const [visible, setVisible] = useState(showToast);
    const isSuccess = messageType === "success";

    useEffect(() => {
        if (showToast) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.4 }}
                    className={`flex fixed top-5 right-4 z-[56] items-center gap-3 px-4 py-3 rounded-xl shadow-md transition-all duration-300 ${isSuccess ? "bg-green-600/50 backdrop-blur-2xl text-white" : "bg-red-500/50 text-white"}`}
                >
                    {isSuccess ? (
                        <FaCheckCircle size={20} />
                    ) : (
                        <FaTimesCircle size={20} />
                    )}
                    <span className="text-sm font-medium">{message}</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;
