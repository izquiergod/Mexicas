document.addEventListener('DOMContentLoaded', function() {
    // Partículas flotantes
    const canvas = document.getElementById('floating-particles');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 0.5 - 0.25,
            color: `rgba(212, 167, 106, ${Math.random() * 0.5 + 0.1})`
        });
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            
            p.x += p.speedX;
            p.y += p.speedY;
            
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        }
        
        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Modal de dioses
    const godCards = document.querySelectorAll('.god-card');
    const modal = document.getElementById('god-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalGodName = document.getElementById('modal-god-name');
    const modalGodImage = document.getElementById('modal-god-image');
    const modalGodDesc = document.getElementById('modal-god-description');

    const godData = {
        huitzilopochtli: {
            name: "Huitzilopochtli",
            description: "Huitzilopochtli, cuyo nombre significa 'Colibrí Zurdo' o 'Colibrí del Sur', era el dios del sol y la guerra, patrón de los mexicas. Según el mito, nació de Coatlicue ya adulto y completamente armado para defender a su madre de sus hermanos, los Centzon Huitznáhuac (las estrellas del sur) y Coyolxauhqui (la luna). Los mexicas creían que necesitaban alimentarlo con sangre humana para mantener su fuerza y asegurar que el sol siguiera su curso cada día.",
            image: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Huitzilopochtli_V.png"
        },
        tlaloc: {
            name: "Tláloc",
            description: "Tláloc era el dios de la lluvia, la fertilidad y los relámpagos. Vivía en el Tlalocan, un paraíso donde iban aquellos que morían por causas relacionadas con el agua. Era representado con ojos grandes y redondos y colmillos de jaguar. Los mexicas realizaban ceremonias para honrarlo, especialmente durante la temporada de lluvias. Los niños eran sacrificados a Tláloc porque se creía que sus lágrimas traían la lluvia.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Tlaloc_glyph.svg/800px-Tlaloc_glyph.svg.png"
        },
        quetzalcoatl: {
            name: "Quetzalcóatl",
            description: "Quetzalcóatl, la 'Serpiente Emplumada', era uno de los dioses más importantes de Mesoamérica. Representaba el viento (Ehecatl), la sabiduría, el conocimiento y el planeta Venus. Era considerado el inventor de los libros y el calendario, dador del maíz a la humanidad y protector de los artesanos. Según la leyenda, se autoexilió prometiendo regresar, lo que jugó un papel importante durante la conquista española.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Quetzalcoatl.svg/800px-Quetzalcoatl.svg.png"
        },
        tezcatlipoca: {
            name: "Tezcatlipoca",
            description: "Tezcatlipoca, el 'Espejo Humeante', era el dios de la noche, la hechicería y el destino. Era omnipresente y omnipotente, conocido como el 'Señor del Cerca y el Junto'. Representaba la tentación, el conflicto y el cambio. En el Tóxcatl, se elegía a un joven perfecto para representar a Tezcatlipoca durante un año, viviendo como un dios antes de ser sacrificado. Su pie estaba reemplazado por un espejo de obsidiana que mostraba el futuro.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Tezcatlipoca.svg/800px-Tezcatlipoca.svg.png"
        }
    };

    godCards.forEach(card => {
        card.addEventListener('click', function() {
            const godClass = this.querySelector('.god-image').classList[1];
            const god = godData[godClass];
            
            modalGodName.textContent = god.name;
            modalGodImage.style.backgroundImage = `url(${god.image})`;
            modalGodDesc.textContent = god.description;
            
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Funcionalidad del calendario
const exploreCalendarBtn = document.getElementById('explore-calendar');
const calendarModal = document.getElementById('calendar-modal');
const closeCalendarModal = document.querySelector('#calendar-modal .close-modal');
const zoomableCalendar = document.getElementById('zoomable-calendar');
const calendarParts = document.querySelectorAll('.calendar-parts li');
const calendarPartInfo = document.getElementById('calendar-part-info');

// Información detallada de cada parte del calendario
const calendarPartsData = {
    center: {
        title: "Tonatiuh - Dios Sol",
        description: "En el centro del calendario se encuentra Tonatiuh, el dios Sol. Su lengua representa un cuchillo de sacrificio, simbolizando la necesidad de alimentar al sol con sangre humana para mantener su movimiento."
    },
    ring1: {
        title: "Los 4 Soles anteriores",
        description: "Los cuatro cuadrados alrededor de Tonatiuh representan las cuatro eras cosmológicas previas, cada una destruida por cataclismos diferentes: tierra, viento, fuego y agua."
    },
    ring2: {
        title: "Los 20 días del mes",
        description: "Este anillo contiene los 20 días del mes mexica, cada uno representado por un glifo diferente. Estos días combinados con números del 1 al 13 formaban el tonalpohualli (calendario sagrado de 260 días)."
    },
    ring3: {
        title: "Símbolos estelares",
        description: "Este anillo contiene símbolos que representan estrellas y posiblemente constelaciones importantes en la cosmovisión mexica, mostrando su conocimiento astronómico."
    },
    outer: {
        title: "Serpientes de fuego",
        description: "Las dos serpientes que rodean el calendario representan Xiuhcóatl, la serpiente de fuego. Simbolizan el tiempo y su naturaleza cíclica, además de ser asociadas con el dios Huitzilopochtli."
    }
};

// Abrir modal del calendario
exploreCalendarBtn.addEventListener('click', function() {
    calendarModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

// Zoom en la imagen del calendario
zoomableCalendar.addEventListener('click', function() {
    this.classList.toggle('zoomed');
    
    // Si está zoomed, cambiar el cursor a grab para permitir arrastrar
    if (this.classList.contains('zoomed')) {
        let posX = 0, posY = 0, mouseX = 0, mouseY = 0;
        
        this.addEventListener('mousedown', function(e) {
            e.preventDefault();
            mouseX = e.clientX;
            mouseY = e.clientY;
            this.style.cursor = 'grabbing';
            
            document.addEventListener('mousemove', moveImage);
            document.addEventListener('mouseup', function() {
                document.removeEventListener('mousemove', moveImage);
                this.style.cursor = 'grab';
            });
        });
        
        function moveImage(e) {
            posX += e.clientX - mouseX;
            posY += e.clientY - mouseY;
            zoomableCalendar.style.transform = `scale(1.8) translate(${posX}px, ${posY}px)`;
            mouseX = e.clientX;
            mouseY = e.clientY;
        }
    }
});

// Mostrar información de partes del calendario
calendarParts.forEach(part => {
    part.addEventListener('click', function() {
        // Remover clases activas primero
        calendarParts.forEach(p => p.classList.remove('active'));
        
        // Añadir clase activa al elemento clickeado
        this.classList.add('active');
        
        // Obtener el tipo de parte
        const partType = this.getAttribute('data-part');
        const partData = calendarPartsData[partType];
        
        // Mostrar información
        calendarPartInfo.innerHTML = `
            <h4>${partData.title}</h4>
            <p>${partData.description}</p>
        `;
    });
});

// Cerrar modal
closeCalendarModal.addEventListener('click', function() {
    calendarModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    zoomableCalendar.classList.remove('zoomed');
    zoomableCalendar.style.transform = 'scale(1)';
});

// Cerrar al hacer clic fuera del modal
window.addEventListener('click', function(e) {
    if (e.target === calendarModal) {
        calendarModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        zoomableCalendar.classList.remove('zoomed');
        zoomableCalendar.style.transform = 'scale(1)';
    }
});
    

    // Slider del Templo Mayor
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slide-prev');
    const nextBtn = document.querySelector('.slide-next');
    let currentSlide = 0;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

    // Trivia
    const triviaQuestions = [
        {
            question: "¿En qué año fue fundada Tenochtitlán según la tradición mexica?",
            options: ["1200", "1325", "1428", "1521"],
            answer: 1,
            reference: "Sección de Historia - Línea de tiempo"
        },
        {
            question: "¿Qué significa el nombre 'Huitzilopochtli'?",
            options: ["Serpiente emplumada", "Colibrí zurdo", "Espejo humeante", "Señor de la lluvia"],
            answer: 1,
            reference: "Sección de Religión - Información sobre Huitzilopochtli"
        },
        {
            question: "¿Qué representaba el águila sobre el nopal en la fundación de Tenochtitlán?",
            options: ["La señal para fundar la ciudad", "Un presagio de guerra", "La llegada de los españoles", "El fin del mundo"],
            answer: 0,
            reference: "Sección de Historia - Fundación de Tenochtitlán"
        },
        {
            question: "¿Cómo se llamaba el mercado principal de Tenochtitlán?",
            options: ["Tlatelolco", "Teotihuacán", "Cholula", "Xochimilco"],
            answer: 0,
            reference: "Sección de Arquitectura - Información sobre Tenochtitlán"
        },
        {
            question: "¿Qué era el 'Tzompantli'?",
            options: ["Un tipo de pirámide", "Un sistema de escritura", "Un altar para cráneos", "Un calendario sagrado"],
            answer: 2,
            reference: "Sección de Religión - Templo Mayor"
        },
        {
            question: "¿Qué dios mexica era representado con un espejo de obsidiana?",
            options: ["Quetzalcóatl", "Tláloc", "Tezcatlipoca", "Huitzilopochtli"],
            answer: 2,
            reference: "Sección de Religión - Información sobre Tezcatlipoca"
        },
        {
            question: "¿Cómo se llamaba la clase comerciante en la sociedad mexica?",
            options: ["Pipiltin", "Macehualtin", "Pochtecas", "Tlacotin"],
            answer: 2,
            reference: "Sección de Sociedad - Pirámide social"
        },
        {
            question: "¿Qué ciclo representaba la Piedra del Sol de 260 días?",
            options: ["Xiuhpohualli", "Tonalpohualli", "Metztli", "Cempoalli"],
            answer: 1,
            reference: "Sección de Religión - Piedra del Sol"
        },
        {
            question: "¿Con qué otras ciudades formó la Triple Alianza el imperio mexica?",
            options: ["Tlaxcala y Cholula", "Texcoco y Tlacopan", "Xochimilco y Tlatelolco", "Teotihuacán y Tula"],
            answer: 1,
            reference: "Sección de Historia - Línea de tiempo"
        },
        {
            question: "¿Qué dios mexica estaba asociado con la lluvia y los relámpagos?",
            options: ["Huitzilopochtli", "Tláloc", "Xipe Tótec", "Mixcóatl"],
            answer: 1,
            reference: "Sección de Religión - Galería de dioses"
        }
    ];

    const questionText = document.getElementById('question-text');
    const optionBtns = document.querySelectorAll('.trivia-option');
    const resultDiv = document.querySelector('.trivia-result');
    const resultText = document.getElementById('result-text');
    const nextBtnTrivia = document.getElementById('next-question');
    const scoreDisplay = document.querySelector('.score-display');
    const scoreBar = document.querySelector('.score-bar');

    let currentQuestion = 0;
    let score = 0;
    let quizActive = true;

    function loadQuestion() {
        quizActive = true;
        const question = triviaQuestions[currentQuestion];
        questionText.textContent = question.question;
        
        optionBtns.forEach((btn, index) => {
            btn.textContent = question.options[index];
            btn.style.backgroundColor = '';
            btn.style.borderColor = '';
        });
        
        resultDiv.style.display = 'none';
    }

    function showResult(isCorrect) {
        quizActive = false;
        resultDiv.style.display = 'block';
        
        const resultIcon = resultDiv.querySelector('.result-icon');
        if (isCorrect) {
            resultIcon.innerHTML = '<i class="fas fa-check-circle" style="color: #4CAF50;"></i>';
            resultText.textContent = '¡Correcto!';
            score++;
        } else {
            resultIcon.innerHTML = '<i class="fas fa-times-circle" style="color: #F44336;"></i>';
            const correctAnswer = triviaQuestions[currentQuestion].options[triviaQuestions[currentQuestion].answer];
            const reference = triviaQuestions[currentQuestion].reference;
            resultText.innerHTML = `Incorrecto. La respuesta correcta es: <strong>${correctAnswer}</strong><br><small>Puedes encontrar esta información en: ${reference}</small>`;
        }
        
        updateScore();
    }

    function updateScore() {
        scoreDisplay.textContent = `${score}/${triviaQuestions.length}`;
        const percentage = (score / triviaQuestions.length) * 100;
        scoreBar.style.width = `${percentage}%`;
    }

    optionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (!quizActive) return;
            
            const selectedIndex = Array.from(optionBtns).indexOf(this);
            const isCorrect = selectedIndex === triviaQuestions[currentQuestion].answer;
            
            // Resaltar respuesta correcta
            optionBtns[triviaQuestions[currentQuestion].answer].style.backgroundColor = '#4CAF50';
            optionBtns[triviaQuestions[currentQuestion].answer].style.borderColor = '#4CAF50';
            
            // Resaltar respuesta incorrecta si es el caso
            if (!isCorrect) {
                this.style.backgroundColor = '#F44336';
                this.style.borderColor = '#F44336';
            }
            
            showResult(isCorrect);
        });
    });

    nextBtnTrivia.addEventListener('click', function() {
        currentQuestion++;
        if (currentQuestion < triviaQuestions.length) {
            loadQuestion();
        } else {
            // Fin del quiz
            questionText.textContent = `¡Quiz completado! Tu puntuación final es ${score}/${triviaQuestions.length}`;
            document.querySelector('.trivia-options').style.display = 'none';
            resultDiv.style.display = 'none';
            nextBtnTrivia.style.display = 'none';
            
            // Mostrar mensaje final según puntuación
            const finalMessage = document.createElement('p');
            finalMessage.style.textAlign = 'center';
            finalMessage.style.marginTop = '1rem';
            finalMessage.style.fontWeight = 'bold';
            
            const percentage = (score / triviaQuestions.length) * 100;
            if (percentage >= 80) {
                finalMessage.textContent = '¡Excelente! Eres un verdadero conocedor de la cultura mexica.';
                finalMessage.style.color = '#4CAF50';
            } else if (percentage >= 50) {
                finalMessage.textContent = 'Buen trabajo, pero aún hay mucho por aprender sobre los mexicas.';
                finalMessage.style.color = '#FFC107';
            } else {
                finalMessage.textContent = 'Puedes mejorar. Te invitamos a explorar más sobre esta fascinante cultura.';
                finalMessage.style.color = '#F44336';
            }
            
            document.querySelector('.trivia-question').appendChild(finalMessage);
        }
    });

    // Iniciar trivia
    loadQuestion();

    // Efecto zoom en la imagen de Tenochtitlán
    const zoomInBtn = document.querySelector('.zoom-in');
    const zoomOutBtn = document.querySelector('.zoom-out');
    const cityImage = document.querySelector('.city-image');
    let scale = 1;

    zoomInBtn.addEventListener('click', function() {
        scale += 0.1;
        cityImage.style.transform = `scale(${scale})`;
    });

    zoomOutBtn.addEventListener('click', function() {
        if (scale > 0.5) {
            scale -= 0.1;
            cityImage.style.transform = `scale(${scale})`;
        }
    });

    // Redimensionar canvas al cambiar tamaño de ventana
    window.addEventListener('resize', function() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    });

    // Scroll reveal animation
    const scrollElements = document.querySelectorAll('.section, .section-header, .timeline-item, .god-card, .aztec-calendar, .tenochtitlan-model, .templo-mayor');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        })
    }

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Inicializar animaciones al cargar
    handleScrollAnimation();
});