import React from 'react';

const InputTextField = ({value,label,onchangeValue}) =>
{
    return (
        <main>
            <label>{ label }</label>
            <form>
                <input
                    type="text"
                    value={ value }
                    onChange={onchangeValue}
                />
            </form>
            </main>
    )
}

export default InputTextField;