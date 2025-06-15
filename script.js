// Lawyer Database - Hardcoded Mock Data
const lawyers = [
    { cnic: "12345-1234567-1", letterId: "LTR-12345", fullName: "Advocate Ayesha Siddiqi", specialization: "Corporate Law", experience: "8 years" },
    { cnic: "98765-7654321-9", letterId: "LTR-54321", fullName: "Barrister Khalid Mehmood", specialization: "Criminal Law", experience: "12 years" },
    { cnic: "11111-2222222-3", letterId: "LTR-11111", fullName: "Advocate Sarah Khan", specialization: "Family Law", experience: "6 years" },
    { cnic: "44444-5555555-6", letterId: "LTR-44444", fullName: "Barrister Ahmed Ali", specialization: "Commercial Law", experience: "15 years" },
    { cnic: "77777-8888888-9", letterId: "LTR-77777", fullName: "Advocate Fatima Sheikh", specialization: "Civil Rights", experience: "10 years" },
    { cnic: "33333-4444444-5", letterId: "LTR-33333", fullName: "Barrister Hassan Malik", specialization: "Tax Law", experience: "9 years" },
    { cnic: "66666-7777777-8", letterId: "LTR-66666", fullName: "Advocate Zara Ahmad", specialization: "Labor Law", experience: "7 years" },
    { cnic: "99999-0000000-1", letterId: "LTR-99999", fullName: "Barrister Omar Qureshi", specialization: "Constitutional Law", experience: "20 years" },
    { cnic: "22222-3333333-4", letterId: "LTR-22222", fullName: "Advocate Nadia Rehman", specialization: "Property Law", experience: "5 years" },
    { cnic: "55555-6666666-7", letterId: "LTR-55555", fullName: "Barrister Imran Shah", specialization: "Banking Law", experience: "14 years" }
];

// DOM Elements
const verificationForm = document.getElementById('verificationForm');
const cnicInput = document.getElementById('cnic');
const letterIdInput = document.getElementById('letterId');
const resultMessage = document.getElementById('resultMessage');
const cnicError = document.getElementById('cnic-error');
const letterError = document.getElementById('letter-error');

// Chatbot Elements
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotPanel = document.getElementById('chatbotPanel');
const closeChatbot = document.getElementById('closeChatbot');
const faqQuestions = document.querySelectorAll('.faq-question');

// Validation Patterns
const cnicPattern = /^\d{5}-\d{7}-\d{1}$/;
const letterIdPattern = /^LTR-\d{5}$/;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeVerificationSteps();
    initializeLawyersList();
    initializeChatbot();
    initializeFormValidation();
});

// Initialize Verification Steps Animation
function initializeVerificationSteps() {
    const stepCards = document.querySelectorAll('.step-card');
    
    stepCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            stepCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            this.classList.add('active');
            
            // Highlight corresponding form field
            if (index === 0 || index === 1) {
                const targetInput = index === 0 ? cnicInput : letterIdInput;
                targetInput.focus();
                targetInput.style.borderColor = '#2D4A52';
                setTimeout(() => {
                    targetInput.style.borderColor = '';
                }, 2000);
            }
        });
        
        // Add stagger animation on page load
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Initialize Lawyers List with Auto-scroll
function initializeLawyersList() {
    const lawyersList = document.getElementById('lawyersList');
    
    // Create doubled list for seamless scrolling
    const allLawyers = [...lawyers, ...lawyers];
    
    allLawyers.forEach(lawyer => {
        const lawyerItem = createLawyerItem(lawyer);
        lawyersList.appendChild(lawyerItem);
    });
}

// Create Lawyer Item Element
function createLawyerItem(lawyer) {
    const item = document.createElement('div');
    item.className = 'lawyer-item';
    item.innerHTML = `
        <div class="lawyer-name">${lawyer.fullName}</div>
        <div class="lawyer-details">${lawyer.specialization}</div>
        <div class="lawyer-details">${lawyer.experience} experience</div>
        <div class="verified-badge">
            <i class="fas fa-check-circle"></i>
            Verified
        </div>
    `;
    return item;
}

// Initialize Chatbot Functionality
function initializeChatbot() {
    // Toggle chatbot panel
    chatbotToggle.addEventListener('click', function() {
        chatbotPanel.classList.toggle('active');
    });
    
    // Close chatbot
    closeChatbot.addEventListener('click', function() {
        chatbotPanel.classList.remove('active');
    });
    
    // Close chatbot when clicking outside
    document.addEventListener('click', function(event) {
        if (!chatbotToggle.contains(event.target) && !chatbotPanel.contains(event.target)) {
            chatbotPanel.classList.remove('active');
        }
    });
    
    // FAQ functionality
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqId = this.getAttribute('data-faq');
            const answer = document.getElementById(`faq-${faqId}`);
            const allAnswers = document.querySelectorAll('.faq-answer');
            
            // Close all other answers
            allAnswers.forEach(a => {
                if (a !== answer) {
                    a.classList.remove('active');
                }
            });
            
            // Toggle current answer
            answer.classList.toggle('active');
        });
    });
    
    // Keyboard navigation for chatbot
    chatbotToggle.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.click();
        }
    });
}

// Initialize Form Validation
function initializeFormValidation() {
    // Real-time CNIC formatting and validation
    cnicInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, ''); // Remove non-digits
        
        // Format CNIC as user types
        if (value.length >= 5) {
            value = value.slice(0, 5) + '-' + value.slice(5);
        }
        if (value.length >= 13) {
            value = value.slice(0, 13) + '-' + value.slice(13, 14);
        }
        
        this.value = value;
        validateCnic();
    });
    
    // Real-time Letter ID formatting and validation
    letterIdInput.addEventListener('input', function() {
        let value = this.value.toUpperCase();
        
        // Auto-add LTR- prefix if not present
        if (value && !value.startsWith('LTR-')) {
            value = 'LTR-' + value.replace('LTR-', '');
        }
        
        // Limit to correct format
        if (value.startsWith('LTR-')) {
            const numbers = value.slice(4).replace(/\D/g, '');
            value = 'LTR-' + numbers.slice(0, 5);
        }
        
        this.value = value;
        validateLetterId();
    });
    
    // Form submission
    verificationForm.addEventListener('submit', function(event) {
        event.preventDefault();
        performVerification();
    });
}

// Validate CNIC Input
function validateCnic() {
    const cnic = cnicInput.value;
    const isValid = cnicPattern.test(cnic);
    
    if (cnic && !isValid) {
        showError(cnicInput, cnicError, 'Invalid CNIC format. Use: 12345-1234567-1');
        return false;
    } else {
        hideError(cnicInput, cnicError);
        return true;
    }
}

// Validate Letter ID Input
function validateLetterId() {
    const letterId = letterIdInput.value;
    const isValid = letterIdPattern.test(letterId);
    
    if (letterId && !isValid) {
        showError(letterIdInput, letterError, 'Invalid Letter ID format. Use: LTR-12345');
        return false;
    } else {
        hideError(letterIdInput, letterError);
        return true;
    }
}

// Show Error Message
function showError(input, errorElement, message) {
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

// Hide Error Message
function hideError(input, errorElement) {
    input.classList.remove('error');
    errorElement.classList.remove('show');
}

// Perform Lawyer Verification
function performVerification() {
    const cnic = cnicInput.value;
    const letterId = letterIdInput.value;
    
    // Clear previous results
    hideResult();
    
    // Validate inputs
    const isCnicValid = validateCnic();
    const isLetterIdValid = validateLetterId();
    
    if (!isCnicValid || !isLetterIdValid) {
        showResult('Please correct the errors above before verifying.', 'error');
        return;
    }
    
    if (!cnic || !letterId) {
        showResult('Please fill in both CNIC and Letter ID fields.', 'error');
        return;
    }
    
    // Simulate verification process with loading
    const verifyBtn = document.querySelector('.verify-btn');
    const originalText = verifyBtn.innerHTML;
    
    verifyBtn.disabled = true;
    verifyBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying...';
    
    setTimeout(() => {
        // Search for lawyer in database
        const lawyer = lawyers.find(l => l.cnic === cnic && l.letterId === letterId);
        if (lawyer) {
        showResult(`✅ Verified: ${lawyer.fullName}. Redirecting to your dashboard...`, 'success');
        highlightVerifiedLawyer(lawyer.fullName);
        verifyBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
        verifyBtn.disabled = true;
        setTimeout(() => {
            window.location.href = 'https://261947251.wixsite.com/legal-connect/copy-of-sign-up-as-lawyer';
        }, 2500);
}

         else {
            // Check if CNIC exists with different Letter ID
            const cnicExists = lawyers.find(l => l.cnic === cnic);
            // Check if Letter ID exists with different CNIC
            const letterIdExists = lawyers.find(l => l.letterId === letterId);
            
            let errorMessage = '';
            if (cnicExists && !letterIdExists) {
                errorMessage = '❌ Letter ID is incorrect. The CNIC exists but with a different Letter ID.';
            } else if (!cnicExists && letterIdExists) {
                errorMessage = '❌ CNIC is incorrect. The Letter ID exists but with a different CNIC.';
            } else if (cnicExists && letterIdExists) {
                errorMessage = '❌ CNIC and Letter ID don\'t match. Both exist but belong to different lawyers.';
            } else {
                errorMessage = '❌ Lawyer not found. Both CNIC and Letter ID are not in our database.';
            }
            
            showResult(errorMessage, 'error');
            
            // Change button to "Try Again" on failed verification
            verifyBtn.innerHTML = '<i class="fas fa-redo"></i> Try Again';
            verifyBtn.classList.add('try-again-mode');
            verifyBtn.disabled = false;
            
            // Add click handler for try again
            verifyBtn.onclick = function() {
                resetVerificationForm();
            };
        }
    }, 1500); // Simulate API delay
}

// Show Result Message
function showResult(message, type) {
    resultMessage.textContent = message;
    resultMessage.className = `result-message show ${type}`;
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            hideResult();
        }, 5000);
    }
}

// Hide Result Message
function hideResult() {
    resultMessage.classList.remove('show');
}

// Highlight Verified Lawyer in Sidebar
function highlightVerifiedLawyer(lawyerName) {
    const lawyerItems = document.querySelectorAll('.lawyer-item');
    
    lawyerItems.forEach(item => {
        const nameElement = item.querySelector('.lawyer-name');
        if (nameElement && nameElement.textContent === lawyerName) {
            item.style.background = 'linear-gradient(135deg, #2D4A52, #4a6b75)';
            item.style.color = 'white';
            item.style.transform = 'scale(1.05)';
            
            // Reset after 3 seconds
            setTimeout(() => {
                item.style.background = '';
                item.style.color = '';
                item.style.transform = '';
            }, 3000);
        }
    });
}

// Accessibility Enhancements
document.addEventListener('keydown', function(event) {
    // ESC key closes chatbot
    if (event.key === 'Escape') {
        chatbotPanel.classList.remove('active');
    }
    
    // Enter key on form elements
    if (event.key === 'Enter' && event.target.tagName === 'INPUT') {
        if (event.target === cnicInput) {
            letterIdInput.focus();
        } else if (event.target === letterIdInput) {
            verificationForm.dispatchEvent(new Event('submit'));
        }
    }
});

// Handle viewport changes for mobile optimization
function handleViewportChange() {
    const viewport = window.innerWidth;
    const chatbotPanel = document.getElementById('chatbotPanel');
    
    if (viewport <= 480) {
        chatbotPanel.style.width = `${viewport - 40}px`;
    } else if (viewport <= 768) {
        chatbotPanel.style.width = '300px';
    } else {
        chatbotPanel.style.width = '350px';
    }
}

// Listen for viewport changes
window.addEventListener('resize', handleViewportChange);
window.addEventListener('orientationchange', handleViewportChange);

// Initial viewport setup
handleViewportChange();

// Service Worker Registration (for offline capability)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Only register if in production environment
        if (location.protocol === 'https:' || location.hostname === 'localhost') {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('ServiceWorker registration successful');
                })
                .catch(function(err) {
                    console.log('ServiceWorker registration failed');
                });
        }
    });
}

// Performance monitoring
function measurePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }, 0);
        });
    }
}

measurePerformance();

// Error handling for the entire application
window.addEventListener('error', function(event) {
    console.error('Application error:', event.error);
    
    // Show user-friendly error message
    const errorMsg = document.createElement('div');
    errorMsg.className = 'error-toast';
    errorMsg.textContent = 'An unexpected error occurred. Please refresh the page.';
    errorMsg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #e74c3c;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 10000;
        box-shadow: 0 4px 20px rgba(231, 76, 60, 0.3);
    `;
    
    document.body.appendChild(errorMsg);
    
    setTimeout(() => {
        errorMsg.remove();
    }, 5000);
});

// Prevent form submission on invalid inputs
document.addEventListener('invalid', function(event) {
    event.preventDefault();
    
    const field = event.target;
    if (field === cnicInput) {
        showError(field, cnicError, 'Please enter a valid CNIC number');
    } else if (field === letterIdInput) {
        showError(field, letterError, 'Please enter a valid Letter ID');
    }
}, true);

// Analytics tracking (placeholder for future implementation)
function trackEvent(eventName, eventData) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, eventData);
}

// Handle Lawyer Registration
function handleLawyerRegistration(lawyer) {
    const verifyBtn = document.querySelector('.verify-btn');
    const originalText = verifyBtn.innerHTML;
    
    verifyBtn.disabled = true;
    verifyBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registering...';
    
    setTimeout(() => {
        // Simulate registration process
        showResult(`🎉 Registration successful! Welcome to LegalConnect, ${lawyer.fullName}. You can now access your lawyer dashboard.`, 'success');
        
        // Reset form and button after registration
        setTimeout(() => {
            resetVerificationForm();
        }, 3000);
        
        trackEvent('lawyer_registration_completed', {
            lawyerName: lawyer.fullName,
            specialization: lawyer.specialization
        });
    }, 2000);
}

// Reset Verification Form
function resetVerificationForm() {
    const verifyBtn = document.querySelector('.verify-btn');
    
    // Clear form inputs
    cnicInput.value = '';
    letterIdInput.value = '';
    
    // Hide result message
    hideResult();
    
    // Reset button to original state
    verifyBtn.innerHTML = '<i class="fas fa-shield-alt"></i> Verify Lawyer';
    verifyBtn.classList.remove('register-mode', 'try-again-mode');
    verifyBtn.disabled = false;
    verifyBtn.onclick = null;
    
    // Clear any error states
    hideError(cnicInput, cnicError);
    hideError(letterIdInput, letterError);
    
    // Focus on first input for better UX
    cnicInput.focus();
}

// Track form interactions
verificationForm.addEventListener('submit', function() {
    trackEvent('verification_attempted', {
        timestamp: new Date().toISOString(),
        hasValidCnic: cnicPattern.test(cnicInput.value),
        hasValidLetterId: letterIdPattern.test(letterIdInput.value)
    });
});

// Track chatbot interactions
faqQuestions.forEach((question, index) => {
    question.addEventListener('click', function() {
        trackEvent('faq_clicked', {
            questionIndex: index + 1,
            questionText: this.textContent.trim()
        });
    });
});
