const PRICING_CATEGORIES = [
    { id: 'applications', label: 'Online Applications', icon: 'document' },
    { id: 'career', label: 'CV & Career Services', icon: 'briefcase' },
    { id: 'documents', label: 'Typing & Document Services', icon: 'edit' },
    { id: 'education', label: 'Education Support', icon: 'education' },
    { id: 'business', label: 'Business Services', icon: 'building' },
    { id: 'kra-ntsa', label: 'KRA & NTSA Services', icon: 'services' },
    { id: 'other', label: 'Other Digital Services', icon: 'services' }
];

// Edit these proposed Sigon service charges here; government and third-party fees are separate.
const PRICING_SERVICES = [
    { name: 'eCitizen Application Assistance', category: 'applications', description: 'Guidance with preparing and completing an online application.', serviceChargeKes: 150 },
    { name: 'Good Conduct Application Assistance', category: 'applications', description: 'Support preparing an application and checking the information required.', serviceChargeKes: 200 },
    { name: 'Birth Certificate Application Assistance', category: 'applications', description: 'Assistance with the online application process and document checklist.', serviceChargeKes: 200 },
    { name: 'Passport Application Assistance', category: 'applications', description: 'Application guidance and help organizing the required details.', serviceChargeKes: 300 },
    { name: 'ID Application Assistance', category: 'applications', description: 'Help understanding the application steps and preparing information.', serviceChargeKes: 200 },
    { name: 'Marriage Certificate Application Assistance', category: 'applications', description: 'Guidance with the application steps and supporting documents.', serviceChargeKes: 250 },

    { name: 'Basic CV Writing', category: 'career', description: 'A clear, well-organized CV tailored to your experience.', serviceChargeKes: 200 },
    { name: 'Professional CV Writing', category: 'career', description: 'A polished CV structured to present your strengths and career history.', serviceChargeKes: 500 },
    { name: 'CV Editing', category: 'career', description: 'Improve clarity, formatting and presentation of your existing CV.', serviceChargeKes: 150 },
    { name: 'Cover Letter Writing', category: 'career', description: 'A focused cover letter aligned with your target role.', serviceChargeKes: 150 },
    { name: 'Job Application Assistance', category: 'career', description: 'Practical support preparing and submitting job applications.', serviceChargeKes: 100 },

    { name: 'General Typing', category: 'documents', description: 'Accurate typing of letters, notes and other supplied content.', serviceChargeKes: 30, priceUnit: 'page' },
    { name: 'Professional Document Formatting', category: 'documents', description: 'Clean, consistent layout for business and personal documents.', serviceChargeKes: 100 },
    { name: 'Letter Writing', category: 'documents', description: 'Help drafting a clear letter for your intended purpose.', serviceChargeKes: 100 },
    { name: 'Document Editing', category: 'documents', description: 'Review and improve the wording, consistency and layout of a document.', serviceChargeKes: 50, priceUnit: 'page' },
    { name: 'PDF Conversion', category: 'documents', description: 'Convert documents to or from PDF where the source format allows.', serviceChargeKes: 50 },
    { name: 'Scanning', category: 'documents', description: 'Scan and prepare document copies for digital use.', serviceChargeKes: 20, priceUnit: 'page' },
    { name: 'Printing (B&W)', category: 'documents', description: 'Black-and-white printing; paper and special material costs may vary.', serviceChargeKes: 10, priceUnit: 'page' },

    { name: 'School Application Assistance', category: 'education', description: 'Guidance preparing school application details and documents.', serviceChargeKes: 100 },
    { name: 'HELB Application Assistance', category: 'education', description: 'Support organizing information for an online HELB application.', serviceChargeKes: 500 },
    { name: 'KUCCPS Application Assistance', category: 'education', description: 'Application guidance and help reviewing your submitted choices.', serviceChargeKes: 200 },
    { name: 'Online Education Support', category: 'education', description: 'Practical assistance with education-related online tasks.', serviceChargeKes: 100 },
    { name: 'Education Document Preparation', category: 'education', description: 'Organize and format documents needed for an education request.', serviceChargeKes: 100 },

    { name: 'Business Name Registration Assistance', category: 'business', description: 'Guidance preparing details for a business name application.', serviceChargeKes: 300 },
    { name: 'Business Profile Creation', category: 'business', description: 'A professional profile introducing your business and services.', serviceChargeKes: 500 },
    { name: 'Logo Design', category: 'business', description: 'A custom visual identity concept for your business.', serviceChargeKes: 250 },
    { name: 'Business Document Preparation', category: 'business', description: 'Well-structured documents prepared for your business needs.', serviceChargeKes: 200 },
    { name: 'Basic Website Design', category: 'business', description: 'A clean starter website designed around your business information.', startingPriceKes: 1000, maximumPriceKes: 3000, negotiable: true },

    { name: 'KRA PIN Application Assistance', category: 'kra-ntsa', description: 'Guidance preparing details for a KRA PIN application.', serviceChargeKes: 100 },
    { name: 'KRA PIN Retrieval Assistance', category: 'kra-ntsa', description: 'Help with the steps and information needed to retrieve a KRA PIN.', serviceChargeKes: 100 },
    { name: 'KRA Returns Filing Assistance', category: 'kra-ntsa', description: 'Support organizing records and navigating the returns filing process.', serviceChargeKes: 150 },
    { name: 'NTSA Service Assistance', category: 'kra-ntsa', description: 'Guidance with selected NTSA online service processes.', serviceChargeKes: 150 },
    { name: 'Vehicle-related Application Assistance', category: 'kra-ntsa', description: 'Help preparing information for a vehicle-related online application.', serviceChargeKes: 200 },

    { name: 'Health and Social Service Assistance', category: 'other', description: 'Guidance with available online health and social service forms.', serviceChargeKes: null },
    { name: 'Email and Digital Account Assistance', category: 'other', description: 'Help setting up email and learning essential online tools.', serviceChargeKes: null },
    { name: 'Online Booking Assistance', category: 'other', description: 'Help with appointment booking and online reservations.', serviceChargeKes: null },
    { name: 'Graphic Design and Social Media', category: 'other', description: 'Digital flyers, posters and social media graphics; request a quote for your brief.', serviceChargeKes: null },
    { name: 'Research and Data Entry', category: 'other', description: 'Research, spreadsheet preparation and organized digital record keeping.', serviceChargeKes: null },
    { name: 'General Online Application Assistance', category: 'other', description: 'Guidance with online application types not listed in the fixed-price schedule.', serviceChargeKes: null },
    { name: 'Photocopying Assistance', category: 'other', description: 'Photocopying support; materials and quantity may affect the quote.', serviceChargeKes: null },
    { name: 'University Application Assistance', category: 'other', description: 'Support preparing information and documents for a university application.', serviceChargeKes: null },
    { name: 'Bursary Application Assistance', category: 'other', description: 'Help organizing information and documents for a bursary application.', serviceChargeKes: null },
    { name: 'Scholarship Application Assistance', category: 'other', description: 'Help preparing a scholarship application and supporting documents.', serviceChargeKes: null },
    { name: 'Online Student Form Assistance', category: 'other', description: 'Practical guidance completing online student forms.', serviceChargeKes: null },
    { name: 'Business Plan Preparation', category: 'other', description: 'Preparation support for a business plan based on your requirements.', serviceChargeKes: null },
    { name: 'Business Card Design', category: 'other', description: 'A business card design prepared to match your brand.', serviceChargeKes: null },
    { name: 'Digital Branding', category: 'other', description: 'Digital brand assets and presentation support for your business.', serviceChargeKes: null },
    { name: 'Tax Compliance Certificate Assistance', category: 'other', description: 'Guidance with the process and information for a TCC request.', serviceChargeKes: null },
    { name: 'SHA Registration Assistance', category: 'other', description: 'Guidance with online SHA registration steps and information.', serviceChargeKes: null },
    { name: 'NSSF Registration Assistance', category: 'other', description: 'Guidance with online NSSF registration steps and information.', serviceChargeKes: null },
    { name: 'Health and Social Account Updates', category: 'other', description: 'Help understanding available account update processes.', serviceChargeKes: null },
    { name: 'Event Registration Assistance', category: 'other', description: 'Support with online event registration and form submission.', serviceChargeKes: null },
    { name: 'Flyer Design', category: 'other', description: 'A digital flyer designed around your message and requirements.', serviceChargeKes: null },
    { name: 'Poster Design', category: 'other', description: 'A digital poster design prepared for your intended use.', serviceChargeKes: null },
    { name: 'Invitation Design', category: 'other', description: 'A custom digital invitation design based on your event details.', serviceChargeKes: null },
    { name: 'Social Media Graphics', category: 'other', description: 'Custom graphics prepared for your social media content.', serviceChargeKes: null }
];

const PRICING_ICONS = {
    document: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3.75h7l4 4v12.5H7a2 2 0 0 1-2-2v-12.5a2 2 0 0 1 2-2Z"/><path d="M14 3.75v4h4M8.5 12h7M8.5 15.5h7"/></svg>',
    briefcase: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="7.5" width="17" height="12.75" rx="2"/><path d="M8 7.5v-2a1.75 1.75 0 0 1 1.75-1.75h4.5A1.75 1.75 0 0 1 16 5.5v2M3.5 12.5h17M10 12.5v2h4v-2"/></svg>',
    edit: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 5.5 4 4M4 20l4.25-.9L19 8.35a2.83 2.83 0 0 0-4-4L4.25 15.1 4 20Z"/><path d="M12 20h8"/></svg>',
    education: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m2.75 9 9.25-5 9.25 5L12 14 2.75 9Z"/><path d="M6.5 11v5.25c3.4 2.5 7.6 2.5 11 0V11M21.25 9v6"/></svg>',
    building: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V5.5l8-2 8 2V20M2.5 20h19M8 8h1m6 0h1M8 11.5h1m6 0h1M10 20v-4h4v4"/></svg>',
    services: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.25 19 6v5.25c0 4.5-2.9 7.75-7 9.5-4.1-1.75-7-5-7-9.5V6l7-2.75Z"/><path d="m9 12 2 2 4-4"/></svg>'
};

const pricingGrid = document.getElementById('pricingGrid');
const pricingFilters = document.getElementById('pricingFilters');
const pricingSearch = document.getElementById('pricingSearch');
const clearSearchButton = document.getElementById('clearSearch');
const pricingStatus = document.getElementById('pricingStatus');
let activePricingCategory = 'all';

function formatKes(amount) {
    return `KES ${amount.toLocaleString('en-KE')}`;
}

function getServicePriceText(service) {
    if (Number.isFinite(service.startingPriceKes)) {
        return `Starting from ${formatKes(service.startingPriceKes)}`;
    }
    if (Number.isFinite(service.serviceChargeKes)) {
        const unit = service.priceUnit ? ` / ${service.priceUnit}` : '';
        return `${formatKes(service.serviceChargeKes)}${unit}`;
    }
    return 'Request a Quote';
}

function getCategoryHomePrice(category) {
    if (category.id === 'other') {
        return 'Request a Quote';
    }

    const amounts = PRICING_SERVICES
        .filter(service => service.category === category.id)
        .flatMap(service => [service.serviceChargeKes, service.startingPriceKes, service.maximumPriceKes])
        .filter(Number.isFinite);

    if (!amounts.length) {
        return 'Request a Quote';
    }

    const lowestPrice = Math.min(...amounts);
    const highestPrice = Math.max(...amounts);
    if (category.id === 'documents') {
        return `From ${formatKes(lowestPrice)}`;
    }
    return lowestPrice === highestPrice
        ? formatKes(lowestPrice)
        : `KES ${lowestPrice.toLocaleString('en-KE')}–${highestPrice.toLocaleString('en-KE')}`;
}

function createPricingCard(service) {
    const category = PRICING_CATEGORIES.find(item => item.id === service.category);
    const card = document.createElement('article');
    card.className = 'pricing-card';

    const icon = document.createElement('div');
    icon.className = 'pricing-card-icon';
    icon.innerHTML = PRICING_ICONS[category.icon];
    icon.setAttribute('aria-hidden', 'true');

    const categoryLabel = document.createElement('p');
    categoryLabel.className = 'pricing-card-category';
    categoryLabel.textContent = category.label;

    const priceBadge = document.createElement('span');
    priceBadge.className = 'pricing-price-badge';
    priceBadge.textContent = getServicePriceText(service);
    priceBadge.setAttribute('aria-label', `Sigon service charge: ${priceBadge.textContent}`);

    const title = document.createElement('h3');
    title.textContent = service.name;

    const description = document.createElement('p');
    description.className = 'pricing-card-description';
    description.textContent = service.description;

    const priceBlock = document.createElement('div');
    priceBlock.className = 'pricing-card-price';
    const priceLabel = document.createElement('span');
    priceLabel.textContent = 'Sigon service charge only';
    priceBlock.append(priceLabel);
    if (service.maximumPriceKes) {
        const priceDetails = document.createElement('span');
        priceDetails.className = 'pricing-card-price-detail';
        priceDetails.textContent = `Typical range: KES ${service.startingPriceKes.toLocaleString('en-KE')}–${service.maximumPriceKes.toLocaleString('en-KE')} · negotiable`;
        priceBlock.append(priceDetails);
    }

    const request = document.createElement('a');
    request.className = 'pricing-request-button';
    request.textContent = 'Request Service';
    request.target = '_blank';
    request.rel = 'noopener noreferrer';
    request.setAttribute('aria-label', `Request ${service.name} on WhatsApp`);
    const message = `Hello Sigon Online Services, I am interested in your ${service.name} service. The proposed Sigon service charge is ${getServicePriceText(service)}. Kindly confirm the requirements and any separate government or third-party fees.`;
    const whatsappUrl = new URL('https://wa.me/254759240255');
    whatsappUrl.searchParams.set('text', message);
    request.href = whatsappUrl.href;

    card.append(icon, priceBadge, categoryLabel, title, description, priceBlock, request);
    return card;
}

function renderPricingServices() {
    const query = pricingSearch.value.trim().toLocaleLowerCase();
    const visibleServices = PRICING_SERVICES.filter(service => {
        const category = PRICING_CATEGORIES.find(item => item.id === service.category);
        const matchesCategory = activePricingCategory === 'all' || service.category === activePricingCategory;
        const searchableText = `${service.name} ${service.description} ${category.label}`.toLocaleLowerCase();
        return matchesCategory && searchableText.includes(query);
    });

    pricingGrid.replaceChildren(...visibleServices.map(createPricingCard));
    pricingStatus.textContent = `Showing ${visibleServices.length} of ${PRICING_SERVICES.length} services`;

    if (!visibleServices.length) {
        const emptyState = document.createElement('p');
        emptyState.className = 'pricing-empty-state';
        emptyState.textContent = 'No services match your search. Try another term or choose a different category.';
        pricingGrid.appendChild(emptyState);
    }
}

function createPricingFilters() {
    const filters = [{ id: 'all', label: 'All Services' }, ...PRICING_CATEGORIES];
    filters.forEach(filter => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'pricing-filter';
        button.textContent = filter.label;
        button.setAttribute('aria-pressed', String(filter.id === activePricingCategory));
        button.addEventListener('click', () => {
            activePricingCategory = filter.id;
            pricingFilters.querySelectorAll('.pricing-filter').forEach(item => {
                item.setAttribute('aria-pressed', String(item === button));
            });
            renderPricingServices();
        });
        pricingFilters.appendChild(button);
    });
}

if (pricingGrid && pricingFilters && pricingSearch && clearSearchButton && pricingStatus) {
    createPricingFilters();
    renderPricingServices();

    pricingSearch.addEventListener('input', () => {
        clearSearchButton.hidden = !pricingSearch.value;
        renderPricingServices();
    });

    clearSearchButton.addEventListener('click', () => {
        pricingSearch.value = '';
        clearSearchButton.hidden = true;
        pricingSearch.focus();
        renderPricingServices();
    });
}

document.querySelectorAll('.service-card[data-pricing-category]').forEach(card => {
    const category = PRICING_CATEGORIES.find(item => item.id === card.dataset.pricingCategory);
    if (!category) {
        return;
    }

    const priceBadge = document.createElement('span');
    priceBadge.className = 'service-price-badge';
    priceBadge.textContent = getCategoryHomePrice(category);
    priceBadge.setAttribute('aria-label', `Suggested prices: ${priceBadge.textContent}`);
    card.appendChild(priceBadge);
});
