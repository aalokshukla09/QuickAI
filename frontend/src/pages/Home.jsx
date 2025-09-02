import React from 'react'
import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { ToolsSection } from '../components/ToolsSection'
import Testimonials from '../components/Testimonials'
import Plan from '../components/Plan'
import Footer from '../components/Footer'

export const Home = () => {
  return (
    <> 
    <Navbar/>
    <Hero/>
    <ToolsSection/>
    <Testimonials/>
    <Plan/> 
    <Footer/>
    </>
  )
}
