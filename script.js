document.addEventListener('DOMContentLoaded', () => {

    // --- DATOS DE LOS PROYECTOS DEL PORTAFOLIO ---
    // Agrega aquí tus proyectos.
    // Categorías disponibles: 'web', 'design', 'mobile'
    const proyectos = [
        {
            id: 1,
            title: 'Plataforma de E-learning',
            category: 'web',
            img: 'img/proyecto1.jpg',
            description: 'Una plataforma web completa para cursos online, con gestión de usuarios, pagos y contenido interactivo. Desarrollada con el stack MERN.',
            techs: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
            liveLink: '#',
            repoLink: '#'
        },
        {
            id: 2,
            title: 'Rediseño de Marca para "Café del Sol"',
            category: 'design',
            img: 'img/proyecto2.jpg',
            description: 'Proyecto de branding y diseño de identidad visual para una cafetería local. Incluyó logotipo, paleta de colores, tipografía y mockups de packaging.',
            techs: ['Figma', 'Adobe Illustrator', 'Photoshop'],
            liveLink: '#',
            repoLink: '#'
        },
        {
            id: 3,
            title: 'App de Fitness "Actívate"',
            category: 'mobile',
            img: 'img/proyecto3.jpg',
            description: 'Aplicación móvil para seguimiento de entrenamientos y nutrición. Diseño de interfaz de usuario y prototipado interactivo.',
            techs: ['React Native', 'Firebase', 'Figma'],
            liveLink: '#',
            repoLink: '#'
        },
        {
            id: 4,
            title: 'Dashboard de Análisis de Datos',
            category: 'web',
            img: 'img/proyecto4.jpg',
            description: 'Dashboard interactivo que visualiza datos de ventas en tiempo real, con gráficos y reportes personalizables.',
            techs: ['Vue.js', 'D3.js', 'Node.js', 'PostgreSQL'],
            liveLink: '#',
            repoLink: '#'
        }
    ];

    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    function renderProjects(filter = 'all') {
        portfolioGrid.innerHTML = '';
        const filteredProjects = filter === 'all' 
            ? proyectos 
            : proyectos.filter(p => p.category === filter);

        filteredProjects.forEach(proyecto => {
            const projectItem = document.createElement('div');
            projectItem.className = 'portfolio-item';
            projectItem.dataset.id = proyecto.id;
            
            projectItem.innerHTML = `
                <img src="${proyecto.img}" alt="${proyecto.title}">
                <div class="overlay">
                    <h4>${proyecto.title}</h4>
                    <p>Ver más</p>
                </div>
            `;
            portfolioGrid.appendChild(projectItem);
        });
    }

    // --- EFECTO DE ESCRITURA (TYPING EFFECT) ---
    const typingElement = document.querySelector('.typing-effect');
    const words = ["[Tu Profesión]", "Desarrollador Full-Stack", "Diseñador UI/UX", "Apasionado por la Tecnología"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        const currentChar = isDeleting 
            ? currentWord.substring(0, charIndex - 1) 
            : currentWord.substring(0, charIndex + 1);
        
        typingElement.textContent = currentChar;
        charIndex += isDeleting ? -1 : 1;

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 75 : 150);
        }
    }
    
    // --- NAVEGACIÓN ACTIVA AL HACER SCROLL ---
    const navLinks = document.querySelectorAll('.sidebar-menu a');
    const sections = document.querySelectorAll('.content-section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- MOSTRAR SECCIONES AL HACER SCROLL (INTERSECTION OBSERVER) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- FILTRADO DEL PORTAFOLIO ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderProjects(button.dataset.filter);
        });
    });

    // --- LÓGICA DE LA VENTANA MODAL ---
    const modal = document.getElementById('portfolio-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalTechs = document.getElementById('modal-techs');
    const modalLiveLink = document.getElementById('modal-live-link');
    const modalRepoLink = document.getElementById('modal-repo-link');
    const closeButton = document.querySelector('.close-button');

    portfolioGrid.addEventListener('click', (e) => {
        const item = e.target.closest('.portfolio-item');
        if (item) {
            const projectId = parseInt(item.dataset.id);
            const project = proyectos.find(p => p.id === projectId);
            
            if (project) {
                modalImg.src = project.img;
                modalTitle.textContent = project.title;
                modalDescription.textContent = project.description;
                
                modalTechs.innerHTML = project.techs.map(tech => `<span>${tech}</span>`).join('');
                
                modalLiveLink.href = project.liveLink;
                modalRepoLink.href = project.repoLink;
                
                modal.classList.add('active');
            }
        }
    });

    const closeModal = () => {
        modal.classList.remove('active');
    };

    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // --- INICIALIZACIÓN ---
    type();
    renderProjects();
});