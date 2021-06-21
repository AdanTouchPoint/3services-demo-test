import React,{useState} from 'react'
import MainForm from "./components/MainForm";

function App() {
    const [emailData, setEmailData] = useState({
        userName: ''
    })
    const [dataUser, setDataUser] = useState({
        userName: '',
        zipCode: '',
        emailUser: '',
        subject:'The Subject Line is Pre-Filled and can be Edited',
        text:'Users will see a pre-filled email and can edit it before sending. If the system administrator prefers, subject line and/or body text can made uneditable.'

    })
    const [mp, setMp] = useState([])
    const [senator, setSenator] = useState([])
    return(
        <MainForm
            setEmailData={setEmailData}
            emailData={emailData}
            dataUser={dataUser}
            setDataUser={setDataUser}
            mp={mp}
            setMp={setMp}
            senator={senator}
            setSenator={setSenator}
        />
    )

}

export default App;
