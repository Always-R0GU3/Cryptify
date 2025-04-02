import * as React from "react";
import PropTypes from "prop-types";

const Card = React.forwardRef(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={`rounded-lg border-2 bg-card text-card-foreground ${className} h-[351px] overflow-hidden`}
    {...props}
  />
));
Card.displayName = "Card";
Card.propTypes = {
  className: PropTypes.string,
};
Card.defaultProps = {
  className: "",
};

const CardHeader = React.forwardRef(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={`flex flex-col space-y-1.5 p-6 ${className}`}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";
CardHeader.propTypes = {
  className: PropTypes.string,
};
CardHeader.defaultProps = {
  className: "",
};

const CardTitle = React.forwardRef(({ className = "", ...props }, ref) => (
  <h3
    ref={ref}
    className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";
CardTitle.propTypes = {
  className: PropTypes.string,
};
CardTitle.defaultProps = {
  className: "",
};

const CardDescription = React.forwardRef(
  ({ className = "", ...props }, ref) => (
    <p
      ref={ref}
      className={`text-sm text-muted-foreground ${className}`}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";
CardDescription.propTypes = {
  className: PropTypes.string,
};
CardDescription.defaultProps = {
  className: "",
};

const CardContent = React.forwardRef(({ className = "", ...props }, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
));
CardContent.displayName = "CardContent";
CardContent.propTypes = {
  className: PropTypes.string,
};
CardContent.defaultProps = {
  className: "",
};

const CardFooter = React.forwardRef(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={`flex items-center p-6 pt-0 ${className}`}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";
CardFooter.propTypes = {
  className: PropTypes.string,
};
CardFooter.defaultProps = {
  className: "",
};

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
