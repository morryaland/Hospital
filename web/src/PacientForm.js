import { useRef, useState } from 'react';
import PersonForm from './PersonForm';

function PacientForm()
{
  const [personId, setPersonId] = useState(-1);
  const personFormRef = useRef(null);
  const pacientFormRef = useRef(null);

  async function CreatePacient(e)
  {
    e.preventDefault();
    console.log(personId);
  }

  async function SubmitForms()
  {
    await personFormRef.current.requestSubmit();
    await pacientFormRef.current.requestSubmit();
  }

  return (
    <div>
      <PersonForm formRef={personFormRef} setPersonId={setPersonId} />
      <form ref={pacientFormRef} onSubmit={CreatePacient}>
        <label>Последняя запись</label>
        <input type="date"/>
      </form>
      <button onClick={SubmitForms}>Добавить</button>
    </div>
  );
}

export default PacientForm;
