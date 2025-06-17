import { NavLink, Link } from "react-router-dom"
import openbook from "../../public/openbook.svg"
const NavBar = () => {
  const linkClass =
    "transition-colors hover:text-primary-500 text-black font-semibold"
  const activeClass = "text-primary-500 font-semibold border-primary-500"

  return (
    <header className="w-full border-b bg-white sticky z-50">
      <div className="wrapper flex justify-start md:flex-between w-full flex-col items-center gap-5 md:flex-row">
        <Link to="/" className="w-36">
          <img
            src={openbook}
            width={40}
            height={18}
            alt="Book Logo"
            className="ml-[45%] my-2 "
          />
        </Link>
        <nav className="md:flex-between flex gap-5 w-full max-w-xs font-semibold">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? ` ${activeClass}` : linkClass
            }
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/book-inventory"
            className={({ isActive }) =>
              isActive ? ` ${activeClass}` : linkClass
            }
          >
            Upload and Store
          </NavLink>
          <NavLink
            to="/all-books"
            className={({ isActive }) =>
              isActive ? ` ${activeClass}` : linkClass
            }
          >
            All Books
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default NavBar
