import React, {useState, useRef} from 'react'
import {
    Input,
    Typography,
    TabPanel,
    Button,
  } from "@material-tailwind/react";
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Webcam from 'react-webcam';

export default function SingUp({type}) {
    const {
        register,
        handleSubmit,
        formState: {errors}
      }= useForm()
    const [useWebcam, setUseWebcam] = useState(false);
    const [returnWebCam, setReturnWebcam] = useState(true);
    const [image, setImage] = useState("");
    const webcamRef = useRef(null);

    const capture = () => {
        if(returnWebCam){
            const imageSrc = webcamRef.current.getScreenshot();
            setImage(imageSrc);
            setReturnWebcam(!returnWebCam)
        }else{
            setReturnWebcam(!returnWebCam)
        }
    };

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
    <TabPanel value="register" className="p-0">
    <form onSubmit={onSubmit} className="mt-6 mb-2 flex flex-col gap-4">
      <div>
        <Typography variant='small' color='blue-gray' className='mb-2 font-black text-start text-base'>
            Foto de Perfil
        </Typography>
        <div className='flex flex-col justify-center items-center gap-4'>
            {
                useWebcam ? (
                    <>
                        {
                            returnWebCam ? (
                                <>
                                    <Webcam
                                        audio={false}
                                        ref={webcamRef}
                                        screenshotFormat="image/jpeg"
                                        className='border-2 border-gray-300 rounded-xl'
                                    />
                                </>
                            ):(
                                <img
                                    src={image}
                                    alt="Foto capturada"
                                    className='border-2 border-gray-300 rounded-xl'
                                />
                            )
                        }
                        <Button type="button" onClick={capture}>
                            {returnWebCam ? 'Capturar':'Habilitar Camara'}
                        </Button>
                    </>
                ):(
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                        className: "before:content-none after:content-none"
                        }}
                    />
                )
            }
            <Button type='button' onClick={() => setUseWebcam(!useWebcam)}>
                {useWebcam ? 'Subir Imagen' : 'Usar WebCam'}
            </Button>
        </div>
      </div>
      <Button size="lg" type='submit'>Registrarse</Button>
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
