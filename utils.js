// UniRoomie Roommate Discovery Utilities
class RoommateDiscoveryUtils {

    // Error handling
    static handleError(error, context = '') {
        console.error(`Error in ${context}:`, error);

        // Show user-friendly error message
        this.showNotification('An error occurred. Please try again.', 'error');
    }

    // Validation functions
    static validateFilters(filters) {
        const errors = [];

        if (filters.budget && !this.isValidBudget(filters.budget)) {
            errors.push('Invalid budget range');
        }

        if (filters.age && !this.isValidAgeRange(filters.age)) {
            errors.push('Invalid age range');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    static isValidBudget(budget) {
        const validBudgets = ['500-800', '800-1200', '1200-1500', '1500+'];
        return validBudgets.includes(budget);
    }

    static isValidAgeRange(ageRange) {
        const validRanges = ['18-25', '26-35', '36-45', '45+'];
        return validRanges.includes(ageRange);
    }

    // Helper functions
    static formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        }).format(amount);
    }

    static formatAgeRange(ageRange) {
        if (!ageRange) return 'Any Age';

        const ranges = {
            '18-25': '18-25 years',
            '26-35': '26-35 years',
            '36-45': '36-45 years',
            '45+': '45+ years'
        };

        return ranges[ageRange] || ageRange;
    }

    static getInitials(name) {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }

    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Local storage utilities
    static saveToLocalStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.warn('Could not save to localStorage:', error);
        }
    }

    static getFromLocalStorage(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.warn('Could not read from localStorage:', error);
            return defaultValue;
        }
    }

    // Notification system
    static showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            this.removeNotification(notification);
        }, 5000);

        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.removeNotification(notification);
        });
    }

    static removeNotification(notification) {
        if (notification && notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }

    // Data sanitization
    static sanitizeInput(input) {
        if (typeof input !== 'string') return input;

        // Remove potentially dangerous HTML
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }

    // Performance utilities
    static measurePerformance(name, fn) {
        const start = performance.now();
        const result = fn();
        const end = performance.now();

        console.log(`${name} took ${(end - start).toFixed(2)}ms`);
        return result;
    }

    // Accessibility helpers
    static announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;

        document.body.appendChild(announcement);

        setTimeout(() => {
            if (announcement.parentNode) {
                announcement.parentNode.removeChild(announcement);
            }
        }, 1000);
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RoommateDiscoveryUtils;
} 