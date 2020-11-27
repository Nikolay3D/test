import React from 'react'
import {render} from 'react-dom'

// *************** рабочая версия *************************************
// import RegistrationForm from './registration_form'
import RegistrationForm from './registration_form_func'

render(
    <div>
        <RegistrationForm/>
    </div>, document.getElementById('root')
)

// *************** тесты компонентов ************************************************
// import GetUserForm from './getUser_form'
// import GetUserFormFunc from './getUser_form_func'
// import RegistrationForm from './registration_form'
//
// render(
//     <div>
//         <table>
//             <tbody>
//             <tr>
//                 <td><GetUserForm/></td>
//                 <td><GetUserFormFunc/></td>
//             </tr>
//             <tr>
//                 <td><RegistrationForm/></td>
//             </tr>
//             </tbody>
//         </table>
//     </div>, document.getElementById('root')
// )
