'use client'
import { WavyBackground } from "./ui/wavy-background"
import { AnimatedTooltip } from "./ui/animated-tooltip";


const instructors = [
    {
      id: 1,
      name: 'Satyam Garg',
      // designation: 'Vocal Coach',
      image:
        '/satyam.jpg',
    },
    {
      id: 2,
      name: 'Sarthak Jain',  
      // designation: 'Guitar Instructor',
      image:
      '/sarthak.jpg',
    },
    {
      id: 3,
      name: 'Arpan Gupta',
      // designation: 'Piano Teacher',
      image:
        '/arpan.jpg',
    },
    {
      id: 4,
      name: 'Sannidhya Walzade',
      // designation: 'Drumming Expert',
      image:
        '/sannidhya.jpg',
    },
    {
      id: 5,
      name: 'Sanskar Hasija',
      // designation: 'Drumming Expert',
      image:
        '/sanskar.jpg',
    },
    {
      id: 6,
      name: 'Riya Aggarwal',
      // designation: 'Drumming Expert',
      image:
        '/riya.jpg',
    },
    {
      id: 7,
      name: 'Akshat Chaturvedi',
      // designation: 'Drumming Expert',
      image:
      '/akshat.jpg',
    },
  ];

function Instructors() {
  return (
    <div className="relative h-[35rem] overflow-hidden flex items-center justify-center">
        <WavyBackground className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl md:text-3xl lg:text-7xl text-white font-bold text-center mb-8 font-mono">Meet Our Founders</h2>
            <p className="text-base md:text-lg text-white text-center mb-4">Discover the talented professionals who are main Figures of Ecell</p>
            <div className="flex flex-row items-center justify-center mb-10 w-full">
                <AnimatedTooltip items={instructors} />
            </div>
        </WavyBackground>
    </div>
  )
}

export default Instructors