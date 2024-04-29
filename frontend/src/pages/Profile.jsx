import { Container } from "../components/ui/Container";
import { useAuth } from "../context/AuthContext";
import { ClipLoader } from "react-spinners";

export const Profile = () => {

  const { user } = useAuth();

  return (
    <Container className="h-[calc(100vh-4rem)] flex items-center justify-center">
      {user ? (
        <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 bg-gray-900 text-gray-100">
          <img src={user.gravatar} alt="" className="w-32 h-32 mx-auto rounded-full bg-gray-500 aspect-square" />
          <div className="space-y-4 text-center divide-y divide-gray-700">
            <div className="my-2 space-y-1">
              <h2 className="text-xl font-semibold sm:text-2xl">{user.user_name}</h2>
              <span className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Email address" className="w-4 h-4">
                  <path fill="currentColor" d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"></path>
                </svg>
                <span className="dark:text-gray-600">{user.user_email}</span>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 bg-gray-900 text-gray-100">
          <ClipLoader color="blue" size={50} />
        </div>
      )}
    </Container>
  )
}
