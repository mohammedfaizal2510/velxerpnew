// import React, { useState } from 'react';

// function HoverButton() {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div style={{ position: 'relative', display: 'inline-block' }}>
//       <button
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//         style={{
//           padding: '10px 20px',
//           fontSize: '16px',
//           cursor: 'pointer',
//         }}
//       >
//         Hover me
//       </button>
//       {isHovered && (
//         <div
//           style={{
//             position: 'absolute',
//             // top: '50%',
//             left: '105%',
//             transform: 'translateY(-50%)',
//             // padding: '5px 10px',
//             backgroundColor: 'black',
//             color: 'white',
//             borderRadius: '5px',
//             fontSize: '14px',
//             whiteSpace: 'nowrap',
//           }}
//         >
//           This is button
//         </div>
//       )}
//     </div>
//   );
// }

// export default HoverButton;
