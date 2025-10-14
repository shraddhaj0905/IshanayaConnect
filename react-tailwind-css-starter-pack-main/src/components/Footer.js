export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-8 mt-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1 - Branding */}
        <div>
          <h2 className="text-2xl font-bold">EduConnect</h2>
          <p className="mt-2 text-sm text-blue-100">
            Connecting parents, teachers, and students for a better future.
          </p>
        </div>


        {/* Column 2 - Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-blue-100">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/apply-now" className="hover:text-white">Apply Now</a></li>
            <li><a href="/parentLogin" className="hover:text-white">Parent Login</a></li>
            <li><a href="/employeeLogin" className="hover:text-white">Teacher Login</a></li>
          </ul>
        </div>


        {/* Column 3 - Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p>Email: support@educonnect.com</p>
          <p>Phone: +91 98765 43210</p>
          <div className="flex gap-4 mt-3">
            <a href="#" className="hover:text-gray-300">🌐</a>
            <a href="#" className="hover:text-gray-300">🐦</a>
            <a href="#" className="hover:text-gray-300">📘</a>
          </div>
        </div>
      </div>


      {/* Bottom strip */}
      <div className="border-t border-blue-400 mt-6 pt-4 text-center text-sm text-blue-100">
        © {new Date().getFullYear()} EduConnect. All Rights Reserved.
      </div>
    </footer>
  );
}



