import logoHeader from '../assets/logo.svg';

export function Header() {
  return (
    <header className="w-full py-14 flex items-center justify-center bg-gray-700">
      <img
        src={ logoHeader } 
        alt="Logo do site" 
      />
    </header>
  )
}