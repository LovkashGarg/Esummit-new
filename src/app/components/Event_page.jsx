import { motion } from "framer-motion";
import Image from "next/image";
const EventPage = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-between bg-black p-6 lg:p-12">
      {/* Left Section */}
      <motion.div 
        className="lg:w-1/2 w-full text-white"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl lg:text-6xl font-bold mb-4">Amazing Event Name</h1>
        <p className="text-lg lg:text-xl mb-8">
          This is an amazing event description that captivates the audience and provides all the necessary information in a concise manner. Don’t miss out on this incredible opportunity!
        </p>
        <motion.a 
          href="/rulebook.pdf"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition-colors duration-300"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
        >
          Rulebook
        </motion.a>
      </motion.div>

      {/* Right Section */}
      <motion.div 
        className="lg:w-1/2 w-full mt-8 lg:mt-0"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/Events/BC_logo.png" 
          alt="Event" 
          width={300}
          height={300}
          className="rounded-lg shadow-lg w-full object-cover"
        />
      </motion.div>
    </div>
  );
};

export default EventPage;
