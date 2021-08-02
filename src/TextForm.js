import React,{ useState,useEffect } from 'react'
import { RiTwitterFill } from "react-icons/ri"

const TextForm = ({text,updateText,changeStop,linkEditUpdate,linkEdit})=>{
    
    
  //  const [checkedEdit,setcheckedEdit ]=useState(false)

    const [characters,setCharacters]=useState(0)
    const [words,setWords]=useState(0)
    

    const blockWords=['hate','stupid']

    useEffect(()=>{
        const char=text.trim().length
        setCharacters(char)
        const wrds=text.trim().split(' ')
        //console.log(wrds)
        if(blockWords.includes(wrds[wrds.length-1])){

            wrds.pop()
            updateText(wrds.join(' '))
        }
        if(text===' '||text===''){
            setWords(0)}
          else{
          setWords(wrds.length)
        }
    },[text])

    const handleTextChange=(e)=>{
        const str=e.target.value
        updateText(str)
        changeStop(true)
    }
    const handleEdit =()=>{
        linkEditUpdate(false)
       
    }
    
    
    return (
        <div class='mt-5'>
            <textarea 
                className='textBox'
                cols="80" 
                rows="5" 
                value={text} 
                disabled={linkEdit} 
                onChange={handleTextChange}
                
            ></textarea>

            { 
                linkEdit && (
                    <div className='editButton'>
                        <button onClick={handleEdit} >edit</button>
                    </div>
                )
            }

            <div className='row'>
                <h4 className='col-md-6'>words-{words}</h4>
                <h4 className='col-md-6'>characters-{characters}</h4>
            </div>
           

            <TweetText
                text={text}
            />

            <SentimentalAnalysis
                text={text}
            />
        </div>
    )
}

const TweetText =({text})=>{
    const handleTweet=()=>{
        const twitterUrl = `https://twitter.com/intent/tweet?text=${text}`
        window.open(twitterUrl, '_blank');
   }
    return (
        <div >
            <button onClick={handleTweet} className='tweet'> <RiTwitterFill/></button>
        </div>
    )
}

const SentimentalAnalysis = ({text})=>{
    const Sentiment = require('sentiment');
    const sentiment = new Sentiment();
    const result = sentiment.analyze(text);
    //console.log(result)

    const neutral = result.tokens.filter((ele)=>{
        return !result.words.includes(ele)
    })

    return(
        <div>
            <br/>
            <h4>negative:{result.negative.length}</h4>
            <h4>postive:{result.positive.length}</h4>
            <h4>neutral:{neutral.length}</h4>
        </div>
    )
}

export default TextForm