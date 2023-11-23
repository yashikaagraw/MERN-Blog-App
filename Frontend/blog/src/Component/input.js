// import React from 'react'

// const input = () => {
//   return (
//     <div>
//         
//     </div>
//   )

// }

// export default input
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Checkboxes() {
  return (
    <div>
        <form>
             <input name="name"/>
             <Checkbox {...label} defaultChecked />
            <button>Submit</button>
     
      </form>
    
    </div>
  );
}
