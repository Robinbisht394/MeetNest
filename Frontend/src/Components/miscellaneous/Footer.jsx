import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaChevronRight,
} from "react-icons/fa";

const defaultFooterLinks = [
  {
    heading: "Discover",
    links: [
      { label: "Events Nearby", url: "/events" },
      { label: "Categories", url: "/categories" },
      { label: "Cities", url: "/cities" },
    ],
  },
  {
    heading: "Your Account",
    links: [
      { label: "Sign Up", url: "/signup" },
      { label: "Log In", url: "/login" },
      { label: "Help Center", url: "/help" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", url: "/about" },
      { label: "Careers", url: "/careers" },
      { label: "Contact", url: "/contact" },
    ],
  },
];

const AppFooter = ({ links = defaultFooterLinks }) => {
  return (
    // Base Footer: White background, subtle border top, and padding
    <footer className="bg-white border-t border-gray-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Primary Row: Navigation and CTA */}
        <div className="flex flex-col md:flex-row justify-between pb-8 mb-6 border-b border-gray-100">
          {/* 1. Navigation Columns - Dynamic and Responsive */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-8 md:flex md:gap-x-16 lg:gap-x-24 mb-8 md:mb-0">
            {links.map((group) => (
              <div key={group.heading} className="min-w-[120px]">
                {/* Blue Heading - Consistent with App Header/Theme */}
                <h4 className="text-blue-600 font-semibold text-sm uppercase mb-4">
                  {group.heading}
                </h4>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.label} className="mb-2">
                      {/* Subtle gray text, blue hover state */}
                      <a
                        href={link.url}
                        className="text-gray-600 text-sm hover:text-blue-600 transition duration-150"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 2. Social Media & App Download CTA Section */}
          <div className="flex flex-col items-start md:items-end w-full md:w-auto mt-4 md:mt-0">
            <p className="text-gray-500 text-sm mb-3">Connect with us</p>

            {/* Social Icons (Primary Blue) */}
            <div className="flex space-x-4 mb-5">
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="text-blue-600 hover:text-blue-800 transition"
              >
                <FaFacebook size={22} />
              </a>
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                className="text-blue-600 hover:text-blue-800 transition"
              >
                <FaTwitter size={22} />
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="text-blue-600 hover:text-blue-800 transition"
              >
                <FaInstagram size={22} />
              </a>
            </div>

            {/* Blue Button CTA - Consistent with Hero Button Style */}
            <button className="flex items-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
              Download the App <FaChevronRight className="ml-2 w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Secondary Row: Legal and Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p className="order-2 md:order-1 mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} Meetup App. All rights reserved.
          </p>

          <div className="flex space-x-4 order-1 md:order-2">
            {/* Legal Links with light hover */}
            <a href="/privacy" className="hover:text-blue-600 transition">
              Privacy Policy
            </a>
            <span className="text-gray-300">|</span>
            <a href="/terms" className="hover:text-blue-600 transition">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
