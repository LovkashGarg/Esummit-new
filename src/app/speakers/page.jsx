// import React from 'react'

// const page = () => {

//   return (
//     <>
//    {/* <section className=" relative"> */}
//         <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
//             <div className="w-full md:px-16 px-10 md:pt-16 pt-10 pb-10 bg-black rounded-2xl flex-col justify-end items-center lg:gap-28 md:gap-16 gap-10 inline-flex">
//                 <div className="flex-col justify-end items-center lg:gap-16 gap-10 flex">
//                     {/* <img src="https://pagedone.io/asset/uploads/1717500460.png" alt="pagedone logo image" className="object-cover" /> */}
//                     <div className="flex-col justify-center items-center gap-5 flex">
//                         <div className="flex-col justify-start items-center gap-2.5 flex">
//                             <h2 className="text-center text-white md:text-6xl text-3xl font-bold font-manrope leading-normal"> Speakers Reveal Soon !</h2>
//                             <p className="text-center text-gray-500 text-base font-normal leading-relaxed">Just 1 day remaining until the big reveal of our Speakers!</p>
//                         </div>
                        
//                         <div className="w-full flex-col justify-center items-center  flex">
//                             <h6 className="text-center text-[25px] text-yellow-400 text-base font-semibold leading-relaxed">Launching Date: Oct 2, 2024</h6>
//                         </div>
//                     </div>
//                 </div>
//                 {/* <p className="text-center text-gray-500 text-sm font-normal leading-snug">Get in touch with us: <a href="" className="hover:text-gray-100 transition-all duration-700 ease-in-out"> ecell@iiitp.ac.in</a></p> */}
//             </div>
//         </div>
//     {/* </section> */}
//     </>
//   )
// }

// export default page

import React from 'react';
import { motion } from 'framer-motion';

const speakers = [
  { name: 'Bill Gates', bio: 'Bio for speaker 1', image: 'data:image/jpeg;base64,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' },
  { name: 'Munish Jindal', bio: 'Bio for speaker 2', image: 'https://via.placeholder.com/150' },
  { name: ' Mangesh Shinde', bio: 'Bio for speaker 3', image: 'https://via.placeholder.com/150' },
];

const SpeakersSection = () => {
  return (
    <section className="bg-black flex flex-col items-center pt-10 mb-[10%] md:mb-[0%]  min-h-screen">
      <h2 className="text-3xl sm:text-4xl text-white font-bold mb-12">Meet the Speakers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-3 px-20">
        {speakers.map((speaker, index) => (
          <motion.div
            key={index}
            className="bg-black p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500 ease-in-out"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.3 }}
            viewport={{ once: true }}
          >
            <img src="https://yt3.googleusercontent.com/ytc/AIdro_nKuARp-kgK0_dDX3TE4jOe2B7U_hnGTz0UdZTtagMu4A=s900-c-k-c0x00ffffff-no-rj" alt={speaker.name} className=" w-[100%] sm:w-[80%] h-[70%] rounded-[10%] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-center">{speaker.name}</h3>
            <p className="text-center text-gray-600">{speaker.bio}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SpeakersSection;
