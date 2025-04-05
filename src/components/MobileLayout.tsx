
import React, { ReactNode } from 'react';
import MobileNavigation from './MobileNavigation';

interface MobileLayoutProps {
  children: ReactNode;
  header?: ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children, header }) => {
  return (
    <div className="mobile-container">
      {header && (
        <header className="mobile-header">
          {header}
        </header>
      )}
      <main className="mobile-content">
        {children}
      </main>
      <MobileNavigation />
    </div>
  );
};

export default MobileLayout;
