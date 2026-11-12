const APPROVED_REVIEWS = [];
const REVIEW_COOLDOWN_MS = 30000;
const reviewForm = document.getElementById('reviewForm');
const reviewFormStatus = document.getElementById('reviewFormStatus');
const reviewWebsite = document.getElementById('reviewWebsite');
const reviewRatingInputs = [...document.querySelectorAll('input[name="rating"]')];
const ratingValue = document.getElementById('ratingValue');
const reviewFallback = document.getElementById('reviewWhatsAppFallback');

function renderApprovedReviews() {
    const reviewList = document.getElementById('approvedReviews');
    const emptyState = document.getElementById('reviewsEmptyState');
    const publishedReviews = APPROVED_REVIEWS.filter(review => review.status === 'approved');

    reviewList.replaceChildren();
    emptyState.hidden = publishedReviews.length > 0;

    publishedReviews.forEach(review => {
        const card = document.createElement('article');
        card.className = 'review-card';

        const header = document.createElement('div');
        header.className = 'review-card-header';
        const identity = document.createElement('div');
        const name = document.createElement('h3');
        name.textContent = review.name;
        const service = document.createElement('p');
        service.className = 'review-service';
        service.textContent = review.service;
        identity.append(name, service);

        const date = document.createElement('time');
        date.className = 'review-date';
        date.dateTime = review.date;
        date.textContent = new Intl.DateTimeFormat('en-KE', {
            day: 'numeric', month: 'short', year: 'numeric'
        }).format(new Date(`${review.date}T00:00:00`));
        header.append(identity, date);

        const stars = document.createElement('div');
        stars.className = 'review-card-stars';
        stars.setAttribute('role', 'img');
        stars.setAttribute('aria-label', `${review.rating} out of 5 stars`);
        for (let star = 1; star <= 5; star += 1) {
            const starElement = document.createElement('span');
            starElement.textContent = '★';
            starElement.classList.toggle('is-filled', star <= review.rating);
            stars.appendChild(starElement);
        }

        const feedback = document.createElement('p');
        feedback.className = 'review-feedback';
        feedback.textContent = review.feedback;
        card.append(header, stars, feedback);
        reviewList.appendChild(card);
    });
}

function updateRatingSelection() {
    const selectedRating = Number(reviewRatingInputs.find(input => input.checked)?.value || 0);
    ratingValue.textContent = selectedRating ? `${selectedRating} out of 5` : 'Select a rating';

    reviewRatingInputs.forEach(input => {
        const starLabel = input.closest('.review-rating-option');
        starLabel.classList.toggle('is-selected', Number(input.value) <= selectedRating);
    });
}

function hasRecentReviewSubmission() {
    try {
        const previousSubmission = Number(sessionStorage.getItem('sigon-review-submitted-at'));
        if (previousSubmission && Date.now() - previousSubmission < REVIEW_COOLDOWN_MS) {
            return true;
        }
        sessionStorage.setItem('sigon-review-submitted-at', String(Date.now()));
    } catch (error) {
        return false;
    }
    return false;
}

reviewRatingInputs.forEach(input => input.addEventListener('change', updateRatingSelection));

reviewForm.addEventListener('submit', event => {
    event.preventDefault();
    reviewFormStatus.textContent = '';
    reviewFallback.hidden = true;

    if (!reviewForm.reportValidity()) {
        return;
    }

    if (reviewWebsite.value) {
        reviewFormStatus.textContent = 'Your review could not be submitted. Please try again.';
        return;
    }

    if (hasRecentReviewSubmission()) {
        reviewFormStatus.textContent = 'Please wait a short time before preparing another review.';
        return;
    }

    const name = document.getElementById('reviewName').value.trim();
    const service = document.getElementById('reviewService').value;
    const rating = Number(reviewForm.querySelector('input[name="rating"]:checked')?.value);
    const feedback = document.getElementById('reviewFeedback').value.trim();

    if (name.length < 2 || feedback.length < 15 || !Number.isInteger(rating) || rating < 1 || rating > 5) {
        reviewFormStatus.textContent = 'Please check your name, feedback and star rating.';
        return;
    }

    const reviewDate = new Intl.DateTimeFormat('en-CA').format(new Date());
    const message = [
        'Hello Sigon Online Services, I would like to submit a customer review for administrator approval.',
        `Customer name: ${name}`,
        `Service received: ${service}`,
        `Rating: ${rating} out of 5 stars`,
        `Date: ${reviewDate}`,
        `Feedback: ${feedback}`,
        'Please review this submission before publishing it.'
    ].join('\n\n');
    const whatsappUrl = `https://wa.me/254759240255?text=${encodeURIComponent(message)}`;
    const reviewWindow = window.open(whatsappUrl, '_blank');

    if (reviewWindow) {
        reviewWindow.opener = null;
        reviewFormStatus.textContent = 'A WhatsApp draft is ready. Send it to the administrator for review; it will not be published automatically.';
    } else {
        reviewFallback.href = whatsappUrl;
        reviewFallback.hidden = false;
        reviewFormStatus.textContent = 'Your browser blocked the new tab. Use the link below to open the WhatsApp draft.';
    }
});

renderApprovedReviews();
updateRatingSelection();
