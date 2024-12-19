import { useRef } from "react";
import CONFIG from "./config.json"

function PersonForm(props)
{
  const surname = useRef();
  const name = useRef();
  const patronymic = useRef();
  const sex = useRef();
  const pasport = useRef();
  const birthday = useRef();
  const home = useRef();
  const phone = useRef();
  const email = useRef();

  async function CreatePerson(e)
  {
    e.preventDefault();
    const response = await fetch(`${CONFIG.backendUrl}/api/person/create`, {
      method: "POST",
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        surname: surname.current.value,
        name: name.current.value,
        patronymic: patronymic.current.value,
        sex: sex.current.value,
        pasport: pasport.current.value,
        birthday: birthday.current.value,
        home: home.current.value,
        phone: phone.current.value,
        email: email.current.value
      })
    });
    if (!response.ok) {
      console.error(response.statusText);
      return;
    }
    props.setPersonId(response.json().personId);
  }

  return (
  <form ref={props.formRef} onSubmit={CreatePerson}>
        <p>
    <label>Фамилия</label>
    <input type="text" ref={surname}/><br/>
        </p>
        <p>
    <label>Имя</label>
    <input type="text" ref={name}/><br/>
        </p>
        <p>
    <label>Отчество</label>
    <input type="text" ref={patronymic}/><br/>
        </p>
        <p>
    <label>Пол</label>
    <select ref={sex}>
      <option value="man">Мужской</option>
      <option value="female">Женский</option>
    </select><br/>
        </p>
        <p>
    <label>Номер и серия паспорта</label>
    <input type="text" ref={pasport}/><br/>
        </p>
        <p>
    <label>Дата рождения</label>
    <input type="date" ref={birthday}/><br/>
        </p>
        <p>
    <label>Домашний адрес</label>
    <input type="text" ref={home}/><br/>
        </p>
        <p>
    <label>Номер телефона</label>
    <input type="text" ref={phone}/><br/>
        </p>
        <p>
    <label>Электронная почта</label>
    <input type="email" ref={email}/>
        </p>
  </form>);
}

export default PersonForm;
