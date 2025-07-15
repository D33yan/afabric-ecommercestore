import React from "react";
import Image from "next/image";
import clsx from "clsx";

// InfoCardProps defines the props for the reusable InfoCard component.
interface InfoCardProps {
  /**
   * Optional image URL for the card.
   */
  image?: string;
  /**
   * Alt text for the image (required if image is provided).
   */
  imageAlt?: string;
  /**
   * Main title or heading for the card.
   */
  title: string;
  /**
   * Optional description or content for the card.
   */
  description?: string;
  /**
   * Optional action elements (e.g., buttons, links).
   */
  actions?: React.ReactNode;
  /**
   * Additional content or children.
   */
  children?: React.ReactNode;
  /**
   * Additional classes for the card container.
   */
  className?: string;
}

/**
 * InfoCard is a reusable, accessible card for displaying product, info, or feature content.
 * It provides a modern, tactile, and responsive design with optional image, title, description, and actions.
 *
 * Example usage:
 * <InfoCard
 *   image="/example.jpg"
 *   imageAlt="Example image"
 *   title="Card Title"
 *   description="This is a description."
 *   actions={<Button>Learn More</Button>}
 * />
 */
const InfoCard: React.FC<InfoCardProps> = ({
  image,
  imageAlt,
  title,
  description,
  actions,
  children,
  className = "",
}) => {
  return (
    <div
      className={clsx(
        "bg-white/90 border border-peach-200 rounded-3xl shadow-xl overflow-hidden flex flex-col transition-transform duration-300 hover:shadow-2xl hover:scale-[1.025] focus-within:ring-4 focus-within:ring-peach-400",
        className
      )}
      tabIndex={0}
      aria-label={title}
    >
      {image && (
        <div className="relative w-full min-h-[224px] md:min-h-[256px] overflow-hidden">
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            className="object-cover w-full h-full rounded-t-3xl"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-2xl font-extrabold text-peach-900 mb-2 drop-shadow-lg tracking-tight">
          {title}
        </h3>
        {description && (
          <p className="text-peach-700 text-base md:text-lg mb-4 font-semibold">
            {description}
          </p>
        )}
        {children}
        {actions && (
          <div className="mt-4 flex gap-2">{actions}</div>
        )}
      </div>
    </div>
  );
};

export default InfoCard; 