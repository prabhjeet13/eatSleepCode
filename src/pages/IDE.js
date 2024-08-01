import React, { useState } from 'react'
import {getrunyourcodeonIDE} from '../apiservices/fetchingApiFunctions' 
const IDE = () => {

  const [output,setOutput] = useState("output will display here");
  const [runbtnDisable,setrunbtndisable] = useState(true);
  
  
  const [CoderExecuteData,setCoderExecuteData] = useState({
      language : "cpp",
      code : "",
      customInput : "",
    });
    
    
    const textboxChange = (e) => {
        
        setCoderExecuteData( (prev) => ({
            ...prev,
            [e.target.name] : e.target.value,
        }))
    }
    const IDErunHandler = (e) => {
      e.preventDefault(); 
      setrunbtndisable(false);
      getrunyourcodeonIDE(CoderExecuteData,setrunbtndisable,setOutput);
    }
    
  return (
    <div className='w-11/12 max-w-[1260px] mx-auto flex flex-col items-center mt-5'>
        <p className='text-xl font-mono text-black font-bold'> Meet Your @EAT_SLEEP_CODE IDE !!!</p>

        <div className='flex flex-row gap-5 mt-16'>
                {/* compiler part */}
                    <form  onSubmit = {IDErunHandler} className='min-1100:relative min-1100:flex min-1100:flex-row text-black font-mono font-semibold text-3xl flex flex-col mx-auto w-[60%] min-1100:w-full gap-10 mb-2'>
                         <select name = 'language' id = 'language' className='min-1100:absolute min-1100:-top-10  font-mono font-semibold px-10 py-1 cursor-pointer' onChange={textboxChange}>
                               <option className='text-3xl'>cpp</option> 
                         </select>   
                        <button type = 'Submit'  className={`min-1100:absolute min-1100:-top-20 min-1100:right-5 border-2 bg-red-600 text-white p-2 rounded-md h-[15%] px-3 mt-10 transition-all duration-200 shadow-md shadow-black hover:scale-90 ${runbtnDisable === true ? "visible" : "invisible"}`}>Run</button>
                        <div className='flex flex-col gap-2 mt-5'>
                            <label>Code Editor</label>
                            <textarea onChange = {textboxChange} name = 'code' id = 'code' value = {CoderExecuteData.code} rows={13} cols={50} placeholder='write your code' className=' border-black text-black rounded-md text-lg font-black p-2 border-2'></textarea>
                        </div>
                        <div className='flex flex-col gap-3 mt-5'>
                            <div className='flex flex-col gap-2'>
                                <label>Input</label>
                                <textarea onChange = {textboxChange} name = 'customInput' id = 'customInput' value = {CoderExecuteData.customInput} rows={5} cols={50} placeholder='write your custom input' className=' border-black text-black rounded-md text-lg font-black p-2 border-2'></textarea>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label>Output</label>
                                <textarea name = 'output' id = 'output' value={output} rows= {5} cols={50} placeholder='output will display' className='text-lg font-black p-2 border-2 border-black text-black rounded-md' readOnly></textarea>
                            </div>
                        </div>
                    </form>
        </div>



    </div>

    
  )
}

export default IDE