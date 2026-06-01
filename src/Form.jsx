import './Form.css'
import { Context } from './Context.jsx'
import {useContext,useState} from 'react'
import { GoogleGenAI } from "@google/genai";

const Form = () => {
    const[title,setTitle] = useState('');
    const [url,setUrl] = useState('');
    const [desc,setDesc] = useState('');
    const [loading, setLoading] = useState(false);

    const ctrx = useContext(Context)

    const ai = new GoogleGenAI({
        apiKey: import.meta.env.VITE_GEMINI_API_KEY,
    });
    

    const submitHandler = async(e) => {
        e.preventDefault();
        setLoading(true);
        if(title === "" || url === "") {
        alert("Please fill in all fields");
        setLoading(false);
        return;
        };

        console.log(title, url);

        const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
        Generate a short bookmark description.

        Title: ${title}
        URL: ${url}

        Return only the description in less than 30 words.`,
        });

    const description = response.text;

        ctrx.addItem({
            id : Date.now(),
            title,
            url,
            description
        });
        setDesc('');
        setTitle('');
        setUrl('');
        setLoading(false);
    }

    return (
        <form className="bookmark-form" onSubmit={submitHandler}>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} />
            <button type="submit" disabled={loading} style={{ backgroundColor: loading ? 'red' : '#0b67f1', cursor: loading ? 'not-allowed' : 'pointer' }}>
                {loading ? 'Adding...' : 'Add Bookmark'}
            </button>
        </form>
    )
}


export default Form;