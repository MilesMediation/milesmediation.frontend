'use client'

import { useState } from 'react'
import MansonryGallery from './MansonryGallery'

type GalleryStyle = 'default' | 'gradient' | 'seasonal' | 'professional' | 'creative' | 'responsive'

export default function MansonryGalleryDemo() {
    const [currentStyle, setCurrentStyle] = useState<GalleryStyle>('default')

    const getStyleClasses = (style: GalleryStyle) => {
        switch (style) {
            case 'gradient':
                return {
                    container: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-12 rounded-2xl shadow-2xl',
                    column: 'bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300',
                    card: 'border-2 border-transparent hover:border-blue-400 transition-all duration-300 transform hover:scale-105 bg-white/90',
                    image: 'rounded-lg hover:brightness-110 transition-all duration-300'
                }
            
            case 'seasonal':
                return {
                    container: 'bg-gradient-to-br from-green-50 via-yellow-50 to-pink-50 p-12 rounded-2xl',
                    column: 'bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg',
                    card: 'border-2 border-green-200 hover:border-green-400 transition-all duration-300 transform hover:scale-105 bg-white/90',
                    image: 'rounded-lg hover:brightness-110 transition-all duration-300'
                }
            
            case 'professional':
                return {
                    container: 'bg-gray-50 p-12 rounded-lg border border-gray-200',
                    column: 'bg-white p-6 rounded-lg shadow-md border border-gray-100',
                    card: 'border border-gray-200 hover:border-gray-400 transition-all duration-300 transform hover:scale-102 bg-white',
                    image: 'rounded-md hover:brightness-105 transition-all duration-300'
                }
            
            case 'creative':
                return {
                    container: 'bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 p-16 rounded-3xl shadow-2xl',
                    column: 'bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/30',
                    card: 'border-2 border-purple-200 hover:border-purple-400 transition-all duration-500 transform hover:scale-110 hover:rotate-2 bg-white/80',
                    image: 'rounded-2xl hover:brightness-125 transition-all duration-500 hover:contrast-125'
                }
            
            case 'responsive':
                return {
                    container: 'px-4 py-8 md:px-8 md:py-12 lg:px-12 lg:py-16 bg-gradient-to-br from-blue-50 to-indigo-100',
                    column: 'gap-3 md:gap-4 lg:gap-6 bg-white/80 p-3 md:p-4 lg:p-6 rounded-lg md:rounded-xl',
                    card: 'border border-gray-200 md:border-2 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 md:hover:scale-110',
                    image: 'rounded-md md:rounded-lg hover:brightness-110 transition-all duration-300'
                }
            
            default:
                return {
                    container: '',
                    column: '',
                    card: '',
                    image: ''
                }
        }
    }

    const styles: { value: GalleryStyle; label: string; description: string }[] = [
        { value: 'default', label: 'Default', description: 'Basic styling with no custom classes' },
        { value: 'gradient', label: 'Gradient', description: 'Beautiful gradient background with glassmorphism effects' },
        { value: 'seasonal', label: 'Seasonal', description: 'Spring theme with green and yellow accents' },
        { value: 'professional', label: 'Professional', description: 'Clean, corporate-style design' },
        { value: 'creative', label: 'Creative', description: 'Bold, artistic design with purple and pink themes' },
        { value: 'responsive', label: 'Responsive', description: 'Mobile-first design with responsive breakpoints' }
    ]

    const currentClasses = getStyleClasses(currentStyle)

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
                    MansonryGallery Styling Demo
                </h1>
                
                {/* Style Selector */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Choose a Style:</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {styles.map((style) => (
                            <button
                                key={style.value}
                                onClick={() => setCurrentStyle(style.value)}
                                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                                    currentStyle === style.value
                                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                                        : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                <div className="font-medium">{style.label}</div>
                                <div className="text-sm text-gray-600 mt-1">{style.description}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Current Style Info */}
                <div className="mb-8 p-6 bg-white rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Current Style: {styles.find(s => s.value === currentStyle)?.label}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <strong>Container:</strong> 
                            <code className="ml-2 px-2 py-1 bg-gray-100 rounded text-xs">
                                {currentClasses.container || 'No custom classes'}
                            </code>
                        </div>
                        <div>
                            <strong>Column:</strong> 
                            <code className="ml-2 px-2 py-1 bg-gray-100 rounded text-xs">
                                {currentClasses.column || 'No custom classes'}
                            </code>
                        </div>
                        <div>
                            <strong>Card:</strong> 
                            <code className="ml-2 px-2 py-1 bg-gray-100 rounded text-xs">
                                {currentClasses.card || 'No custom classes'}
                            </code>
                        </div>
                        <div>
                            <strong>Image:</strong> 
                            <code className="ml-2 px-2 py-1 bg-gray-100 rounded text-xs">
                                {currentClasses.image || 'No custom classes'}
                            </code>
                        </div>
                    </div>
                </div>

                {/* Gallery Display */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Gallery Preview:</h3>
                    <MansonryGallery />
                </div>

                {/* Code Example */}
                <div className="mt-8 p-6 bg-gray-900 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-4">Code Example:</h3>
                    <pre className="text-green-400 text-sm overflow-x-auto">
                        <code>{`<MansonryGallery 
    customContainerClassName="${currentClasses.container}"
    customColumnClassName="${currentClasses.column}"
    customCardClassName="${currentClasses.card}"
    customImageClassName="${currentClasses.image}"
/>`}</code>
                    </pre>
                </div>
            </div>
        </div>
    )
}
