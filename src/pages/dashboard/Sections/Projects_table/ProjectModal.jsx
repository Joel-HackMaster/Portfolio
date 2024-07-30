import {
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Button,
  Typography,
  Input,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import ReactSelect from 'react-select'
import { atrib_cat, atrib_tech, postProject } from "../../../../api/api_atrib";
import {
  notifyError,
  notifySuccess,
} from "../../../../components/ToastNotifications/Notification";
import React from "react";

export default function ProjectModal({ isOpen, onClose}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const [ListCategory, setListCategories] = React.useState([])
  const [ListTech, setListTech] = React.useState([])
  const [selectedTechnologies, setSelectedTechnologies] = React.useState([]);
  const [image, setImage] = React.useState(null);
  const [base64, setBase64] = React.useState(null);


  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(file);
    convertToBase64(file);
  };

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64String = reader.result;
      setBase64(base64String);
    };
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
    },
    maxFiles: 1,
  });

  const handleRemoveImage = async () => {
    try {
      setImage(null);
      // Aquí puedes usar las categorías como necesites
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
    }
    //setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };

  React.useEffect(() => {
    const obtenerCategorias = async () => {
        try {
          const categorias = await atrib_cat();
          setListCategories(categorias.data); // Actualiza el estado con las categorías obtenidas
        }catch (error) {
            console.error('Error al obtener las categorías:', error);
        }
    };
    obtenerCategorias();
  }, []);

  React.useEffect(() => {
    const obtenertech = async () => {
        try {
          const techComplete = await atrib_tech();
          const tech = techComplete.data
          const dataTech = tech.map((tech)=>({
            value: tech.id,
            label: tech.descriptions,
          }))
          setListTech(dataTech) // Actualiza el estado con las categorías obtenidas
        }catch (error) {
            console.error('Error al obtener las tecnologias:', error);
        }
    };
    obtenertech();
  }, []);

  const handleSelectChange = (e) => {
    setValue("category", e, {
      shouldValidate: true,
      shouldDirty: true
    });
  };

  const onSubmit = handleSubmit(async (data) => {
    const formData = {
      title: data.title,
      info: data.info,
      image: base64,
      category: data.category,
      url: data.url,
      technology: selectedTechnologies.map((tech) => tech.value)
    };
    await postProject(formData, onClose)
  });


  const handleTechnologyChange = (selectedOptions) => {
    setSelectedTechnologies(selectedOptions);
    console.log(selectedTechnologies)
  };

  return (
    <Dialog className="p-4" size="md" open={isOpen} handler={onClose}>
      <DialogHeader>Crear Proyecto</DialogHeader>
      <DialogBody>
        <div
          {...getRootProps()}
          className="border-dashed border-2 border-gray-400 p-4 text-center cursor-pointer"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Suelta la imagen aquí...</p>
          ) : (
            <p>
              Arrastra y suelta la imagen aquí, o haz clic para seleccionar una
              imagen
            </p>
          )}
          <p className="text-sm text-gray-500">
            Formatos soportados: .jpg, .jpeg
          </p>
        </div>
        {image && (
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={URL.createObjectURL(image)}
                alt={image.name}
                className="w-12 h-12 object-cover"
              />
              <div className="ml-2">
                <p className="text-sm">{image.name}</p>
                <p className="text-xs text-gray-500">
                  {(image.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <button
              onClick={handleRemoveImage}
              className="text-red-500 hover:text-red-700"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        )}
        <div className="mt-1">
          <form onSubmit={onSubmit} className="mt-5 mb-2 flex flex-col gap-4">
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-black text-start text-base"
              >
                Titulo
              </Typography>
              <Input
                type="title"
                name="title"
                {...register("title", { required: true })}
                placeholder="Titulo de proyecto"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.title && (
                <Typography color="red" className="italic text-start">
                  El titulo es requerido
                </Typography>
              )}
            </div>
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-black text-start text-base"
              >
                Info
              </Typography>
              <Textarea
                type="info"
                name="info"
                {...register("info", { required: true })}
                placeholder="Informacion sobre el proyecto"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.info && (
                <Typography color="red" className="italic text-start">
                  La informacion es requerida
                </Typography>
              )}
            </div>
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-black text-xs text-start uppercase"
              >
                Categoria
              </Typography>
              <Select
                color="teal"
                name="category"
                label="Categoria"
                {...register("category", {
                  required: "Debes escoger una categoria",
                })}
                onChange={(e) => handleSelectChange(e)}
                className="flex text-start"
              >
                {ListCategory.map(({id, description}, index) => (
                  <Option key={index} value={id.toString()}>{description}</Option>
                ))}
              </Select>
              {errors.category && (
                <Typography color="red" className="italic text-start">
                  {errors.category.message}
                </Typography>
              )}
            </div>
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-black text-xs text-start uppercase"
              >
                Etiqueta Tecnologias
              </Typography>
              <ReactSelect
                isMulti
                options={ListTech}
                value={selectedTechnologies}
                onChange={handleTechnologyChange}
                placeholder="Añadir tecnologías"
                classNamePrefix="react-select"
                className="text-indigo-900 font-black"
              />
            </div>
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-black text-start text-base"
              >
                URL
              </Typography>
              <Input
                type="url"
                name="url"
                {...register("url", { required: true })}
                placeholder="Informacion sobre el proyecto"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.url && (
                <Typography color="red" className="italic text-start">
                  ULtimo paso papu esto es requerido
                </Typography>
              )}
            </div>
            <Button variant="gradient" type="submit">
              Subir Proyecto
            </Button>
          </form>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={onClose}>
          Cancelar
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
/*
<Dialog open={isOpen} handler={onClose}>
      <DialogHeader>Cargar Archivos</DialogHeader>
      <DialogBody>
        <div {...getRootProps()} className="border-dashed border-2 border-gray-400 p-4 text-center cursor-pointer">
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Suelta los archivos aquí...</p> :
              <p>Arrastra y suelta los archivos aquí, o haz clic para seleccionar archivos</p>
          }
          <p className="text-sm text-gray-500">Formatos soportados: .png, .jpg, .svg</p>
        </div>
        <div className="mt-4">
          {files.map((file) => (
            <div key={file.path} className="flex items-center justify-between mt-2">
              <div className="flex items-center">
                <img src={URL.createObjectURL(file)} alt={file.path} className="w-12 h-12 object-cover" />
                <div className="ml-2">
                  <p className="text-sm">{file.path}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                </div>
              </div>
              <button onClick={() => handleRemoveFile(file)} className="text-red-500 hover:text-red-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={handleUpload}
          disabled={files.length === 0}
        >
          Subir
        </Button>
      </DialogFooter>
    </Dialog>
*/
