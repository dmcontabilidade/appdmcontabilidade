
import React from 'react';
import Navbar from '@/components/Navbar';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto p-4">
        <div className="mb-4 md:mb-6 flex justify-between items-center">
          {/* Mantém só o Link de voltar, remove título e descrição */}
          <Link to="/dashboard">
            <Button variant="outline" className="flex items-center gap-1 md:gap-2 h-8 md:h-10 px-2 md:px-3">
              <ArrowLeft className="h-4 w-4" />
              {isMobile ? "" : "Voltar ao Dashboard"}
            </Button>
          </Link>
        </div>
        {/* Render only the child passed (corresponding page) */}
        <div className="mt-4 md:mt-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

