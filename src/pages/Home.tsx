
import Deals from "../components/Deals"
import FloatingCart from "../components/FloatingCart"
import Gallery from "../components/Gallery"
import HeroSlider from "../components/HeroSlider"
import HomeMenu from "../components/HomeMenu"
import Reservation from "../components/Reservation"
import StatsSection from "../components/Stats"
import InfiniteTicker from "../components/Ticker"

const Home = () => {
    return (
        <main>
            <HeroSlider />
            <InfiniteTicker />
            <HomeMenu />
            <StatsSection />
            <Deals />
            <Gallery />
            <Reservation />
            <FloatingCart />
        </main>
    )
}

export default Home
