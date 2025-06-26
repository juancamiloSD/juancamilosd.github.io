document.addEventListener('DOMContentLoaded', () => {

   const proyectos = [
        {
            id: 1,
            title: 'Sitio web Cresi',
            category: 'web',
            img: 'images/cresi.png',
            description: 'Sitio web que ofrece tarjeta de credito de almacenes el si',
            techs: ['Wordpress', 'mySql'],
            liveLink: 'https://www.cresi.com.co/',
        },
        {
            id: 2,
            title: 'Sitio web Prevengo"',
            category: 'web',
            img: 'images/prevengo.png',
            description: 'Sitio web que ofrece tarjeta preferencial de seguros y servicios de salud.',
            techs: ['Wordpress', 'mySql'],
            liveLink: 'https://prevengo.com.co/',
        },
        {
            id: 3,
            title: 'Sitio web Dentark"',
            category: 'web',
            img: 'images/dentark.png',
            description: 'Sitio web que ofrece servicios odontológicos y de salud bucal',
            techs: ['Wordpress', 'mySql'],
            liveLink: 'https://dentarkclinicaorofacial.com/',
        },
        {
            id: 4,
            title: 'App Bolivar Conmigo',
            category: 'mobile',
            img: 'images/bolivar.jpg',
            description: 'Aplicación móvil que permite en mejorar el bienestar del usuario, autogestión en temas de movilidad y tener varios servicios de hogar. Aplicación disponible para Android e iOS.',
            techs: ['Wordpress', 'mySql'],
            liveLink: 'https://play.google.com/store/apps/details?id=com.segurosbolivar.bolivarconmigo&hl=es_CO&pli=1',
        },
        {
            id: 5,
            title: 'Sitio web Dra Daniela Benitez',
            category: 'web',
            img: 'images/dradanielabenitez.png',
            description: 'Sitio web que ofrece servicios de odontología y salud bucal',
            techs: ['Wordpress', 'mySql'],
            liveLink: 'https://dradanielabenitez.com/',
        },
        {
            id: 6,
            title: 'Sitio web Dra Andrea Vidal',
            category: 'web',
            img: 'images/drandreavidal.png',
            description: 'Sitio web que ofrece tratamientos de medicina estética y salud',
            techs: ['Wordpress', 'mySql'],
            liveLink: 'https://draandreavidal.com/',
        },
        {
            id: 7,
            title: 'Sitio web Dr Andrés Andrade',
            category: 'web',
            img: 'images/drandresandrade.png',
            description: 'Sitio web que ofrece tratamientos de medicina estética y salud',
            techs: ['Wordpress', 'mySql'],
            liveLink: 'https://drandresandrade.com/',
        },
        {
            id: 8,
            title: 'Sitio web Monte de Vida',
            category: 'web',
            img: 'images/montedevida.png',
            description: 'Sitio web productos de agua manantial',
            techs: ['Wordpress', 'mySql'],
            liveLink: 'https://montedevida.com/',
        },
        {
            id: 9,
            title: 'Sitio web Sharko Consultores',
            category: 'web',
            img: 'images/sharkoconsultores.png',
            description: 'Sitio web que ofrece servicios de consultoría y asesoría empresarial',
            techs: ['Wordpress', 'mySql'],
            liveLink: 'https://sharkoconsultores.com/',
        },
        {
            id: 10,
            title: 'Sitio web Shark Capital',
            category: 'web',
            img: 'images/sharkcapital.png',
            description: 'Sitio web que conecta inversionistas con proyectos de alto potencial',
            techs: ['Wordpress', 'mySql'],
            liveLink: 'https://sharkcapital.com/',
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

    const typingElement = document.querySelector('.typing-effect');
    const words = ["Ingeniero Multimedia", "Desarrollador Frontend", "Apasionado por la Tecnología"];
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

    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderProjects(button.dataset.filter);
        });
    });

    const modal = document.getElementById('portfolio-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalTechs = document.getElementById('modal-techs');
    const modalLiveLink = document.getElementById('modal-live-link');
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

    type();
    renderProjects();
});