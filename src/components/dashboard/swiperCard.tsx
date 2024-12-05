import React, { useEffect, useState } from "react";
import ProjectCard from "./projectCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination } from "swiper/modules";
import FormDialog from "./createProyectForm";
import axios from 'axios';
import { Project } from "../../services/types/project";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/keyboard";


const fetchProjects = async (): Promise<Project[]> => {
  try {
    const response = await axios.get("http://localhost/api/project/all");
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

export default function ProjectSwiper() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProjects();
      setProjects(data);
    };
    fetchData();
  }, []);

  const handleProjectAdded = async () => {
    const updatedProjects = await fetchProjects();
    setProjects(updatedProjects);
  };

  return (
     <Swiper
      modules={[Pagination, Keyboard]}
      spaceBetween={20}
      slidesPerView={1}
      pagination={{ clickable: true }}
      keyboard={{ enabled: true }}
      grabCursor={true}
      breakpoints={{
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
      style={{ width: "100%", padding: "20px" }}
    >
      {projects.map((project) => (
        <SwiperSlide key={project.id}>
          <ProjectCard
            projectID={project.id}
            projectName={project.name}
            clientName={project.clientName}
            status={project.status}
          />
        </SwiperSlide>
      ))}

      <SwiperSlide>
        <FormDialog onProjectAdded={handleProjectAdded} />
      </SwiperSlide>
    </Swiper>
  );
}
