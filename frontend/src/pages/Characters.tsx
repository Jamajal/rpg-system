import { Fragment, useContext, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import { Modal } from "../components/ModalComponent";
import { InputComponent } from "../components/InputComponent";

export const Characters = () => {
  const { user } = useContext(AuthContext) as any;
  const [shwoModal, setShowModal] = useState(false);
  const [charactersName, setCharactersName] = useState('');
  const [charactersClass, setCharactersClass] = useState('');
  const [charactersGenre, setCharactersGenre] = useState('');
  const [charactersSpecie, setCharactersSpecie] = useState('');
  const [charactersBackground, setCharactersBackground] = useState('');
  const [charactersTableId, setCharactersTableId] = useState('');

  const handlerSelectChange = (e : any): void => {
    setCharactersTableId(e.target.value);
  }

  return (
    <Fragment>
      <div className="p-4">
        <h1 className="font-bold text-3xl text-center items-start text-black dark:text-white">Seus Personagens</h1>
        <div className="flex flex-col contetn-center p-6 gap-4">
          <div className="grid rounded-md text-black dark:text-white">
            <div className="flex gap-2 justify-self-end">
              <button className="bg-blue-200 items-center mt-2 mb-2 w-48 text-sm hover:bg-blue-300 px-6 py-2 rounded text-black shadow focus:outline-none" onClick={() => { setShowModal(true) }}>Criar Personagem</button>
            </div>
          </div>

          <div className="border-t border-gray-400">
            {user.character ?
              <div className="flex flex-col bg-white text-black rounded-md text-black dark:bg-gray-900 dark:text-white gap-1 p-2">
                <h2 className="text-lg font-semibold">{user.character}</h2>
                <div className="flex flex-col border-t border-gray-400">
                  <p className="mt-2">Informações do persongem exibidos aqui</p>
                </div>
              </div> : <h3 className="font-semibold text-3xl text-center items-start text-black dark:text-white">Nenhum personagem encontrado</h3>}
          </div>
        </div>
      </div>
      <Modal isVisible={shwoModal} onClose={(() => setShowModal(false))}>
        <div className="grid p-6">
          <h4 className="text-xl font-semibold text-gray-900 mb-5">De vida ao seu Personagem</h4>

          {/* <select id="tablesAvaliable" value={charactersTableId} onChange={handlerSelectChange}>
            <option value=''>
              Selecione uma opção
            </option>
            <option value={'1'}>
              Mesa 1
            </option>
            <option value={'2'}>
              Mesa 2
            </option>
            <option value={'3'}>
              Mesa 3
            </option>
          </select> */}

          <InputComponent inputId='charactersName' inputName='Nome do personagem' onChange={() => { }} placeholder='Digite o nome' type='text' />
          <InputComponent inputId='charactersClass' inputName='Classe do personagem' onChange={() => { }} placeholder='Digite sua classe' type='text' />
          <InputComponent inputId='charactersGenre' inputName='Gênero do personagem' onChange={() => { }} placeholder='Digite seu gênero' type='text' />
          <InputComponent inputId='charactersSpecie' inputName='Espécie do personagem' onChange={() => { }} placeholder='Digite sua espécie' type='text' />
          <InputComponent inputId='charactersBackground' inputName='História do personagem' onChange={() => { }} placeholder='Informe sua história' type='text' />
          <div className="flex flex-col-2 gap-2 justify-self-end">
            <button className="bg-blue-200 mt-2 mb-2 w-32 text-sm hover:bg-blue-300 px-6 py-2 rounded text-black shadow">Salvar</button>
            <button className="bg-blue-200 mt-2 mb-2 w-32 text-sm hover:bg-blue-300 px-6 py-2 rounded text-black shadow" onClick={() => { setShowModal(false) }}>Fechar</button>
          </div>
        </div>
      </Modal>
    </Fragment>
  )
}

