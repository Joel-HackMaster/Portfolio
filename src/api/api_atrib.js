import {
    notifyError,
    notifySuccess,
  } from "../components/ToastNotifications/Notification";

export const atrib_cat = async () => {
  try {
    // Intenta cerrar sesión en el backend
    let response = await fetch("http://127.0.0.1:8000/api/category/", {
      method: "GET",
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("No se pudieron obtener las catg!");
    }
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

export const atrib_tech = async () => {
  try {
    // Intenta cerrar sesión en el backend
    let response = await fetch("http://127.0.0.1:8000/api/technology/", {
      method: "GET",
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("No se pudieron obtener las tech!");
    }
  } catch (error) {
    console.error("Error list technology out:", error);
  }
};

export const postProject = async ( formData, onClose ) => {
    console.log(formData)
  try{
    const response = await fetch("http://127.0.0.1:8000/api/project/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    
      if (response.status === 400) {
        const errorData = await response.json();
        notifyError(errorData.detail);
        onClose()
        throw new Error(errorData.detail)
      }
      notifySuccess("Proyecto creado con exito")
  }catch(error){
    console.error("Error create project out:", error);
  }
};

export const updateProject = async ( formData, id) => {
  try{
    const response = await fetch(`http://127.0.0.1:8000/api/project/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    
      if (response.status === 400) {
        const errorData = await response.json();
        notifyError(errorData.detail);
        throw new Error(errorData.detail)
      }
  }catch(error){
    console.error("Error update project out:", error);
  }
};


export const getProjectList = async () => {
    try {
      // Intenta cerrar sesión en el backend
      let response = await fetch("http://127.0.0.1:8000/api/project/", {
        method: "GET",
      });
  
      if (response.status === 200) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("No se pudieron obtener los proyectos!");
      }
    } catch (error) {
      console.error("Error de oobtencion de datos:", error);
    }
};

export const getProject = async ( id ) => {
    try{
        const response = await fetch(`http://127.0.0.1:8000/api/project/${id}/`, {
            method: "GET",
        });
        
        if (response.status === 200) {
            const data = await response.json();
            console.log(data)
            return data;
        } else {
            throw new Error("No se pudo obtener el proyecto");
        }
    }catch(error){
    console.error("Error de obtencion de proyecto:", error);
    }
};

export const getBlog = async ( id ) => {
    try{
        const response = await fetch(`http://127.0.0.1:8000/api/blog/${id}/`, {
            method: "GET",
        });
        
        if (response.status === 200) {
            const data = await response.json();
            console.log(data)
            return data;
        } else {
            throw new Error("No se pudo obtener el blog");
        }
    }catch(error){
    console.error("Error de obtencion de blog:", error);
    }
};

export const postBlog = async ( formData, onClose ) => {
    console.log(formData)
  try{
    const response = await fetch("http://127.0.0.1:8000/api/blog/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    
      if (response.status === 400) {
        const errorData = await response.json();
        notifyError(errorData.detail);
        throw new Error(errorData.detail)
      }
      notifySuccess("Blog creado con exito")
  }catch(error){
    console.error("Error create blog out:", error);
  }finally{
    onClose()
  }
};

export const getBlogList = async () => {
    try {
      // Intenta cerrar sesión en el backend
      let response = await fetch("http://127.0.0.1:8000/api/blog/", {
        method: "GET",
      });
  
      if (response.status === 200) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("No se pudieron obtener los blogs!");
      }
    } catch (error) {
      console.error("Error de obtencion de datos:", error);
    }
};

export const updateBlog = async ( formData, id) => {
    try{
      const response = await fetch(`http://127.0.0.1:8000/api/blog/${id}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      
        if (response.status === 400) {
          const errorData = await response.json();
          notifyError(errorData.detail);
          throw new Error(errorData.detail)
        }
    }catch(error){
      console.error("Error update project out:", error);
    }
  };