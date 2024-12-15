export function Footer() {
  return (
    <footer className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} EduStatus. All rights reserved.</p>
          <p className="mt-2">Contact: support@edustatus.com</p>
        </div>
      </div>
    </footer>
  );
}