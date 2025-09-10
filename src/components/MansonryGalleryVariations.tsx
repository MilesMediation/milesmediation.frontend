'use client'

import MansonryGallery from './MansonryGallery'

export default function MansonryGalleryVariations() {
    return (
        <div className="space-y-16 p-8">
            {/* Example 1: Different Border Colors for Each Card */}
            <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Different Border Colors for Each Card</h2>
                <p className="text-gray-600 mb-4">
                    Each card has a different border color using CSS nth-child selectors
                </p>
                <MansonryGallery />
            </div>

            {/* Example 2: Gradient Background with Card Variations */}
            <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Gradient Background with Card Variations</h2>
                <p className="text-gray-600 mb-4">
                    Beautiful gradient container with glassmorphism column effects
                </p>
                <MansonryGallery />
            </div>

            {/* Example 3: Seasonal Theme */}
            <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Seasonal Theme (Spring)</h2>
                <p className="text-gray-600 mb-4">
                    Spring-inspired colors with green and yellow accents
                </p>
                <MansonryGallery />
            </div>

            {/* Example 4: Professional Style */}
            <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Professional Style</h2>
                <p className="text-gray-600 mb-4">
                    Clean, corporate-style design with subtle shadows and borders
                </p>
                <MansonryGallery />
            </div>

            {/* Example 5: Creative Style */}
            <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Creative Style</h2>
                <p className="text-gray-600 mb-4">
                    Bold, artistic design with purple and pink themes and rotation effects
                </p>
                <MansonryGallery />
            </div>

            {/* Example 6: Responsive Design */}
            <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Responsive Design</h2>
                <p className="text-gray-600 mb-4">
                    Mobile-first design with responsive breakpoints and adaptive styling
                </p>
                <MansonryGallery />
            </div>
        </div>
    )
}
