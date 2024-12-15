import { ReactNode } from 'react';

interface CardProps {
  title: string;
  icon: ReactNode;
  description: string;
  action: {
    label: string;
    onClick: () => void;
  };
  imageSrc: string;
}

export function Card({ title, icon, description, action, imageSrc }: CardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 transition-opacity group-hover:opacity-100" />
      
      <img 
        src={imageSrc} 
        alt={title} 
        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      
      <div className="relative p-6">
        <div className="mb-4 flex items-center gap-2 text-primary">
          {icon}
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        
        <p className="mb-6 text-gray-600">{description}</p>
        
        <button
          onClick={action.onClick}
          className="w-full rounded-lg bg-primary px-4 py-2 text-white transition-colors hover:bg-primary/90"
        >
          {action.label}
        </button>
      </div>
    </div>
  );
}