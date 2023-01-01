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
    <div className="flex flex-col items-center rounded-md shadow-lg hover:shadow-2xl bg-white border">
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
    <div>
      <img
        className="object-cover hover:opacity-75 rounded-md transition duration-200"
        src={src}
        alt={alt}
      />
    </div>
  );
};

type CardContentProps = {
  children: ReactNode;
}

const CardContent: FC<CardContentProps> = ({ children }) => {
  return (
    <div>{children}</div>
  )
}

type CardActionsProps = {
  children: ReactNode;
};

const CardActions: FC<CardActionsProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-between bg-gray-200 rounded-md mb-2 absolute bottom-0 opacity-80 hover:opacity-100 font-bold transition duration-200">
      {children}
    </div>
  );
};

Card.Actions = CardActions;
Card.Media = CardMedia;
Card.Content = CardContent;

export default Card;