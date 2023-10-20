'use client'

import { useRouter } from 'next/navigation'
import PropTypes from "prop-types";
import * as S from './styles';

function Button({ children, redirect, disabled, variant = 'primary', type = "button", onClick, full, color = "text-white" }) {
    const router = useRouter()

    const handleButtonClick = () => {
        if (redirect) {
            router.push(redirect)
        } else if (onClick) {
            onClick();
        }
    }

    return (
        <S.Button color={color} type={type} $variant={variant} onClick={handleButtonClick} disabled={disabled} $full={full}>
            {variant === 'link' ? <S.LinkButton className="Link" to={redirect} color={color} target="_blank">{children}</S.LinkButton> : children}
        </S.Button>
    );
}

Button.propTypes = {
    children: PropTypes.node,
    redirect: PropTypes.string,
    variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'link']),
    type: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    full: PropTypes.bool,
    color: PropTypes.string,
};

export default Button;
