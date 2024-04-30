import { Link, useLocation } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./Navigation.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { BiLogOut } from "react-icons/bi";


export const NavBar = () => {

    const location = useLocation();
    const { isAuth, logout, user } = useAuth();

    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-evenly">
                    <div className="sm:block flex-1 absolute inset-y-0 right-0 hidden items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <h3 className="font-bold text-xl">
                            <Link to="/">TaskApp</Link>
                        </h3>
                    </div>
                    <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
                        <ul className="flex space-x-4">
                            {
                                isAuth ? (
                                    <>
                                        {
                                            privateRoutes.map(({ path, name }) => (
                                                <li key={path} className={`text-gray-300 hover:bg-gray-700 ${location.pathname === path && "bg-gray-900"} rounded-md px-3 py-2 text-sm font-medium`}>
                                                    <Link to={path}>{name}</Link>
                                                </li>
                                            ))
                                        }
                                        <button type="button" className="rounded-md px-3 py-2 text-sm font-medium shadow bg-green-600 text-white hover:bg-opacity-90">
                                            <Link to="/create_task">Create Task</Link>
                                        </button>
                                        <div className="relative ml-3 flex items-center">
                                            <div>
                                                <button type="button" className="relative flex rounded-full bg-gray-800 text-sm">
                                                    <Link to="/profile">
                                                        <img className="h-7 w-7 rounded-full" src={user.gravatar} alt="profile" />
                                                    </Link>
                                                </button>
                                            </div>
                                        </div>
                                        <li
                                            className="text-slate-300 flex items-center hover:cursor-pointer"
                                            onClick={() => {
                                                logout();
                                            }}
                                        >
                                            <BiLogOut className="w-6 h-6" />
                                        </li>
                                    </>
                                ) : (
                                    publicRoutes.map(({ path, name }) => (
                                        <li key={path} className={`text-gray-300 hover:bg-gray-700 ${location.pathname === path && "bg-gray-900"} rounded-md px-3 py-2 text-sm font-medium bg-green-600`}>
                                            <Link to={path}>{name}</Link>
                                        </li>

                                    ))
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </nav >
    )
}
