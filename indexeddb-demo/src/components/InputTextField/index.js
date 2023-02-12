
import './styles.css'

// input field component
const InputTextField = ({value,label,onchangeValue}) =>
{
    return (
      <main className='input-container'>
        <label className='input-container__label'>{label}</label>
        <form className='input-container__form'>
          <input
            className='input-container__input'
            type='text'
            value={value}
            onChange={onchangeValue}
          />
        </form>
      </main>
    );
}

export default InputTextField;