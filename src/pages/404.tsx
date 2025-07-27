
import { Link } from 'react-router'

const Page404 = () => {
    return (
        <div className="flex flex-col items-center text-white justify-center h-screen ">
            <h1 className="text-6xl font-bold ">404</h1>
            <p className="mt-4 text-xl ">Page Not Found</p>
            <Link to="/" className="mt-6 text-xl  hover:underline">Go back to Home</Link>
        </div>
    )
}

export default Page404
