
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import NotFound from "./pages/NotFound";
import AdminRoute from "./components/AdminRoute";
import UserManagement from "./pages/Admin/UserManagement";
import DocumentManagement from "./pages/Admin/DocumentManagement";
import InvoiceManagement from "./pages/Admin/InvoiceManagement";
import AdminLayout from "./pages/Admin/AdminLayout";

const App = () => {
  // Create a client inside the component
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Category pages */}
              <Route path="/documents/:categoryId" element={<Documents />} />
              
              {/* Admin routes: each one wrapped in AdminLayout */}
              <Route
                path="/gerenciamento_usuarios"
                element={
                  <AdminRoute>
                    <AdminLayout>
                      <UserManagement />
                    </AdminLayout>
                  </AdminRoute>
                }
              />
              <Route
                path="/gerenciamento_documentos"
                element={
                  <AdminRoute>
                    <AdminLayout>
                      <DocumentManagement />
                    </AdminLayout>
                  </AdminRoute>
                }
              />
              <Route
                path="/gerenciamento_mensalidades"
                element={
                  <AdminRoute>
                    <AdminLayout>
                      <InvoiceManagement />
                    </AdminLayout>
                  </AdminRoute>
                }
              />
              
              <Route path="/mensalidade" element={<Documents />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
