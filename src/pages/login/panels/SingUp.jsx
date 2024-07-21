import React, { useState, useRef } from "react";
import { Input, Typography, TabPanel, Button, Select, Option } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import Webcam from "react-webcam";

export default function SingUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  const [useWebcam, setUseWebcam] = useState(false);
  const [returnWebCam, setReturnWebcam] = useState(true);
  const [image, setImage] = useState(null);
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState(null);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const webcamRef = useRef(null);
  const nameRegex = /^[a-zA-Z\s]+$/;
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const capture = () => {
    if (returnWebCam) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc);
      setReturnWebcam(!returnWebCam);
    } else {
      setReturnWebcam(!returnWebCam);
    }
  };

  const checkUsername = async (username) => {
    setCheckingUsername(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/user_val/${username}/`
      );
      if (!response.ok) {
        setUsernameAvailable(false);
      } else {
        setUsernameAvailable(true);
      }
    } catch (error) {
      console.error("Error checking username", error);
      setUsernameAvailable(false);
    } finally {
      setCheckingUsername(false);
    }
  };

  const checkEmail = async (email) => {
    setCheckingEmail(true);
    try {
        if(!email){
            setEmailAvailable(false)
            return
        }
      const response = await fetch(
        `http://127.0.0.1:8000/api/email_val/${email}/`
      );
      if (!response.ok) {
        setEmailAvailable(false);
      } else {
        setEmailAvailable(true);
      }
    } catch (error) {
      console.error("Error checking email", error);
      setEmailAvailable(false);
    } finally {
      setCheckingEmail(false);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    console.log(image)
    const formData = {
      username: data.username,
      email: data.email,
      name: data.name,
      last_name: data.lastname,
      image: image,
      type_user: data.type_user,
      password: data.password,
    };

    console.log(formData)

    const response = await fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData.detail);
      return;
    }
  });

  const handleSelectChange = (e) => {
    setValue("type_user", e, {
      shouldValidate: true,
      shouldDirty: true
    });
  };

  const handleImageChange = async (file) => {
    if(file){
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageDataUrl = reader.result;
          setImage(imageDataUrl)
          console.log(image)
        };
        reader.readAsDataURL(file)
        console.log(image)
    }
  }

  const password = watch("password");

  return (
    <TabPanel value="register" className="p-0">
      <form onSubmit={onSubmit} className="mt-12 mb-2 flex flex-col gap-4">
        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 font-black text-start text-base"
          >
            Foto de Perfil
          </Typography>
          <div className="w-full flex flex-col justify-center items-center gap-4">
            {useWebcam ? (
              <>
                {returnWebCam ? (
                  <>
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      className="border-2 border-gray-300 rounded-xl h-48"
                    />
                  </>
                ) : (
                  <img
                    src={image}
                    alt="Foto capturada"
                    className="border-2 border-gray-300 object-cover rounded-xl h-48"
                  />
                )}
                <Button type="button" onClick={capture}>
                  {returnWebCam ? "Capturar" : "Habilitar Camara"}
                </Button>
              </>
            ) : (
              <>
                <div>
                { image ? (
                  <img
                  src={image}
                  alt="Foto capturada"
                  className="border-2 border-gray-300 object-cover rounded-xl h-48"
                  />
                ):(
                  <img
                  src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExajNod3FjbHI2OG9kaXZya2lkeHI5dXNxa3M4YzBkemFqMWI2ZHBzeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OQaT7yUccltunTDTAZ/giphy.gif"
                  alt="Foto capturada"
                  className="border-2 border-gray-300 object-cover rounded-xl h-48"
                  />
                )
                }
                <label
                  className="bg-white cursor-pointer flex justify-center text-center px-4 py-2 
                text-black rounded-lg 
                hover:bg-black hover:text-white transition"
                >
                  <Typography className="font-body font-extrabold uppercase text-xs">
                    Subir Imagen
                  </Typography>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e.target.files[0])}
                    className="hidden"
                  />
                </label>
                </div>
              </>
            )}
            <Button type="button" onClick={() => setUseWebcam(!useWebcam)}>
              {useWebcam ? "Subir Imagen" : "Usar WebCam"}
            </Button>
          </div>
        </div>
        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 font-black text-xs text-start uppercase"
          >
            Username
          </Typography>
          <div className="relative flex items-center">
            <Input
              type="text"
              name="username"
              {...register("username", { required: "El username es requerido",
                pattern: {
                    value: usernameRegex,
                    message: "No se adminten caracteres especiales"
                },
               })}
              placeholder="Ingresa un nombre de usuario"
              className={`!border-t-blue-gray-200 focus:!border-t-gray-900 pr-10 
                ${
                  usernameAvailable === true
                    ? "border-green-500 !border-t-green-500  focus:!border-green-500"
                    : usernameAvailable === false
                    ? "border-red-500 !border-t-red-500  focus:!border-red-500"
                    : ""
                }`}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Button
              type="button"
              onClick={() => checkUsername(watch("username"))}
              disabled={checkingUsername}
              className="ml-2 flex justify-center"
            >
              {checkingUsername ? "Verificando..." : "Verificar"}
            </Button>
          </div>
          {errors.username && (
            <Typography color="red" className="italic text-start">
              {errors.username.message}
            </Typography>
          )}
        </div>

        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 font-black text-xs text-start uppercase"
          >
            Email
          </Typography>
          <div className="relative flex items-center">
            <Input
              type="email"
              name="email"
              {...register("email", { required: "El email es requerido",
                pattern: {
                    value: emailRegex,
                    message: "Email no valido"
                },
               })}
              placeholder="name@email.com"
              className={`!border-t-blue-gray-200 focus:!border-t-gray-900 pr-10 
                ${
                  emailAvailable === true
                    ? "border-green-500 !border-t-green-500  focus:!border-green-500"
                    : emailAvailable === false
                    ? "border-red-500 !border-t-red-500 focus:!border-red-500"
                    : ""
                }`}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Button
              type="button"
              onClick={() => checkEmail(watch("email"))}
              disabled={checkingEmail}
              className="ml-2 flex justify-center"
            >
              {checkingEmail ? "Verificando..." : "Verificar"}
            </Button>
          </div>
          {errors.email && (
            <Typography color="red" className="italic text-start">
                {errors.email.message}
            </Typography>
          )}
        </div>

        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 font-black text-xs text-start uppercase"
          >
            name
          </Typography>
          <Input
            type="text"
            name="name"
            {...register("name", { required: 'El nombre es requerido',
                pattern: {
                    value: nameRegex,
                    message: "No se adminten caracteres especiales"
                },
                minLength: {
                    value: 4,
                    message: 'El nombre de usuario debe tener al menos 4 caracteres'
                }
             })}
            placeholder="Nombre(s)"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          {errors.name && (
            <Typography color="red" className="italic text-start">
              {errors.name.message}
            </Typography>
          )}
        </div>

        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 font-black text-xs text-start uppercase"
          >
            lastname
          </Typography>
          <Input
            type="text"
            name="lastname"
            {...register("lastname", { required: 'Los apellidos son requeridos',
                pattern: {
                    value: nameRegex,
                    message: "No se adminten caracteres especiales"
                },
                minLength: {
                    value: 4,
                    message: 'El nombre de usuario debe tener al menos 4 caracteres'
                }
             })}
            placeholder="Apellido(s)"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          {errors.lastname && (
            <Typography color="red" className="italic text-start">
              {errors.lastname.message}
            </Typography>
          )}
        </div>
        <div>
        <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 font-black text-xs text-start uppercase"
          >
            Tipo de usuario
          </Typography>
            <Select 
                color="teal" 
                name="type_user"
                label="Tipo de Usuario" 
                {...register("type_user", { required: "Debes escoger un tipo de Usuario"})}
                onChange={(e) => handleSelectChange(e)}
                className="flex text-start"
            >
                <Option value="Administrador">Administrador</Option>
                <Option value="Usuario">Usuario</Option>
            </Select>
            {errors.type_user && (
            <Typography color="red" className='italic text-start'>
              {errors.type_user.message}
            </Typography>
          )}
        </div>
        <div>
          <Typography variant="small" color="blue-gray" className="mb-2 font-black text-start text-base">
            Password
          </Typography>
          <Input
            type="password"
            name="password"
            {...register("password", { required: true,
                minLength: {
                    value: 4,
                    message: 'El password debe tener al menos 4 caracteres'
                }
             })}
            placeholder="********"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none"
            }}
          />
          {errors.password && (
            <Typography color="red" className='italic text-start'>
              El password es requerido
            </Typography>
          )}
        </div>
        <div>
          <Typography variant="small" color="blue-gray" className="mb-2 font-black text-start text-base">
            Confirmar Password
          </Typography>
          <Input
            type="password"
            name="repassword"
            {...register("repassword", {
              required: true,
              validate: value => value === password || "Las contraseñas no coinciden",
              minLength: {
                value: 4,
                message: 'El password debe tener al menos 4 caracteres'
              }
            })}
            placeholder="********"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none"
            }}
          />
          {errors.repassword && (
            <Typography color="red" className='italic text-start'>
              {errors.repassword.message}
            </Typography>
          )}
        </div>
        <Button size="lg" type="submit">
          Registrarse
        </Button>
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
  );
}
