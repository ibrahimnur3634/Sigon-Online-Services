const welcomeIntro = document.getElementById('welcomeIntro');
const introProgress = document.getElementById('introProgress');
const introProgressFill = document.getElementById('introProgressFill');
const introPercent = document.getElementById('introPercent');
const introDuration = 3000;
const introFadeDuration = 400;
const introStartedAt = window.sigonIntroStart || performance.now();

document.body.classList.add('intro-active');

function finishWelcomeIntro() {
    introProgressFill.style.width = '100%';
    introProgress.setAttribute('aria-valuenow', '100');
    introPercent.textContent = '100%';
    welcomeIntro.classList.add('is-leaving');
    welcomeIntro.hidden = true;
    welcomeIntro.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('intro-active');
    document.documentElement.classList.remove('intro-enabled');
}

function updateWelcomeIntro(now) {
    const elapsed = Math.max(0, Math.min(now - introStartedAt, introDuration));
    const progress = Math.round((elapsed / introDuration) * 100);

    introProgressFill.style.width = `${progress}%`;
    introProgress.setAttribute('aria-valuenow', String(progress));
    introPercent.textContent = `${progress}%`;

    if (elapsed < introDuration) {
        requestAnimationFrame(updateWelcomeIntro);
    }
}

const timeUntilFade = Math.max(
    0,
    introDuration - introFadeDuration - (performance.now() - introStartedAt)
);
const timeUntilFinish = Math.max(
    0,
    introDuration - (performance.now() - introStartedAt)
);

window.setTimeout(() => welcomeIntro.classList.add('is-leaving'), timeUntilFade);
window.setTimeout(finishWelcomeIntro, timeUntilFinish);
requestAnimationFrame(updateWelcomeIntro);

const menuBtn = document.getElementById('menuBtn');
    const navMenu = document.getElementById('navMenu');

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

    document.querySelectorAll('[data-service]').forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('serviceChoice').value =
                link.dataset.service;
        });
    });

    document.getElementById('contactForm').addEventListener('submit', event => {
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

    document.getElementById('year').textContent =
        new Date().getFullYear();

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
    const standaloneQuery = window.matchMedia('(display-mode: standalone)');
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const supportsPwa = window.isSecureContext &&
        'serviceWorker' in navigator;
    let deferredInstallPrompt = null;
    let installed = standaloneQuery.matches || navigator.standalone === true;

    function hideInstallButton() {
        installButton.hidden = true;
    }

    function showInstallInstructions(iosInstructions) {
        installDialogDescription.replaceChildren();

        const intro = document.createElement('p');
        const steps = document.createElement('ol');
        const instructions = iosInstructions
            ? [
                'Tap the Share button in Safari.',
                'Scroll down and choose “Add to Home Screen”.',
                'Tap “Add” to confirm and install Sigon Earn.'
            ]
            : [
                'Open your browser menu for this site.',
                'Choose “Install app” or “Add to Home screen”.',
                'Confirm to add Sigon Earn to your device.'
            ];

        intro.textContent = iosInstructions
            ? 'Add Sigon Earn to your iPhone or iPad Home Screen:'
            : 'Install Sigon Earn from your browser menu:';
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

    if (supportsPwa && !installed && installButton) {
        if (isIOS) {
            installButton.hidden = false;
        }

        window.addEventListener('beforeinstallprompt', event => {
            event.preventDefault();
            deferredInstallPrompt = event;
            if (!installed) {
                installButton.hidden = false;
            }
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
            navMenu.classList.remove('open');
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.textContent = '☰';

            if (installed) {
                hideInstallButton();
                return;
            }

            if (isIOS && !deferredInstallPrompt) {
                showInstallInstructions(true);
                return;
            }

            if (!deferredInstallPrompt) {
                showInstallInstructions(false);
                return;
            }

            const installPrompt = deferredInstallPrompt;
            deferredInstallPrompt = null;
            await installPrompt.prompt();
            const choice = await installPrompt.userChoice;

            if (choice.outcome === 'accepted') {
                markAppInstalled();
            } else if (!installed) {
                installButton.querySelector('span').textContent =
                    'Install from browser menu';
            }
        });
    }

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
