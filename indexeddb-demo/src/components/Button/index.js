import React from "react"

const Button = ({label,onClickButton}) =>
{
    return (
        <button type="submit" onClick={ onClickButton } >{label}</button>
    )
}

export default Button;