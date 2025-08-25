# MansonryGallery Practical Examples

## Example 1: Different Border Colors for Each Card

### Using CSS Custom Properties (CSS Variables)
```tsx
<MansonryGallery 
    customCardClassName="border-2 transition-all duration-300 hover:scale-105"
    customImageClassName="rounded-lg"
/>
```

Add this CSS to your `globals.css`:
```css
/* Different border colors for each card */
.office-carousel .slick-slide:nth-child(1) .slick-slide > div {
    border-color: #3b82f6 !important; /* Blue */
}

.office-carousel .slick-slide:nth-child(2) .slick-slide > div {
    border-color: #10b981 !important; /* Green */
}

.office-carousel .slick-slide:nth-child(3) .slick-slide > div {
    border-color: #f59e0b !important; /* Amber */
}

.office-carousel .slick-slide:nth-child(4) .slick-slide > div {
    border-color: #ef4444 !important; /* Red */
}

.office-carousel .slick-slide:nth-child(5) .slick-slide > div {
    border-color: #8b5cf6 !important; /* Purple */
}

.office-carousel .slick-slide:nth-child(6) .slick-slide > div {
    border-color: #06b6d4 !important; /* Cyan */
}
```

### Using Tailwind CSS with Dynamic Classes
```tsx
const borderColors = [
    'border-blue-500',
    'border-green-500', 
    'border-amber-500',
    'border-red-500',
    'border-purple-500',
    'border-cyan-500'
];

<MansonryGallery 
    customCardClassName={`border-2 transition-all duration-300 hover:scale-105 ${borderColors.join(' ')}`}
/>
```

## Example 2: Different Background Colors for Container

### Gradient Background with Card Variations
```tsx
<MansonryGallery 
    customContainerClassName="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-12 rounded-2xl shadow-2xl"
    customColumnClassName="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
    customCardClassName="border-2 border-transparent hover:border-blue-400 transition-all duration-300 transform hover:scale-105 bg-white/90"
    customImageClassName="rounded-lg hover:brightness-110 transition-all duration-300"
/>
```

### Dynamic Background Based on Theme
```tsx
const isDarkMode = true; // Replace with your theme logic

const containerBg = isDarkMode 
    ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
    : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50';

const cardBg = isDarkMode 
    ? 'bg-gray-800/90 border-gray-600' 
    : 'bg-white/90 border-gray-200';

<MansonryGallery 
    customContainerClassName={`${containerBg} p-12 rounded-2xl shadow-2xl`}
    customCardClassName={`border-2 ${cardBg} transition-all duration-300 transform hover:scale-105`}
/>
```

## Example 3: Card Variations with Different Effects

### Hover Effects for Each Card
```tsx
<MansonryGallery 
    customCardClassName="border-2 border-gray-200 transition-all duration-500 transform hover:scale-105 hover:rotate-1 hover:shadow-2xl"
    customImageClassName="rounded-lg hover:brightness-110 transition-all duration-300"
/>
```

### Different Hover Effects for Each Column
```tsx
const columnEffects = [
    'hover:scale-105 hover:rotate-1',           // Column 1: Scale + Rotate
    'hover:scale-110 hover:-rotate-1',          // Column 2: Larger scale + Reverse rotate
    'hover:scale-105 hover:translate-y-2',      // Column 3: Scale + Move down
    'hover:scale-110 hover:translate-y-2',      // Column 4: Larger scale + Move down
    'hover:scale-105 hover:rotate-2'            // Column 5: Scale + Larger rotate
];

<MansonryGallery 
    customColumnClassName={`bg-white p-4 rounded-lg shadow-md transition-all duration-300 ${columnEffects.join(' ')}`}
    customCardClassName="border border-gray-200 rounded-lg overflow-hidden"
/>
```

## Example 4: Seasonal/Themed Variations

### Spring Theme
```tsx
<MansonryGallery 
    customContainerClassName="bg-gradient-to-br from-green-50 via-yellow-50 to-pink-50 p-12 rounded-2xl"
    customColumnClassName="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg"
    customCardClassName="border-2 border-green-200 hover:border-green-400 transition-all duration-300 transform hover:scale-105 bg-white/90"
    customImageClassName="rounded-lg hover:brightness-110 transition-all duration-300"
/>
```

### Summer Theme
```tsx
<MansonryGallery 
    customContainerClassName="bg-gradient-to-br from-blue-50 via-cyan-50 to-yellow-50 p-12 rounded-2xl"
    customColumnClassName="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg"
    customCardClassName="border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 bg-white/90"
    customImageClassName="rounded-lg hover:brightness-110 transition-all duration-300"
/>
```

### Autumn Theme
```tsx
<MansonryGallery 
    customContainerClassName="bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 p-12 rounded-2xl"
    customColumnClassName="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg"
    customCardClassName="border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 transform hover:scale-105 bg-white/90"
    customImageClassName="rounded-lg hover:brightness-110 transition-all duration-300"
/>
```

### Winter Theme
```tsx
<MansonryGallery 
    customContainerClassName="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-12 rounded-2xl"
    customColumnClassName="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg"
    customCardClassName="border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 bg-white/90"
    customImageClassName="rounded-lg hover:brightness-110 transition-all duration-300"
/>
```

## Example 5: Professional vs Creative Styles

### Professional Style
```tsx
<MansonryGallery 
    customContainerClassName="bg-gray-50 p-12 rounded-lg border border-gray-200"
    customColumnClassName="bg-white p-6 rounded-lg shadow-md border border-gray-100"
    customCardClassName="border border-gray-200 hover:border-gray-400 transition-all duration-300 transform hover:scale-102 bg-white"
    customImageClassName="rounded-md hover:brightness-105 transition-all duration-300"
/>
```

### Creative Style
```tsx
<MansonryGallery 
    customContainerClassName="bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 p-16 rounded-3xl shadow-2xl"
    customColumnClassName="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/30"
    customCardClassName="border-2 border-purple-200 hover:border-purple-400 transition-all duration-500 transform hover:scale-110 hover:rotate-2 bg-white/80"
    customImageClassName="rounded-2xl hover:brightness-125 transition-all duration-500 hover:contrast-125"
/>
```

## Example 6: Responsive Variations

### Mobile-First Responsive Design
```tsx
<MansonryGallery 
    customContainerClassName="px-4 py-8 md:px-8 md:py-12 lg:px-12 lg:py-16 bg-gradient-to-br from-blue-50 to-indigo-100"
    customColumnClassName="gap-3 md:gap-4 lg:gap-6 bg-white/80 p-3 md:p-4 lg:p-6 rounded-lg md:rounded-xl"
    customCardClassName="border border-gray-200 md:border-2 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 md:hover:scale-110"
    customImageClassName="rounded-md md:rounded-lg hover:brightness-110 transition-all duration-300"
/>
```

## Example 7: Interactive Card States

### Card States with Different Colors
```tsx
<MansonryGallery 
    customCardClassName="border-2 border-gray-200 hover:border-blue-400 active:border-green-500 focus:border-purple-500 transition-all duration-300 transform hover:scale-105 active:scale-95 bg-white hover:bg-blue-50 active:bg-green-50"
    customImageClassName="rounded-lg hover:brightness-110 active:brightness-90 transition-all duration-300"
/>
```

## Example 8: Animation Variations

### Staggered Animations
```tsx
<MansonryGallery 
    customCardClassName="border-2 border-gray-200 hover:border-blue-400 transition-all duration-700 ease-out transform hover:scale-105 hover:rotate-1 hover:shadow-2xl"
    customImageClassName="rounded-lg hover:brightness-110 hover:contrast-125 transition-all duration-700 ease-out"
/>
```

### Bounce Effects
```tsx
<MansonryGallery 
    customCardClassName="border-2 border-gray-200 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl"
    customImageClassName="rounded-lg hover:brightness-110 transition-all duration-300 hover:animate-bounce"
/>
```

## How to Use These Examples

1. **Copy the example** you want to use
2. **Replace the MansonryGallery component** in your code
3. **Customize the colors, spacing, and effects** to match your design
4. **Add any additional CSS** to your globals.css if needed
5. **Test different variations** to find the perfect style

## Tips for Customization

- **Use Tailwind CSS classes** for consistent spacing and colors
- **Combine multiple effects** for unique interactions
- **Test on different screen sizes** to ensure responsiveness
- **Keep transitions smooth** with appropriate duration values
- **Use CSS custom properties** for dynamic theming
- **Consider accessibility** with proper contrast ratios
