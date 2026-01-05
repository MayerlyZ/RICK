
import React from "react";
import styles from "./Card.module.css";

interface CardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  onClick,
}) => {
  return (
    <div className={styles.card} onClick={onClick}>
      {imageUrl && (
        <img className={styles.image} src={imageUrl} alt={title} />
      )}
      <div className={styles.content}>
        <div>
          <h3 className={styles.title}>{title}</h3>
          {description && (
            <p className={styles.description}>{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};