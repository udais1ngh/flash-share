import React, { useEffect, useRef, useState } from 'react'
import BackgroundImage from './bg.png';
import copy from "copy-to-clipboard";
import uploadFile from './services/api';

const App = () => {

  const fileRef = useRef();

  const [isfile, setisFile] = useState('');
  const [downloadUrl, setUrl] = useState('');
  const [text, setText] = useState('')

  useEffect(() => {

    async function getImage() {

      if (isfile) {

        const data = new FormData();
        data.append("name", isfile.name);
        data.append("file", isfile);

        let resp = await uploadFile(data);
        setUrl(resp.path)
      }

    }

    getImage();

  }, [isfile]);



useEffect(()=>{

  setText(downloadUrl)


},[downloadUrl])


  function onUploadClick() {

    fileRef.current.click()

  }




  function copyText() {
console.log(text)
    copy(text);
    alert(`You have copied "${text}"`);

  }

  return (
    <div className='main h-screen m-1'>
      <div className='flex flex-col justify-center items-center gap-1 '>
        <div className='text-3xl font-bold flex justify-center items-center gap-1'>
          <div>FlashShare</div>
          <div><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="rgb(435 185 33)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg></div>
        </div>
        <div className='flex flex-col justify-center items-center p-3 border-2 border-black border-dashed rounded-md'>
          <div >
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgb(435 185 33)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-folder-up"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" /><path d="M12 10v6" /><path d="m9 13 3-3 3 3" /></svg>
          </div>
          <div className='text-3xl font-bold'>
            Share your file.
          </div>
          <div className=''>Upload and share download link.</div>

          <div>
            <button onClick={onUploadClick} className="text-white  bg-gray-950   hover:bg-zinc-900  focus:outline-none  
                font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-gray-950 dark:hover:bg-zinc-900
                dark:focus:bg-zinc-900 w-full mt-1" >Upload</button>
          </div>
          <div className='hidden'>
            <input type='file' ref={fileRef} onChange={(e) => setisFile(e.target.files[0])} />
          </div>

        </div>

        {
          downloadUrl && (
            <div className='flex gap-1 p-4 mx-4 bg-slate-200 rounded-md'>
              <span onClick={copyText}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
              </span>
              <input  disabled  value={downloadUrl} />

            </div>
          )

        }


      </div>

      <div className='h-full p-8 md:relative md:right-12'>
        <img src={BackgroundImage} alt='img' />
      </div>
    </div>
  )
}

export default App



