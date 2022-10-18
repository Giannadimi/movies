import * as React from 'react';

interface CardProps {
    children?: React.ReactNode;
}

export const Card = (props: CardProps) => {
    return(
        <div>{props.children}</div>

    );
}