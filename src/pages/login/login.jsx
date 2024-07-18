import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Checkbox,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
  Button,
} from "@material-tailwind/react";

import { 
  UserIcon,
  UserPlusIcon
} from "@heroicons/react/24/solid";
import SingIn from "./panels/SingIn";
import SingUp from "./panels/SingUp";

export function Login() {
  const [type, setType] = React.useState("login")


  return (
    <>
      <div className="bg-gray-800 h-screen px-8 mx-auto grid place-items-center text-center">
        <Card className="w-full max-w-[28rem] bg-white place-items-center">
          <CardHeader
            shadow={false}
            className="w-full max-w-[24rem] flex flex-col justify-center
              h-32 place-items-center px-4 text-center mb-4"
          >
            <video
              autoPlay
              muted
              loop
              className="absolute top-0 left-0 w-full h-full object-cover z-1"
            >
              <source
                src="https://videos.pexels.com/video-files/3345545/3345545-hd_1920_1080_25fps.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <div className="z-20">
              {type === "login" ? (
                <UserIcon className="h-10 w-10 text-white" />
              ) : (
                <UserPlusIcon className="h-10 w-10 text-white" />
              )}
            </div>
            <Typography
              color="white"
              className="z-20 text-3xl font-sans font-semibold"
            >
              Sistema de Administracion
            </Typography>
          </CardHeader>
          <CardBody className="w-full max-w-[24rem]">
            <Tabs value={type} className="overflow-visible">
              <TabsHeader className="relative z-0">
                <Tab value="login" onClick={() => setType("login")}>
                  Iniciar Sesion
                </Tab>
                <Tab value="register" onClick={() => setType("register")}>
                  Registro
                </Tab>
              </TabsHeader>
              <TabsBody
                  className="!overflow-x-hidden !overflow-y-visible"
                  animate={{
                    initial: {
                      x: type === "login" ? 400 : -400,
                    },
                    mount: {
                      x: 0,
                    },
                    unmount: {
                      x: type === "login" ? 400 : -400,
                    },
                  }}
              >
                <SingIn/>
                <SingUp/>
              </TabsBody>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
