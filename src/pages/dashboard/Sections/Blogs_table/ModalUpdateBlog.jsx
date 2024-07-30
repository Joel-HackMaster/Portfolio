import React from "react";
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
import { useForm } from "react-hook-form";
import ReactSelect from "react-select";
import {
  atrib_tech,
  getBlog,
  updateBlog
} from "../../../../api/api_atrib";
import {
  notifyError,
  notifySuccess,
} from "../../../../components/ToastNotifications/Notification";

export default function ModalUpdateBlog({ isOpen, onClose, id }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const [blogId, setId] = React.useState(null);
  const [ListTech, setListTech] = React.useState([]);
  const [selectedTechnologies, setSelectedTechnologies] = React.useState([]);
  const [isImage, setImage] = React.useState(null);

  React.useEffect(() => {
    const obtenertech = async () => {
      try {
        const techComplete = await atrib_tech();
        const tech = techComplete.data;
        const dataTech = tech.map((tech) => ({
          value: tech.id,
          label: tech.descriptions,
        }));
        setListTech(dataTech); // Actualiza el estado con las categorías obtenidas
      } catch (error) {
        console.error("Error al obtener las tecnologias:", error);
      }
    };
    obtenertech();
  }, []);

  React.useEffect(() => {
    const loadTask = async () => {
      try {
        const response = await getBlog(id);
        const blog = response.data;
        setId(blog.id);
        setValue("title", blog.title);
        setValue("image", blog.image);
        setValue("info", blog.info);
        setValue("url", blog.url);
        setImage(watch("image"));
        const techno = blog.technology.map((tech) => ({
          value: tech.id,
          label: tech.descriptions,
        }));
        setSelectedTechnologies(techno);
      } catch (error) {
        console.error("Error al cargar el proyecto:", error);
      }
    };
    if (id) {
      loadTask();
    }
  }, [id, setValue, watch]);

  const handleTechnologyChange = (selectedOptions) => {
    setSelectedTechnologies(selectedOptions);
    console.log(selectedTechnologies);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = {
        title: data.title,
        info: data.info,
        image: data.image,
        url: data.url,
        technology: selectedTechnologies.map((tech) => tech.value),
      };
      await updateBlog(formData, blogId);
      notifySuccess("Blog actualizado con exito");
      onClose();
    } catch (error) {
      notifyError("Error al actualizar el blog");
      console.error("Error al actualizar el blog:", error);
    }
  });

  return (
    <Dialog 
    className="p-4" 
    size="md" 
    open={isOpen}
    >
      <DialogHeader>Actualizar Proyecto</DialogHeader>
      <DialogBody>
        <div className="w-full flex flex-col justify-center items-center gap-4">
            <img
                src={isImage}
                alt="Foto capturada"
                className="border-2 border-gray-300 object-cover rounded-xl h-48"
            />
        </div>
        <div className="mt-1">
          <form onSubmit={onSubmit} className="mt-5 mb-2 flex flex-col gap-4">
          <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-black text-start text-base uppercase"
              >
                image
              </Typography>
              <Input
                type="text"
                name="image"
                {...register("image", { required: true })}
                placeholder="Titulo de proyecto"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.image && (
                <Typography color="red" className="italic text-start">
                  La imagen es requerida
                </Typography>
              )}
            </div>
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-black text-start text-base uppercase"
              >
                Titulo
              </Typography>
              <Input
                type="text"
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
                className="mb-2 font-black text-start text-base uppercase"
              >
                Info
              </Typography>
              <Textarea
                type="text"
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
                type="text"
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
                  Ultimo paso papu esto es requerido
                </Typography>
              )}
            </div>
            <Button variant="gradient" type="submit">
              Actualizar Blog
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
