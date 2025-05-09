export default function Footer() {
  return (
    <footer className="bg-black text-white py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} Hair Accessories Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
