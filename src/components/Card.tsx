import type { FC, ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
};

type CardDescendants = {
  Media: typeof CardMedia;
  Actions: typeof CardActions;
  Content: typeof CardContent;
};

const Card: FC<CardProps> & CardDescendants = ({ children }) => {
  return (
    <div className="rounded-md shadow-lg hover:shadow-2xl bg-white border transition-shadow">
      {children}
    </div>
  );
};

type CardMediaProps = {
  src: string;
  alt: string;
};

const CardMedia: FC<CardMediaProps> = ({ src, alt }) => {
  return (
    <img
      className="w-full aspect-video object-cover hover:opacity-75 rounded-md transition duration-200"
      src={src}
      alt={alt}
    />
  );
};

type CardContentProps = {
  children: ReactNode;
}

const CardContent: FC<CardContentProps> = ({ children }) => {
  return (
    <div className='flex flex-col items-center p-3'>{children}</div>
  )
}

type CardActionsProps = {
  children: ReactNode;
};

const CardActions: FC<CardActionsProps> = ({ children }) => {
  return (
    <div className='flex flex-col items-center pb-3'>
      {children}
    </div>
  );
};

Card.Actions = CardActions;
Card.Media = CardMedia;
Card.Content = CardContent;

export default Card;