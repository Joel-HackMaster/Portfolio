import React from 'react'
import Carrusel from './Sections/Carrusel/Carrusel'
import ProjectTable from './Sections/Projects_table/ProjectTable'
import ButtonModalProject from './Sections/Projects_table/ButtonModalProject'
import BlogTable from './Sections/Blogs_table/BlogTable'


export default function Dashboard() {
  return (
  <div className='flex-col justify-center w-full'>
    <section id='1' className='w-full'>
      <Carrusel/>
    </section>
    <section id='2' className='w-full'>
      <ProjectTable/>
    </section>
    <section id='3' className='w-full'>
      <BlogTable />
    </section>
  </div>
  )
}
