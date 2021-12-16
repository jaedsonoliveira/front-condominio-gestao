import React, {useState, useEffect} from 'react';
import useApi from '../services/api';
import { CButton, CButtonGroup, CCard, CCardBody, CCardHeader, CCol, CDataTable, CFormGroup, CInput, CLabel, CModal, CModalBody, CModalFooter, CModalHeader, CRow, CTextarea } from '@coreui/react';
import CIcon from '@coreui/icons-react';

export default () =>{
    const api = useApi();
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [modalTitleField, setModalTitleField] = useState('');
    const [modalBodyField, setModalBodyField] = useState('');
    const [modalId, setModalId] = useState('');
    const fields = [//criando os campos da tabela
        {label:'Título', key: 'title'},
        {label: 'Data de Criação', key:'datecreated', _style:{width:'200px'}},
        {label: 'Ações', key:'actions', _style:{width:'1px'}},
    ];

    useEffect(()=>{ //toda vez q atualizar a pagina ele roda a função
        getList();
    },[])

    const getList = async () =>{ // faz a verificacao na requesicao da api, se tudo estiver ok, ele joga o array dentro da state setList
        setLoading(true);
        const result = await api.getWall();
        setLoading(false);
        if(result.error === ''){
            setList(result.list);
        }else{
            alert(result.error);
        }
    }

    const handleCloseModal = ()=>{ // fecha a modal
        setShowModal(false);
    }

    const handleEditButton = (id)=>{
        let index = list.findIndex(v=>v.id===id);//Bug do filtro
        setModalId(list[index]['id']);
        setModalTitleField(list[index]['title']);
        setModalBodyField(list[index]['body']);
        setShowModal(true);
    }

    const handleRemoveButton  = async (id)=>{
        if(window.confirm('Tem certeza ?')){
            const result = await api.removeWall(id);
            if(result.error === ''){
                getList();
            }else{
                alert(result.error);
            }
        }
    }

    const handleNewButton = () => {
        setModalId('');
        setModalTitleField('');
        setModalBodyField('');
        setShowModal(true);
    }

    const handleModalSave = async () => { // faz a requisição para salvar/alterar os dados
        if(modalTitleField && modalBodyField) {
            let result;
            let data = {
                title: modalTitleField,
                body: modalBodyField 
            };
            if(modalId === ''){// se o id for vazio, eu estarei salvando os dados 
                setModalLoading(true);
                result = await api.addWall(data);
                setModalLoading(false);
            }else{ // se o id nao for vazio, estarei alterando os dados
                setModalLoading(true);
                result = await api.updateWall(modalId, data);
                setModalLoading(false);
            }
            if(result.error === '') { // se nao tiver erro, fecha a modal e atualiza a lista da tabela
                setShowModal(false);
                getList();
            } else {
                alert(result.error);
            }
        }else {
            alert("Preencha os campos!")
        }
    }
    return(
        <>
        <CRow>
            <CCol>
                <h2>Mural de Avisos</h2>

                <CCard>
                    <CCardHeader>
                        <CButton color='primary'onClick={handleNewButton}>
                            <CIcon name='cil-check'/> Novo Aviso
                        </CButton>
                    </CCardHeader>

                    <CCardBody>
                        <CDataTable
                        items={list}
                        fields={fields}
                        loading={loading}
                        noItemsViewSlot= " "
                        hover
                        striped
                        bordered
                        pagination
                        itemsPerPage={5}
                        scopedSlots={{
                            'actions':(item,index)=>(
                                <td>
                                    <CButtonGroup>
                                        <CButton color='info' onClick={()=>handleEditButton(item.id)}>Editar</CButton>
                                        <CButton color='danger' onClick={()=>handleRemoveButton(item.id)}>Excluir</CButton>
                                    </CButtonGroup>
                                </td>
                            )
                        }}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>

        <CModal show={showModal} onClose={handleCloseModal}>
            <CModalHeader closeButton>{modalId ===''?'Novo' : 'Editar'} Aviso</CModalHeader>
            <CModalBody>
                <CFormGroup>
                    <CLabel htmlFor='modal-title'>Titulo do aviso</CLabel>
                    <CInput
                    type='text'
                    id='modal-title'
                    placeholder='Digite um titulo para o aviso'
                    value={modalTitleField}
                    onChange={e=>setModalTitleField(e.target.value)}
                    />
                </CFormGroup>

                <CFormGroup>
                    <CLabel htmlFor='modal-body'>Corpo do aviso</CLabel>
                    <CTextarea
                    id='modal-body'
                    placeholder='Digite o conteudo para o aviso'
                    value={modalBodyField}
                    onChange={e=>setModalBodyField(e.target.value)}
                    />
                </CFormGroup>
            </CModalBody>
            <CModalFooter>
                <CButton 
                onClick={handleModalSave}
                color='primary' disabled={modalLoading}>{modalLoading ? 'Carregando...': 'Salvar'}</CButton>
                <CButton
                onClick={handleCloseModal}
                color='secondary' disabled={modalLoading}>Cancelar</CButton>
            </CModalFooter>
        </CModal>

        </>
    );
}

/*import React, {useState, useEffect} from 'react';
import useApi from '../services/api';
import { CButton, CButtonGroup, CCard, CCardBody, CCardHeader, CCol, CDataTable, CFormGroup, CInput, CLabel, CModal, CModalBody, CModalFooter, CModalHeader, CRow, CTextarea } from '@coreui/react';
import CIcon from '@coreui/icons-react';

export default () =>{
    const api = useApi();
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [modalTitleField, setModalTitleField] = useState('');
    const [modalBodyField, setModalBodyField] = useState('');
    const [modalId, setModalId] = useState('');
    const fields = [//criando os campos da tabela
        {label:'Título', key: 'title'},
        {label: 'Data de Criação', key:'datecreated', _style:{width:'200px'}},
        {label: 'Ações', key:'actions', _style:{width:'1px'}},
    ];

    useEffect(()=>{ //toda vez q atualizar a pagina ele roda a função
        getList();
    },[])

    const getList = async () =>{ // faz a verificacao na requesicao da api, se tudo estiver ok, ele joga o array dentro da state setList
        setLoading(true);
        const result = await api.getWall();
        setLoading(false);
        if(result.error === ''){
            setList(result.list);
        }else{
            alert(result.error);
        }
    }

    const handleCloseModal = ()=>{ // fecha a modal
        setShowModal(false);
    }

    const handleEditButton = (id)=>{
        let index = list.findIndex(v=>v.id===id);//Bug do filtro
        setModalId(list[index]['id']);
        setModalTitleField(list[index]['title']);
        setModalBodyField(list[index]['body']);
        setShowModal(true);
    }

    const handleRemoveButton  = async (id)=>{
        if(window.confirm('Tem certeza ?')){
            const result = await api.removeWall(id);
            if(result.error === ''){
                getList();
            }else{
                alert(result.error);
            }
        }
    }

    const handleNewButton = () => {
        setModalId('');
        setModalTitleField('');
        setModalBodyField('');
        setShowModal(true);
    }

    const handleModalSave = async () => { // faz a requisição para salvar/alterar os dados
        if(modalTitleField && modalBodyField) {
            let result;
            let data = {
                title: modalTitleField,
                body: modalBodyField 
            };
            if(modalId === ''){// se o id for vazio, eu estarei salvando os dados 
                setModalLoading(true);
                result = await api.addWall(data);
                setModalLoading(false);
            }else{ // se o id nao for vazio, estarei alterando os dados
                setModalLoading(true);
                result = await api.updateWall(modalId, data);
                setModalLoading(false);
            }
            if(result.error === '') { // se nao tiver erro, fecha a modal e atualiza a lista da tabela
                setShowModal(false);
                getList();
            } else {
                alert(result.error);
            }
        }else {
            alert("Preencha os campos!")
        }
    }

    return(
        <>
        <CRow>
            <CCol>
                <h2>Mural de Avisos</h2>
                <CCard>
                    <CCardHeader>
                        <CButton color="primary" onClick={handleNewButton}>
                            <CIcon name="cil-check"/> Novo Aviso
                        </CButton>
                    </CCardHeader>
                    <CCardBody>
                        <CDataTable 
                            items={list} // insere os itens na tabela
                            fields={fields} // cria os campos da tabela
                            loading={loading} // loading em quanto a tabela nao carrega
                            noItemsViewSlot = " " // sem a msg de not dados
                            hover={true} // efeito quando passar o mouse
                            striped={true} // tabela alternando as cores 
                            bordered={false} // sem borda
                            pagination={true} // com paginação 
                            itemsPerPage={5} // quantidade de infor por pagina
                            scopedSlots={{ // adiciona elementos na tabela
                                'actions':(item, index)=>(
                                    <td>
                                        <CButtonGroup>
                                            <CButton color="info" onClick={()=>handleEditButton(item.id)}>Editar</CButton>
                                            <CButton color="danger" onClick={()=>handleRemoveButton(item.id)}>Excluir</CButton>
                                        </CButtonGroup>
                                    </td>
                                )
                            }}

                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>

        <CModal show={showModal} onClose={handleCloseModal}>
            <CModalHeader closeButton>
                {modalId === ''? 'Novo':'Editar'} Aviso
            </CModalHeader>
            <CModalBody>
                <CFormGroup>
                    <CLabel htmlFor="modal-title">Título do Aviso</CLabel>
                    <CInput type="text"
                     id="modaltitle"
                      placeholder="Digite um título para o aviso"
                      value={modalTitleField}
                      onChange={e=>setModalTitleField(e.target.value)}
                      disabled={modalLoading}
                    />
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="modal-Body">Conteúdo do Aviso</CLabel>
                    <CTextarea
                     id="modalbody"
                      placeholder="Digite o conteúdo para o aviso"
                      value={modalBodyField}
                      onChange={e=>setModalBodyField(e.target.value)}
                      disabled={modalLoading}
                    />
                </CFormGroup>
            </CModalBody>
            <CModalFooter>
                <CButton color="primary" onClick={handleModalSave} disabled={modalLoading}>{modalLoading ? 'Carregando...' : 'Salvar'}</CButton>
                <CButton color="secondary" onClick={handleCloseModal} disabled={modalLoading}>Cancelar</CButton>
            </CModalFooter>
        </CModal>
        </>
    );
}*/