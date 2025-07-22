# UniRoomie - Roommate Discovery Platform

A modern web application for finding compatible roommates and managing shared living arrangements. Built with HTML, CSS, and JavaScript.

## Project Overview

UniRoomie is designed to simplify the process of finding compatible roommates by providing an intuitive interface for filtering, sorting, and discovering potential roommates based on key criteria.

## Features

### Roommate Discovery
- **Advanced Filtering**: Filter profiles by budget, age range, gender, lifestyle, and location
- **Smart Sorting**: Sort by compatibility score, budget, or age
- **Compatibility Scoring**: Dynamic compatibility calculation based on mutual preferences
- **Dual View Modes**: Switch between card grid view and list view
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Match & Messaging
- **Connection Requests**: Send and receive connection requests from potential roommates
- **Real-time Chat**: Exchange messages with mutually connected users
- **User Search**: Find and connect with other users on the platform
- **Message History**: Persistent chat history with timestamps
- **Online Status**: See when connections are online or offline
- **Unread Notifications**: Track unread message counts
- **Typing Indicators**: Real-time typing status during conversations

### User Interface
- **Modern Design**: Clean, professional interface with gradient accents
- **Interactive Elements**: Hover effects, smooth transitions, and loading states
- **Accessibility**: Keyboard navigation and screen reader friendly
- **Real-time Updates**: Instant filtering and sorting without page reloads

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software installation required

### Installation
1. Download or clone the project files
2. Open `roommate-discovery.html` in your web browser
3. Start exploring roommate profiles!

### File Structure
```
UniRoomie/
├── roommate-discovery.html    # Main discovery interface
├── messaging.html             # Messaging and connections interface
├── styles.css                 # Main styles
├── messaging.css              # Messaging-specific styles
├── script.js                  # Discovery page JavaScript
├── messaging.js               # Messaging system JavaScript
├── config.js                  # Configuration and constants
├── utils.js                   # Utility functions and helpers
├── README.md                  # General project documentation
└── COMPONENT_DOCS.md         # Component-specific documentation
```

## How to Use

### Finding Roommates
1. **Set Your Preferences**: Use the filter dropdowns to specify your criteria:
   - Budget range (e.g., $500-$800, $800-$1,200)
   - Age range (e.g., 18-25, 26-35)
   - Gender preference
   - Lifestyle preference (Quiet/Studious, Social/Outgoing, Balanced)
   - Location preference (Downtown, Suburbs, Near Campus)

2. **Apply Filters**: Click the "Apply Filters" button to see matching profiles

3. **Sort Results**: Choose how to sort the results:
   - **Compatibility Score**: Shows best matches first
   - **Budget**: Low to high budget ranges
   - **Age**: Youngest to oldest

4. **View Profiles**: 
   - Click "View Profile" to see detailed information
   - Click "Contact" to navigate to the messaging page
   - Switch between grid and list views using the toggle buttons

### Messaging & Connections
1. **Connection Requests**: 
   - View pending connection requests in the sidebar
   - Accept or decline requests with one click
   - See detailed user information before connecting

2. **Start Conversations**:
   - Click on any connection to open a chat
   - Use the "New Message" button to find and connect with new users
   - Search for users by name, occupation, or university

3. **Chat Features**:
   - Send and receive messages in real-time
   - See typing indicators during conversations
   - View message timestamps and online status
   - Track unread message counts

### Understanding Compatibility Scores
Compatibility scores (0-100%) are calculated based on:
- **Budget Match**: +15 points for exact budget match
- **Lifestyle Match**: +10 points for lifestyle compatibility
- **Location Match**: +5 points for location preference
- **Age Range**: +10 points for age compatibility
- **Base Score**: 70 points for all profiles
- **Random Factor**: Small variation for realistic results

## Design Features

### Visual Design
- **Color Scheme**: Purple gradient theme with clean whites and grays
- **Typography**: Inter font family for modern readability
- **Icons**: Font Awesome icons for intuitive navigation
- **Cards**: Elevated profile cards with hover effects

### Responsive Layout
- **Desktop**: Full grid layout with all filters visible
- **Tablet**: Responsive grid that adapts to screen size
- **Mobile**: Single-column layout with stacked filters

## Technical Implementation

### Frontend Technologies
- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Dynamic functionality and interactivity

### Key JavaScript Features
- **Filter System**: Real-time profile filtering
- **Sorting Algorithm**: Multiple sorting criteria
- **Compatibility Calculator**: Dynamic score calculation
- **View Management**: Grid/list view switching
- **Event Handling**: Interactive user experience

### Sample Data
The application includes 8 sample roommate profiles with diverse characteristics:
- Different age ranges (21-29)
- Various budget levels ($500-$1,500+)
- Multiple lifestyle preferences
- Different locations and occupations

## Future Enhancements

Potential features for future development:
- **User Authentication**: Login/signup system
- **Profile Creation**: User profile builder
- **Photo Uploads**: Profile pictures and room photos
- **Advanced Matching**: AI-powered compatibility algorithms
- **Database Integration**: Persistent data storage
- **Real-time Chat**: Live messaging capabilities with WebSocket
- **Room Listings**: Property search and listings
- **Reviews & Ratings**: User feedback system
- **Push Notifications**: Real-time notifications for messages and requests
- **File Sharing**: Share documents and images in chat
- **Voice/Video Calls**: Integrated calling features

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

This is a demonstration project for the UniRoomie roommate discovery platform. The code is structured to be easily extensible for future development.

## License

This project is created for educational and demonstration purposes.

---

**UniRoomie** - Making roommate discovery simple and enjoyable! 