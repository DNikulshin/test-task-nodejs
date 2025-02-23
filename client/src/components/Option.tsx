export const Option = ({ status }: { status: { value: string } }) => {
  return <option
    key={status.value}
    className={status.value}
    value={status.value}
  >
    {status.value}
  </option>

}
