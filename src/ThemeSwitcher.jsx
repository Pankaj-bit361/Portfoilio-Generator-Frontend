import Button from './common/Button'
import './ThemeSwitcher.css'

export default function ThemeSwitcher({ currentTheme, onThemeChange }) {
  return (
    <div className="theme-switcher">
      <Button 
        variant={currentTheme === 'modern' ? 'primary' : 'outline'}
        onClick={() => onThemeChange('modern')}
      >
        Modern
      </Button>
      <Button 
        variant={currentTheme === 'creative' ? 'primary' : 'outline'}
        onClick={() => onThemeChange('creative')}
      >
        Creative
      </Button>
      <Button 
        variant={currentTheme === 'professional' ? 'primary' : 'outline'}
        onClick={() => onThemeChange('professional')}
      >
        Professional
      </Button>
    </div>
  )
}