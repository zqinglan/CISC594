// Sample roommate data
const roommateProfiles = [
    {
        id: 1,
        name: "Alex Johnson",
        age: 24,
        gender: "male",
        budget: "800-1200",
        lifestyle: "quiet",
        location: "downtown",
        occupation: "Graduate Student",
        university: "State University",
        bio: "Looking for a quiet, studious roommate. I'm usually studying or working on research.",
        compatibilityScore: 95
    },
    {
        id: 2,
        name: "Sarah Chen",
        age: 22,
        gender: "female",
        budget: "500-800",
        lifestyle: "social",
        location: "campus",
        occupation: "Undergraduate Student",
        university: "State University",
        bio: "Love meeting new people and exploring the city. Looking for someone who's social and fun!",
        compatibilityScore: 87
    },
    {
        id: 3,
        name: "Mike Rodriguez",
        age: 28,
        gender: "male",
        budget: "1200-1500",
        lifestyle: "balanced",
        location: "suburbs",
        occupation: "Software Engineer",
        university: "Tech Institute",
        bio: "Work from home most days. Looking for someone respectful and clean.",
        compatibilityScore: 92
    },
    {
        id: 4,
        name: "Emily Davis",
        age: 25,
        gender: "female",
        budget: "800-1200",
        lifestyle: "quiet",
        location: "downtown",
        occupation: "Medical Student",
        university: "Medical School",
        bio: "Medical student with long hours. Need a quiet place to study and sleep.",
        compatibilityScore: 89
    },
    {
        id: 5,
        name: "David Kim",
        age: 23,
        gender: "male",
        budget: "500-800",
        lifestyle: "social",
        location: "campus",
        occupation: "Undergraduate Student",
        university: "State University",
        bio: "International student looking for friends and a great roommate experience!",
        compatibilityScore: 84
    },
    {
        id: 6,
        name: "Lisa Thompson",
        age: 26,
        gender: "female",
        budget: "1500+",
        lifestyle: "balanced",
        location: "suburbs",
        occupation: "Marketing Manager",
        university: "Business School",
        bio: "Professional who values both work and social life. Clean and organized.",
        compatibilityScore: 91
    },
    {
        id: 7,
        name: "James Wilson",
        age: 29,
        gender: "male",
        budget: "1200-1500",
        lifestyle: "quiet",
        location: "downtown",
        occupation: "Architect",
        university: "Design Institute",
        bio: "Creative professional who works late hours. Need a quiet, respectful roommate.",
        compatibilityScore: 88
    },
    {
        id: 8,
        name: "Maria Garcia",
        age: 21,
        gender: "female",
        budget: "500-800",
        lifestyle: "social",
        location: "campus",
        occupation: "Undergraduate Student",
        university: "State University",
        bio: "Extroverted student who loves hosting study groups and social events.",
        compatibilityScore: 86
    }
];

// Current filters and view state
let currentFilters = {
    budget: '',
    age: '',
    gender: '',
    lifestyle: '',
    location: '',
    sort: 'compatibility'
};

let currentView = 'grid';

// DOM elements
const profilesContainer = document.getElementById('profilesContainer');
const applyFiltersBtn = document.getElementById('applyFilters');
const gridViewBtn = document.getElementById('gridView');
const listViewBtn = document.getElementById('listView');

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    displayProfiles(roommateProfiles);
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    applyFiltersBtn.addEventListener('click', applyFilters);
    gridViewBtn.addEventListener('click', () => switchView('grid'));
    listViewBtn.addEventListener('click', () => switchView('list'));
}

// Apply filters and update display
function applyFilters() {
    // Get current filter values
    currentFilters.budget = document.getElementById('budget').value;
    currentFilters.age = document.getElementById('age').value;
    currentFilters.gender = document.getElementById('gender').value;
    currentFilters.lifestyle = document.getElementById('lifestyle').value;
    currentFilters.location = document.getElementById('location').value;
    currentFilters.sort = document.getElementById('sort').value;

    // Filter profiles
    let filteredProfiles = roommateProfiles.filter(profile => {
        return (
            (currentFilters.budget === '' || profile.budget === currentFilters.budget) &&
            (currentFilters.gender === '' || profile.gender === currentFilters.gender) &&
            (currentFilters.lifestyle === '' || profile.lifestyle === currentFilters.lifestyle) &&
            (currentFilters.location === '' || profile.location === currentFilters.location) &&
            (currentFilters.age === '' || isAgeInRange(profile.age, currentFilters.age))
        );
    });

    // Sort profiles
    filteredProfiles = sortProfiles(filteredProfiles, currentFilters.sort);

    // Update compatibility scores based on filters
    filteredProfiles = calculateCompatibilityScores(filteredProfiles);

    // Display filtered profiles
    displayProfiles(filteredProfiles);
}

// Check if age is in the specified range
function isAgeInRange(age, ageRange) {
    switch (ageRange) {
        case '18-25':
            return age >= 18 && age <= 25;
        case '26-35':
            return age >= 26 && age <= 35;
        case '36-45':
            return age >= 36 && age <= 45;
        case '45+':
            return age >= 45;
        default:
            return true;
    }
}

// Sort profiles based on criteria
function sortProfiles(profiles, sortBy) {
    return profiles.sort((a, b) => {
        switch (sortBy) {
            case 'compatibility':
                return b.compatibilityScore - a.compatibilityScore;
            case 'budget':
                return getBudgetValue(a.budget) - getBudgetValue(b.budget);
            case 'age':
                return a.age - b.age;
            default:
                return 0;
        }
    });
}

// Get numeric value for budget sorting
function getBudgetValue(budget) {
    switch (budget) {
        case '500-800':
            return 650;
        case '800-1200':
            return 1000;
        case '1200-1500':
            return 1350;
        case '1500+':
            return 1600;
        default:
            return 0;
    }
}

// Calculate compatibility scores based on current filters
function calculateCompatibilityScores(profiles) {
    return profiles.map(profile => {
        let score = 70; // Base score

        // Budget compatibility
        if (currentFilters.budget && profile.budget === currentFilters.budget) {
            score += 15;
        }

        // Lifestyle compatibility
        if (currentFilters.lifestyle && profile.lifestyle === currentFilters.lifestyle) {
            score += 10;
        }

        // Location compatibility
        if (currentFilters.location && profile.location === currentFilters.location) {
            score += 5;
        }

        // Age compatibility (prefer similar age ranges)
        if (currentFilters.age && isAgeInRange(profile.age, currentFilters.age)) {
            score += 10;
        }

        // Random factor for variety (simulating real-world compatibility)
        score += Math.floor(Math.random() * 10);

        return {
            ...profile,
            compatibilityScore: Math.min(100, score)
        };
    });
}

// Display profiles in the container
function displayProfiles(profiles) {
    if (profiles.length === 0) {
        profilesContainer.innerHTML = `
            <div class="loading">
                <p>No profiles match your current filters. Try adjusting your criteria.</p>
            </div>
        `;
        return;
    }

    const profilesHTML = profiles.map(profile => createProfileCard(profile)).join('');
    profilesContainer.innerHTML = profilesHTML;
}

// Create a profile card HTML
function createProfileCard(profile) {
    const viewClass = currentView === 'list' ? 'list-view' : '';

    return `
        <div class="profile-card ${viewClass}" data-id="${profile.id}">
            <div class="profile-header">
                <div class="profile-avatar">
                    ${profile.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div class="profile-info">
                    <h4>${profile.name}</h4>
                    <p>${profile.occupation}</p>
                </div>
                <div class="compatibility-score">
                    ${profile.compatibilityScore}%
                </div>
            </div>
            
            <div class="profile-details ${viewClass}">
                <div class="detail-item">
                    <span class="detail-label">Age</span>
                    <span class="detail-value">${profile.age}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Budget</span>
                    <span class="detail-value">$${profile.budget}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Lifestyle</span>
                    <span class="detail-value">${getLifestyleLabel(profile.lifestyle)}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Location</span>
                    <span class="detail-value">${getLocationLabel(profile.location)}</span>
                </div>
            </div>
            
            <div class="profile-actions">
                <button class="btn-secondary" onclick="viewProfile(${profile.id})">
                    <i class="fas fa-eye"></i> View Profile
                </button>
                <button class="btn-secondary btn-contact" onclick="contactRoommate(${profile.id})">
                    <i class="fas fa-envelope"></i> Contact
                </button>
            </div>
        </div>
    `;
}

// Get human-readable lifestyle label
function getLifestyleLabel(lifestyle) {
    switch (lifestyle) {
        case 'quiet':
            return 'Quiet/Studious';
        case 'social':
            return 'Social/Outgoing';
        case 'balanced':
            return 'Balanced';
        default:
            return lifestyle;
    }
}

// Get human-readable location label
function getLocationLabel(location) {
    switch (location) {
        case 'downtown':
            return 'Downtown';
        case 'suburbs':
            return 'Suburbs';
        case 'campus':
            return 'Near Campus';
        default:
            return location;
    }
}

// Switch between grid and list view
function switchView(view) {
    currentView = view;

    // Update button states
    gridViewBtn.classList.toggle('active', view === 'grid');
    listViewBtn.classList.toggle('active', view === 'list');

    // Update container class
    profilesContainer.classList.toggle('list-view', view === 'list');

    // Update profile cards
    const profileCards = profilesContainer.querySelectorAll('.profile-card');
    profileCards.forEach(card => {
        card.classList.toggle('list-view', view === 'list');
    });
}

// View profile details (placeholder function)
function viewProfile(profileId) {
    const profile = roommateProfiles.find(p => p.id === profileId);
    if (profile) {
        alert(`Viewing profile for ${profile.name}\n\nThis would open a detailed profile view with more information about ${profile.name}, including their bio: "${profile.bio}"`);
    }
}

// Contact roommate - redirect to messaging page
function contactRoommate(profileId) {
    const profile = roommateProfiles.find(p => p.id === profileId);
    if (profile) {
        // Store the profile info in sessionStorage for the messaging page
        sessionStorage.setItem('contactProfile', JSON.stringify(profile));
        // Redirect to messaging page
        window.location.href = 'messaging.html';
    }
}

// Add some interactivity to profile cards
document.addEventListener('click', function (e) {
    if (e.target.closest('.profile-card')) {
        const card = e.target.closest('.profile-card');
        const profileId = parseInt(card.dataset.id);

        // Add a subtle click effect
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && document.activeElement.classList.contains('btn-primary')) {
        applyFilters();
    }
});

// Add loading state for better UX
function showLoading() {
    profilesContainer.innerHTML = '<div class="loading">Loading profiles...</div>';
}

// Simulate loading when applying filters
applyFiltersBtn.addEventListener('click', function () {
    showLoading();
    setTimeout(() => {
        applyFilters();
    }, 500);
}); 