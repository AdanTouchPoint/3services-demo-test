import React from 'react'
import Button from "react-bootstrap/cjs/Button";


const ThankYou = ({showThankYou, setShowFindForm, setShowThankYou}) => {
    const click = e => {
        e.preventDefault()
        setShowThankYou(true)
        setShowFindForm(false)
    }
    return (
        <div hidden={showThankYou} className={'container'} style={{justifyContent: 'center', display: 'flex'}}>
            <form onSubmit={click}>
                <div style={{maxWidth: '700px', width: '100%', backgroundColor: '#f4f4f4', padding: '15px'}}>
                    <h1>Your message has been sent successfully</h1>
                    <h5>If you wish to email another representative or you wish to send another email to the same
                        representative Click Repeat Button.</h5>
                    <Button
                        type={'submit'}
                        onClick={click}
                        variant={'dark'}>
                        RepeatProcess
                    </Button>
                </div>
            </form>
        </div>


    )
}

export default ThankYou;