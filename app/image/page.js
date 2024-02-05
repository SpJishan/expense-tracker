"use client"
import React, { useEffect, useState } from "react";
import { imageDb } from './Config';
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";



export default function Image(){
    const [img,setImg] =useState('')
    const [imgUrl,setImgUrl] =useState([])

    const handleClick = () =>{
     if(img !==null){
        const imgRef =  ref(imageDb,`files/${v4()}`)
        uploadBytes(imgRef,img).then(value=>{
            console.log(value)
            alert("Image Uploaded");
            getDownloadURL(value.ref).then(url=>{
                setImgUrl(data=>[...data,url])
            })
        })
     }
    }

    useEffect(()=>{
        listAll(ref(imageDb,"files")).then(imgs=>{
            console.log(imgs)
            imgs.items.forEach(val=>{
                getDownloadURL(val).then(url=>{
                    setImgUrl(data=>[...data,url])
                })
            })
        })
    },[])
    return(
        
        <div className="App lg:ml-[200px] lg:mr-[100px]">
      <div className="z-10 mt-[180px] max-w-5xl w-full items-center justify-between font-mono text-sm ">
      <h1 className="text-4xl p-4 text-center">Upload Your Images</h1>
      <div className="bg-slate-800 p-4 rounded-lg">
        <input 
        className=" text-white border p-3 ml-2"
        type="file" onChange={(e)=>setImg(e.target.files[0])} /> 
        <button 
        className="border mx-3 mb-8 text-white bg-slate-900 hover:bg-slate-900 p-3 text-[16px]"
        onClick={handleClick}>Upload</button>
        <br/>
        {
            imgUrl.map(dataVal=><div>
                <img src={dataVal} height="1000px" width="1000px" />
                <br/> 
            </div>)
        }
        </div>
        </div>
</div>
    )
}


