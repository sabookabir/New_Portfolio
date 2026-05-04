document.addEventListener('DOMContentLoaded', () => {
    // Scroll Progress Bar
    const progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        if(progressBar) {
            progressBar.style.width = scrollPercentage + '%';
        }
    });

    // Premium Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        // Add staggered delay to child cards if they are grouped
        if (el.classList.contains('stagger-group')) {
            const children = el.children;
            for(let i=0; i<children.length; i++) {
                children[i].style.transitionDelay = `${i * 100}ms`;
                children[i].classList.add('reveal');
                revealOnScroll.observe(children[i]);
            }
        } else {
            revealOnScroll.observe(el);
        }
    });

    // Active Navbar Link
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-primary', 'font-semibold');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('text-primary', 'font-semibold');
            }
        });
    });

    // Email Click to Copy
    const emailBtn = document.getElementById('copy-email');
    if (emailBtn) {
        emailBtn.addEventListener('click', (e) => {
            e.preventDefault();
            navigator.clipboard.writeText('kabirsaboo@example.com').then(() => {
                const originalText = emailBtn.innerHTML;
                emailBtn.innerHTML = 'Copied!';
                setTimeout(() => {
                    emailBtn.innerHTML = originalText;
                }, 2000);
            });
        });
    }

    // Contact Form Supabase Logic
    const form = document.getElementById('contact-form');
    if (form) {
        // Initialize Supabase
        const SUPABASE_URL = 'https://cacwyshpedssvjqothge.supabase.co';
        const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhY3d5c2hwZWRzc3ZqcW90aGdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4Nzc2NjYsImV4cCI6MjA5MzQ1MzY2Nn0.nxp37p2htnnyvd7WqTAA9Zmig2CiM6OgdMFfvOw3HR0';
        
        let supabaseClient;
        try {
            if (window.supabase) {
                supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            }
        } catch(e) {
            console.error("Supabase script not loaded or initialized correctly.");
        }

        const submitBtn = document.getElementById('submit-btn');
        const btnText = document.getElementById('btn-text');
        const btnIcon = document.getElementById('btn-icon');
        const btnLoader = document.getElementById('btn-loader');
        const feedback = document.getElementById('form-feedback');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if(!supabaseClient) {
                feedback.textContent = 'Setup required: Supabase client failed to initialize.';
                feedback.className = 'text-sm font-mono mt-4 text-center text-yellow-500 block';
                return;
            }

            // Set loading state
            btnText.textContent = 'Sending...';
            btnIcon.classList.add('hidden');
            btnLoader.classList.remove('hidden');
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-70', 'cursor-not-allowed');
            feedback.classList.add('hidden');

            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            try {
                const { data, error } = await supabaseClient
                    .from('contacts')
                    .insert([
                        { name, email, message }
                    ]);

                if (error) throw error;

                // Success
                form.reset();
                feedback.textContent = 'Message sent successfully! I will get back to you soon.';
                feedback.className = 'text-sm font-medium mt-4 text-center text-primary block';
            } catch (error) {
                console.error('Error submitting form:', error);
                feedback.textContent = 'Failed to send message. Please try again later.';
                feedback.className = 'text-sm font-medium mt-4 text-center text-red-500 block';
            } finally {
                // Reset loading state
                btnText.textContent = 'Send Message';
                btnIcon.classList.remove('hidden');
                btnLoader.classList.add('hidden');
                submitBtn.disabled = false;
                submitBtn.classList.remove('opacity-70', 'cursor-not-allowed');
            }
        });
    }
});
