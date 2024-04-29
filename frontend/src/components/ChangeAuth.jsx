import { Link } from "react-router-dom";

export const ChangeAuth = ({ text, redirectTo, textLink }) => {
    return (
        <div className="flex justify-evenly my-5">
            <p className="text-sm">{text}</p>
            <Link
                className="font-bold text-sm text-sky-400"
                to={redirectTo}
            >
                {textLink}
            </Link>
        </div>
    )
}
