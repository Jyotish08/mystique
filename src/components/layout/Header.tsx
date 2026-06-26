import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="border-b border-black/10 bg-white">
      <div className="container mx-auto px-6 py-4">
        <span className="font-mono font-bold">TODO_BRAND</span>
      </div>
    </header>
  );
};

export default Header;
