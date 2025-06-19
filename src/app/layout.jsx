// En el archivo: src/app/layout.jsx
import { AuthProvider } from '@/context/AuthContext';
import './app.css'; // Importamos el CSS que ya tenías

export const metadata = {
  title: 'Mi App con Login',
  description: 'Creada con Appwrite y Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={"bg-[#FAFAFB] font-[Inter] text-sm text-[#56565C]"}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}