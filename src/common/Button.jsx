import './Button.css'

export default function Button({ children, variant = 'primary', type = 'button', onClick }) {
  return (
    <button 
      className={`btn btn-${variant}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}