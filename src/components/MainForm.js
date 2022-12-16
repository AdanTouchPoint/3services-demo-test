import React, {useEffect, useState, useCallback} from 'react';
import Loader from "react-loader-spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/cjs/Button";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import List from './List'
import mainimage from '../assets/laptop-with-notebook-and-glasses-on-table.jpg';
//import icon from '../assets/tw.png'
import cryptoRandomString, { async } from "crypto-random-string";
import EmailForm from "./EmailForm";
import ThankYou from "./ThankYou";
import Card from "react-bootstrap/cjs/Card";
import {Link, animateScroll as scroll} from "react-scroll";
import {io} from "socket.io-client"
import mps from '../assets/mps';



const MainForm = ({dataUser, setDataUser, setSenator, senator, mp, setMp, setEmailData, emailData}) => {
    const [showLoadSpin, setShowLoadSpin] = useState(false)
    const [showList, setShowList] = useState(true)
    const [showFindForm, setShowFindForm] = useState(false)
    const [showEmailForm, setShowEmailForm] = useState(true)
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(false)
    const [showThankYou, setShowThankYou] = useState(true)
    const [mainData, setMainData] = useState({})
    const [pageContent, setPageContent] = useState(mainData)
    const clientId = '636dadcf2626f92aade6664a';
    // const payloadURL = 'https://payload-demo-tpm.herokuapp.com'
    // const socket = io(payloadURL);

    //Main Data content
    // socket.on(`mainData=${clientId}`, function (data) {
    //     //console.log('mainData',data);
    //     setMainData(data)
    // });
    //console.log(mainData)
    
    //Email Data content
    // socket.on(`emailData=${clientId}`, function (data) {
    //     console.log('email Data',data);
    // });
    
    // //TYP Data content
    // socket.on(`TYPData=${clientId}`, function (data) {
    //     console.log('TYP data',data);
    // });

    // //TweetsData content
    // socket.on(`TweetsData=${clientId}`, function (data) {
    //     console.log('Tweets data',data);
    // });

    const handleChange = e => {
        e.preventDefault();
        setDataUser({
            ...dataUser,
            [e.target.name]: e.target.value
        })
        console.log(e.target.value)
        console.log(dataUser)
    }
    const { zipCode, emailUser } = dataUser;

    const click = async e => {
        e.preventDefault();
        // load spin
        setShowLoadSpin(true)
//validation form -->
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
        if (//firstName.trim() === '' || lastName.trim() === '' || //
            zipCode.trim() === '' || emailUser.trim() === '') {
            setError(true)
            return
        }

        setError(false)
//---> ends validation form
        const randomId = cryptoRandomString({type: 'distinguishable', length: 10})
        dataUser.id = randomId;
        //const response = await axios.post(`https://sendemail-service.herokuapp.com/sendtwit`, {dataUser})
      //  const dataPayload = await response.data.data
      //  const getMp = await response.data.getMp
        
        
        setSenator(mps)// setSenator(dataPayload)
        setMp(mps) //setMp(getMp)
        console.log(mps, 'log de mps')
        console.log(mp, 'log de estado mp')
        setShowLoadSpin(false)
        setShowList(false)
        scroll.scrollToBottom();
    }
    const fetchData = async () => {
        const requestOptions = {
            method: 'POST',
            redirect: 'follow'
        }
        const data = await fetch('https://payload-demo-tpm.herokuapp.com/main-content/?clientId=636dadcf2626f92aade6664a', requestOptions);
        const datos = await data.json()
        console.log(datos.data, 'datos.data')
        setMainData(datos);
        console.log(mainData)
      }
    
    useEffect(() => {
        fetchData()
        .catch((error)=>console.error(error))

    console.log(mainData)
    },[])
    console.log(dataUser)
    console.log(mp, 'log de estado mp')
    console.log(mainData, 'mainData fuera antes del return')
    if(!mainData) return 'loading datos'
    if(!mp) return 'loading datos'
    return (

        <div className={'container main-form-flex-container'} >
            <div>
                {/*<img style={{margin: '20px', maxHeight: '50px', maxWidth: '50px', height: '100%', width: '100px'}}*/}
                {/*     src={icon}/>*/}
            </div>
            <Card className="bg-dark card-img text-white main-image-container">
                <Card.Img  src={mainData.data?.docs[0].backgroundImage?.url ? mainData.data?.docs[0].backgroundImage.url : mainimage }
                     alt={'header'}/>
                     <Card.ImgOverlay className={'card-img-overlay'}>
                         <Card.Body>
                         <Card.Text className={'text'} >
                                 {mainData.data?.docs[0].mainTitle}
                         </Card.Text>
                             <Card.Text className={'text2'} >
                                Try Our Demo
                             </Card.Text>
                         </Card.Body>
                     </Card.ImgOverlay>
            </Card>
            <div className={'container instructions' } >
                {mainData.data?.docs[0].instructions}
            </div>
            <div className={'form-container'}>
                <div hidden={showFindForm} className={'container container-content'} >
                    {error ? <Alert variant={'danger'}>
                        All fields are required!
                    </Alert> : null}
                    <Link
                        activeClass="active"
                        to="section1"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                    </Link>
                    <Form onSubmit={click} noValidate validated={validated}>
                        <h3>Find you local MP here:</h3>
                        <Form.Group>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="emailUser"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group >
                            <Form.Control
                                type="text"
                                placeholder="Type your zipCode and press ENTER"
                                name="zipCode"
                                onChange={handleChange}
                                required
                                maxLength="4"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Button
                                type={'submit'}
                                variant={'dark'}
                                size={'lg'}
                                onClick={click}
                                className={'u-full-width'}
                            >
                                {mainData.data?.docs[0] ['Find Button'] ? mainData.data?.docs[0] ['Find Button'] : 'Find your representative'}
                            </Button>
                        </Form.Group>
                        {showLoadSpin ? <Loader
                            visible={showLoadSpin}
                            type="Puff"
                            color="#000000"
                            height={100}
                            width={100}
                            timeout={10000} //10 secs
                        /> : null }
                    </Form>

                    <div className={'container senators-container'} hidden={showList}>
                        <div>
                            <p>NOTE: Choose only one Representative at a time.
                                If you wish to contact more than one representative, or add further emails to the same
                                Representative, you will have the option to repeat after sending each email.</p>
                        </div>
                        <h2>MP´s</h2>
                        <div>
                            {mp.length > 0 && mp.filter(item => item.govt_type === 'Federal MPs').map((mps, index) => (
                                <List
                                    setShowEmailForm={setShowEmailForm}
                                    setShowFindForm={setShowFindForm}
                                    showFindForm={showFindForm}
                                    emailData={emailData}
                                    setEmailData={setEmailData}
                                    dataUser={dataUser}
                                    mps={mps}
                                    //key={index}
                                />)
                            ) }
                        </div>
                    </div>
                    <div className={'container senators-container'} hidden={showList}>
                        <h2>Senators</h2>
                        {senator.filter(item => item.govt_type === 'Federal Senators').map((mps, index) => (
                                <div>
                                    <List
                                        setShowEmailForm={setShowEmailForm}
                                        setShowFindForm={setShowFindForm}
                                        showFindForm={showFindForm}
                                        emailData={emailData}
                                        setEmailData={setEmailData}
                                        dataUser={dataUser}
                                        mps={mps}
                                        key={index}
                                    />
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
            <EmailForm
                setShowThankYou={setShowThankYou}
                setShowFindForm={setShowFindForm}
                setShowEmailForm={setShowEmailForm}
                showEmailForm={showEmailForm}
                dataUser={dataUser}
                emailData={emailData}
                setEmailData={setEmailData}
                setDataUser={setDataUser}
            />
            <ThankYou
                emailData={emailData}
                setDataUser={setDataUser}
                setEmailData={setEmailData}
                setShowFindForm={setShowFindForm}
                setShowThankYou={setShowThankYou}
                showThankYou={showThankYou}/>
           
        </div>
    )
}
export default MainForm;


