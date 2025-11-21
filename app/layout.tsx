import { VT323 } from 'next/font/google';
import { ThemeProvider } from '@/context/ThemeContext';
import './globals.css';

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-vt323',
});

export const metadata = {
  title: 'Sparsh Majumdar | Cybersecurity & Development',
  description: 'Portfolio of Sparsh Majumdar - Cybersecurity Specialist & Full Stack Developer',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  themeColor: '#ffffff',
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

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* Manifest & Theme */}
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />

        {/* PWA Android Icons */}
        <link rel="icon" type="image/png" sizes="192x192" href="/web-app-manifest-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/web-app-manifest-512x512.png" />
      </head>
      <body className={`${vt323.variable} font-sans antialiased matrix-bg`}>
        <div id="custom-cursor" className="custom-cursor"></div>
        <ThemeProvider>
          <div className="relative">
            {children}
          </div>
        </ThemeProvider>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              if (typeof window !== 'undefined') {
                const cursor = document.getElementById('custom-cursor');
                if (!cursor) return;
                
                let mouseX = 0;
                let mouseY = 0;
                
                // Set initial opacity
                cursor.style.opacity = '1';

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

                const updateInteractive = function() {
                  const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea');
                  interactiveElements.forEach(element => {
                    element.addEventListener('mouseenter', function() {
                      cursor.classList.add('hover');
                    });
                    element.addEventListener('mouseleave', function() {
                      cursor.classList.remove('hover');
                    });
                  });
                };
                
                // Run on load and after delay to catch dynamically added elements
                updateInteractive();
                setTimeout(updateInteractive, 1000);
              }
            })();
          `
        }} />
      </body>
    </html>
  );
}
