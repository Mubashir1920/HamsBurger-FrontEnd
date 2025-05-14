
interface MenuCardProps {
  image: string
  title: string
  desc: string
  price: number
  isNew?: boolean
  onClick?: () => void
}

const MenuCard: React.FC<MenuCardProps> = ({ image, title, desc, price, onClick }) => {
  return (
    <div
      className="w-full max-w-sm sm:max-w-md md:max-w-[30%] bg-black text-white flex flex-col text-left font-bebas rounded-2xl p-4 sm:p-6 gap-4 justify-between relative shadow-md"
    >

      {/* Image */}
      <div className="w-full h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text Content */}
      <div className="flex flex-col gap-2 mt-2 flex-grow">
        <h3 className="text-white text-xl sm:text-2xl md:text-3xl tracking-wide font-medium uppercase">
          {title}
        </h3>
        <p className="text-gray-400 text-sm sm:text-base capitalize font-poppin leading-snug">
          {desc}
        </p>
        <span className="text-yellow-400 text-xl font-semibold mt-1 tracking-tight font-poppin">${price}/-</span>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={onClick}
        className="mt-4 bg-theme-red hover:bg-yellow-700 cursor-pointer uppercase font-semibold text-white font-poppin py-2 px-4 rounded-md transition-all duration-200 ease-in-out"
      >
        Add to Cart
      </button>
    </div>
  )
}

export default MenuCard
