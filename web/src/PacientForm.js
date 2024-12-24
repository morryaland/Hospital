import { useRef, useState } from 'react';
import PersonForm from './PersonForm';
import CONFIG from "./config.json"
import QRCode from 'qrcode';

function PacientForm()
{
  const [personId, setPersonId] = useState(-1);
  const [qrcode, setQrcode] = useState();

  const lastEntry = useRef();
  const nextEntry = useRef();
  const policyNumber = useRef();
  const policyValidity = useRef();
  const cardNumber = useRef();
  const cardValidity = useRef();
  const diagnostics = useRef();
  const medicalHistory = useRef();

  async function CreatePacient(e)
  {
    e.preventDefault();
    const response = await fetch(`${CONFIG.backendUrl}/api/pacient/create`, {
      method: "POST",
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        personId: personId,
        lastEntry: lastEntry.current.value,
        nextEntry: nextEntry.current.value,
        policyNumber: policyNumber.current.value,
        policyValidity: policyValidity.current.value,
        cardNumber: cardNumber.current.value,
        cardValidity: cardValidity.current.value,
        diagnostics: diagnostics.current.value,
        medicalHistory: medicalHistory.current.value
      })
    });
    if (!response.ok) {
      console.error(response.statusText);
      return;
    }
    let res = await response.json();
    QRCode.toDataURL(`${window.location.href}/${res.pacientId}`, (err, url) => {
      setQrcode(url);
    });
  }

  return (
    <div>
      <img height="150" width="150" src={qrcode} alt="QR code"/>
      <PersonForm setPersonId={setPersonId} />
      ID: {personId}
      <form onSubmit={CreatePacient}>
        <p>
        <label>Последняя запись</label>
        <input type="date" ref={lastEntry}/>
        </p>
        <p>
        <label>Слудующая запись</label>
        <input type="datetime-local" ref={nextEntry}/>
        </p>
        <p>
        <label>Номер страхового полиса</label>
        <input type="text" ref={policyNumber}/>
        </p>
        <p>
        <label>Действие страхового полиса</label>
        <input type="date" ref={policyValidity}/>
        </p>
        <p>
        <label>Номер мед. карты</label>
        <input type="text" ref={cardNumber}/>
        </p>
        <p>
        <label>Серия смед. карты</label>
        <input type="text" ref={cardValidity} />
        </p>
        <p>
        <label>Диагноз</label>
        <input type="text" ref={diagnostics}/>
        </p>
        <p>
        <label>История болезни</label>
        <textarea ref={medicalHistory}/>
        </p>
        <p>
        <button type="submit">Добавить пациента</button>
        </p>
      </form>
    </div>
  );
}

export default PacientForm;
