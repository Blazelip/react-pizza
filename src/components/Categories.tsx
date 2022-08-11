import React from 'react';

type CategoriesProps = {
  category: number;
  onClickCategory: (i: number) => void;
}

const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];

const Categories: React.FC<CategoriesProps> = React.memo(({ category, onClickCategory }) => {
  return (
    <div className="categories">
      <ul>
        
        {
          categories.map((item, index) => {
            return (
              <li 
                key={index}
                onClick={() => onClickCategory(index)}
                className={category === index ? 'active': ''}>
                { item }
              </li>
            )
          })
        }  
      </ul>
    </div>
  );
});

export default Categories;