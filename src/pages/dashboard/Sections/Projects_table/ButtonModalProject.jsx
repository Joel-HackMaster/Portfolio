import React from 'react'
import ProjectTable from './ProjectTable';
import { Button } from '@material-tailwind/react';

export default function ButtonModalProject() {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  return (
    <div className="p-4">
      <Button onClick={openModal}>Abrir Modal de Carga</Button>
      <ProjectTable isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}
