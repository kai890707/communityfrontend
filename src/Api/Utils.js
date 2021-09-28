import Swal from 'sweetalert2';
import {postApi,setAuthToken,getAuthToken,tokenApi,AuthContext,getMe,tokenGetApi} from './Api';
export function tokenExpired(res,href) {
    Swal.fire({
        title: '請重新登入',
        text: res.message,
        icon: 'error',
      }).then(()=>{
        setTimeout(()=>{
            window.location.href=href;
            setAuthToken("");
        },2000)
      })
  }