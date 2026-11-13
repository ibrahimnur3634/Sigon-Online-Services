const welcomeIntro = document.getElementById('welcomeIntro');
const introProgress = document.getElementById('introProgress');
const introProgressFill = document.getElementById('introProgressFill');
const introPercent = document.getElementById('introPercent');

if (welcomeIntro) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let introSeen = false;

    try {
        introSeen = localStorage.getItem('sigon-intro-seen') === 'true';
    } catch (error) {
        console.warn('The welcome intro preference could not be read.', error);
    }

    if (reducedMotion || introSeen) {
        welcomeIntro.hidden = true;
    } else {
        const introDuration = 1200;
        const introFadeDuration = 300;
        const introStartedAt = performance.now();

        try {
            localStorage.setItem('sigon-intro-seen', 'true');
        } catch (error) {
            console.warn('The welcome intro preference could not be saved.', error);
        }

        document.documentElement.classList.add('intro-enabled');
        document.body.classList.add('intro-active');
        welcomeIntro.setAttribute('aria-hidden', 'false');

        function finishWelcomeIntro() {
            if (introProgressFill && introProgress && introPercent) {
                introProgressFill.style.width = '100%';
                introProgress.setAttribute('aria-valuenow', '100');
                introPercent.textContent = '100%';
            }

            welcomeIntro.classList.add('is-leaving');
            welcomeIntro.hidden = true;
            welcomeIntro.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('intro-active');
            document.documentElement.classList.remove('intro-enabled');
        }

        function updateWelcomeIntro(now) {
            if (!introProgressFill || !introProgress || !introPercent) {
                return;
            }

            const elapsed = Math.max(0, Math.min(now - introStartedAt, introDuration));
            const progress = Math.round((elapsed / introDuration) * 100);

            introProgressFill.style.width = `${progress}%`;
            introProgress.setAttribute('aria-valuenow', String(progress));
            introPercent.textContent = `${progress}%`;

            if (elapsed < introDuration) {
                requestAnimationFrame(updateWelcomeIntro);
            }
        }

        window.setTimeout(() => welcomeIntro.classList.add('is-leaving'),
            introDuration - introFadeDuration);
        window.setTimeout(finishWelcomeIntro, introDuration);
        requestAnimationFrame(updateWelcomeIntro);
    }
}

const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', String(isOpen));
        menuBtn.textContent = isOpen ? '✕' : '☰';
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.textContent = '☰';
        });
    });
}

const serviceLinks = document.querySelectorAll('[data-service]');
if (serviceLinks.length) {
    serviceLinks.forEach(link => {
        link.addEventListener('click', () => {
            const serviceChoice = document.getElementById('serviceChoice');
            if (serviceChoice) {
                serviceChoice.value = link.dataset.service;
            }
        });
    });
}

const contactForm = document.getElementById('contactForm');
const serviceChoice = document.getElementById('serviceChoice');

if (serviceChoice) {
    const requestedService = new URLSearchParams(window.location.search).get('service');
    const matchingOption = [...serviceChoice.options].find(option => option.value === requestedService);
    if (matchingOption) {
        serviceChoice.value = matchingOption.value;
    }
}

if (contactForm) {
    contactForm.addEventListener('submit', event => {
        event.preventDefault();

        const name = document.getElementById('customerName').value.trim();
        const phone = document.getElementById('customerPhone').value.trim();
        const service = document.getElementById('serviceChoice').value;
        const message = document.getElementById('customerMessage').value.trim();

        if (!name || !phone || !service || !message) {
            alert('Please fill in all the fields.');
            return;
        }

        const text =
            `Hello Sigon Online Services!\n\n` +
            `My name is ${name}.\n` +
            `My phone number is ${phone}.\n` +
            `Service needed: ${service}\n` +
            `Details: ${message}\n\n` +
            `Please assist me. Thank you.`;

        const whatsappURL =
            'https://wa.me/254759240255?text=' + encodeURIComponent(text);

        window.open(whatsappURL, '_blank', 'noopener,noreferrer');
    });
}

const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

const founderSection = document.getElementById('about');

if (founderSection && 'IntersectionObserver' in window) {
    founderSection.classList.add('reveal-pending');

    const founderObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                founderSection.classList.remove('reveal-pending');
                founderSection.classList.add('is-revealed');
                founderObserver.unobserve(founderSection);
            }
        });
    }, { threshold: 0.18 });

    founderObserver.observe(founderSection);
} else if (founderSection) {
    founderSection.classList.add('is-revealed');
}

const installButton = document.getElementById('installAppButton');
const installDialog = document.getElementById('installHelpDialog');
const installDialogDescription = document.getElementById('installHelpDescription');
const installDialogClose = document.getElementById('installHelpClose');

if (installButton) {
    const standaloneQuery = window.matchMedia('(display-mode: standalone)');
    const navbar = installButton.closest('.navbar');
    const navActions = installButton.closest('.nav-actions');
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const supportsPwa = window.isSecureContext &&
        'serviceWorker' in navigator;
    let deferredInstallPrompt = null;
    let installed = standaloneQuery.matches || navigator.standalone === true;

    if (navbar && navActions && menuBtn) {
        navbar.insertBefore(navActions, menuBtn);
    }

    installButton.querySelector('span').textContent = 'Install App';

    function hideInstallButton() {
        installButton.hidden = true;
    }

    function showInstallInstructions(iosInstructions) {
        if (!installDialogDescription || !installDialog) {
            return;
        }

        installDialogDescription.replaceChildren();

        const intro = document.createElement('p');
        const steps = document.createElement('ol');
        const instructions = iosInstructions
            ? [
                'Tap the Share button in Safari.',
                'Choose “Add to Home Screen” from the Share menu.',
                'Tap “Add” to install Sigon Online Services.'
            ]
            : [
                'Open your browser menu for this site.',
                'Choose “Install app” or “Add to Home screen”.',
                'Confirm to add Sigon Online Services to your device.'
            ];

        intro.textContent = iosInstructions
            ? 'Install Sigon Online Services on your iPhone or iPad:'
            : 'Install Sigon Online Services from your browser menu:';
        installDialogDescription.appendChild(intro);

        instructions.forEach(instruction => {
            const step = document.createElement('li');
            step.textContent = instruction;
            steps.appendChild(step);
        });

        installDialogDescription.appendChild(steps);

        if (typeof installDialog.showModal === 'function') {
            installDialog.showModal();
        } else {
            installDialog.setAttribute('open', '');
        }
    }

    function markAppInstalled() {
        installed = true;
        deferredInstallPrompt = null;
        hideInstallButton();
    }

    if (installed) {
        hideInstallButton();
    } else {
        installButton.hidden = false;
    }

    window.addEventListener('beforeinstallprompt', event => {
        event.preventDefault();
        if (installed) {
            return;
        }
        deferredInstallPrompt = event;
        installButton.hidden = false;
    });

    window.addEventListener('appinstalled', markAppInstalled);

    const handleDisplayModeChange = event => {
        if (event.matches) {
            markAppInstalled();
        }
    };

    if (typeof standaloneQuery.addEventListener === 'function') {
        standaloneQuery.addEventListener('change', handleDisplayModeChange);
    } else if (typeof standaloneQuery.addListener === 'function') {
        standaloneQuery.addListener(handleDisplayModeChange);
    }

    installButton.addEventListener('click', async () => {
        if (navMenu) {
            navMenu.classList.remove('open');
        }
        if (menuBtn) {
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.textContent = '☰';
        }

        if (installed) {
            hideInstallButton();
            return;
        }

        if (!deferredInstallPrompt) {
            showInstallInstructions(isIOS);
            return;
        }

        const installPrompt = deferredInstallPrompt;
        deferredInstallPrompt = null;
        try {
            await installPrompt.prompt();
            const choice = await installPrompt.userChoice;
            if (choice.outcome === 'accepted') {
                markAppInstalled();
            }
        } catch (error) {
            console.error('Sigon app installation prompt failed:', error);
        }
    });

    if (installDialog && installDialogClose) {
        installDialogClose.addEventListener('click', () => {
            if (typeof installDialog.close === 'function') {
                installDialog.close();
            } else {
                installDialog.removeAttribute('open');
            }
        });

        installDialog.addEventListener('click', event => {
            if (event.target === installDialog &&
                typeof installDialog.close === 'function') {
                installDialog.close();
            }
        });
    }

    if (supportsPwa) {
        navigator.serviceWorker.register('./service-worker.js')
            .catch(error => {
                console.error('Sigon service worker registration failed:', error);
            });
    }
}
