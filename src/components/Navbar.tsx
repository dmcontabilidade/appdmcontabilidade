
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, LogOut, Home, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';
import DocumentSearchDialog from './DocumentSearchDialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  // Check if we're on the index page
  const isIndexPage = location.pathname === '/';
  
  const handleLogout = () => {
    logout();
  };
  
  const handleDashboardAccess = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };
  
  React.useEffect(() => {
    document.title = 'DM Contabilidade';
  }, []);
  
  return (
    <header className="bg-primary text-white p-3 md:p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/3061f81e-171f-48e8-b8fd-f4e338ed175d.png" 
            alt="Logo" 
            className="h-12 w-12 md:h-14 md:w-14 rounded-full"
          />
          <span className="font-bold text-[15px] md:text-[16px] whitespace-nowrap">DM Contabilidade</span>
        </Link>
        
        <div className="flex items-center gap-2">
          {/* Only show search button if not on index page */}
          {!isIndexPage && (
            <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="bg-white/20 text-white hover:bg-white/30 w-8 h-8 border-none"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Busca de Documentos</DialogTitle>
                </DialogHeader>
                <DocumentSearchDialog />
              </DialogContent>
            </Dialog>
          )}
          
          {isMobile ? (
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="bg-white/20 text-white hover:bg-white/30 w-8 h-8 border-none ml-1"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[270px] p-0">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b bg-dm-900 text-white">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <img 
                          src="/lovable-uploads/3061f81e-171f-48e8-b8fd-f4e338ed175d.png" 
                          alt="Logo" 
                          className="h-8 w-8 rounded-full"
                        />
                        <p className="font-medium">{user ? user.name : 'Menu'}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="h-8 w-8 hover:bg-white/10"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex-1 overflow-auto py-2">
                    <div className="flex flex-col gap-1 p-1">
                      <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start"
                        >
                          <Home className="mr-2 h-4 w-4" />
                          Início
                        </Button>
                      </Link>
                      <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start"
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          Dashboard
                        </Button>
                      </Link>
                    </div>
                  </div>
                  {user && (
                    <div className="p-4 border-t mt-auto">
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10" 
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sair
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <div className="flex items-center gap-2">
              {user ? (
                <div className="flex items-center gap-2">
                  <span className="hidden md:inline">{user.name}</span>
                  <Button variant="ghost" size="sm" className="h-8 px-2" onClick={handleLogout}>
                    Sair
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="h-8 px-2"
                  onClick={handleDashboardAccess}
                >
                  Meu Painel
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
