import type React from 'react'

const heroAssetsBaseUrl = import.meta.env.VITE_ASSETS_URL

const HeroArtwork: React.FC<{ id: string }> = ({ id }) => {
  return (
    <div className="w-full lg:h-120 px-4 py-2 bg-gray-800 flex flex-row justify-center">
      <img className="h-full object-contain" src={`${heroAssetsBaseUrl}/hero-poses/${id}.png`}/>
    </div>
  )
}

export default HeroArtwork
