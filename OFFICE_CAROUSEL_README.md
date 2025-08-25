# Office Section Carousel Implementation

## Overview
The OfficeSection component has been updated to use **Slick ReactJS carousel** instead of the previous custom implementation. This provides a more robust, accessible, and feature-rich carousel experience.

## Features Implemented

### 🎠 Carousel Behavior
- **3 visible cards** at a time on desktop
- **Center mode** - the middle card is always focused and highlighted
- **Smooth transitions** with custom easing functions
- **Infinite loop** - seamless navigation through all offices
- **Responsive design** - adapts to different screen sizes

### 🎯 Navigation
- **Left/Right arrow buttons** for manual navigation
- **Keyboard navigation** - Arrow keys work when section is focused
- **Touch/swipe support** for mobile devices
- **Focus management** - proper accessibility support

### 🎨 Visual Enhancements
- **Center card highlighting** - larger scale and full opacity
- **Side cards** - slightly smaller scale and reduced opacity
- **Smooth animations** - 600ms transitions with custom easing
- **Hover effects** - cards scale and show enhanced details on hover
- **Professional styling** - consistent with the design system

## Technical Implementation

### Dependencies
```bash
npm install react-slick slick-carousel
npm install --save-dev @types/react-slick
```

### Key Components
1. **OfficeSection.tsx** - Main carousel container with Slick configuration
2. **OfficeCard.tsx** - Individual office card with hover effects
3. **Custom CSS** - Enhanced Slick carousel styling in globals.css

### Slick Configuration
```typescript
const settings = {
    dots: false,                    // No pagination dots
    infinite: true,                 // Infinite loop
    speed: 600,                     // Transition speed
    slidesToShow: 3,               // Show 3 cards at once
    slidesToScroll: 1,             // Scroll 1 card at a time
    centerMode: true,               // Center the focused card
    centerPadding: '0px',          // No extra padding
    focusOnSelect: true,            // Focus on card selection
    cssEase: 'cubic-bezier(...)',  // Custom easing function
    swipeToSlide: true,            // Enable touch/swipe
    touchThreshold: 10,            // Touch sensitivity
    responsive: [...]               // Mobile breakpoints
}
```

### CSS Customization
The carousel uses custom CSS classes to:
- Scale center cards (1.05x) and side cards (0.95x)
- Control opacity (center: 100%, side: 60%)
- Add smooth transitions (500ms)
- Ensure proper spacing and alignment
- Hide default Slick navigation arrows

## Usage

### Basic Navigation
```typescript
// Programmatic navigation
const sliderRef = useRef<Slider>(null)

const prev = () => sliderRef.current?.slickPrev()
const next = () => sliderRef.current?.slickNext()
```

### Keyboard Support
- **Tab** to focus the section
- **Left Arrow** to go to previous office
- **Right Arrow** to go to next office
- **Enter** on buttons for activation

### Touch/Mobile
- **Swipe left** to go to next office
- **Swipe right** to go to previous office
- Responsive breakpoints for different screen sizes

## Responsive Behavior

| Screen Size | Cards Shown | Center Mode |
|-------------|-------------|-------------|
| Desktop     | 3           | Yes         |
| Tablet      | 2           | Yes         |
| Mobile      | 1           | Yes         |

## Accessibility Features

- **ARIA labels** on navigation buttons
- **Keyboard navigation** support
- **Focus management** with visible focus rings
- **Screen reader** friendly structure
- **Touch target** sizing for mobile

## Customization

### Adding More Offices
Simply add to the `offices` array:
```typescript
const offices = [
    { name: 'Chicago', image: '/offices/chicago.png', url: '/offices/chicago' },
    { name: 'Atlanta', image: '/offices/atlanta.png', url: '/offices/atlanta' },
    // Add more offices here...
]
```

### Modifying Transitions
Adjust the `speed` and `cssEase` properties in the settings object for different animation feels.

### Styling Changes
Modify the CSS classes in `globals.css` to change:
- Card scaling factors
- Opacity levels
- Transition timing
- Hover effects

## Browser Support
- Modern browsers with CSS transforms support
- Touch devices with swipe gestures
- Keyboard navigation for accessibility
- Responsive design for all screen sizes

## Performance Notes
- Uses CSS transforms for smooth animations
- GPU acceleration with `transform-gpu` class
- Efficient re-rendering with React hooks
- Optimized touch handling for mobile devices
