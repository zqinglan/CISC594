// UniRoomie Roommate Discovery Configuration
const CONFIG = {
    // Application settings
    appName: 'UniRoomie',
    version: '1.0.0',
    component: 'Roommate Discovery',

    // Filter options
    budgetRanges: [
        { value: '', label: 'Any Budget' },
        { value: '500-800', label: '$500 - $800' },
        { value: '800-1200', label: '$800 - $1,200' },
        { value: '1200-1500', label: '$1,200 - $1,500' },
        { value: '1500+', label: '$1,500+' }
    ],

    ageRanges: [
        { value: '', label: 'Any Age' },
        { value: '18-25', label: '18-25' },
        { value: '26-35', label: '26-35' },
        { value: '36-45', label: '36-45' },
        { value: '45+', label: '45+' }
    ],

    genderOptions: [
        { value: '', label: 'Any Gender' },
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'non-binary', label: 'Non-binary' }
    ],

    lifestyleOptions: [
        { value: '', label: 'Any Lifestyle' },
        { value: 'quiet', label: 'Quiet/Studious' },
        { value: 'social', label: 'Social/Outgoing' },
        { value: 'balanced', label: 'Balanced' }
    ],

    locationOptions: [
        { value: '', label: 'Any Location' },
        { value: 'downtown', label: 'Downtown' },
        { value: 'suburbs', label: 'Suburbs' },
        { value: 'campus', label: 'Near Campus' }
    ],

    sortOptions: [
        { value: 'compatibility', label: 'Compatibility Score' },
        { value: 'budget', label: 'Budget (Low to High)' },
        { value: 'age', label: 'Age' }
    ],

    // Compatibility scoring weights
    compatibilityWeights: {
        budget: 15,
        lifestyle: 10,
        location: 5,
        age: 10,
        baseScore: 70
    },

    // UI settings
    defaultView: 'grid',
    profilesPerPage: 12,
    loadingDelay: 500,

    // API endpoints (for future backend integration)
    endpoints: {
        profiles: '/api/profiles',
        filters: '/api/filters',
        contact: '/api/contact'
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} 