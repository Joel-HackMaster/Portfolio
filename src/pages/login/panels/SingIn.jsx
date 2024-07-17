import React from 'react'
import {
    Input,
    Checkbox,
    Typography,
    TabPanel,
    Button,
  } from "@material-tailwind/react";
import { useForm } from 'react-hook-form';

export default function SingIn({type}) {
    const {
        register,
        handleSubmit,
        formState: {errors}
      }= useForm()

  return (
    <TabPanel value={type} className="p-0">
                  <form className="mt-12 mb-2 flex flex-col gap-4">
                    <div>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-black text-start text-base"
                      >
                        Email
                      </Typography>
                      <Input
                        type="email"
                        placeholder="name@email.com"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    </div>
                    <div className="my-3">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-black text-start text-base"
                      >
                        Password
                      </Typography>
                      <Input
                        type="password"
                        placeholder="********"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none"
                        }}
                      />
                    </div>
                    <div className="flex justify-start">
                      <Checkbox label="Recuerdame"/>
                    </div>
                    <Button size="lg">Iniciar Sesion</Button>
                    <Typography
                      variant="small"
                      color="gray"
                      className="mt-2 flex items-center 
                      justify-center font-black gap-2 
                      opacity-60"
                    >
                      Sistema Portafolio
                    </Typography>
                  </form>
                </TabPanel>
  )
}
