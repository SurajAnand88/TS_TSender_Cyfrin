export function setToLocalStorage(
  e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  onChange: Function
): void {
  localStorage.setItem(e.target.id, e.target.value);
  onChange(e.target.value);
}
