import { useState } from 'react'
import { ToggleButtonContainer } from './styles'

interface ToggleButtonProps {
  variant: 'default' | 'small'
  category: 'male' | 'female'
  onChangeCategory: (category: 'male' | 'female') => void
}

export function CategoryToggleButton({
  variant,
  category,
  onChangeCategory,
}: ToggleButtonProps) {
  const [selectedCategory, setSelectedCategory] = useState<'male' | 'female'>(
    category,
  )

  const handleCategoryChange = (category: 'male' | 'female') => {
    setSelectedCategory(category)
    onChangeCategory(category)
  }

  return (
    <ToggleButtonContainer
      variant={variant}
      selectedCategory={selectedCategory}
    >
      <input
        type="radio"
        id="male"
        name="category"
        checked={selectedCategory === 'male'}
        onChange={() => handleCategoryChange('male')}
        defaultChecked
      />
      <label htmlFor="male">Masculino</label>

      <input
        type="radio"
        id="female"
        name="category"
        checked={selectedCategory === 'female'}
        onChange={() => handleCategoryChange('female')}
      />
      <label htmlFor="female">Feminino</label>

      <span className="background"></span>
    </ToggleButtonContainer>
  )
}
