import React from 'react'
import { useState } from 'react'
import { Container, Wrapper, Title, Desc, CardContainer, ToggleButtonGroup, ToggleButton, Divider } from './ProjectsStyle'
import ProjectCard from '../Cards/ProjectCards'
// import { projects } from '../../data/constants'
import { useFetchProject } from "../../data/fetchProjects"




const Projects = ({openModal,setOpenModal}) => {

 const { loading, projects } = useFetchProject()


 

  const [toggle, setToggle] = useState('all');
  return (
      <Container id="projects">
          <Wrapper>
              <Title>Projects</Title>
              <Desc>
                  I have worked on a wide range of projects. From Business & Productivitys to
                  android apps. Here are some of my projects.
              </Desc>
              <ToggleButtonGroup>
                  {toggle === "all" ? (
                      <ToggleButton
                          active
                          value="all"
                          onClick={() => setToggle("all")}
                      >
                          All
                      </ToggleButton>
                  ) : (
                      <ToggleButton
                          value="all"
                          onClick={() => setToggle("all")}
                      >
                          All
                      </ToggleButton>
                  )}
                  <Divider />
                  {toggle === "Business & Productivity" ? (
                      <ToggleButton
                          active
                          value="Business & Productivity"
                          onClick={() => setToggle("Business & Productivity")}
                      >
                          Business & Productivity
                      </ToggleButton>
                  ) : (
                      <ToggleButton
                          value="Business & Productivity"
                          onClick={() => setToggle("Business & Productivity")}
                      >
                          Business & Productivity
                      </ToggleButton>
                  )}
                  <Divider />
                  
                  
                  {toggle === "E-Commerce" ? (
                      <ToggleButton
                          active
                          value="E-Commerce"
                          onClick={() => setToggle("E-Commerce")}
                      >
                          E-COMMERCE
                      </ToggleButton>
                  ) : (
                      <ToggleButton
                          value="E-Commerce"
                          onClick={() => setToggle("E-Commerce")}
                      >
                          E-COMMERCE
                      </ToggleButton>
                  )}
              </ToggleButtonGroup>
              <CardContainer>
                  {toggle === "all" &&
                      projects.map((project) => (
                          <ProjectCard
                              project={project}
                              openModal={openModal}
                              setOpenModal={setOpenModal}
                          />
                      ))}
                  {projects
                      .filter((item) => item.category == toggle)
                      .map((project) => (
                          <ProjectCard
                              project={project}
                              openModal={openModal}
                              setOpenModal={setOpenModal}
                          />
                      ))}
              </CardContainer>
          </Wrapper>
      </Container>
  )
}

export default Projects