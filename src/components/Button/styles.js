'use client'

import styled, { css } from 'styled-components';

function getVariantStyle(variant, disabled) {
    const variantMap = {
        primary: css`
            height: 40px;
            font-weight: 600;
            font-size: 16px;
            background: #007AF5;
            border: none;
            &:hover {
                background: rgba(0, 0, 0, .1);
            }
        `,
        secondary: css`
            height: 40px;
            font-weight: 600;
            font-size: 16px;
            background: transparent;
            border: 1px solid #67696b;
            color: #000;
            &:hover {
                background: rgba(0, 0, 0, .1);
            }
        `,
        success: css`
            height: 40px;
            font-weight: 600;
            font-size: 16px;
            background: #00CC55;
            border: 1px solid rgba(190,190,190,.30);
            color: #fff;
            &:hover {
                color: #e8e8e8;
                background: #37FF8B;
            }
        `,
        danger: css`
            height: 40px;
            font-weight: 600;
            font-size: 16px;
            background: #C1292E;
            border: 1px solid rgba(190,190,190,.30);
            color: #000;
            &:hover {
                color: #e8e8e8;
                background: #D33F49;
            }
        `,
        link: css`
            height: 40px;
            background: none;
            border: none;
            &:hover {
                background: rgba(0, 0, 0, .1);
            }
        `,
        disabled: css`
            background: #67696b;
            border: none;
            cursor: not-allowed;
        `,
    }

    return variantMap[disabled ? 'disabled' : variant];
}



export const Button = styled.button`
    padding: 8px 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 6px;
    transition: background 0.3s;
    cursor: pointer;
    outline: none;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    min-width: 100px;
    color: ${({ color }) => color ? color : '#fff'};
    width: ${({ $full }) => $full ? '100%' : 'fit-content'};

    ${({ $variant, disabled }) => getVariantStyle($variant, disabled)}
`;

export const LinkButton = styled.a`
    padding: 8px 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 8px;
    transition: background 0.3s;
    cursor: pointer;
    outline: none;
    font-family: 'Inter';
    color: ${({ color }) => color ? color : '#fff'};
    width: ${({ $full }) => $full ? '100%' : 'fit-content'};
    text-decoration: none;

    ${({ $variant, disabled }) => getVariantStyle($variant, disabled)}
`;