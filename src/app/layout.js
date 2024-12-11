export const metadata = {
  title: 'Razorpay Test App',
  description: 'Test Razorpay Payment Gateway Integration',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
