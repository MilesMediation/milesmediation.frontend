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
                <MansonryGallery 
                    customCardClassName="border-4 transition-all duration-300 hover:scale-105 shadow-lg"
                    customImageClassName="rounded-lg hover:brightness-110 transition-all duration-300"
                />
            </div>

            {/* Example 2: Gradient Background with Card Variations */}
            <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Gradient Background with Card Variations</h2>
                <p className="text-gray-600 mb-4">
                    Beautiful gradient container with glassmorphism column effects
                </p>
                <MansonryGallery 
                    customContainerClassName="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-12 rounded-2xl shadow-2xl"
                    customColumnClassName="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    customCardClassName="border-2 border-transparent hover:border-blue-400 transition-all duration-300 transform hover:scale-105 bg-white/90"
                    customImageClassName="rounded-lg hover:brightness-110 transition-all duration-300"
                />
            </div>

            {/* Example 3: Seasonal Theme */}
            <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Seasonal Theme (Spring)</h2>
                <p className="text-gray-600 mb-4">
                    Spring-inspired colors with green and yellow accents
                </p>
                <MansonryGallery 
                    customContainerClassName="bg-gradient-to-br from-green-50 via-yellow-50 to-pink-50 p-12 rounded-2xl"
                    customColumnClassName="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg"
                    customCardClassName="border-2 border-green-200 hover:border-green-400 transition-all duration-300 transform hover:scale-105 bg-white/90"
                    customImageClassName="rounded-lg hover:brightness-110 transition-all duration-300"
                />
            </div>

            {/* Example 4: Professional Style */}
            <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Professional Style</h2>
                <p className="text-gray-600 mb-4">
                    Clean, corporate-style design with subtle shadows and borders
                </p>
                <MansonryGallery 
                    customContainerClassName="bg-gray-50 p-12 rounded-lg border border-gray-200"
                    customColumnClassName="bg-white p-6 rounded-lg shadow-md border border-gray-100"
                    customCardClassName="border border-gray-200 hover:border-gray-400 transition-all duration-300 transform hover:scale-102 bg-white"
                    customImageClassName="rounded-md hover:brightness-105 transition-all duration-300"
                />
            </div>

            {/* Example 5: Creative Style */}
            <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Creative Style</h2>
                <p className="text-gray-600 mb-4">
                    Bold, artistic design with purple and pink themes and rotation effects
                </p>
                <MansonryGallery 
                    customContainerClassName="bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 p-16 rounded-3xl shadow-2xl"
                    customColumnClassName="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/30"
                    customCardClassName="border-2 border-purple-200 hover:border-purple-400 transition-all duration-500 transform hover:scale-110 hover:rotate-2 bg-white/80"
                    customImageClassName="rounded-2xl hover:brightness-125 transition-all duration-500 hover:contrast-125"
                />
            </div>

            {/* Example 6: Responsive Design */}
            <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Responsive Design</h2>
                <p className="text-gray-600 mb-4">
                    Mobile-first design with responsive breakpoints and adaptive styling
                </p>
                <MansonryGallery 
                    customContainerClassName="px-4 py-8 md:px-8 md:py-12 lg:px-12 lg:py-16 bg-gradient-to-br from-blue-50 to-indigo-100"
                    customColumnClassName="gap-3 md:gap-4 lg:gap-6 bg-white/80 p-3 md:p-4 lg:p-6 rounded-lg md:rounded-xl"
                    customCardClassName="border border-gray-200 md:border-2 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 md:hover:scale-110"
                    customImageClassName="rounded-md md:rounded-lg hover:brightness-110 transition-all duration-300"
                />
            </div>
        </div>
    )
}
