import {useEffect, useState} from 'react'

const useWordCount = (fileContent) =>{

    const [count,setCount] = useState(0);

    useEffect(()=>{
        const calculateWordCount = () =>{
            const cleanText  = fileContent.trim().replace(/\s+/g,' ');
            const words = cleanText.split(' ')
            const wordCount = words.length;

            setCount(wordCount)
        };

        calculateWordCount();
    },[fileContent])

    return count;

};

export default useWordCount;