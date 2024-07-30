import React from 'react'
import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
  } from "@heroicons/react/24/outline";
  import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
  import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
  } from "@material-tailwind/react";
import BlogModal from './BlogModal';
import { getBlogList } from '../../../../api/api_atrib';
import ModalUpdateBlog from './ModalUpdateBlog';

  const TABS = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Monitored",
      value: "monitored",
    },
    {
      label: "Unmonitored",
      value: "unmonitored",
    },
  ];
   
  const TABLE_HEAD = ["Titulo", "Info", "Image", "URL", "Tipo", "Technology", ""];


export default function BlogTable() {
  const [blogList, setBlogList] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = React.useState(false);
  const [currentProjectId, setCurrentProjectId] = React.useState(null);


  React.useEffect(() => {
    obtenerProyectos();
  }, []);

  const obtenerProyectos = async () => {
    try {
      const blogs = await getBlogList()
      setBlogList(blogs.data); // Actualiza el estado con las categorías obtenidas
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openUpdate = (id) => {
    setCurrentProjectId(id);
    setIsUpdateOpen(true);
  };

  const closeUpdate = () => {
    setIsUpdateOpen(false);
    setCurrentProjectId(null)
    obtenerProyectos()
  };

  return (
    <div className="mt-4 px-8 w-full">
      <Card className="h-auto w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray" className="uppercase">
                Lista de Blogs
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Mas informacion sobre los proyectos
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button variant="outlined" size="sm">
                ver todo
              </Button>
              <Button
                className="flex items-center gap-3"
                onClick={openModal}
                size="sm"
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> añadir
                proyecto
              </Button>
              <BlogModal isOpen={isModalOpen} onClose={closeModal} />
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 mb:flex-row">
            <div>
              <Tabs value="all" className="w-full md:w-max">
                <TabsHeader>
                  {TABS.map(({ label, value }) => (
                    <Tab key={value} value={value}>
                      &nbsp;&nbsp;{label}&nbsp;&nbsp;
                    </Tab>
                  ))}
                </TabsHeader>
              </Tabs>
            </div>
            <div className="w-full md:w-72">
              <Input
                label="Buscar"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              ></Input>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon
                          strokeWidth={2}
                          className="h-4 w-4"
                        />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {blogList.map(
                ({ id, category, image, title, info, technology, url }, index) => {
                  const isLast = index === blogList.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
                  return (
                    <tr key={index}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar src={image} alt={title} size="sm" />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {title}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {url}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {category}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {truncateText(info, 15)}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {truncateText(image, 15)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {truncateText(url, 15)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {category}
                        </Typography>
                      </td>
                      <td className={classes}>
                        {technology.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            variant="small"
                            color="blue-gray"
                            className="opacity-70 font-black p-2 bg-teal-900 
                                w-auto mr-2 text-white rounded-2xl
                                cursor-pointer
                                hover:bg-teal-400"
                          >
                            #{tech.descriptions}
                          </span>
                        ))}
                      </td>
                      <td className={classes}>
                        <Tooltip content="Edit User">
                          <IconButton variant="text" onClick={() => openUpdate(id)}>
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <ModalUpdateBlog isOpen={isUpdateOpen} onClose={closeUpdate} id={currentProjectId}/>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter
          className="flex items-center 
            justify-between border-t border-blue-gray-50 p-4"
        >
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}