import { Fragment } from 'react'
import Avatar from '@components/avatar'
import { Bell, Check, X, AlertTriangle, Info } from 'react-feather'

function setColor(type) {
    let color = ''
    switch (type) {
        case 'error':
            color = 'danger'
            break

        case 'successProgress':
            color = 'success'
            break
    
        default:
            color = type
            break
    }

    return color
}

function setIcon(type) {
    let icon = null
    switch (type) {
        case 'primary':
            icon = <Bell size={12} />
            break

        case 'success':
            icon = <Check size={12} />
            break
        
        case 'error':
            icon = <X size={12} />
            break

        case 'warning':
            icon = <AlertTriangle size={12} />
            break
        
        case 'info':
            icon = <Info size={12} />
            break
        
        case 'successProgress':
            icon = <Check size={12} />
            break
    
        default:
            icon = type
            break
    }
    return icon
}


const ToastContent = ({ type, name, msg }) => (
    <Fragment>
      <div className='toastify-header'>
        <div className='title-wrapper'>
            <Avatar size='sm' 
                color={ setColor(type) } 
                icon={ setIcon(type) } 
            />
          <h6 className='toast-title font-weight-bold'>{name}</h6>
        </div>
      </div>
      <div className='toastify-body'>
        <span>{msg}</span>
      </div>
    </Fragment>
)

export default ToastContent