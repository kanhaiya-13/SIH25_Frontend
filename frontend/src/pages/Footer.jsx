// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black via-slate-900 to-blue-950 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold text-blue-400 mb-4">Useful Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Delivery Details</a></li>
            <li><a href="#" className="hover:text-white">International Shipping</a></li>
            <li><a href="#" className="hover:text-white">Payment Options</a></li>
            <li><a href="#" className="hover:text-white">Track Your Order</a></li>
            <li><a href="#" className="hover:text-white">Return</a></li>
            <li><a href="#" className="hover:text-white">Find a Store</a></li>
          </ul>
        </div>

        {/* Information */}
        <div>
          <h3 className="text-lg font-semibold text-blue-400 mb-4">Information</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Careers</a></li>
            <li><a href="#" className="hover:text-white">Blog</a></li>
            <li><a href="#" className="hover:text-white">Offers Details</a></li>
            <li><a href="#" className="hover:text-white">Help & FAQs</a></li>
            <li><a href="#" className="hover:text-white">About Us</a></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold text-blue-400 mb-4">Contact Us</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <span className="text-blue-400">✉️</span>
              <a href="mailto:info@example.com" className="hover:text-white">Mail to Us</a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-400">📞</span>
              <a href="tel:+919204824823" className="hover:text-white">+91-9204824823</a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-400">💬</span>
              <a href="#" className="hover:text-white">Chat to Us</a>
            </li>
          </ul>
        </div>

        {/* Download Apps */}
        <div>
          <h3 className="text-lg font-semibold text-blue-400 mb-4">Download The Apps</h3>
          <div className="flex flex-col gap-3 mb-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="w-40"
            />
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              className="w-40"
            />
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-sm text-gray-400">Follow Us On</span>
            <div className="flex gap-3 text-blue-400 text-xl">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        <p>
          © 2022 Jewelery Empire Company Limited. All Rights Reserved.
        </p>
        <p className="mt-1">
          <a href="#" className="hover:text-white">Terms & Conditions</a> |{" "}
          <a href="#" className="hover:text-white">Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
}
