import { Logo } from "@/components/core/logo"
import DarkVeil from "@/components/DarkVeil"
import SignIn from "@/components/forms/SignIn"
import SignUp from "@/components/forms/SignUp"
import { useAuth } from "@/hooks/use-auth"


import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigate } from "react-router-dom"

const Authentication = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex h-[90dvh] w-full items-center justify-center">Loading...</div>;
  }

  if (user) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="flex h-[90dvh] w-full items-center justify-center gap-4">
      <div className="left flex-1 hidden md:block px-8">
        <Card className="relative h-125 w-full flex items-start justify-between overflow-hidden bg-transparent rounded-sm text-white">
          <div className="absolute inset-0 -z-10">
            <div style={{ width: '1080px', height: '1080px', position: 'relative' }}>
              <DarkVeil
                hueShift={0}
                noiseIntensity={0}
                scanlineIntensity={0}
                speed={0.5}
                scanlineFrequency={0}
                warpAmount={0}
                resolutionScale={1}
              />
            </div>
          </div>
          <CardHeader className="relative z-10">
            <Logo className="bg-white"/>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="max-w-[90%] gap-2 flex flex-col">
              <h2 className="text-4xl font-bold tracking-wider capitalize">Start your journey with Us.</h2>
              <p>
                Discover the world's best AI assisted Roadmap to achieve your
                goals.
              </p>
            </div>
          </CardContent>
          <CardFooter className="relative z-10 border-t-0">
            <h3>Created by: Subhajit</h3>
          </CardFooter>
        </Card>
      </div>
      <div className="right flex-1 px-8">
        <Tabs defaultValue="signin" className="w-full h-125">
            <TabsList className="bg-transparent inline-flex gap-2 rounded-lg p-1">
                <TabsTrigger className="text-lg p-4 rounded-md border border-transparent transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:border-slate-200" value="signin">Sign In</TabsTrigger>
                <TabsTrigger className="text-lg p-4 rounded-md border border-transparent transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:border-slate-200" value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
                <SignIn />
            </TabsContent>
            <TabsContent value="signup">
                <SignUp />
            </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Authentication
