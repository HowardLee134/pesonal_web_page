import React, { useState, useEffect } from 'react';
import { projectsData, projectsNav } from './Data';
import Workitems from './Workitems';

const Works = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [displayedProjects, setDisplayedProjects] = useState([]);

  useEffect(() => {
    const filteredProjects = activeFilter === 'all'
      ? projectsData
      : projectsData.filter(project => project.category.toLowerCase() === activeFilter);
    setDisplayedProjects(filteredProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
  }, [activeFilter, currentPage]);

  const totalPages = Math.ceil(projectsData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterClick = (itemName) => {
    setActiveFilter(itemName.toLowerCase());
    setCurrentPage(1); // Reset to page 1 when filter changes
  };

  return (
    <div>
      <div className='work__filters'>
        {projectsNav.map((navItem, index) => (
          <span
            key={index}
            onClick={() => handleFilterClick(navItem.name)}
            className={`${activeFilter === navItem.name.toLowerCase() ? 'active-work' : ''} work__item`}
          >
            {navItem.name}
          </span>
        ))}
      </div>
      <div className='work__container container grid'>
        {displayedProjects.map((project) => <Workitems key={project.id} item={project} />)}
      </div>
      <div className='work__pagination'>
        {[...Array(totalPages).keys()].map(number => (
          <button
            key={number + 1}
            onClick={() => handlePageChange(number + 1)}
            className={currentPage === number + 1 ? 'active' : ''}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Works;
