interface InputComponentProps {
    inputName : string,
    type: 'email' | 'text' | 'password',
    placeholder: string,
    onChange: Function,
    inputId: string,
    inputValue?: string
}

export const InputComponent = (props: InputComponentProps) => {
    const {inputName, type, placeholder, onChange, inputId, inputValue} = props;
    return (
        <>
            <label htmlFor={inputId} className="block text-md text-gray-700 mb-1" >{inputName}</label>
            <input
                type={type}
                name={inputId}
                placeholder={placeholder}
                id={inputId}
                onChange={(e) => onChange(e)}
                value={inputValue}
                className="w-full bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 rounded px-3 py-1 text-lg text-gray-800 pleaceholder-gray-300 focus:outline-none transitions duration-200 ease-in-out"
            />
        </>
    )
}