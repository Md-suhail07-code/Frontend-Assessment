import React from "react";

const FooterComp = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white py-6 mt-auto mb-0 border-t border-slate-200">
      <div className="container mx-auto flex justify-between items-center gap-4 px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-xl font-bold text-indigo-600">Go Business</h1>
        </div>

        <nav>
          <ul className="flex flex-wrap justify-center space-x-4 text-sm text-slate-600">
            <li>
              <a
                href="/about"
                className="hover:text-indigo-600 hover:underline transition-colors"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-indigo-600 hover:underline transition-colors"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="/privacy"
                className="hover:text-indigo-600 hover:underline transition-colors"
              >
                Privacy
              </a>
            </li>
            <li>
              <a
                href="/terms"
                className="hover:text-indigo-600 hover:underline transition-colors"
              >
                Terms
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <p className="text-sm text-slate-400">
            &copy; {year} Go Business, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterComp;
