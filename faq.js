const FAQ_CATEGORIES = [
    { id: 'general', label: 'General Questions', icon: 'info' },
    { id: 'services', label: 'Services', icon: 'services' },
    { id: 'pricing', label: 'Pricing and Payments', icon: 'payment' },
    { id: 'applications', label: 'Online Applications', icon: 'applications' },
    { id: 'support', label: 'Customer Support', icon: 'support' }
];

const FAQ_ITEMS = [
    { category: 'general', question: 'What is Sigon Online Services?', answer: 'Sigon Online Services provides digital assistance for online applications, career support, typing and documents, education, business services, KRA and NTSA processes, and other digital tasks.' },
    { category: 'general', question: 'Where is Sigon Online Services located?', answer: 'We provide services online and support customers in Kenya. A walk-in office address is not currently listed on our website; please contact us on WhatsApp to discuss the service you need.' },
    { category: 'general', question: 'How can I contact Sigon Online Services?', answer: 'Message us on WhatsApp at +254 759 240 255. You can also use the Contact section on our homepage to prepare a service request.' },
    { category: 'general', question: 'Are your services available throughout Kenya?', answer: 'We assist customers across Kenya and online. Availability can depend on the selected service, the information required and any relevant third-party platform.' },

    { category: 'services', question: 'What services do you offer?', answer: 'Our services include online application assistance, CV and career support, typing and document services, education support, business services, KRA and NTSA assistance, health and social service guidance, online bookings, graphic design, research and data entry.' },
    { category: 'services', question: 'How do I request a service?', answer: 'Browse the Services or Pricing page, choose what you need, then contact us on WhatsApp at +254 759 240 255. We will discuss requirements, scope and the applicable service charge before work begins.' },
    { category: 'services', question: 'What documents do I need to provide?', answer: 'Requirements depend on the service. We will tell you what is needed after learning what you want to request. Share only information and documents relevant to the service, and never send passwords, PINs or one-time verification codes.' },
    { category: 'services', question: 'Can I request a service that is not listed?', answer: 'Yes. Contact us with a brief description of what you need. We will confirm whether we can assist and provide a quote where appropriate.' },
    { category: 'services', question: 'How long does service processing take?', answer: 'Timing depends on the work involved, how quickly complete requirements are provided, and the availability of any third-party platforms. We will discuss an expected timeframe when we review your request; external delays may affect it.' },

    { category: 'pricing', question: 'How much do your services cost?', answer: 'Our Pricing page lists proposed Sigon service charges. Some services have a fixed suggested charge, some are priced per page, and more complex or unlisted work may need a quote. Confirm the final scope and charge with us before proceeding.' },
    { category: 'pricing', question: 'Are government fees included in your prices?', answer: 'No. The listed charges are for Sigon service assistance only. Government, platform and other third-party fees are separate and may change independently.' },
    { category: 'pricing', question: 'Which payment methods do you accept?', answer: 'Payment methods are confirmed with you when your service and charge are agreed. Follow only the payment instructions sent through our official communication and contact us if you need to verify them.' },
    { category: 'pricing', question: 'Do I pay before or after the service is completed?', answer: 'We confirm the service scope and applicable charge before work begins. Some services require payment in advance; we will communicate the payment timing and instructions before proceeding.' },
    { category: 'pricing', question: 'Can I request a refund?', answer: 'Payments for completed services are generally non-refundable. If we are unable to provide a service after payment, an appropriate refund may be considered. Government and third-party fees follow the relevant provider’s refund policy. See our Terms and Conditions for details.' },

    { category: 'applications', question: 'Can you help me with eCitizen applications?', answer: 'Yes. We can provide assistance with eCitizen-related application steps and preparation. Any official decision is made by the relevant institution, and we cannot guarantee approval.' },
    { category: 'applications', question: 'Can you assist with HELB and KUCCPS applications?', answer: 'Yes. We offer assistance with HELB, KUCCPS and other education-related online applications. Requirements and availability depend on the particular application and its current process.' },
    { category: 'applications', question: 'Can you help with KRA and NTSA services?', answer: 'Yes. We offer assistance with selected KRA and NTSA online services, including the services listed on our Pricing page. Government charges, where applicable, are separate.' },
    { category: 'applications', question: 'Do you guarantee approval of applications?', answer: 'No. We can help prepare or submit information, but approval is decided by the relevant government institution, employer or service provider. We cannot guarantee an outcome.' },

    { category: 'support', question: 'How can I follow up on my request?', answer: 'Message us on WhatsApp at +254 759 240 255 and mention the service you requested and when you contacted us. Do not include passwords, PINs or verification codes in a follow-up.' },
    { category: 'support', question: 'What happens if I provide incorrect information?', answer: 'Incorrect or incomplete information may delay processing or lead to a rejected request. Please review details before sending them. If you notice a mistake, contact us promptly; corrections may require extra time or work.' }
];

const FAQ_ICONS = {
    info: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8h.01"/></svg>',
    services: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></svg>',
    payment: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="M3.5 10h17M7 14.5h4"/></svg>',
    applications: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3.75h7l4 4v12.5H7a2 2 0 0 1-2-2v-12.5a2 2 0 0 1 2-2Z"/><path d="M14 3.75v4h4M8.5 12h7M8.5 15.5h5"/></svg>',
    support: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a7.5 7.5 0 0 1-11.2 6.5L4 19l1.1-4.1A7.5 7.5 0 1 1 20 11.5Z"/><path d="M8.5 10.5c.6 1.5 1.5 2.4 3 3"/></svg>'
};

const faqFilters = document.getElementById('faqFilters');
const faqList = document.getElementById('faqList');
const faqSearch = document.getElementById('faqSearch');
const faqClearSearch = document.getElementById('faqClearSearch');
const faqResults = document.getElementById('faqResults');
let activeFaqCategory = 'all';

function renderFaqItems() {
    const query = faqSearch.value.trim().toLocaleLowerCase();
    const matchingItems = FAQ_ITEMS.filter(item => {
        const matchesCategory = activeFaqCategory === 'all' || item.category === activeFaqCategory;
        const matchesSearch = `${item.question} ${item.answer}`.toLocaleLowerCase().includes(query);
        return matchesCategory && matchesSearch;
    });

    faqList.replaceChildren();
    matchingItems.forEach(item => {
        const category = FAQ_CATEGORIES.find(entry => entry.id === item.category);
        const itemIndex = FAQ_ITEMS.indexOf(item);
        const answerId = `faq-answer-${itemIndex + 1}`;
        const questionId = `faq-question-${itemIndex + 1}`;
        const article = document.createElement('article');
        article.className = 'faq-item';
        article.dataset.open = 'false';

        const icon = document.createElement('span');
        icon.className = 'faq-item-icon';
        icon.innerHTML = FAQ_ICONS[category.icon];
        icon.setAttribute('aria-hidden', 'true');

        const content = document.createElement('div');
        content.className = 'faq-item-content';

        const categoryLabel = document.createElement('span');
        categoryLabel.className = 'faq-category-label';
        categoryLabel.textContent = category.label;

        const questionButton = document.createElement('button');
        questionButton.className = 'faq-question';
        questionButton.type = 'button';
        questionButton.id = questionId;
        questionButton.textContent = item.question;
        questionButton.setAttribute('aria-expanded', 'false');
        questionButton.setAttribute('aria-controls', answerId);

        const chevron = document.createElement('span');
        chevron.className = 'faq-chevron';
        chevron.setAttribute('aria-hidden', 'true');
        chevron.textContent = '+';
        questionButton.appendChild(chevron);

        const answer = document.createElement('div');
        answer.className = 'faq-answer';
        answer.id = answerId;
        answer.setAttribute('role', 'region');
        answer.setAttribute('aria-labelledby', questionId);
        answer.setAttribute('aria-hidden', 'true');

        const answerInner = document.createElement('div');
        answerInner.className = 'faq-answer-inner';
        const answerText = document.createElement('p');
        answerText.textContent = item.answer;
        answerInner.appendChild(answerText);
        answer.appendChild(answerInner);

        questionButton.addEventListener('click', () => {
            const isOpen = questionButton.getAttribute('aria-expanded') === 'true';
            questionButton.setAttribute('aria-expanded', String(!isOpen));
            article.dataset.open = String(!isOpen);
            answer.setAttribute('aria-hidden', String(isOpen));
        });

        content.append(categoryLabel, questionButton, answer);
        article.append(icon, content);
        faqList.appendChild(article);
    });

    faqResults.textContent = `Showing ${matchingItems.length} of ${FAQ_ITEMS.length} questions`;

    if (!matchingItems.length) {
        const emptyState = document.createElement('p');
        emptyState.className = 'faq-empty-state';
        emptyState.textContent = 'No questions match your search. Try another word or choose a different category.';
        faqList.appendChild(emptyState);
    }
}

function renderFaqFilters() {
    const options = [{ id: 'all', label: 'All Questions' }, ...FAQ_CATEGORIES];
    options.forEach(category => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'faq-filter';
        button.textContent = category.label;
        button.setAttribute('aria-pressed', String(category.id === activeFaqCategory));
        button.addEventListener('click', () => {
            activeFaqCategory = category.id;
            faqFilters.querySelectorAll('.faq-filter').forEach(filter => {
                filter.setAttribute('aria-pressed', String(filter === button));
            });
            renderFaqItems();
        });
        faqFilters.appendChild(button);
    });
}

if (faqFilters && faqList && faqSearch && faqClearSearch && faqResults) {
    renderFaqFilters();
    renderFaqItems();

    faqSearch.addEventListener('input', () => {
        faqClearSearch.hidden = !faqSearch.value;
        renderFaqItems();
    });

    faqClearSearch.addEventListener('click', () => {
        faqSearch.value = '';
        faqClearSearch.hidden = true;
        faqSearch.focus();
        renderFaqItems();
    });
}
