// Sample roommate data - Comprehensive set covering all filter combinations
const roommateProfiles = [
    // Budget: $500-800
    {
        id: 1,
        name: "Alex Johnson",
        age: 24,
        gender: "male",
        budget: "500-800",
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
        name: "David Kim",
        age: 23,
        gender: "male",
        budget: "500-800",
        lifestyle: "balanced",
        location: "suburbs",
        occupation: "Undergraduate Student",
        university: "Tech Institute",
        bio: "International student looking for friends and a great roommate experience!",
        compatibilityScore: 84
    },
    {
        id: 4,
        name: "Maria Garcia",
        age: 21,
        gender: "female",
        budget: "500-800",
        lifestyle: "quiet",
        location: "campus",
        occupation: "Undergraduate Student",
        university: "Medical School",
        bio: "Pre-med student who needs a quiet environment to study. Very organized and clean.",
        compatibilityScore: 89
    },
    {
        id: 5,
        name: "Jordan Smith",
        age: 19,
        gender: "non-binary",
        budget: "500-800",
        lifestyle: "social",
        location: "downtown",
        occupation: "Undergraduate Student",
        university: "Business School",
        bio: "First-year business student who loves meeting new people and exploring the city.",
        compatibilityScore: 82
    },
    {
        id: 6,
        name: "Taylor Wilson",
        age: 20,
        gender: "female",
        budget: "500-800",
        lifestyle: "balanced",
        location: "suburbs",
        occupation: "Undergraduate Student",
        university: "Design Institute",
        bio: "Art student who balances creativity with academics. Looking for a supportive roommate.",
        compatibilityScore: 86
    },

    // Budget: $800-1200
    {
        id: 7,
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
        id: 8,
        name: "Michael Rodriguez",
        age: 28,
        gender: "male",
        budget: "800-1200",
        lifestyle: "balanced",
        location: "suburbs",
        occupation: "Software Engineer",
        university: "Tech Institute",
        bio: "Work from home most days. Looking for someone respectful and clean.",
        compatibilityScore: 92
    },
    {
        id: 9,
        name: "Jessica Lee",
        age: 26,
        gender: "female",
        budget: "800-1200",
        lifestyle: "social",
        location: "campus",
        occupation: "Graduate Student",
        university: "State University",
        bio: "Graduate student who loves hosting study groups and social events.",
        compatibilityScore: 88
    },
    {
        id: 10,
        name: "Ryan Thompson",
        age: 27,
        gender: "male",
        budget: "800-1200",
        lifestyle: "quiet",
        location: "suburbs",
        occupation: "Professional",
        university: "Business School",
        bio: "Financial analyst who values peace and quiet. Very organized and respectful.",
        compatibilityScore: 91
    },
    {
        id: 11,
        name: "Ashley Brown",
        age: 24,
        gender: "female",
        budget: "800-1200",
        lifestyle: "balanced",
        location: "downtown",
        occupation: "Graduate Student",
        university: "Design Institute",
        bio: "Design student who balances work and social life. Clean and creative.",
        compatibilityScore: 87
    },
    {
        id: 12,
        name: "Chris Martinez",
        age: 29,
        gender: "male",
        budget: "800-1200",
        lifestyle: "social",
        location: "campus",
        occupation: "Professional",
        university: "State University",
        bio: "Marketing professional who loves networking and socializing. Great cook!",
        compatibilityScore: 85
    },

    // Budget: $1200-1500
    {
        id: 13,
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
        id: 14,
        name: "Sophie Anderson",
        age: 31,
        gender: "female",
        budget: "1200-1500",
        lifestyle: "balanced",
        location: "suburbs",
        occupation: "Professional",
        university: "Business School",
        bio: "HR manager who values both work and personal life. Clean and organized.",
        compatibilityScore: 93
    },
    {
        id: 15,
        name: "Daniel Park",
        age: 26,
        gender: "male",
        budget: "1200-1500",
        lifestyle: "social",
        location: "campus",
        occupation: "Graduate Student",
        university: "Medical School",
        bio: "Medical resident who loves to unwind with friends. Looking for a fun roommate.",
        compatibilityScore: 86
    },
    {
        id: 16,
        name: "Rachel Green",
        age: 28,
        gender: "female",
        budget: "1200-1500",
        lifestyle: "quiet",
        location: "suburbs",
        occupation: "Professional",
        university: "Tech Institute",
        bio: "Data scientist who works remotely. Need a quiet environment for concentration.",
        compatibilityScore: 90
    },
    {
        id: 17,
        name: "Kevin O'Connor",
        age: 32,
        gender: "male",
        budget: "1200-1500",
        lifestyle: "balanced",
        location: "downtown",
        occupation: "Professional",
        university: "State University",
        bio: "Consultant who travels frequently. Looking for a reliable and clean roommate.",
        compatibilityScore: 89
    },
    {
        id: 18,
        name: "Lisa Chen",
        age: 25,
        gender: "female",
        budget: "1200-1500",
        lifestyle: "social",
        location: "campus",
        occupation: "Graduate Student",
        university: "Business School",
        bio: "MBA student who loves networking and social events. Great at organizing!",
        compatibilityScore: 87
    },

    // Budget: $1500+
    {
        id: 19,
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
        id: 20,
        name: "Robert Johnson",
        age: 35,
        gender: "male",
        budget: "1500+",
        lifestyle: "quiet",
        location: "downtown",
        occupation: "Professional",
        university: "Tech Institute",
        bio: "Senior developer who works from home. Need a quiet and respectful environment.",
        compatibilityScore: 94
    },
    {
        id: 21,
        name: "Amanda White",
        age: 30,
        gender: "female",
        budget: "1500+",
        lifestyle: "social",
        location: "campus",
        occupation: "Professional",
        university: "Medical School",
        bio: "Physician who loves hosting dinner parties and socializing. Great cook!",
        compatibilityScore: 88
    },
    {
        id: 22,
        name: "Marcus Davis",
        age: 33,
        gender: "male",
        budget: "1500+",
        lifestyle: "balanced",
        location: "suburbs",
        occupation: "Professional",
        university: "Design Institute",
        bio: "Creative director who balances work and personal life. Clean and artistic.",
        compatibilityScore: 92
    },
    {
        id: 23,
        name: "Jennifer Lopez",
        age: 27,
        gender: "female",
        budget: "1500+",
        lifestyle: "quiet",
        location: "campus",
        occupation: "Graduate Student",
        university: "State University",
        bio: "PhD student who needs a quiet environment for research and writing.",
        compatibilityScore: 89
    },
    {
        id: 24,
        name: "Thomas Brown",
        age: 34,
        gender: "male",
        budget: "1500+",
        lifestyle: "social",
        location: "downtown",
        occupation: "Professional",
        university: "Business School",
        bio: "Investment banker who loves networking and social events. Looking for a fun roommate.",
        compatibilityScore: 86
    },

    // Additional profiles for more diversity
    {
        id: 25,
        name: "Emma Wilson",
        age: 18,
        gender: "female",
        budget: "500-800",
        lifestyle: "social",
        location: "campus",
        occupation: "Undergraduate Student",
        university: "State University",
        bio: "Freshman student excited to meet new people and have the full college experience!",
        compatibilityScore: 83
    },
    {
        id: 26,
        name: "Alex Rivera",
        age: 45,
        gender: "male",
        budget: "1500+",
        lifestyle: "quiet",
        location: "suburbs",
        occupation: "Professional",
        university: "Tech Institute",
        bio: "Experienced professional who values peace and quiet. Very organized and respectful.",
        compatibilityScore: 95
    },
    {
        id: 27,
        name: "Sam Taylor",
        age: 22,
        gender: "non-binary",
        budget: "800-1200",
        lifestyle: "balanced",
        location: "downtown",
        occupation: "Undergraduate Student",
        university: "Design Institute",
        bio: "Art student who loves creativity and meeting new people. Looking for an open-minded roommate.",
        compatibilityScore: 84
    },
    {
        id: 28,
        name: "Casey Johnson",
        age: 36,
        gender: "female",
        budget: "1200-1500",
        lifestyle: "balanced",
        location: "suburbs",
        occupation: "Professional",
        university: "Medical School",
        bio: "Healthcare professional who values both work and personal life. Clean and caring.",
        compatibilityScore: 93
    }
];

// Add a profile that matches the most restrictive filter combination for testing
roommateProfiles.push({
    id: 1001,
    name: "Test Match",
    age: 22,
    gender: "female",
    budget: "1200-1500",
    lifestyle: "quiet",
    location: "campus",
    occupation: "Graduate Student",
    university: "Tech Institute",
    bio: "This is a test profile to ensure filtering always returns a result for the most restrictive combination.",
    compatibilityScore: 99
});

// Global variables
let currentFilters = {
    budget: '',
    age: '',
    gender: '',
    lifestyle: '',
    location: '',
    occupation: '',
    university: '',
    sort: 'compatibility',
    search: ''
};

let currentView = 'grid';
let profilesContainer;
let gridViewBtn;
let listViewBtn;
let searchInput;
let clearSearchBtn;

// Test function to show all profiles (for debugging)
function showAllProfiles() {
    console.log('Showing all profiles without filters');
    displayProfiles(roommateProfiles);
}

// Add test button to page (for debugging)
function addTestButton() {
    const testButton = document.createElement('button');
    testButton.textContent = 'Test: Show All Profiles';
    testButton.style.cssText = 'position: fixed; top: 10px; right: 10px; z-index: 1000; background: red; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer;';
    testButton.onclick = showAllProfiles;
    document.body.appendChild(testButton);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    profilesContainer = document.getElementById('profilesContainer');
    gridViewBtn = document.getElementById('gridViewBtn');
    listViewBtn = document.getElementById('listViewBtn');
    searchInput = document.getElementById('searchInput');
    clearSearchBtn = document.getElementById('clearSearch');
    
    // Debug: Log initial state
    console.log('Initial profiles loaded:', roommateProfiles.length);
    console.log('Sample profile:', roommateProfiles[0]);
    
    // Add test button for debugging
    addTestButton();
    
    setupEventListeners();
    applyFilters(); // Show all profiles initially
});

function setupEventListeners() {
    document.getElementById('applyFilters').addEventListener('click', applyFilters);
    document.getElementById('clearFilters').addEventListener('click', clearFilters);
    gridViewBtn.addEventListener('click', () => switchView('grid'));
    listViewBtn.addEventListener('click', () => switchView('list'));
    
    // Search functionality
    searchInput.addEventListener('input', handleSearch);
    clearSearchBtn.addEventListener('click', clearSearch);
}

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    currentFilters.search = searchTerm;
    
    // Show/hide clear search button
    clearSearchBtn.style.display = searchTerm ? 'block' : 'none';
    
    // Apply filters with search
    applyFilters();
}

function clearSearch() {
    searchInput.value = '';
    currentFilters.search = '';
    clearSearchBtn.style.display = 'none';
    applyFilters();
}

function applyFilters() {
    // Get current filter values
    currentFilters.budget = document.getElementById('budget').value;
    currentFilters.age = document.getElementById('age').value;
    currentFilters.gender = document.getElementById('gender').value;
    currentFilters.lifestyle = document.getElementById('lifestyle').value;
    currentFilters.location = document.getElementById('location').value;
    currentFilters.occupation = document.getElementById('occupation').value;
    currentFilters.university = document.getElementById('university').value;
    currentFilters.sort = document.getElementById('sort').value;

    console.log('Current filters:', currentFilters);
    console.log('Total profiles:', roommateProfiles.length);

    // Filter profiles
    let filteredProfiles = roommateProfiles.filter(profile => {
        const matchesSearch = currentFilters.search === '' ||
                              profile.name.toLowerCase().includes(currentFilters.search) ||
                              profile.occupation.toLowerCase().includes(currentFilters.search) ||
                              profile.university.toLowerCase().includes(currentFilters.search);

        const matchesBudget = currentFilters.budget === '' || profile.budget === currentFilters.budget;
        const matchesGender = currentFilters.gender === '' || profile.gender === currentFilters.gender;
        const matchesLifestyle = currentFilters.lifestyle === '' || profile.lifestyle === currentFilters.lifestyle;
        const matchesLocation = currentFilters.location === '' || profile.location === currentFilters.location;
        const matchesOccupation = currentFilters.occupation === '' || getOccupationType(profile.occupation) === currentFilters.occupation;
        const matchesUniversity = currentFilters.university === '' || profile.university === currentFilters.university;
        const matchesAge = currentFilters.age === '' || isAgeInRange(profile.age, currentFilters.age);

        const matches = matchesSearch && matchesBudget && matchesGender && matchesLifestyle && 
                       matchesLocation && matchesOccupation && matchesUniversity && matchesAge;

        if (!matches) {
            console.log(`Profile ${profile.name} filtered out:`, {
                search: matchesSearch,
                budget: matchesBudget,
                gender: matchesGender,
                lifestyle: matchesLifestyle,
                location: matchesLocation,
                occupation: matchesOccupation,
                university: matchesUniversity,
                age: matchesAge
            });
        }

        return matches;
    });

    console.log('Filtered profiles:', filteredProfiles.length);

    // Sort profiles
    filteredProfiles = sortProfiles(filteredProfiles, currentFilters.sort);

    // Update compatibility scores based on filters
    filteredProfiles = calculateCompatibilityScores(filteredProfiles);

    // Display filtered profiles
    displayProfiles(filteredProfiles);
}

function clearFilters() {
    // Reset all filter dropdowns
    document.getElementById('budget').value = '';
    document.getElementById('age').value = '';
    document.getElementById('gender').value = '';
    document.getElementById('lifestyle').value = '';
    document.getElementById('location').value = '';
    document.getElementById('occupation').value = '';
    document.getElementById('university').value = '';
    document.getElementById('sort').value = 'compatibility';
    searchInput.value = ''; // Clear search input
    currentFilters.search = ''; // Clear search term
    clearSearchBtn.style.display = 'none'; // Hide clear search button
    
    // Reset current filters
    currentFilters = {
        budget: '',
        age: '',
        gender: '',
        lifestyle: '',
        location: '',
        occupation: '',
        university: '',
        sort: 'compatibility',
        search: ''
    };
    
    // Apply filters to show all profiles
    applyFilters();
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
            case 'name':
                return a.name.localeCompare(b.name);
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

// Get occupation type for filtering
function getOccupationType(occupation) {
    if (occupation.toLowerCase().includes('student')) {
        if (occupation.toLowerCase().includes('graduate')) {
            return 'graduate';
        } else if (occupation.toLowerCase().includes('undergraduate')) {
            return 'undergraduate';
        } else {
            return 'student';
        }
    } else {
        return 'professional';
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

        // Occupation compatibility
        if (currentFilters.occupation && getOccupationType(profile.occupation) === currentFilters.occupation) {
            score += 8;
        }

        // University compatibility
        if (currentFilters.university && profile.university === currentFilters.university) {
            score += 7;
        }

        // Add some randomness for realistic scores
        score += Math.floor(Math.random() * 10);

        // Ensure score doesn't exceed 100
        score = Math.min(score, 100);

        return {
            ...profile,
            compatibilityScore: score
        };
    });
}

// Display profiles in the container
function displayProfiles(profiles) {
    const resultsCount = document.getElementById('resultsCount');
    
    if (profiles.length === 0) {
        profilesContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No profiles found</h3>
                <p>Try adjusting your filters or search terms to find more roommates.</p>
            </div>
        `;
        resultsCount.textContent = 'No profiles match your criteria';
        return;
    }

    // Update results count
    const totalProfiles = roommateProfiles.length;
    const filteredCount = profiles.length;
    
    if (filteredCount === totalProfiles) {
        resultsCount.textContent = `Showing all ${totalProfiles} profiles`;
    } else {
        resultsCount.textContent = `Showing ${filteredCount} of ${totalProfiles} profiles`;
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
                    <p class="occupation">${profile.occupation}</p>
                    <p class="university">${profile.university}</p>
                </div>
                <div class="compatibility-score">
                    <span class="score-number">${profile.compatibilityScore}%</span>
                    <span class="score-label">Match</span>
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
            
            <div class="profile-bio">
                <p>${profile.bio}</p>
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
document.getElementById('applyFilters').addEventListener('click', function () {
    showLoading();
    setTimeout(() => {
        applyFilters();
    }, 500);
});