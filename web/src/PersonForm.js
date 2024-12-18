function PersonForm()
{
  

  function CreatePerson()
  {

  }
  return (<form id='person' onSubmit={CreatePerson}>
    <label>Фамилия: </label>
    <input type="text"/><br/>
    <label>Имя: </label>
    <input type="text"/><br/>
    <label>Отчество: </label>
    <input type="text"/><br/>
    <label>Пол: </label>
    <select>
      <option value="man">Мужской</option>
      <option value="female">Женский</option>
    </select><br/>
    <label>Номер и серия паспорта: </label>
    <input type="number"/><br/>
    <label>Дата рождения: </label>
    <input type="date"/><br/>
    <label>Домашний адрес: </label>
    <input type="text"/><br/>
    <label>Номер телефона: </label>
    <input type="text"/><br/>
    <label>Электронная почта: </label>
    <input type="email"/>
  </form>)
}

export default PersonForm;
