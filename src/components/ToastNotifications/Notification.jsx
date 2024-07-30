import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/ReactToastify.css'
import React from 'react';
import '../../App.css'



export const notifySuccess = (message) => {
    toast.success(message, { 
        className:".toast-custom-success",
        position: "bottom-right",
        bodyClassName: "toast-body",
        progressClassName: 'toast-progress',
        icon: "🚀",
    })
}

export const notifyError = (message) => {
    toast.error(message, {
      className: 'toast-custom-error',
      bodyClassName: "toast-body",
      progressClassName: 'toast-progress',
      icon: "🤌",
      position: "bottom-right",
    });
  };

export const NotificationContainer = () => {
    return (
        <div>
          <ToastContainer 
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            style={{ zIndex: 9999 }}
          />
        </div>
      )
}

const Notification = () => {
    return (
      <div>
        <NotificationContainer />
      </div>
    );
  };
  
  export default Notification;