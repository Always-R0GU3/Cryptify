import { Link } from "react-router-dom";
import { LockKeyhole } from "lucide-react";

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-black/85 text-white backdrop-blur supports-[backdrop-filter]:bg-black/85">
      <div className="container flex h-14 items-center px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center space-x-2">
          <LockKeyhole className="h-6 w-6 text-white" />
          <span className="font-bold text-white">Cryptify</span>
        </Link>
        <nav className="ml-auto flex gap-6">
          <Link
            to="/"
            className="text-sm font-medium transition-colors hover:text-primary text-white"
          >
            Home
          </Link>
          <Link
            to="/encrypt"
            className="text-sm font-medium transition-colors hover:text-primary text-white"
          >
            Encrypt
          </Link>
          <Link
            to="/decrypt"
            className="text-sm font-medium transition-colors hover:text-primary text-white"
          >
            Decrypt
          </Link>
          <Link
            to="/help"
            className="text-sm font-medium transition-colors hover:text-primary text-white"
          >
            Help
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;

