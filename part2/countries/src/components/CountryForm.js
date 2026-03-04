const CountryForm = ({text, onChange}) => {
    return (
        <form>
            <label>
           {text} <input onChange={onChange} />
            </label>
      </form>

    )
}
export default CountryForm