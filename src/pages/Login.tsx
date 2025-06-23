
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaUser, FaLock, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa"
import { useNavigate } from "react-router"

type FormData = {
    empId: string
    password: string
}

type FormErrors = {
    empId?: string
    password?: string
    general?: string
}


type LoginState = {
    isLoading: boolean
    showPassword: boolean
    errors: FormErrors
    isSuccess: boolean
}

// Custom hook for login state management
function useLoginState() {
    const [state, setState] = useState<LoginState>({
        isLoading: false,
        showPassword: false,
        errors: {},
        isSuccess: false,
    })

    const setLoading = (isLoading: boolean) => {
        setState((prev) => ({ ...prev, isLoading }))
    }

    const togglePasswordVisibility = () => {
        setState((prev) => ({ ...prev, showPassword: !prev.showPassword }))
    }

    const setErrors = (errors: FormErrors) => {
        setState((prev) => ({ ...prev, errors }))
    }

    const setSuccess = (isSuccess: boolean) => {
        setState((prev) => ({ ...prev, isSuccess }))
    }

    const resetState = () => {
        setState({
            isLoading: false,
            showPassword: false,
            errors: {},
            isSuccess: false,
        })
    }

    return {
        state,
        setLoading,
        togglePasswordVisibility,
        setErrors,
        setSuccess,
        resetState,
    }
}

// Form validation
function validateForm(data: FormData): FormErrors {
    const errors: FormErrors = {}

    if (!data.empId) {
        errors.empId = "Emp Id is required"
    } else if (!/^EMP\d{4}$/.test(data.empId)) {
        errors.empId = "Emp Id must be in the format EMPXXXX (e.g., EMP0000)"
    }
    if (!data.password) {
        errors.password = "Password is required"
    } else if (data.password.length < 6) {
        errors.password = "Password must be at least 6 characters"
    }

    return errors
}


// Login Form Component
function LoginForm({
    onSubmit,
    state,
    onTogglePassword,
}: {
    onSubmit: (data: FormData) => void
    state: LoginState
    onTogglePassword: () => void
}) {
    const [formData, setFormData] = useState<FormData>({
        empId: "",
        password: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <div className="space-y-6 w-full max-w-md mx-auto px-4">
                {/* Email Input */}
                <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <label htmlFor="empId" className="text-gray-200 block text-sm sm:text-base">
                        Emp Id :
                    </label>
                    <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                        <input
                            id="empId"
                            type="text"
                            value={formData.empId}
                            onChange={(e) => handleInputChange("empId", e.target.value)}
                            placeholder="EMP-0000"
                            className="w-full pl-10 py-2 bg-black/80 border border-white/20 text-white placeholder-gray-400 rounded-md focus:outline-none outline-none"
                            disabled={state.isLoading}
                        />
                    </div>
                    <AnimatePresence>
                        {state.errors.empId && (
                            <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="text-red-400 text-sm"
                            >
                                {state.errors.empId}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Password Input */}
                <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <label htmlFor="password" className="text-gray-200 block text-sm sm:text-base">
                        Password :
                    </label>
                    <div className="relative">
                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                        <input
                            id="password"
                            type={state.showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            placeholder="Enter your password"
                            className="w-full pl-10 pr-10 py-2 bg-black/80 border border-white/20 text-white placeholder-gray-400 rounded-md focus:outline-none focusoutline-none"
                            disabled={state.isLoading}
                        />
                        <button
                            type="button"
                            onClick={onTogglePassword}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                            disabled={state.isLoading}
                        >
                            {state.showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <AnimatePresence>
                        {state.errors.password && (
                            <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="text-red-400 text-sm"
                            >
                                {state.errors.password}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>


            <AnimatePresence>
                {state.errors.general && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-red-900/20 border border-red-500/20 rounded-lg p-3"
                    >
                        <p className="text-red-400 text-sm text-center">{state.errors.general}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <button
                    type="submit"
                    disabled={state.isLoading}
                    className="w-full bg-theme-red cursor-pointer text-white font-medium py-3"
                >
                    {state.isLoading ? (
                        <motion.div
                            className="flex items-center justify-center space-x-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <FaSpinner className="animate-spin " />
                            <span>Signing In...</span>
                        </motion.div>
                    ) : (
                        "Login"
                    )}
                </button>
            </motion.div>
        </motion.form>
    )
}

// Main Login Component
export default function WaiterLogin() {
    const { state, setLoading, togglePasswordVisibility, setErrors, setSuccess, resetState } = useLoginState()

    const navigate = useNavigate()


    const handleLogin = async (formData: FormData) => {
        // Reset previous errors
        setErrors({})

        // Validate form
        const validationErrors = validateForm(formData)
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setLoading(true)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000))

            // Simulate authentication logic
            if (formData.empId === "EMP1925" && formData.password === "password123") {
                setSuccess(true)
                // In a real app, you would redirect or update global state here
                setTimeout(() => {
                    resetState()
                    navigate("/waiter-dashboard")
                }, 1000)
            } else {
                setErrors({ general: "Invalid Emp Id or password. Please try again." })
            }
        } catch (error) {
            setErrors({ general: "Something went wrong. Please try again later." })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black  flex items-center justify-center p-4">
            <motion.div
                className="w-full max-w-md relative z-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="border border-white/10 rounded-md backdrop-blur-sm shadow-2xl">
                    <div className="text-center py-6 space-y-4">

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h1 className="text-4xl font-bebas bg-black">
                                <span className="leading-none px-1">HAMS</span>
                                <span className="bg-theme-red px-1">BURGERS</span>
                            </h1>
                            <h3>

                            </h3>
                        </motion.div>
                    </div>

                    <div>
                        <AnimatePresence mode="wait">
                            {state.isSuccess ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="text-center py-8"
                                >
                                    <motion.div
                                        className="mx-auto w-16 h-16 bg-theme-red rounded-full flex items-center justify-center mb-4"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.4 }}
                                            className="text-white text-2xl"
                                        >
                                            ✓
                                        </motion.div>
                                    </motion.div>
                                    <h3 className="text-xl font-semibold text-white mb-2">Welcome Back!</h3>
                                    <p className="text-gray-400">Redirecting to your dashboard...</p>
                                </motion.div>
                            ) : (
                                <LoginForm
                                    key="form"
                                    onSubmit={handleLogin}
                                    state={state}
                                    onTogglePassword={togglePasswordVisibility}
                                />
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <motion.div
                    className="text-center mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <p className="text-gray-400 text-sm">Demo credentials: waiter@restaurant.com / password123</p>
                </motion.div>
            </motion.div>
        </div>
    )
}
