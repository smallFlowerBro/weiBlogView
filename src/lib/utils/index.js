class UUIDManager{
    static v4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0
            const v = c === 'x' ? r : (r & 0x3 | 0x8)
            return v.toString(16)
        })
    }
}


class Toast{

    static show(msg,timeout=2500){
        const toast = document.createElement('div')
        toast.className = 'custom-toast'
        toast.textContent = msg
        toast.style.position = 'fixed'
        // toast.style.bottom = '28px'
        toast.style.left = '50%'
        toast.style.top = '50%'
        toast.style.transform = 'translate(-50%,-50%)'
        toast.style.backgroundColor = '#3b82f6'
        toast.style.color = 'white'
        toast.style.padding = '10px 24px'
        toast.style.borderRadius = '40px'
        toast.style.fontSize = '0.85rem'
        toast.style.fontWeight = '500'
        toast.style.zIndex = '9999'
        toast.style.boxShadow = '0 8px 20px rgba(59,130,246,0.4)'
        toast.style.backdropFilter = 'blur(8px)'
        document.body.appendChild(toast)
        setTimeout(() => toast.remove(), timeout);
    }


}

export  {UUIDManager,Toast}