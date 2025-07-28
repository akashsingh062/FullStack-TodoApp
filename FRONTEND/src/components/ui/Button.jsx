import React from "react";
import { useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";

const Button = ({
    children,
    variant = "primary",
    size = "default",
    onClick,
    href,
    to,
    icon,
    iconPosition = "right",
    disabled = false,
    className = "",
    ...props
}) => {
    const navigate = useNavigate();

    // Handle click events
    const handleClick = (e) => {
        if (disabled) return;
        
        if (to) {
            navigate(to);
        } else if (href) {
            window.open(href, "_blank", "noopener,noreferrer");
        } else if (onClick) {
            onClick(e);
        }
    };

    // Base styles
    const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    // Size variants
    const sizeStyles = {
        sm: "px-4 py-2 text-sm rounded-lg",
        default: "px-8 py-4 text-lg rounded-xl",
        lg: "px-10 py-5 text-xl rounded-2xl",
    };

    // Variant styles
    const variantStyles = {
        primary: "group bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 focus:ring-blue-500",
        secondary: "bg-transparent border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 backdrop-blur-sm focus:ring-white/50",
        outline: "bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white focus:ring-blue-500",
        ghost: "bg-transparent text-white hover:bg-white/10 focus:ring-white/50",
        danger: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transform hover:scale-105 focus:ring-red-500",
        success: "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transform hover:scale-105 focus:ring-green-500",
    };

    // Combine all styles
    const buttonStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

    // Render icon
    const renderIcon = () => {
        if (!icon) return null;
        
        const iconElement = icon === "arrow" ? (
            <ArrowRight className={`w-5 h-5 ${variant === "primary" ? "group-hover:translate-x-1" : ""} transition-transform`} />
        ) : (
            icon
        );

        return iconElement;
    };

    // Render content with icon positioning
    const renderContent = () => {
        const iconElement = renderIcon();
        
        if (!iconElement) {
            return children;
        }

        if (iconPosition === "left") {
            return (
                <>
                    {iconElement}
                    <span className="ml-2">{children}</span>
                </>
            );
        }

        return (
            <>
                <span className="mr-2">{children}</span>
                {iconElement}
            </>
        );
    };

    return (
        <button
            className={buttonStyles}
            onClick={handleClick}
            disabled={disabled}
            {...props}
        >
            {renderContent()}
        </button>
    );
};

export default Button;
