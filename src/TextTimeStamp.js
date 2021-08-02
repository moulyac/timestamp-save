import React, { useState , useEffect} from 'react'

const TextTimeStamp = ({text,updateText,stop,linkEditUpdate})=>{
    const [history,setHistory]=useState([])
    const [ptext,setptext]=useState('')
    const [status,setStatus]=useState(false)

    useEffect(() => {
        setInterval(()=>{
           setStatus((status=>!status))
        },5000);
    }, []);

    useEffect(()=>{
        const str=JSON.parse(localStorage.getItem('ptext')) || ''
        setptext(str)

        const result=JSON.parse(localStorage.getItem('history')) || []
        setHistory(result)
    },[])

    useEffect(()=>{
        localStorage.setItem('history',JSON.stringify(history))
    },[history])

    useEffect(()=>{
        localStorage.setItem('ptext',JSON.stringify(ptext))
    },[ptext])
   

    useEffect(()=>{
        const t=new Date().toLocaleTimeString()
        const obj={}
        if(stop){
            if(ptext!==text){
                const hist=[...history]
                obj[t]=text
                hist.push(obj)
                setHistory(hist)
                setptext(text) 
            }
        }
    },[status])

    const handlelink=(ele)=>{
        linkEditUpdate(true)
     
        updateText(ele)
        setptext(ele)
    }
    return (
        <div class="container" class='mt-5'>
           <ul>
                {
                    history.map((ele,i)=>{
                        for(const key in ele)
                            return( <li key={i}>
                                <a onClick={()=>handlelink(ele[key])}>{key}</a>
                                </li>
                            )
                    })
                }
             </ul>
        </div>
    )
}

export default TextTimeStamp