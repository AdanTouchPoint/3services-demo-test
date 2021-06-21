import React, {useState} from 'react'
import Button from "react-bootstrap/cjs/Button";

const List = ({mps, dataUser,  setEmailData,  setShowFindForm, setShowEmailForm}) => {
    const tweetText = `.${mps.twitter}`
    const click = e => {
        e.preventDefault()
        setEmailData({
            ...dataUser,
            ...mps
        })
        setShowEmailForm(false)
        setShowFindForm(true)
    }
    return (
        <div className={'buttonsContainer'}>
            <div style={{paddingTop: '10px'}}>
                <div>
                    <h3> {mps.name} </h3>
                    <p>For: {mps.address}, City: {mps.city}, -State: {mps.state}</p>
                </div>
            </div>
            <div className={'buttons'}>
                <div style={{padding: '5px'}}>
                    {
                        mps.twitter !== 'NULL' ?
                        <Button
                            style={{maxWidth: '110px', width: '100%'}}
                            size={'sm'}
                            variant={'dark'}
                            href={`https://twitter.com/intent/tweet?text=${tweetText} Tweets%20are%20pre-written%20and%20can%20be%20edited%20by%20users%20before%20posting.%20Links%2C%20hashtags%2C%20and%20handles%20can%20all%20be%20included%20in%20a%20tweet.`}
                            target={"blank"}
                        >
                            SEND TWEET
                        </Button> :
                        <p style={{textAlign:'center'}}>No Twitter</p>
                    }
                </div>
                <div className={'container'} style={{padding: '5px'}}>
                    {
                        mps.email ?
                            <Button
                                style={{maxWidth: '110px', width: '100%'}}
                                size={'sm'}
                                variant={'dark'}
                                target={"blank"}
                                onClick={click}
                            >
                                SEND EMAIL
                            </Button> :
                            <p>No Email</p>
                    }
                </div>
                <div className={'container'} style={{padding: '5px'}}>
                    {
                        mps.phone ?
                            <Button
                                style={{maxWidth: '110px', width: '100%'}}
                                size={'sm'}
                                variant={'dark'}
                                href={`tel:+61${mps.phone}`}
                                target={"blank"}
                            >
                                CALL
                            </Button> :
                            <p>No Phone</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default List;


