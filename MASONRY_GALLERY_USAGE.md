# MansonryGallery Component Usage Guide

## Overview
The MansonryGallery component has been updated to provide manual control over CSS classes for the container, columns, cards, and images.

## Props Available

### `customContainerClassName`
- **Type**: `string`
- **Description**: Custom CSS classes for the main section container and inner flex container
- **Default**: `''`

### `customColumnClassName`
- **Type**: `string`
- **Description**: Custom CSS classes for each column div
- **Default**: `''`

### `customCardClassName`
- **Type**: `string`
- **Description**: Custom CSS classes for the AnimatedImageCard container (motion.div)
- **Default**: `''`

### `customImageClassName`
- **Type**: `string`
- **Description**: Custom CSS classes for the Image component inside AnimatedImageCard
- **Default**: `''`

## Usage Examples

### Basic Usage (No Custom Classes)
```tsx
import MansonryGallery from '@/components/MansonryGallery'

export default function MyPage() {
    return (
        <MansonryGallery />
    )
}
```

### With Custom Container Styling
```tsx
<MansonryGallery 
    customContainerClassName="bg-gray-100 rounded-lg p-8 shadow-xl"
/>
```

### With Custom Column Layout
```tsx
<MansonryGallery 
    customColumnClassName="bg-white p-4 rounded-md shadow-md"
/>
```

### With Custom Card Styling
```tsx
<MansonryGallery 
    customCardClassName="border-2 border-blue-500 hover:border-blue-700 transition-colors"
/>
```

### With Custom Image Styling
```tsx
<MansonryGallery 
    customImageClassName="filter grayscale hover:grayscale-0 transition-all duration-300"
/>
```

### Complete Customization Example
```tsx
<MansonryGallery 
    customContainerClassName="bg-gradient-to-r from-blue-50 to-indigo-100 p-12 rounded-2xl"
    customColumnClassName="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
    customCardClassName="border border-gray-200 hover:border-blue-400 transition-all duration-300 transform hover:scale-105"
    customImageClassName="rounded-lg hover:brightness-110 transition-all duration-300"
/>
```

## CSS Class Application

### Container Classes
- Applied to both the `<section>` and the inner flex container
- Useful for background colors, padding, margins, borders, etc.

### Column Classes
- Applied to each column `<div>`
- Useful for column-specific styling, spacing, backgrounds, etc.

### Card Classes
- Applied to the AnimatedImageCard's motion.div wrapper
- Useful for card borders, shadows, hover effects, etc.

### Image Classes
- Applied to the Next.js Image component
- Useful for image filters, transitions, hover effects, etc.

## Tailwind CSS Examples

### Responsive Design
```tsx
<MansonryGallery 
    customContainerClassName="px-4 md:px-8 lg:px-12"
    customColumnClassName="gap-4 md:gap-6 lg:gap-8"
/>
```

### Dark Mode Support
```tsx
<MansonryGallery 
    customContainerClassName="bg-white dark:bg-gray-900"
    customCardClassName="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
/>
```

### Hover Effects
```tsx
<MansonryGallery 
    customCardClassName="hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
    customImageClassName="hover:scale-110 transition-transform duration-300"
/>
```

### Custom Animations
```tsx
<MansonryGallery 
    customCardClassName="animate-pulse hover:animate-none"
    customImageClassName="hover:rotate-2 transition-transform duration-500"
/>
```

## Advanced Usage

### Conditional Styling
```tsx
const isDarkMode = useDarkMode()

<MansonryGallery 
    customContainerClassName={isDarkMode ? 'bg-gray-900' : 'bg-white'}
    customCardClassName={isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}
/>
```

### Dynamic Classes Based on Props
```tsx
interface GalleryProps {
    variant: 'minimal' | 'elaborate' | 'professional'
}

const getVariantClasses = (variant: GalleryProps['variant']) => {
    switch (variant) {
        case 'minimal':
            return {
                container: 'p-4',
                column: 'gap-2',
                card: 'shadow-sm',
                image: 'rounded-md'
            }
        case 'elaborate':
            return {
                container: 'p-16 bg-gradient-to-br from-purple-100 to-pink-100',
                column: 'gap-8',
                card: 'shadow-2xl border-2 border-purple-200',
                image: 'rounded-2xl'
            }
        case 'professional':
            return {
                container: 'p-12 bg-gray-50',
                column: 'gap-6',
                card: 'shadow-lg border border-gray-200',
                image: 'rounded-lg'
            }
    }
}

const classes = getVariantClasses('professional')

<MansonryGallery 
    customContainerClassName={classes.container}
    customColumnClassName={classes.column}
    customCardClassName={classes.card}
    customImageClassName={classes.image}
/>
```

## Notes

- All custom classes are appended to the existing default classes
- The component maintains its default functionality and animations
- Custom classes can override or enhance the default styling
- Use Tailwind CSS utility classes for consistent design
- Consider responsive design when applying custom classes
