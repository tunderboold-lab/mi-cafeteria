export const metadata = {
  title: 'Inventario Cafetería',
  description: 'Sistema de inventario para cafetería',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, padding: 0, background: '#0f1117' }}>{children}</body>
    </html>
  );
}
