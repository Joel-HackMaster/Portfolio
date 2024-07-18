import React from 'react'
import {
    Input,
    Checkbox,
    Typography,
    TabPanel,
    Button,
  } from "@material-tailwind/react";
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function SingIn() {
    const {
        register,
        handleSubmit,
        formState: {errors}
      }= useForm()

    const onSubmit = handleSubmit(async (data) =>{
        const formData = {
            email: data.email,
            password: data.password
        }

        const response = await fetch('http://127.0.0.1:8000/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })

        if(!response.ok){
            const errorData = await response.json()
            toast.success("Error de Autenticacion:",{
                position: "bottom-right",
                style: {
                zIndex: 100,
                background: "#101010",
                color: "#fff",
                },
            })
            console.log(errorData.detail)
            return;
        }


    })

  return (
    <TabPanel value="login" className="p-0">
                  <form onSubmit={onSubmit} className="mt-12 mb-2 flex flex-col gap-4">
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
                        name="email"
                        {...register("email", {required: true})}
                        placeholder="name@email.com"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                      {
                        errors.email && (
                            <Typography color="red" className='italic text-start'>
                                El email es requerido
                            </Typography>
                        )
                      }
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
                        name = "password"
                        placeholder="********"
                        {...register("password", {required: true})}
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none"
                        }}
                      />
                      {
                        errors.password && (
                            <Typography color="red" className='italic text-start'>
                                El password es requerido
                            </Typography>
                        )
                      }
                    </div>
                    <div className="flex justify-start">
                      <Checkbox label="Recuerdame"/>
                    </div>
                    <Button size="lg" type='submit'>Iniciar Sesion</Button>
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
