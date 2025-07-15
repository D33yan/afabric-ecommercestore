import React from "react";
import clsx from "clsx";

// SectionProps defines the props for the reusable Section component.
interface SectionProps {
  /**
   * Main heading for the section. Rendered as an <h2> by default.
   */
  heading?: string;
  /**
   * Optional subheading or description below the main heading.
   */
  subheading?: string;
  /**
   * Section content (children).
   */
  children: React.ReactNode;
  /**
   * Optional background class (e.g., bg-gradient, bg-white).
   */
  backgroundClassName?: string;
  /**
   * Additional classes for the outer section.
   */
  className?: string;
  /**
   * Optional id for anchor links or ARIA.
   */
  id?: string;
  /**
   * Optional ARIA label for accessibility.
   */
  ariaLabel?: string;
}

/**
 * Section is a reusable, accessible container for major page sections.
 * It provides consistent spacing, background, and heading styles.
 */
const Section: React.FC<SectionProps> = ({
  heading,
  subheading,
  children,
  backgroundClassName = "bg-gradient-to-b from-peach-50 to-peach-100",
  className = "",
  id,
  ariaLabel,
}) => {
  return (
    <section
      id={id}
      aria-label={ariaLabel || heading}
      className={clsx(
        "py-16 md:py-20 w-full",
        backgroundClassName,
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {heading && (
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-8 text-center text-peach-900 drop-shadow-2xl tracking-tight">
            {heading}
          </h2>
        )}
        {subheading && (
          <p className="text-lg md:text-xl text-peach-700 mb-4 text-center max-w-2xl mx-auto">
            {subheading}
          </p>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section; 