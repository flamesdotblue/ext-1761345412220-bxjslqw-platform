import React from 'react';

export default function Footer(){
  return (
    <footer className="border-t bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6 items-center">
        <div className="text-sm text-neutral-600">© {new Date().getFullYear()} FocusGrid. All rights reserved.</div>
        <div className="text-center text-sm text-neutral-600">
          Built with intention. Come back tomorrow and keep your streak alive.
        </div>
        <div className="md:text-right text-sm">
          <a href="#home" className="hover:text-rose-600">Back to top</a>
        </div>
      </div>
    </footer>
  );
}
