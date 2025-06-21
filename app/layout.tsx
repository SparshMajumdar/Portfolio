import { Share_Tech_Mono } from 'next/font/google';
import { ThemeProvider } from '@/context/ThemeContext';
import './globals.css';

const techMono = Share_Tech_Mono({ 
  weight: '400',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Sparsh Majumdar | Cybersecurity & Development',
  description: 'Portfolio of Sparsh Majumdar - Cybersecurity Specialist & Full Stack Developer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${techMono.className} antialiased matrix-bg`}>
        <div id="custom-cursor" className="custom-cursor"></div>
        <ThemeProvider>
          <div className="relative">
            {children}
          </div>
        </ThemeProvider>
        <script dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const cursor = document.getElementById('custom-cursor');
              let mouseX = 0;
              let mouseY = 0;
              
              document.addEventListener('mousemove', function(e) {
                mouseX = e.clientX;
                mouseY = e.clientY;
                cursor.style.left = mouseX - 10 + 'px';
                cursor.style.top = mouseY - 10 + 'px';
              });
              
              document.addEventListener('mouseenter', function() {
                cursor.style.opacity = '1';
              });
              
              document.addEventListener('mouseleave', function() {
                cursor.style.opacity = '0';
              });
              
              // Add hover effect for interactive elements
              const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea');
              interactiveElements.forEach(element => {
                element.addEventListener('mouseenter', function() {
                  cursor.classList.add('hover');
                });
                element.addEventListener('mouseleave', function() {
                  cursor.classList.remove('hover');
                });
              });
            });
          `
        }} />
      </body>
    </html>
  );
}