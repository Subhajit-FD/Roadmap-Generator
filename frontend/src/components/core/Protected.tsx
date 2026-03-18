import { useAuth } from "@/hooks/use-auth";
import { Navigate } from "react-router-dom";


const Protected = ({ children }: { children: React.ReactNode }) => {
  const { loading, user } = useAuth();

  if (loading) {
    return(
        <div>Loading....</div>
    )
}
if(!user){
   return <Navigate to={'/sign-in'} />
}

return children
}

export default Protected