import React from 'react'

const page = () => {

  
  return (
    <>
   {/* <section className=" relative"> */}
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
            <div className="w-full md:px-16 px-10 md:pt-16 pt-10 pb-10 bg-black rounded-2xl flex-col justify-end items-center lg:gap-28 md:gap-16 gap-10 inline-flex">
                <div className="flex-col justify-end items-center lg:gap-16 gap-10 flex">
                    {/* <img src="https://pagedone.io/asset/uploads/1717500460.png" alt="pagedone logo image" className="object-cover" /> */}
                    <div className="flex-col justify-center items-center gap-5 flex">
                        <div className="flex-col justify-start items-center gap-2.5 flex">
                            <h2 className="text-center text-white md:text-6xl text-3xl font-bold font-manrope leading-normal"> Speakers Reveal Soon !</h2>
                            <p className="text-center text-gray-500 text-base font-normal leading-relaxed">Just 3 days remaining until the big reveal of our Speakers!</p>
                        </div>
                        
                        <div className="w-full flex-col justify-center items-center  flex">
                            <h6 className="text-center text-[25px] text-yellow-400 text-base font-semibold leading-relaxed">Launching Date: Oct 1, 2024</h6>
                        </div>
                    </div>
                </div>
                {/* <p className="text-center text-gray-500 text-sm font-normal leading-snug">Get in touch with us: <a href="" className="hover:text-gray-100 transition-all duration-700 ease-in-out"> ecell@iiitp.ac.in</a></p> */}
            </div>
        </div>
    {/* </section> */}
    </>
  )
}

export default page