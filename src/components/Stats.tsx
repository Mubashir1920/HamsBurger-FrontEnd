import { motion, useInView } from 'framer-motion'
import { FaSmileBeam } from 'react-icons/fa'
import { GiChefToque, GiFullPizza } from 'react-icons/gi'
import { MdStars } from 'react-icons/md'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { FaDiamond } from "react-icons/fa6";

import bgImage from '/assets/banner_bg.png'
import ChickenIcon from '/assets/chiken_icon.png'
import Dish from '/assets/dish.png'


interface Stat {
    icon: ReactElement
    value: number
    label: string
    suffix?: string
}

const stats: Stat[] = [
    {
        icon: <FaSmileBeam size={55} className="text-red-800" />,
        value: 8900,
        label: 'HAPPY CUSTOMERS',
        suffix: '+',
    },
    {
        icon: <GiChefToque size={55} className="text-red-800" />,
        value: 25,
        label: 'PASSIONATE CHEFS',
        suffix: '+',
    },
    {
        icon: <GiFullPizza size={55} className="text-red-800" />,
        value: 125,
        label: 'FAVOURITE DISHES',
        suffix: '+',
    },
    {
        icon: <MdStars size={55} className="text-red-800" />,
        value: 4.9,
        label: 'CUSTOMER RATING',
    },
]

const useCountUp = (end: number, inView: boolean, duration = 2) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!inView) return

        let start = 0
        const step = (timestamp: number, startTime: number) => {
            const progress = Math.min((timestamp - startTime) / (duration * 1500), 1)
            const current = parseFloat((start + progress * (end - start)).toFixed(1))
            setCount(current)

            if (progress < 1) {
                requestAnimationFrame((ts) => step(ts, startTime))
            }
        }

        requestAnimationFrame((ts) => step(ts, ts))
    }, [inView, end, duration])

    return count
}

const StatsSection: React.FC = () => {
    return (
        <div style={{ background: `url(${bgImage})`, backgroundAttachment: 'fixed' }} className=" text-black  relative  py-10 px-4">
            <img src={Dish} alt="" className='w-40 h-40 absolute -top-20 right-10 ' />
            <img src={ChickenIcon} alt="" className='w-40 h-40 absolute  left-10 ' />
            <div className="max-w-6xl mx-auto flex flex-col font-bebas md:flex-row justify-around items-center gap-10 md:gap-0">
                {stats.map((stat, idx) => {
                    const ref = useRef(null)
                    const isInView = useInView(ref, { once: true })
                    const count = useCountUp(stat.value, isInView, 2)

                    return (
                        <div key={idx} className="flex items-center space-x-4 relative" ref={ref}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.2 }}
                                className="flex flex-col items-center text-center space-y-2"
                            >
                                {stat.icon}
                                <p className=" font-bold text-4xl">
                                    {stat.value % 1 === 0 ? Math.floor(count) : count}
                                    {stat.suffix || ''}
                                </p>
                                <p className=" font-semibold text-xl tracking-wide">{stat.label}</p>
                            </motion.div>

                            {idx !== stats.length - 1 && (
                                <div className="hidden md:block absolute right-[-3.5rem] top-1/2 transform -translate-y-1/2 h-24 border-r-2 border-black   border-dotted">
                                    <FaDiamond className="   absolute top-1/2 left-1/2 transform -translate-x-[45%] -translate-y-1/2" />

                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default StatsSection
