import { useRef, useState } from 'react';
import PersonForm from './PersonForm';
import CONFIG from "./config.json"
import QRCode from 'qrcodejs';

function PacientForm()
{
  const [personId, setPersonId] = useState(-1);
  const [qrcode, setQrcode] = useState(-1);
  const personFormRef = useRef(null);
  const pacientFormRef = useRef(null);

  const lastEntry = useRef();
  const nextEntry = useRef();
  const policyNumber = useRef();
  const policyValidity = useRef();
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
        diagnostics: diagnostics.current.value,
        medicalHistory: medicalHistory.current.value
      })
    });
    if (!response.ok) {
      console.error(response.statusText);
      return;
    }
    setQrcode(new QRCode().makeCode(`${window.location.href}/${response.json()}`));
  }

  async function SubmitForms()
  {
    await personFormRef.current.requestSubmit();
    await pacientFormRef.current.requestSubmit();
  }

  return (
    <div>
      <img height="150" width="150" src={qrcode} alt=""/>
      <PersonForm formRef={personFormRef} setPersonId={setPersonId} />
      <form ref={pacientFormRef} onSubmit={CreatePacient}>
        <p>
        <label>Последняя запись</label>
        <input type="date" ref={lastEntry}/>
        </p>
        <p>
        <label>Слудующая запись</label>
        <input type="date" ref={nextEntry}/>
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
        <label>Диагноз</label>
        <input type="text" ref={diagnostics}/>
        </p>
        <p>
        <label>История болезни</label>
        <textarea ref={medicalHistory}/>
        </p>
      </form>
      <button onClick={SubmitForms}>Добавить</button>
    </div>
  );
}

export default PacientForm;
