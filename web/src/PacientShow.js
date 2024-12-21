import { useState } from 'react';
import CONFIG from './config.json';

function PacientShow(props)
{
  const [photo, setPhoto] = useState();
  const [surname, setSurname] = useState();
  const [name, setName] = useState();
  const [patronymic, setPatronymic] = useState();
  const [sex, setSex] = useState();
  const [pasport, setPasport] = useState();
  const [birthday, setBirthday] = useState();
  const [home, setHome] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [lastEntry, setLastEntry] = useState();
  const [nextEntry, setNextEntry] = useState();
  const [policyNumber, setPolicyNumber] = useState();
  const [policyValidity, setPolicyValidity] = useState();
  const [diagnostics, setDiagnostics] = useState();
  const [medicalHistory, setMedicalHistory] = useState();
  (async function ()
  {
    const response = await fetch(`${CONFIG.backendUrl}/api/pacient/show?id=${props.id}`, {
      method: "GET",
      headers: { "Accept": "application/json" }
    });
    if (!response.ok) {
      console.error(response.statusText);
      return;
    }
    let pacient = response.json();
    setPhoto(pacient.photo);
    setSurname(pacient.surname);
    setName(pacient.name);
    setPatronymic(pacient.patronymic);
    setSex(pacient.sex);
    setPasport(pacient.pasport);
    setBirthday(pacient.birthday);
    setHome(pacient.home);
    setPhone(pacient.phone);
    setEmail(pacient.email);
    setLastEntry(pacient.lastEntry);
    setNextEntry(pacient.nextEntry);
    setPolicyNumber(pacient.policyNumber);
    setPolicyValidity(pacient.policyValidity);
    setDiagnostics(pacient.diagnostics);
    setMedicalHistory(pacient.medicalHistory);
  })();
  return (
    <div>
      <p>
        Фото: <img src={photo} alt=""/>
      </p>
      <p>
        Фамилия: {surname}
      </p>
      <p>
        Имя: {name}
      </p>
      <p>
        Отчество: {patronymic}
      </p>
      <p>
        Пол: {sex}
      </p>
      <p>
        Номер и серия паспорта: {pasport}
      </p>
      <p>
        Дата рождения: {birthday}
      </p>
      <p>
        Домашний адрес: {home}
      </p>
      <p>
        Номер телефона: {phone}
      </p>
      <p>
        Электронная почта: {email}
      </p>
      <p>
        Последняя запись: {lastEntry}
      </p>
      <p>
        Слудующая запись: {nextEntry}
      </p>
      <p>
        Номер страхового полиса: {policyNumber}
      </p>
      <p>
        Действие страхового полиса: {policyValidity}
      </p>
      <p>
        Диагноз: {diagnostics}
      </p>
      <p>
        История болезни: {medicalHistory}
      </p>
    </div>);
}

export default PacientShow;
