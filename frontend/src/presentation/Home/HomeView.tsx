import { Link } from "react-router-dom"
import NavBar from "../../components/NavBar"
import Hero from "../../assets/images/Hero.png"
const HomeView = () => {
  return (
    <>
      <NavBar />
      <div className="bg-primary-50  items-center min-h-screen w-screen bg-dotted-pattern  bg-cover  px-[5%] flex ">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col gap-8">
            <h1 className="h1-bold text-left max-sm:text-xl">
              Book Inventory Builder: Your Essential Tool for Digitizing
              Collections
            </h1>
            <p className="text-[#787878] font-medium text-left max-sm:text-sm text-lg">
              Transform your library with our innovative web application. We
              empower educators and librarians to effortlessly digitize book
              collections by photographing covers and utilizing AI to extract
              vital details. Join us in revolutionizing the way you manage your
              books!
            </p>
            <button className="w-full sm:w-fit bg-primary-500 rounded-lg text-lg">
              <Link to="/book-inventory" className="max-sm:text-sm">
                <h3 className="text-white font-semibold"> Digitize now</h3>
              </Link>
            </button>
          </div>
          <img
            src={Hero}
            alt="Hero Image"
            className="max-h-[70vh] object-contain object-center 2xl:max-h-50vh"
          />
        </div>
      </div>
    </>
  )
}

export default HomeView
