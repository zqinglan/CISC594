# UniRoomie Roommate Discovery Component Documentation

## Overview
This component handles the roommate discovery functionality for the UniRoomie platform. It provides filtering, sorting, and compatibility scoring for roommate profiles.

## File Structure
```
roommate-discovery/
├── roommate-discovery.html    # Main HTML interface
├── styles.css                 # Component-specific styles
├── script.js                  # Main JavaScript functionality
├── config.js                  # Configuration and constants
├── utils.js                   # Utility functions and helpers
├── README.md                  # General project documentation
└── COMPONENT_DOCS.md         # This file - component documentation
```

## Architecture

### Core Files
- **roommate-discovery.html**: Main interface with filters and profile display
- **script.js**: Primary logic for filtering, sorting, and profile management
- **config.js**: Centralized configuration for filters, scoring weights, and settings
- **utils.js**: Utility functions for validation, error handling, and helper methods
- **styles.css**: Component-specific styling with responsive design

### Data Flow
1. User selects filters in the interface
2. `applyFilters()` function processes selections
3. Profiles are filtered based on criteria
4. Compatibility scores are calculated
5. Results are sorted and displayed
6. User can switch between grid/list views

## Key Functions

### Filtering System
```javascript
// Main filtering function
applyFilters() {
    // Gets current filter values
    // Filters profiles based on criteria
    // Sorts results
    // Updates compatibility scores
    // Displays filtered profiles
}
```

### Compatibility Scoring
```javascript
// Calculates compatibility based on filter matches
calculateCompatibilityScores(profiles) {
    // Base score: 70 points
    // Budget match: +15 points
    // Lifestyle match: +10 points
    // Location match: +5 points
    // Age range match: +10 points
    // Random factor: +0-10 points
}
```

### View Management
```javascript
// Switches between grid and list views
switchView(view) {
    // Updates button states
    // Changes container classes
    // Updates profile card layouts
}
```

## Configuration

### Filter Options (config.js)
- **Budget Ranges**: $500-$800, $800-$1,200, $1,200-$1,500, $1,500+
- **Age Ranges**: 18-25, 26-35, 36-45, 45+
- **Gender Options**: Male, Female, Non-binary
- **Lifestyle Options**: Quiet/Studious, Social/Outgoing, Balanced
- **Location Options**: Downtown, Suburbs, Near Campus

### Compatibility Weights
- Budget: 15 points
- Lifestyle: 10 points
- Location: 5 points
- Age: 10 points
- Base Score: 70 points

## Sample Data Structure
```javascript
const roommateProfile = {
    id: 1,
    name: "Alex Johnson",
    age: 24,
    gender: "male",
    budget: "800-1200",
    lifestyle: "quiet",
    location: "downtown",
    occupation: "Graduate Student",
    university: "State University",
    bio: "Looking for a quiet, studious roommate...",
    compatibilityScore: 95
};
```

## Integration Points

### For Backend Integration
The component is designed to easily integrate with a backend API:

```javascript
// API endpoints (config.js)
endpoints: {
    profiles: '/api/profiles',
    filters: '/api/filters',
    contact: '/api/contact'
}
```

### For Other Components
- Profile viewing functionality can be extended
- Contact system can be integrated with messaging
- Filter preferences can be saved to user profiles

## Extending the Component

### Adding New Filters
1. Add filter options to `config.js`
2. Update HTML filter dropdowns
3. Modify filtering logic in `script.js`
4. Update compatibility scoring if needed

### Adding New Profile Fields
1. Update sample data structure
2. Modify profile card HTML generation
3. Update filtering logic if needed
4. Add to compatibility scoring if relevant

### Styling Customization
- Main theme colors are defined in CSS variables
- Responsive breakpoints are clearly defined
- Component-specific styles are isolated

## Performance Considerations

### Current Optimizations
- Debounced filter application
- Efficient DOM manipulation
- Minimal re-renders
- Local storage for user preferences

### Future Optimizations
- Virtual scrolling for large profile lists
- Lazy loading of profile images
- Caching of filtered results
- Web Workers for heavy calculations

## Accessibility Features

### Current Implementation
- Keyboard navigation support
- Screen reader announcements
- Focus management
- High contrast mode support
- Reduced motion support

### WCAG Compliance
- Proper heading structure
- Alt text for images
- Color contrast ratios
- Focus indicators

## Testing Strategy

### Manual Testing Checklist
- [ ] All filters work correctly
- [ ] Sorting functions properly
- [ ] View switching works
- [ ] Responsive design on all devices
- [ ] Keyboard navigation
- [ ] Screen reader compatibility

### Automated Testing (Future)
- Unit tests for filtering logic
- Integration tests for user flows
- Visual regression tests
- Performance benchmarks

## Known Limitations

### Current Limitations
- Sample data only (no real backend)
- Limited profile information
- Basic compatibility algorithm
- No user authentication

### Planned Improvements
- Real API integration
- Advanced matching algorithms
- User profile management
- Real-time messaging

## Troubleshooting

### Common Issues
1. **Filters not working**: Check browser console for JavaScript errors
2. **Profiles not displaying**: Verify data structure in script.js
3. **Styling issues**: Check CSS file loading and browser compatibility
4. **Performance problems**: Monitor for large dataset handling

### Debug Mode
Enable debug logging by setting:
```javascript
localStorage.setItem('debug', 'true');
```

## Contributing Guidelines

### Code Style
- Use consistent indentation (2 spaces)
- Follow JavaScript ES6+ conventions
- Comment complex logic
- Use descriptive variable names

### File Organization
- Keep related functionality together
- Separate concerns (UI, logic, data)
- Use clear file naming conventions
- Document public APIs

### Testing
- Test all filter combinations
- Verify responsive behavior
- Check accessibility features
- Validate performance

## Future Roadmap

### Phase 1 (Current)
- Basic filtering and sorting
- Compatibility scoring
- Responsive design
- Accessibility features

### Phase 2 (Next)
- Backend API integration
- User authentication
- Profile creation
- Advanced matching

### Phase 3 (Future)
- Real-time messaging
- Photo uploads
- Reviews and ratings
- Mobile app integration

---

This component is designed to be modular and extensible. The configuration-driven approach makes it easy to modify behavior without changing core logic. 