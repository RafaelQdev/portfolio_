// ===== MENU MÓVEL =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
    navLinks?.classList.toggle('active');
});

// Fechar menu quando clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks?.classList.remove('active');
    });
});

// ===== SMOOTH SCROLL PARA NAVBAR =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== ANIMAÇÃO AO SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.projeto-card, .skill-category, .cert-item, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ===== FORMULÁRIO DE CONTATO =====
const contatoForm = document.getElementById('contatoForm');

contatoForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contatoForm);
    const name = formData.get('name') || 'Visitante';
    
    // Simular envio
    const btn = contatoForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    
    btn.textContent = '✅ Mensagem enviada!';
    btn.disabled = true;
    btn.style.opacity = '0.7';
    
    // Abrir email com pre-preenchido
    const email = 'rafaelqdev@gmail.com';
    const subject = 'Contato via Portfólio';
    const body = encodeURIComponent(`Olá Rafael,\n\nMeu nome é ${name}.\n\nMensagem:\n${contatoForm.querySelector('textarea').value}`);
    
    // Limpar formulário
    contatoForm.reset();
    
    // Restaurar botão após 3 segundos
    setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.opacity = '1';
    }, 3000);
    
    // Abrir cliente de email
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${body}`;
});

// ===== NAVBAR ATIVA NO SCROLL =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar?.style.boxShadow = 'var(--shadow-md)';
    } else {
        navbar?.style.boxShadow = 'var(--shadow-sm)';
    }

    // Atualizar link ativo na navbar
    updateActiveNavLink();
});

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
        }
    });
}

// ===== EFEITO DE DIGITAÇÃO PARA TÍTULO =====
const titleElement = document.querySelector('.hero-title');
const titleText = titleElement?.textContent || '';

function typeEffect(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';
    
    const type = () => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    };
    
    // Descomentar para habilitar efeito de digitação
    // type();
}

// ===== CONTADOR DE PÁGINA =====
let isVisible = false;
const stats = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !isVisible) {
            isVisible = true;
            stats.forEach(stat => {
                const finalValue = parseInt(stat.textContent);
                animateCounter(stat, finalValue);
            });
        }
    });
});

const statsSection = document.querySelector('.sobre-stats');
if (statsSection) {
    counterObserver.observe(statsSection);
}

function animateCounter(element, finalValue) {
    let currentValue = 0;
    const increment = Math.ceil(finalValue / 30);
    
    const counter = setInterval(() => {
        currentValue += increment;
        
        if (currentValue >= finalValue) {
            element.textContent = finalValue;
            clearInterval(counter);
        } else {
            element.textContent = currentValue;
        }
    }, 50);
}

// ===== PARALLAX EFFECT =====
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    if (hero) {
        const scrollY = window.scrollY;
        hero.style.backgroundPosition = `center ${scrollY * 0.5}px`;
    }
});

// ===== COPIAR EMAIL =====
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Permitir comportamento padrão
        // Ou implementar cópia para clipboard aqui se desejar
    });
});

// ===== ANALYTICS SIMPLES =====
console.log('🚀 Bem-vindo ao portfólio de Rafael Queiroz!');
console.log('📧 Entre em contato: rafaelqdev@gmail.com');
console.log('💼 LinkedIn: https://www.linkedin.com/in/rafaelqdev');
console.log('💻 GitHub: https://github.com/RafaelQdev');

// ===== DARK MODE (Opcional) =====
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

if (prefersDarkMode.matches) {
    // Implementar modo escuro se necessário
    document.body.classList.add('dark-mode');
}

// ===== LOG DE TEMPO =====
const startTime = Date.now();
window.addEventListener('beforeunload', () => {
    const timeSpent = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`⏱️ Tempo na página: ${timeSpent}s`);
});
