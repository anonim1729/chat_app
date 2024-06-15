import { Outlet } from "react-router-dom"
import Home from "../pages/Home"
import Footer from "../statics/Footer"
import Navbar from "../statics/Navbar"

const Rootlayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}
export default Rootlayout