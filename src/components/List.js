import React, {useEffect, useState} from 'react'
import Button from "react-bootstrap/cjs/Button";


const List = ({mps, dataUser,  setEmailData,  setShowFindForm, setShowEmailForm, clientId}) => {
    const [tweet, setTweet] = useState(``)
    const fetchData = async () => {
        const requestOptions = {
            method: 'POST',
            redirect: 'follow'
        }
        const data = await fetch(`https://payload-demo-tpm.herokuapp.com/tweets/?clientId=${clientId}`, requestOptions);
        const datos = await data.json()
        console.log(datos.data, 'datos.data-tweet')
        const textoTweet = datos.data?.docs[0].Message
        setTweet(textoTweet)
    }
    
    useEffect(() => {
        fetchData()
        .catch((error)=>console.error(error))
        
        console.log(tweet, 'tweet state en useeffect')
    },[])
    const tweetText = `.${mps.twitter} ${tweet}`
    console.log(tweetText)
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
            <div className={'list-content-location'}>
                <div>
                    <h3> {mps.Name} </h3>
                    <p>For: {mps.postalcode}, City: {mps.city}, -State: {mps.state}</p>
                </div>
            </div>
            <div className={'buttons'}>
                <div className='list-buttons-content'>
                    {
                        mps.twitter && mps.clientId?.plan !== 'basic'?
                        <Button
                            className='list-button'
                            size={'sm'}
                            variant={'dark'}
                            href={`https://twitter.com/intent/tweet?text=${tweetText}`}
                            target={"blank"}
                        >
                            SEND TWEET
                        </Button> :
                        <p className='list-notweeter-text' >No Twitter</p>
                    }
                </div>
                <div className={'container list-buttons-content'}>
                    {
                        mps.contact ?
                            <Button
                                className='list-button'
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
                <div className={'container list-buttons-content'}>
                    {
                        mps.phone  && mps.clientId?.plan !== 'basic' ?
                            <Button
                                className='list-button'
                                size={'sm'}
                                variant={'dark'}
                                href={`tel:+55${mps.phone}`}
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


