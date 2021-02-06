import * as e from './evaluation_styles'
import { useState } from 'react'


const ResponseGraph = ({ response, attendees }) => {

    //const attendees = 10;
    const count = attendees;

    const [style, setStyle] = useState({});
	
	setTimeout(() => {
		const newStyle = {
			opacity: 1,
			width: `${response}`
		}
		
		setStyle(newStyle);
	}, 200);
    return (
    <div>
        <e.Response>
        <e.ReponseCount newWidth={(style.width/count) * 100} newOpacity ="style.opacity">
            {/* {Math.round((response/count) * 100)}% */}
        </e.ReponseCount>
        </e.Response>

    </div>
    )
}

export default ResponseGraph; 