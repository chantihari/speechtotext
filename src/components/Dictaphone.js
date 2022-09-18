// import React from 'react'
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

// const Dictaphone = () => {
//   const { transcript, resetTranscript } = useSpeechRecognition()

//   if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
//     return null
//   }

//   return (
//     <div>
//       <button onClick={SpeechRecognition.startListening}>Start</button>
//       <button onClick={SpeechRecognition.stopListening}>Stop</button>
//       <button onClick={resetTranscript}>Reset</button>
//       <p>{transcript}</p>
//     </div>
//   )
// }
// export default Dictaphone

import React, { useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'


const Dictaphone = () => {
  const [message, setMessage] = useState('')
  const [updateText, setupdateText] = useState([])
  const commands = [
    {
      command: 'I would like to order *',
      callback: (food) => setMessage(`Your order is for: ${food}`)
    },
    {
      command: 'The weather is :condition today',
      callback: (condition) => setMessage(`Today, the weather is ${condition}`)
    },
    {
      command: 'My top sports are * and *',
      callback: (sport1, sport2) => setMessage(`#1: ${sport1}, #2: ${sport2}`)
    },
    {
      command: 'Pass the salt (please)',
      callback: () => setMessage('My pleasure')
    },
    {
      command: 'Hello',
      callback: () => setMessage('Hi there!'),
      matchInterim: true
    },
    // {
    //   command: 'yes',
    //   callback: (command, spokenPhrase, similarityRatio) => alphabetSpeech(command, spokenPhrase, similarityRatio),
    //   // setMessage(`${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`),
    //   // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
    //   isFuzzyMatch: true,
    //   fuzzyMatchingThreshold: 0.2
    // },
    
    {
      command: 'clear',
      callback: ({ resetTranscript }) => resetTranscript()
    },
    {
      command: 'ok',
      callback: () => saveText("ok")
    },
    {
      command: 'stop',
      callback: () => SpeechRecognition.stopListening()
    },
    // {
    //   command: "alphabet *",
    //   callback: (alphabet) => saveTranscript(`alphabet`),
    //  // isFuzzyMatch: true,
    //   //fuzzyMatchingThreshold: 0.2
    // },
    // {
    //   command: 'alphabet yes',
    //   callback: (command, spokenPhrase, similarityRatio) => alphabetSpeech(command, spokenPhrase, similarityRatio),
    //   // setMessage(`${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`),
    //   // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
    //   isFuzzyMatch: true,
    //   fuzzyMatchingThreshold: 0.2
    // },
  ]

  // const { transcript } = useSpeechRecognition({ commands })

  let {
    transcript
  } = useSpeechRecognition({ commands });
  //const startListening = () => SpeechRecognition.startListening({ continuous: true });

  const saveText = (replaceText) => {

    setupdateText([...updateText, transcript.replaceAll(replaceText, "")])
  };

  // const saveTranscript = (replaceText) => {
  //   console.log("transcriptreplace ", transcript)
  //   transcript = transcript.replaceAll(replaceText, "")
  //   console.log("transcriptreplace next ", transcript)
  // };

  const alphabetSpeech = (command, spokenPhrase, similarityRatio) => {
    console.log("command ", command)
    console.log("spokenPhrase ", spokenPhrase)
    console.log("similarityRatio ", similarityRatio)
    if(similarityRatio > 0.9){
      console.log("ration s")
      setMessage(`s`)
    }
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }
  console.log("transcript ", transcript)
 // $("input:text").val();
if(document.getElementById("myText")){
  document.getElementById("myText").value =  transcript.replaceAll("alphabet", "").replaceAll("yes", "s")
}
  

  return (



    <div>

      {/* <p>Microphone: {listening ? 'on' : 'off'}</p> */}
      {/* <button
        onTouchStart={startListening}
        onMouseDown={startListening}
        onTouchEnd={SpeechRecognition.stopListening}
        onMouseUp={SpeechRecognition.stopListening}
      >Hold to talk</button> */}

      <button onClick={(e) => { SpeechRecognition.startListening({ continuous: true }) }}>Start</button>
       <button onClick={(e) => SpeechRecognition.stopListening()}>Stop</button> 
      {/* <button onClick={resetTranscript}>Reset</button>*/}
      <p>{message}</p>
      <p className="textclass">
        <input type="text" id="myText" />
        </p>


      {updateText && updateText.length > 0 && updateText.map((comment, i) =>
        <input key={i} value={comment}></input>
      )}

      {/* <p><b>Saved Text:</b> {updateText}</p> */}
    </div>
  )
}
export default Dictaphone