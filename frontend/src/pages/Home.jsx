import { Container, Card } from "../components/ui"
import { useAuth } from "../context/AuthContext.jsx";

import { useEffect } from "react";

export const Home = () => {

  const { isAuth, user, setIsAuth } = useAuth();

  useEffect(() => {
    if(user){
      console.log('XD')
      setIsAuth(true);
    }
  }, [])
  

  return (
    <Container className="mt-5">
      <Card>
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-xl">Home Page</h2>
          {
            isAuth && (
              <span className="semi-bold text-gray-400">Hello, {user.user_name}</span>
            )
          }
        </div>
        <div className="mt-5">
          <p className="semi-bold text-slate-300">
            { 
              isAuth ? 'Task Manager, go to create, delete and update tasks. Also see all your tasks and user information.'
              : 'Task manager, register or log in to create, edit and delete tasks. Also see user information.'
            }
          </p>
        </div>
      </Card>
    </Container>
  )

}
