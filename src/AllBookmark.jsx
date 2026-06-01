import {Context} from './Context.jsx'
import {useContext} from 'react'
import './bookmark.css'

const AllBookmark = () => {
    const ctrx = useContext(Context)

    return (
        <div className="all-bookmark">
            <h2>All Bookmarks</h2>
            {ctrx.item.map((i) => {
                return (<div key={i.id} className="bookmark-card">
                    <h3>{i.title}</h3>
                    <p>{i.description}</p>
                        <div className="actions">
                            <a href={i.url} target="_blank" rel="noopener noreferrer">Visit</a>
                            <button onClick={() => ctrx.removeItem(i.id)}>Remove</button>
                        </div>
                </div>
                )
            })}
        </div>
    )
}

export default AllBookmark;