const container = document.getElementById("projectContainer");

projects.forEach(project => {

    container.innerHTML += `
    
    <div class="project-card">
        <img src="${project.image}" alt="${project.title}">
        
        <h3>${project.title}</h3>
        
        <p>${project.description}</p>
        
        <span>${project.tech}</span>
        
        <a href="${project.github}" target="_blank">
            GitHub →
        </a>
    </div>
    
    `;
});
