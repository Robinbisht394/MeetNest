import React from "react";
import Navbar from "../Components/miscellaneous/NavBar";
import AppFooter from "../Components/miscellaneous/Footer";
import { FaCalendarAlt, FaUsers, FaSearch } from "react-icons/fa";
import { Button } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <div className="font-sans antialiased bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
            <div className="text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                Discover Your Next Passion. <br /> Connect with Your Community.
              </h1>
              <p className="text-lg sm:text-xl font-light mb-8 max-w-lg mx-auto md:mx-0">
                Find local groups, activities, and events that match your
                interests. It's time to get out and do what you love, with
                people who love it too.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-4">
                {/* primary CTA */}
                <button className="text-blue-700 bg-white px-12 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition duration-300">
                  Join MeetupApp
                </button>
                {/*  Secondary CTA Button  */}
                <button className="bg-transparent border-2 border-white text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-700 transition duration-300">
                  Explore Events
                </button>
              </div>
            </div>

            <div className="flex justify-center md:justify-end mt-12 md:mt-0">
              <img
                src="https://via.placeholder.com/600x400/94A3B8/FFFFFF?text=Engaging+Community+Image"
                alt="Diverse group connecting"
                className="rounded-lg shadow-xl w-full max-w-md md:max-w-none"
              />
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-5">
              How MeetNest Works
            </h2>
            <p className="text-lg text-gray-600 mb-20 mx-auto">
              It's simple to find your tribe and make things happen.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 mt-5">
              <div className="flex flex-col items-center p-6 rounded-lg shadow-lg hover:shadow-xl border-t-4 border-blue-600 transition-shadow duration-300">
                <FaSearch className="text-blue-600 text-5xl mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Find Your Interest
                </h3>
                <p className="text-gray-600 text-sm">
                  Browse thousands of groups and events based on your hobbies,
                  location, and passions.
                </p>
              </div>

              <div className="flex flex-col items-center p-6 rounded-lg shadow-lg hover:shadow-xl border-t-4 border-blue-600 transition-shadow duration-300">
                <FaUsers className="text-blue-600 text-5xl mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Join a Community
                </h3>
                <p className="text-gray-600 text-sm">
                  Connect with like-minded individuals, share knowledge, and
                  build lasting friendships.
                </p>
              </div>

              <div className="flex flex-col items-center p-6 rounded-lg shadow-lg hover:shadow-xl border-t-4 border-blue-600 transition-shadow duration-300">
                <FaCalendarAlt className="text-blue-600 text-5xl mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Attend Events
                </h3>
                <p className="text-gray-600 text-sm">
                  From workshops to casual meetups, there's always something
                  exciting happening.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center p-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
              Can't Find Your Perfect Group?
            </h2>
            <p className="text-lg text-gray-600 mb-8  mx-auto lg:ml-12 text-center">
              Be a leader! Create your own MeetupApp group and bring people
              together
            </p>
            <p className="text-gray-600 text-center text-lg">
              around your unique passion.
            </p>

            <Button
              style={{
                marginTop: "12px",
                background: "blue",
                color: "white",
                borderRadius: "100px",
                padding: "10px",
                _hover: { background: "#0000" },
              }}
            >
              start a Group
            </Button>
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
};

export default HomePage;
