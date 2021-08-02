import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import TextForm from './TextForm'
import TextTimeStamp from './TextTimeStamp'

const TextContainer = ()=>{
    const [text,setText]=useState('')
    const [stop,setStop]=useState(true)
    const [linkEdit,setLinkEdit]=useState(false)
    //const [disableText,setDisableText]=useState(false)    


    useEffect(()=>{
        const result=JSON.parse(localStorage.getItem('text')) || ''
        setText(result)
    },[])
    
    useEffect(()=>{
        localStorage.setItem('text',JSON.stringify(text))
    },[text])
    
    const updateText = (str)=>{
        setText(str)
    }
    const changeStop = (b)=>{
        setStop(b)
    }

    const linkEditUpdate = (b)=>{
        setLinkEdit(b)
    }

   /* const handleDisableText = (b)=>{
        setDisableText(b)
    }*/
    
    return (
        <div className='row'>
            <div className='col-md-8'>
            <TextForm 
                text={text}
                updateText={updateText}
                changeStop={changeStop}
                stop={stop}
                linkEdit ={ linkEdit }
                linkEditUpdate={linkEditUpdate}
                //disableText={disableText}
                //handleDisableText={handleDisableText}
            />
            </div>

            <div className='col-md-4'>
            <TextTimeStamp
                text={text}
                updateText={updateText}
                changeStop={changeStop}
                stop={stop}
                linkEditUpdate={linkEditUpdate}
               // handleDisableText={handleDisableText}
            />
            </div>

        </div>
    )
}

export default TextContainer