import { Link } from 'react-router-dom';
import { FaXTwitter, FaGithub, FaLinkedinIn } from 'react-icons/fa6';

const sections = [
  { title: 'Product', links: ['Features', 'Pricing', 'Changelog', 'Roadmap'] },
  { title: 'Company', links: ['About', 'Careers', 'Blog', 'Contact'] },
  { title: 'Resources', links: ['Docs', 'API', 'Status', 'Community'] },
  { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Cookies'] },
];

export default function Footer() {
  return (
    <footer className="border-t border-base-300 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary grid place-items-center text-primary-content font-bold">B</div>
              <span className="text-lg font-bold">BugFlow</span>
            </Link>
            <p className="text-sm text-base-content/60 max-w-xs">
              The modern bug tracker built for high-velocity engineering teams.
            </p>
            <div className="flex gap-3 mt-4">
              <a className="btn btn-ghost btn-square btn-sm" href="#"><FaXTwitter className="h-4 w-4" /></a>
              <a className="btn btn-ghost btn-square btn-sm" href="#"><FaGithub className="h-4 w-4" /></a>
              <a className="btn btn-ghost btn-square btn-sm" href="#"><FaLinkedinIn className="h-4 w-4" /></a>
            </div>
          </div>
          {sections.map((s) => (
            <div key={s.title}>
              <h4 className="text-sm font-semibold mb-3">{s.title}</h4>
              <ul className="space-y-2">
                {s.links.map((l) => (
                  <li key={l}><a href="#" className="text-sm text-base-content/60 hover:text-base-content transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-base-300 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-base-content/50">© 2024 BugFlow, Inc. All rights reserved.</p>
          <p className="text-sm text-base-content/50">Built with React, Tailwind & DaisyUI</p>
        </div>
      </div>
    </footer>
  );
}
