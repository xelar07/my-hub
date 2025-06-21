import { Poppins } from 'next/font/google';
import { AuthProvider } from '../app/context/AuthContext';
import './app.css';

// Configura la fuente
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // Pesos que vas a usar
  variable: '--font-poppins',   // CSS variable (opcional)
});

export const metadata = {
  title: 'Mi App con Login',
  description: 'Creada con Appwrite y Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={poppins.className}>
      <body className="bg-[#FAFAFB] font-[Inter] text-sm text-[#56565C]">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
