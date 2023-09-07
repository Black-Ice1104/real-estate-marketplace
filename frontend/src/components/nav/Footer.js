export default function Footer() {
    return (
      <div className="text-center p-4 bg-dark text-light mt-4">
        <h4 className="mt-4">Realist Deal - Buy Sell or Rent Properties</h4>
        <h5 className="mt-4">Developed by Bellamy Sun</h5>
        <p className="mt-3">
          &copy; {new Date().getFullYear()} All rights reserved - realistdeal.online
        </p>
      </div>
    );
  }