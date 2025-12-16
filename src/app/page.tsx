import Hero from '@/components/sections/home/Hero'
import Features from '@/components/sections/home/Features'
import Reviews from '@/components/sections/home/Reviews'
import Pricing from '@/components/sections/home/Pricing'

export default function HomePage() {
  return (
    <>
      <section id="hero">
        <Hero />
      </section>
      <section id="features">
        <Features />
      </section>
      <section id="reviews">
        <Reviews />
      </section>
      <section id="pricing">
        <Pricing />
      </section>
    </>
  )
}